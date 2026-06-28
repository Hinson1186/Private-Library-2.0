export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string; 
  category: string;
  subCategory?: string;
  coverUrl?: string;
  addedAt: number;
  tags?: string[];
  type?: 'series' | 'single';
  updatedAt?: number;
  isSeriesSet?: boolean;
  seriesBooks?: Book[];
}

export type BookDraft = Omit<Book, 'id' | 'addedAt'>;

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