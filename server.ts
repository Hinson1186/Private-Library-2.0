
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const __dirname = path.resolve();
const initialDataPath = path.join(__dirname, 'data', 'initialData.ts');

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
