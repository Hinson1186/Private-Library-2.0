import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Book, CategoryDef } from '../types';
import BookCard from './BookCard';
import CategoryCard from './CategoryCard';
import { BookOpen, Plus, Folder, BookHeart, Tag } from 'lucide-react';

interface BookGridProps {
  viewData: { type: 'books' | 'categories' | 'mixed', items: (Book | CategoryDef)[] };
  books: Book[]; // Needed for category counts
  isBatchMode: boolean;
  selectedBookIds: Set<string>;
  onBookClick: (book: Book) => void;
  onDeleteBook: (id: string, title: string) => void;
  onBatchSelect: (id: string) => void;
  onCategoryClick: (name: string) => void;
  onAddFirstBook: () => void;
  isLoading: boolean;
}

// Helper to check item type
const isCategory = (item: Book | CategoryDef): item is CategoryDef => {
  return (item as CategoryDef).children !== undefined;
};

// Helper for recursive book count
const getAllDescendantNames = (node: CategoryDef): string[] => {
    let names = [node.name];
    if (node.children) {
        node.children.forEach(child => {
            names = names.concat(getAllDescendantNames(child));
        });
    }
    return names;
};

const getFirstBookInDescendants = (node: CategoryDef, allBooks: Book[]): Book | undefined => {
    const descendants = getAllDescendantNames(node);
    const candidates = allBooks.filter(b => descendants.includes(b.category));
    return candidates.length > 0 ? candidates[0] : undefined;
};

const getBookCountInDescendants = (node: CategoryDef, allBooks: Book[]): number => {
    const descendants = getAllDescendantNames(node);
    return allBooks.filter(b => descendants.includes(b.category)).length;
};

const getSeriesCountInDescendants = (node: CategoryDef): number => {
    let count = (node.type === 'series' && (!node.children || node.children.length === 0)) ? 1 : 0;
    if (node.children) {
        node.children.forEach(child => {
            count += getSeriesCountInDescendants(child);
        });
    }
    return count;
};

