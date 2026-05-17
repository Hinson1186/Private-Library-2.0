
import React from 'react';
import { CategoryDef, Book } from '../types';
import { Folder, ChevronRight, Tag } from 'lucide-react';

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
      </div>
      
      <div className="p-3 flex flex-col flex-grow bg-slate-800 border-t border-slate-700/50">
        <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-indigo-300 transition-colors" title={category.displayName || category.name}>
          {category.displayName || category.name}
        </h3>
        
        {category.tags && category.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 mt-1">
            {category.tags.slice(0, 3).map(tag => (
              <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-700 text-slate-300 border border-slate-600">
                {tag}
              </span>
            ))}
            {category.tags.length > 3 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-700 text-slate-400 border border-slate-600">
                +{category.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
           <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
             {displayCount}{unit}
           </span>
           <div className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all">
             <ChevronRight size={14} />
           </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default CategoryCard;
