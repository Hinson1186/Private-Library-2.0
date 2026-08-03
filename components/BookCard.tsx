
import React from 'react';
import { Book } from '../types';
import { CheckCircle2, Circle, LayoutGrid, Library, Layers, ChevronRight } from 'lucide-react';

export const TAG_COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  // 綠色系 (Green / Emerald / Lime / Mint)
  "青春": { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/40" },
  "日常": { bg: "bg-lime-500/20", text: "text-lime-300", border: "border-lime-500/40" },
  "校園": { bg: "bg-teal-500/20", text: "text-teal-300", border: "border-teal-500/40" },
  "治癒": { bg: "bg-green-500/20", text: "text-green-300", border: "border-green-500/40" },

  // 粉紅/玫瑰/紫羅蘭系 (Fuchsia / Pink / Rose / Violet)
  "戀愛": { bg: "bg-fuchsia-600/20", text: "text-fuchsia-300", border: "border-fuchsia-600/30" },
  "愛情": { bg: "bg-rose-500/20", text: "text-rose-300", border: "border-rose-500/40" },
  "百合": { bg: "bg-pink-500/20", text: "text-pink-300", border: "border-pink-500/40" },
  "耽美": { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/40" },

  // 熱情紅/活力橘 (Red / Orange / Amber)
  "戰鬥": { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/40" },
  "運動": { bg: "bg-orange-500/20", text: "text-orange-300", border: "border-orange-500/40" },
  "冒險": { bg: "bg-amber-500/20", text: "text-amber-300", border: "border-amber-500/40" },

  // 藍/天青/未來 (Cyan / Blue / Sky / Indigo)
  "科幻": { bg: "bg-cyan-500/20", text: "text-cyan-300", border: "border-cyan-500/40" },
  "旅行": { bg: "bg-sky-500/20", text: "text-sky-300", border: "border-sky-500/40" },
  "奇幻": { bg: "bg-indigo-500/20", text: "text-indigo-300", border: "border-indigo-500/40" },
  "推理": { bg: "bg-blue-600/20", text: "text-blue-300", border: "border-blue-500/40" },

  // 尊貴/沉穩 (Yellow / Bronze / Slate)
  "人生": { bg: "bg-yellow-500/20", text: "text-yellow-300", border: "border-yellow-500/40" },
  "歷史": { bg: "bg-amber-800/30", text: "text-amber-200", border: "border-amber-600/40" },
  "宮廷": { bg: "bg-yellow-600/25", text: "text-amber-300", border: "border-yellow-500/40" },
  "職場": { bg: "bg-slate-700/40", text: "text-blue-200", border: "border-slate-500/40" },

  // 黑色系 / 深色系 (Dark / Blackish shades)
  "黑暗": { bg: "bg-zinc-950", text: "text-zinc-200", border: "border-zinc-800" },
  "末世": { bg: "bg-neutral-900", text: "text-neutral-300", border: "border-neutral-700" },
  "絕症": { bg: "bg-slate-950", text: "text-slate-400", border: "border-slate-800" },
  "恐怖": { bg: "bg-gray-950", text: "text-red-400/90", border: "border-red-950" },
  "獵奇": { bg: "bg-stone-950", text: "text-amber-400/90", border: "border-stone-800" },
  "懸疑": { bg: "bg-slate-900", text: "text-sky-200/90", border: "border-slate-700" },
  "權謀": { bg: "bg-emerald-950", text: "text-emerald-300/90", border: "border-emerald-800" }
};

const SAFE_COLORS = [
  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
  { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400', border: 'border-fuchsia-500/20' },
  { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/20' },
  { bg: 'bg-slate-700/40', text: 'text-slate-300', border: 'border-slate-600/40' },
  { bg: 'bg-stone-700/40', text: 'text-stone-300', border: 'border-stone-600/40' },
];

export const getTagStyles = (tag: string) => {
  if (TAG_COLOR_MAP[tag]) {
    return TAG_COLOR_MAP[tag];
  }
  let sum = 0;
  for (let i = 0; i < tag.length; i++) {
    sum += tag.charCodeAt(i);
  }
  const index = sum % SAFE_COLORS.length;
  return SAFE_COLORS[index];
};

export const getFilterTagStyles = (tag: string, isSelected: boolean) => {
  const styles = getTagStyles(tag);
  if (isSelected) {
    // Selected state: vibrant, shadow, strong border
    const bgWithMoreOpacity = styles.bg.replace(/\/10|\/15|\/20|\/40|\/50/g, '/30');
    let bg = styles.bg.includes('/') ? bgWithMoreOpacity : styles.bg;
    if (bg.includes('bg-slate') || bg.includes('bg-stone') || bg.includes('bg-zinc') || bg.includes('bg-neutral')) {
      bg = bg.replace('/30', '/60');
    }
    const text = styles.text.replace('-400', '-200').replace('-300', '-100');
    const border = styles.border.replace(/\/20|\/30|\/40|\/50/g, '/80');
    return {
      className: `${bg} ${text} ${border} font-extrabold shadow-md border-opacity-100 ring-2 ring-indigo-500/20 scale-[1.03]`
    };
  } else {
    // Unselected state: softer but still uniquely colored
    return {
      className: `${styles.bg} ${styles.text} ${styles.border} opacity-60 hover:opacity-100 font-bold hover:scale-[1.02] transition-all`
    };
  }
};

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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-between p-3">
              {/* 頂端標籤 */}
              <div className="flex items-center gap-1.5 self-start">
                <span className="px-2 py-0.5 bg-indigo-600/90 text-[10px] font-bold tracking-wider text-white uppercase rounded shadow border border-indigo-400/40 flex items-center gap-1">
                  <Layers size={11} strokeWidth={2.5} />
                  系列套組
                </span>
              </div>
              
              {/* 底端提示 - 綠色漸變精美徽章 */}
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

        <div className={`p-3 flex flex-col flex-grow justify-between ${isSeriesSet ? 'bg-slate-900/90' : 'bg-slate-800'}`}>
          <div className="mb-1 min-h-0">
            <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-1 group-hover:text-indigo-300 transition-colors mb-0.5" title={book.title}>
              {highlightText(book.title, searchTerm)}
            </h3>
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-slate-400 text-xs font-medium line-clamp-1 flex-1">{highlightText(book.author, searchTerm)}</p>
            </div>
            
            {/* If it's a series book, display the series tags under the author name, without arrow */}
            {!isSeriesSet && book.type === 'series' && book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center mt-2.5 overflow-hidden max-h-[26px] w-full">
                {book.tags.map((tag, index) => {
                  const style = getTagStyles(tag);
                  return (
                    <span 
                      key={index} 
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${style.bg} ${style.text} border ${style.border} leading-none whitespace-nowrap`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          {!isSeriesSet && book.type !== 'series' && book.tags && book.tags.length > 0 && (
            <div className="mt-auto pt-2.5 flex flex-wrap gap-1.5">
              {book.tags.slice(0, 3).map((tag, index) => {
                const style = getTagStyles(tag);
                return (
                  <span 
                    key={index} 
                    className={`px-2 py-0.5 text-xs font-bold rounded-md border ${style.bg} ${style.text} ${style.border}`}
                  >
                    {tag}
                  </span>
                );
              })}
              {book.tags.length > 3 && (
                <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 text-xs font-bold rounded-md border border-slate-600/50">
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