const LargeCategoryCard: React.FC<{ category: CategoryDef, books: Book[], onClick: (name: string) => void }> = ({ category, books, onClick }) => {
  const isSeries = category.type === 'series' || category.name.includes('系列');
  const count = isSeries ? getSeriesCountInDescendants(category) : getBookCountInDescendants(category, books);
  const unit = isSeries ? '個系列' : '本書籍';
  
  // Use Indigo for Series, Emerald for Single Volumes
  const colorClasses = isSeries 
    ? "from-indigo-600/30 to-indigo-950/60 border-indigo-500/50 hover:border-indigo-400 group-hover:shadow-indigo-500/30 text-indigo-400"
    : "from-emerald-600/30 to-emerald-950/60 border-emerald-500/50 hover:border-emerald-400 group-hover:shadow-emerald-500/30 text-emerald-400";

  return (
    <div 
      onClick={() => onClick(category.name)}
      className={`relative flex-1 flex flex-col items-center justify-center p-10 rounded-[2.5rem] border bg-gradient-to-br backdrop-blur-md cursor-pointer transition-all duration-500 hover:-translate-y-3 group ${colorClasses} shadow-2xl`}
    >
      <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 bg-slate-950/60 border-2 border-current shadow-2xl transition-transform duration-500 group-hover:scale-110`}>
        {isSeries ? <Folder size={64} strokeWidth={1.2} /> : <BookHeart size={64} strokeWidth={1.2} />}
      </div>
      <h3 className="text-4xl font-black text-slate-50 mb-4 tracking-tight drop-shadow-sm text-center">
        {category.displayName || category.name}
      </h3>
      <p className="text-slate-300 font-bold text-xl opacity-80">
        {count} {unit}
      </p>
    </div>
  );
};

const BookGrid: React.FC<BookGridProps> = ({
  viewData,
  books,
  isBatchMode,
  selectedBookIds,
  onBookClick,
  onDeleteBook,
  onBatchSelect,
  onCategoryClick,
  onAddFirstBook,
  isLoading
}) => {

  if (viewData.items.length === 0 && !isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
            <div className="w-20 h-20 bg-slate-800/50 text-slate-600 rounded-full flex items-center justify-center mb-4">
              <BookOpen size={40} />
            </div>
            <h3 className="text-xl font-medium text-slate-200 mb-2">
                {books.length === 0 ? '您的書庫是空的' : '此位置暫無內容'}
            </h3>
            <p className="text-slate-500 max-w-sm mb-6">
                {books.length === 0 ? '點擊右上角的「入庫」按鈕來開始建立您的收藏。' : '嘗試切換其他分類或清除篩選條件。'}
            </p>
            {books.length === 0 && (
                <button
                onClick={onAddFirstBook}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-indigo-500/20"
                >
                新增第一本書 <Plus size={18} />
                </button>
            )}
        </div>
    );
  }

  if (viewData.type === 'categories' && viewData.items.length === 2 && !isLoading) {
    const cat1 = viewData.items[0] as CategoryDef;
    const cat2 = viewData.items[1] as CategoryDef;
    
    // Only use the split layout for the main "系列" and "單行本" folders
    const isSeriesAndSingle = 
      (cat1.displayName === '系列' && cat2.displayName === '單行本') ||
      (cat1.displayName === '單行本' && cat2.displayName === '系列');

    if (isSeriesAndSingle) {
      return (
        <div className="flex-1 h-full pb-6 flex flex-col md:flex-row gap-6 p-4 md:p-8">
           <LargeCategoryCard category={cat1} books={books} onClick={onCategoryClick} />
           <LargeCategoryCard category={cat2} books={books} onClick={onCategoryClick} />
        </div>
      );
    }
  }

  const GAP = 20; // Reduced gap for tighter fit

  return (
    <div className="flex-1 h-full pb-20">
      <AutoSizer>
        {({ height, width }) => {
          // Increased column density settings
          let columnCount = 2; 
          if (width >= 1536) columnCount = 8;      // 2xl: Was 6, now 8
          else if (width >= 1280) columnCount = 7; // xl: Was 5, now 7
          else if (width >= 1024) columnCount = 6; // lg: Was 4, now 6
          else if (width >= 768) columnCount = 4;  // md: Was 3, now 4
          else if (width >= 640) columnCount = 3;  // sm: New breakpoint for larger phones
          
          const rowCount = Math.ceil(viewData.items.length / columnCount);
          // Calculate precise width to fill space evenly
          const itemWidth = (width - (GAP * (columnCount - 1))) / columnCount;

          // DYNAMIC HEIGHT CALCULATION:
          // Keep 2:3 Aspect Ratio for image part
          const rowHeight = (itemWidth * 1.5) + 88;

          return (
            <List
              height={height}
              itemCount={rowCount}
              itemSize={rowHeight}
              width={width}
              className="custom-scrollbar"
            >
              {({ index, style }: { index: number, style: React.CSSProperties }) => {
                const rowItems = [];
                for (let i = 0; i < columnCount; i++) {
                  const itemIndex = index * columnCount + i;
                  if (itemIndex < viewData.items.length) {
                    rowItems.push({
                        item: viewData.items[itemIndex],
                        index: itemIndex
                    });
                  }
                }

                // Adjust style to account for the gap visually
                const rowStyle = {
                    ...style,
                    height: Number(style.height) - GAP, 
                    marginBottom: GAP
                };

                return (
                  <div style={rowStyle} className="flex gap-[20px]">
                    {rowItems.map(({ item, index: itemIndex }) => {
                      return (
                        <div key={item.id} style={{ width: itemWidth, height: '100%' }}>
                           {isCategory(item) ? (
                               <CategoryCard 
                                    category={item}
                                    representativeBook={getFirstBookInDescendants(item, books)}
                                    bookCount={getBookCountInDescendants(item, books)}
                                    seriesCount={getSeriesCountInDescendants(item)}
                                    onClick={onCategoryClick}
                               />
                           ) : (
                               <BookCard 
                                    book={item} 
                                    onClick={(b) => isBatchMode ? onBatchSelect(b.id) : onBookClick(b)}
                                    isSelectable={isBatchMode}
                                    isSelected={selectedBookIds.has(item.id)}
                               />
                           )}
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </List>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default BookGrid;