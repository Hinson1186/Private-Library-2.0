import { Book, CategoryDef } from "../types";

/**
 * 智能導出功能
 * 將目前的書籍資料轉換為 TypeScript 程式碼
 */
export const exportData = (books: Book[], categories: CategoryDef[]) => {
  const groupedBooks = new Map<string, Book[]>(); 
  const singles: Book[] = [];

  books.forEach(book => {
    const match = book.title.match(/^(.*?)(\d+)\s*$/);
    if (match && book.category) {
        const titleBase = match[1].trim();
        const key = `${book.category}|${book.author}|${titleBase}`;
        if (!groupedBooks.has(key)) groupedBooks.set(key, []);
        groupedBooks.get(key)!.push(book);
    } else {
        singles.push(book);
    }
  });

  const seriesCodeBlocks: string[] = [];
  groupedBooks.forEach((group, key) => {
     if (group.length < 2) {
         group.forEach(b => singles.push(b));
         return;
     }
     const [category, author, titleBase] = key.split('|');
     const volumes: number[] = [];
     const covers: Record<number, string> = {};
     let idBaseCandidate = '';
     let consistentIdBase = true;

     group.sort((a, b) => {
         const volA = parseInt(a.title.match(/(\d+)\s*$/)?.[1] || '0');
         const volB = parseInt(b.title.match(/(\d+)\s*$/)?.[1] || '0');
         return volA - volB;
     });

     group.forEach(book => {
         const volMatch = book.title.match(/(\d+)\s*$/);
         if (volMatch) {
             const vol = parseInt(volMatch[1]);
             volumes.push(vol);
             if (book.coverUrl) covers[vol] = book.coverUrl;
             const parts = book.id.split('-');
             if (parts.length > 1) {
                 const currentBase = parts.slice(0, -1).join('-');
                 if (idBaseCandidate === '') idBaseCandidate = currentBase;
                 else if (idBaseCandidate !== currentBase) consistentIdBase = false;
             } else {
                 consistentIdBase = false;
             }
         }
     });

     const idBaseStr = consistentIdBase && idBaseCandidate ? `    idBase: "${idBaseCandidate}",` : `    idBase: "${crypto.randomUUID().slice(0, 8)}",`;
     let coversStr = '';
     if (Object.keys(covers).length > 0) {
         coversStr = `\n    covers: {\n${Object.entries(covers).map(([vol, url]) => `      ${vol}: "${url}"`).join(',\n')}\n    },`;
     }

     // Use tags from the first book in the group for the series
     const tags = group[0].tags && group[0].tags.length > 0 ? `\n    tags: ${JSON.stringify(group[0].tags)},` : '';

     seriesCodeBlocks.push(`
  ...createSeries({
    title: "${titleBase}",
    author: "${author}",
    category: "${category}",
${idBaseStr}${tags}
    volumes: [${volumes.join(', ')}],${coversStr}
  })`);
  });

  const singleCodeBlocks = singles.map(b => {
      const coverArg = b.coverUrl ? `,\n    "${b.coverUrl}"` : '';
      const tagsArg = b.tags && b.tags.length > 0 ? `,\n    undefined,\n    undefined,\n    ${JSON.stringify(b.tags)}` : '';
      return `  createBook(\n    "${b.title}",\n    "${b.author}",\n    "${b.category}",\n    "${b.id}"${coverArg}${tagsArg}\n  )`;
  });

  const content = `import { Book, CategoryDef } from '../types';
import { createBook, createSeries } from '../utils/bookFactory';

/**
 * 這裡是您的「永久資料庫」。
 * 此檔案由網頁自動生成，請將內容貼上至 data/initialData.ts
 */

export const initialCategories: CategoryDef[] = ${JSON.stringify(categories, null, 2)};

export const initialBooks: Book[] = [
  // --- 單本或未整理書籍 ---
${singleCodeBlocks.join(',\n')}

  // --- 系列書籍 ---
${seriesCodeBlocks.join(',\n')}
];`;

  const blob = new Blob([content.trim()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `initialData.ts`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importData = (file: File): Promise<{ books: Book[], categories: CategoryDef[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (content.includes('createSeries') || content.includes('createBook')) {
             reject(new Error("您上傳的是 TypeScript 原始碼檔案。請直接將此檔案覆蓋 data/initialData.ts。"));
             return;
        }
        const data = JSON.parse(content);
        resolve({ books: data.books || data, categories: data.categories || [] });
      } catch (err) {
        reject(new Error("無法解析檔案格式。"));
      }
    };
    reader.readAsText(file);
  });
};