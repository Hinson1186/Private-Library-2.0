
import React from 'react';
import { CategoryDef, Book } from '../types';
import { Folder, ChevronRight, Tag } from 'lucide-react';
import { getTagStyles } from './BookCard';

interface CategoryCardProps {
  category: CategoryDef;
  representativeBook?: Book;
  bookCount: number;
  seriesCount: number;
  onClick: (categoryName: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, representativeBook, bookCount, seriesCount, onClick }) => {
  const displayCover = representativeBook?.coverUrl && representativeBook.coverUrl.trim().length > 0
    ? representativeBook.coverUrl
    : null;

  const isParentSeriesFolder = category.displayName === '系列' || category.name === '輕小說系列' || category.name === '漫畫系列';
  
  let displayCount = bookCount;
  let unit = ' 本藏書';

  if (isParentSeriesFolder) {
      displayCount = seriesCount;
      unit = ' 個系列';
  } else if (category.type === 'series') {
      displayCount = bookCount;
      unit = ' 本藏書';
  }

  return (
    <div 
      onClick={() => onClick(category.name)}
      className="group relative bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden hover:shadow-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-700 shrink-0">
        {displayCover ? (
          <img 
            src={displayCover} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              // 如果圖片出錯，顯示下面的 Folder icon
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-600">
            <Folder size={48} strokeWidth={1.5} />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

        {/* Prominent dark gradient overlay at the bottom of the cover for maximum legibility */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-12 pb-1.5 px-3 z-10 flex items-center justify-between">
          <span className="text-slate-200 text-[11px] font-medium tracking-wide drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.9)] translate-y-[2px]">
            {isParentSeriesFolder ? '共 ' : '收錄 '}
            <span className="font-bold text-white text-sm">{displayCount}</span>
            {isParentSeriesFolder ? ' 個系列' : ' 本書籍'}
          </span>
        </div>
      </div>
      
      <div className="p-2.5 flex flex-col justify-between h-[74px] bg-slate-800 border-t border-slate-700/50 shrink-0">
        <div className="min-h-0">
          <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-1 group-hover:text-indigo-300 transition-colors" title={category.displayName || category.name}>
            {category.displayName || category.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-0.5">
           {category.tags && category.tags.length > 0 ? (
             <div className="flex flex-wrap gap-1.5 items-center flex-1 mr-2 overflow-hidden max-h-[26px]">
               {category.tags.map(tag => {
                 const style = getTagStyles(tag);
                 return (
                   <span 
                     key={tag} 
                     className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${style.bg} ${style.text} border ${style.border} leading-none whitespace-nowrap`}
                   >
                     {tag}
                   </span>
                 );
               })}
             </div>
           ) : (
             <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
               {category.type === 'series' ? '系列分類' : '一般分類'}
             </span>
           )}
           <div className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0">
             <ChevronRight size={14} />
           </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default CategoryCard;
