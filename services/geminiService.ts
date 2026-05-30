import { AISearchResult } from "../types";

export const identifyBook = async (query: string): Promise<AISearchResult> => {
  try {
    const response = await fetch('/api/identify-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || '無法取得 AI 辨識結果（可能未設定環境變數或伺服器未開啟此 API 服務）');
    }

    const data = await response.json();
    return data as AISearchResult;
  } catch (error) {
    console.error("Client Gemini API Error:", error);
    throw error;
  }
};
