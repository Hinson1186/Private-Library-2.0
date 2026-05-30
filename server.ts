
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { GoogleGenAI, Type } from "@google/genai";

const __dirname = path.resolve();
const initialDataPath = path.join(__dirname, 'data', 'initialData.ts');

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY 伺服器端環境變數未設定。");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'data'));
    },
    filename: (req, file, cb) => {
      // We'll overwrite the existing file, but multer needs a filename
      cb(null, 'temp_initialData.ts');
    }
  });
  const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
      if (path.extname(file.originalname) !== '.ts') {
        return cb(new Error('Only .ts files are allowed'));
      }
      cb(null, true);
    }
  });

  app.use(express.json({ limit: '50mb' }));

  // API: Identify book using Gemini (Server-side implementation)
  app.post('/api/identify-book', async (req, res) => {
    try {
      const { query: searchQuery } = req.body;
      if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const client = getGeminiClient();
      
      const bookSchema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "書籍的完整標題 (繁體中文)" },
          author: { type: Type.STRING, description: "作者姓名 (繁體中文)" },
          genre: { type: Type.STRING, description: "書籍的主要類型標籤 (例如：科幻、歷史、商業)。" },
          category: { type: Type.STRING, description: "廣義的主分類 (例如：文學小說、社會科學、自然科普、商業理財、藝術設計)。" },
          subCategory: { type: Type.STRING, description: "較為具體的子分類 (例如：翻譯文學、心理學、物理化學、投資理財)。" },
        },
        required: ["title", "author", "genre", "category"],
      };

      const response = await client.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `識別此搜尋查詢的書籍： "${searchQuery}"。
        如果查詢模糊，請根據最可能的書籍進行猜測。
        請務必以「繁體中文」回傳所有文字內容（書名、作者、分類等）。
        對於 category (主分類) 和 subCategory (子分類)，請給予圖書館或書店常見的分類建議。
        不需要 ISBN、簡介或出版年份。`,
        config: {
          responseMimeType: "application/json",
          responseSchema: bookSchema,
          temperature: 0.3,
        },
      });

      const text = response.text;
      if (!text) {
        return res.status(500).json({ error: "AI 無法回應，請稍後再試。" });
      }

      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error('Gemini API identification error:', error);
      res.status(500).json({ error: error.message || 'Gemini identification failed' });
    }
  });

  // API: Upload initialData.ts
  app.post('/api/upload-initial-data', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const tempPath = req.file.path;
      
      // Overwrite the real initialData.ts
      fs.copyFileSync(tempPath, initialDataPath);
      fs.unlinkSync(tempPath);

      res.json({ message: 'File uploaded and applied successfully. The server will restart to apply changes.' });
      
      // The dev server will restart automatically because of tsx/vite watching
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // API: Download current state as initialData.ts
  app.post('/api/generate-initial-data', (req, res) => {
    try {
      const { books, categories } = req.body;
      
      const content = `import { Book, CategoryDef } from '../src/types';
import { createBook, createSeries } from '../src/utils/bookFactory';

/**
 * 這裡是您的「永久資料庫」。
 * 此檔案由網頁自動生成。
 */

export const initialCategories: CategoryDef[] = ${JSON.stringify(categories, null, 2)};

export const initialBooks: Book[] = ${JSON.stringify(books, null, 2)};
`;

      res.setHeader('Content-Type', 'text/typescript');
      res.setHeader('Content-Disposition', 'attachment; filename=initialData.ts');
      res.send(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API: Save state directly into initialData.ts
  app.post('/api/save-initial-data', (req, res) => {
    try {
      const { books, categories } = req.body;
      
      const content = `import { Book, CategoryDef } from '../types';
import { createBook, createSeries } from '../utils/bookFactory';

/**
 * 這裡是您的「永久資料庫」。
 * 此檔案由自動儲存生成。
 */

export const initialCategories: CategoryDef[] = ${JSON.stringify(categories, null, 2)};

export const initialBooks: Book[] = ${JSON.stringify(books, null, 2)};
`;

      fs.writeFileSync(initialDataPath, content);
      res.json({ message: 'Data saved to initialData.ts successfully.' });
    } catch (error: any) {
      console.error('Save error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
