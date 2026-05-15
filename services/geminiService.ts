
import { GoogleGenAI, Type } from "@google/genai";
import { AISearchResult } from "../types";

// The API key must be obtained exclusively from the environment variable process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Defining the response schema using Type from @google/genai.
// Removed Schema type annotation to follow provided examples and avoid potential export issues.
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

export const identifyBook = async (query: string): Promise<AISearchResult> => {
  try {
    // Using 'gemini-3-flash-preview' for basic text tasks as per guidelines.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `識別此搜尋查詢的書籍： "${query}"。
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

    // Use .text property directly (do not call as a method).
    const text = response.text;
    if (!text) throw new Error("AI 無法回應");

    const data = JSON.parse(text) as AISearchResult;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
