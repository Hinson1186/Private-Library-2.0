import { GoogleGenAI, Type } from "@google/genai";

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

export default async function handler(req: any, res: any) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Gemini API identification error:', error);
    return res.status(500).json({ error: error.message || 'Gemini identification failed' });
  }
}
