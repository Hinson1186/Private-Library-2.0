export type OriginDomain = 'light_novel' | 'manga' | 'original' | 'game' | 'other';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string; 
  category: string;
  subCategory?: string;
  coverUrl?: string;
  tags?: string[];
  type?: 'series' | 'single';
  isSeriesSet?: boolean;
  seriesBooks?: Book[];
  // Artbook specific attributes:
  relatedIp?: string; // 關聯作品 IP (例如: 刀劍神域, 魔女之旅, 五等分的新娘)
  originDomain?: OriginDomain | string; // 關聯領域 (light_novel, manga, original, other)
  volume?: number | string; // 冊數卷號 (例如: 1, 2, 3, "全")
  seriesGroup?: string; // 畫集系列名稱 (例如: "刀劍神域 abec畫集", "魔女之旅 あずーる畫集")
  description?: string; // 畫集說明與收錄內容
}

export type BookDraft = Omit<Book, 'id'>;

export interface AISearchResult {
  title: string;
  author: string;
  genre: string;
  category: string;
  subCategory: string;
}

export interface CategoryDef {
  id: string;
  name: string;
  displayName?: string;
  children: CategoryDef[];
  type?: 'series' | 'single' | 'default';
  tags?: string[];
}