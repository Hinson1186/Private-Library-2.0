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
    const { books, categories } = req.body;
    
    const content = `import { Book, CategoryDef } from '../types';
import { createBook, createSeries } from '../utils/bookFactory';

/**
 * 這裡是您的「永久資料庫」。
 * 此檔案由網頁自動生成。
 */

export const initialCategories: CategoryDef[] = ${JSON.stringify(categories, null, 2)};

export const initialBooks: Book[] = ${JSON.stringify(books, null, 2)};
`;

    res.setHeader('Content-Type', 'text/typescript');
    res.setHeader('Content-Disposition', 'attachment; filename=initialData.ts');
    return res.status(200).send(content);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
