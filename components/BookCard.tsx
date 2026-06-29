
import React from 'react';
import { Book } from '../types';
import { CheckCircle2, Circle, LayoutGrid, Library, Layers } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  searchTerm?: string;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onClick, 
  isSelectable = false, 
  isSelected = false,
  searchTerm = ''
}) => {
  const isSeriesSet = book.isSeriesSet;
  const count = book.seriesBooks?.length || 0;

  // Helper function to highlight text matching search term
  const highlightText = (text: string, search: string) => {
    if (!text) return '';
    if (!search || !search.trim()) return text;
    try {
      const escaped = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
      return (
        <>
          {parts.map((part, i) => 
            part.toLowerCase() === search.toLowerCase() ? (
              <mark key={i} className="bg-amber-500/30 text-amber-300 px-0.5 rounded font-bold no-underline">{part}</mark>
            ) : (
              part
            )
          )}
        </>
      );
    } catch (e) {
      return text;
    }
  };

  // 優先使用書本封面，若無則使用隨機佔位圖
  const displayCover = book.coverUrl && book.coverUrl.trim().length > 0 
    ? book.coverUrl 
    : `https://picsum.photos/seed/${book.id}/300/450`;

  const handleClick = (e: React.MouseEvent) => {
    if (isSelectable) {
      e.stopPropagation(); 
    }
    onClick(book);
  };

  return (
    <div className="relative h-full w-full group">
      {/* 階層厚度堆疊效果 (Series Set Layers) */}
      {isSeriesSet && (
        <>
          {/* 最底層 */}
          <div className="absolute top-2.5 right-2 px-1 py-1 bg-gradient-to-b from-slate-900 to-slate-950/90 border border-slate-800 rounded-lg inset-0 translate-x-3 translate-y-3 scale-[0.93] opacity-30 shadow-md group-hover:translate-x-4.5 group-hover:translate-y-4.5 transition-all duration-350" />
          {/* 中間層 */}
          <div className="absolute top-1 right-1 px-1 py-1 bg-gradient-to-b from-slate-850 to-slate-900/95 border border-slate-750 rounded-lg inset-0 translate-x-1.5 translate-y-1.5 scale-[0.97] opacity-65 shadow-md group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-all duration-350" />
        </>
      )}

      <div 
        onClick={handleClick}
        className={`relative bg-slate-800 rounded-lg shadow-lg border overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer
          ${isSelected 
            ? 'border-indigo-500 ring-2 ring-indigo-500/50 translate-y-[-4px] shadow-indigo-500/20' 
            : isSeriesSet 
              ? 'border-indigo-500/30 hover:border-indigo-400 hover:shadow-indigo-500/40 hover:-translate-y-1'
              : 'border-slate-700 hover:shadow-indigo-500/20 hover:border-indigo-500/40 hover:-translate-y-1'
          }
        `}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-700">
          <img 
            src={displayCover} 
            alt={book.title} 
            className={`w-full h-full object-cover transition-transform duration-500 ${!isSelectable && 'group-hover:scale-105'}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== `https://picsum.photos/seed/${book.id}/300/450`) {
                target.src = `https://picsum.photos/seed/${book.id}/300/450`;
              }
            }}
          />

          {/* 系列套組專屬勳章 & 頁冊計數 */}
          {isSeriesSet ? (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90 p-3 flex flex-col justify-between">
              {/* 頂端標籤 */}
              <div className="flex items-center gap-1.5 self-start">
                <span className="px-2 py-1 bg-indigo-600 text-[10px] sm:text-[11px] font-black tracking-wider text-white uppercase rounded-md shadow-lg border border-indigo-400/40 flex items-center gap-1">
                  <Layers size={11} strokeWidth={2.5} />
                  系列套組
                </span>
              </div>
              
              {/* 底端提示 */}
              <div className="flex flex-col gap-1 mt-auto">
                <span className="px-2 py-1 bg-gradient-to-r from-emerald-600 to-indigo-600 text-xs sm:text-sm font-black text-white rounded-md border border-emerald-400/30 shadow-lg text-center backdrop-blur-sm self-start">
                  共 {count} 冊
                </span>
              </div>
            </div>
          ) : null}
          
          {/* 選取遮罩 */}
          {isSelectable && !isSeriesSet && (
            <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-indigo-900/40' : 'bg-black/0 group-hover:bg-black/10'}`}>
              <div className="absolute top-2 right-2">
                {isSelected ? (
                  <div className="bg-indigo-500 text-white rounded-full p-0.5 shadow-lg">
                    <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                  </div>
                ) : (
                  <div className="bg-slate-900/50 text-slate-300 rounded-full p-0.5 backdrop-blur-sm border border-slate-500/50 hover:bg-slate-800 hover:border-indigo-400">
                     <Circle size={24} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={`p-3 flex flex-col flex-grow ${isSeriesSet ? 'bg-slate-900/90' : 'bg-slate-800'}`}>
          <div className="mb-1">
            <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors mb-1" title={book.title}>
              {highlightText(book.title, searchTerm)}
            </h3>
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-slate-400 text-xs font-medium line-clamp-1 flex-1">{highlightText(book.author, searchTerm)}</p>
              {!isSeriesSet && book.type === 'series' && (
                <span className="shrink-0 px-1 py-0.5 bg-indigo-500/20 text-indigo-400 text-[9px] font-bold rounded border border-indigo-500/30 leading-none self-center">
                  系列
                </span>
              )}
            </div>
          </div>
          {book.tags && book.tags.length > 0 && (
            <div className="mt-auto pt-2 flex flex-wrap gap-1">
              {book.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className="px-1.5 py-0.5 text-[10px] font-medium rounded border bg-rose-500/10 text-rose-400 border-rose-500/20"
                >
                  {tag}
                </span>
              ))}
              {book.tags.length > 3 && (
                <span className="px-1.5 py-0.5 bg-slate-700 text-slate-400 text-[10px] font-medium rounded border border-slate-600">
                  +{book.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
