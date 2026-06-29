import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Book, CategoryDef } from '../types';
import BookCard from './BookCard';
import CategoryCard from './CategoryCard';
import { BookOpen, Plus, Folder, BookHeart, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import seriesIllustration from '../src/assets/images/series_ln_cover_1782709930114.jpg';
import singleIllustration from '../src/assets/images/single_ln_cover_1782709946337.jpg';

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
  expandedSeries?: Set<string>;
  onToggleSeriesExpand?: (seriesName: string) => void;
  isFiltered?: boolean;
  searchTerm?: string;
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
  const booksCount = isSeries ? getBookCountInDescendants(category, books) : 0;
  
  const borderClasses = isSeries 
    ? "border-indigo-500/30 hover:border-indigo-400/80"
    : "border-emerald-500/30 hover:border-emerald-400/80";

  const glowShadow = isSeries 
    ? "group-hover:shadow-[0_0_50px_rgba(99,102,241,0.35)]"
    : "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.35)]";

  const pillBorder = isSeries
    ? "border-indigo-500/40 bg-slate-950/90 text-indigo-200 group-hover:border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
    : "border-emerald-500/40 bg-slate-950/90 text-emerald-200 group-hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";

  return (
    <div 
      onClick={() => onClick(category.name)}
      className={`relative flex-1 flex flex-col items-center justify-end p-10 h-96 rounded-[2.5rem] border bg-slate-950 cursor-pointer transition-all duration-500 hover:-translate-y-3 group ${borderClasses} ${glowShadow} shadow-2xl overflow-hidden`}
    >
      {/* Background Image filling the card */}
      <img 
        src={isSeries ? seriesIllustration : singleIllustration} 
        alt={category.displayName || category.name}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105 opacity-55 group-hover:opacity-70"
        referrerPolicy="no-referrer"
      />
      
      {/* Premium overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10 z-10" />
      
      {/* Content wrapper */}
      <div className="relative z-20 w-full flex flex-col items-center text-center mb-2">
        
        <h3 className={`text-4xl font-black mb-5 tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] transition-colors duration-500 ${isSeries ? 'text-indigo-100 group-hover:text-white' : 'text-emerald-100 group-hover:text-white'}`}>
          {category.displayName || category.name}
        </h3>
        
        <p className={`font-semibold text-base px-6 py-2.5 rounded-full border backdrop-blur-md transition-all duration-500 ${pillBorder}`}>
          {isSeries ? (
            <span className="flex items-center gap-2">
              <span>{count} 個系列</span>
              <span className="opacity-40 font-light">|</span>
              <span>{booksCount} 本書籍</span>
            </span>
          ) : (
            <span>{count} 本書籍</span>
          )}
        </p>
      </div>
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
  isLoading,
  expandedSeries = new Set(),
  onToggleSeriesExpand = () => {},
  isFiltered = false,
  searchTerm = ''
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

  if (isFiltered) {
    return (
      <div className="flex-1 h-full pb-20 overflow-y-auto custom-scrollbar p-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[20px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {viewData.items.map((item) => {
              const itemId = isCategory(item) ? item.id : item.id;
              
              return (
                <motion.div
                  key={itemId}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    layout: { duration: 0.35, type: "spring", stiffness: 350, damping: 28 } 
                  }}
                  className="w-full flex flex-col h-full"
                >
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
                      onClick={(b) => {
                        if (b.isSeriesSet) {
                          onToggleSeriesExpand(b.category);
                        } else {
                          isBatchMode ? onBatchSelect(b.id) : onBookClick(b);
                        }
                      }}
                      isSelectable={isBatchMode && !item.isSeriesSet}
                      isSelected={selectedBookIds.has(item.id)}
                      searchTerm={searchTerm}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
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
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar pb-24 flex flex-col md:flex-row gap-6 p-4 md:p-8">
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
                                    searchTerm={searchTerm}
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