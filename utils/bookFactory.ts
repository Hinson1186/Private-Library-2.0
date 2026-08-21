import { Book } from '../types';

export interface SeriesConfig {
  title: string;       // 系列標題，如 "出租女友"
  author: string;
  category: string;
  idBase: string;      // ID 前綴，如 "rent-gf"
  volumes: number[];   // 集數列表，如 [1, 2, 3, 10]
  covers?: Record<number, string>; // 封面字典: { 1: "url...", 2: "url..." }
  subCategory?: string;
  genre?: string;
  tags?: string[];
}

export const createBook = (
  title: string,
  author: string,
  category: string,
  id: string,
  coverUrl: string = '',
  subCategory: string = '',
  genre: string = '',
  tags: string[] = []
): Book => ({
  id,
  title,
  author,
  category,
  subCategory,
  coverUrl,
  genre,
  tags,
  type: 'single'
});

export const createSeries = (config: SeriesConfig): Book[] => {
  return config.volumes.map(vol => {
    // 處理 ID：如果有 idBase 則使用 base-vol，否則隨機生成
    const id = config.idBase ? `${config.idBase}-${vol}` : crypto.randomUUID();
    
    // 處理標題：預設為 "系列名 集數"
    const fullTitle = `${config.title} ${vol}`;
    
    // 處理封面：從字典中查找，如果沒有則為空字串
    const coverUrl = config.covers && config.covers[vol] ? config.covers[vol] : '';

    return {
      id,
      title: fullTitle,
      author: config.author,
      category: config.category,
      subCategory: config.subCategory || '',
      coverUrl,
      genre: config.genre || '',
      tags: config.tags || [],
      type: 'series'
    };
  });
};