
import React, { useMemo, useState } from 'react';
import { CategoryDef, Book } from '../types';
import { sortCategoriesRecursive } from '../utils/categoryUtils';
import { Folder, FolderOpen, ChevronRight, ChevronDown, SlidersHorizontal, BookHeart, X, Nut, Tags, Book as BookIcon } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryDef[];
  selectedCategory: string | null;
  onSelectCategory: (name: string | null) => void;
  bookCount: number;
  books: Book[];
  onOpenCategoryManager: () => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  bookCount,
  books,
  onOpenCategoryManager,
  onOpenSettings
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Use the helper to sort
  const sortedCategories = useMemo(() => {
    return sortCategoriesRecursive(categories);
  }, [categories]);

  // Calculate book and series counts recursively
  const counts = useMemo(() => {
    const bookCounts: Record<string, number> = {};
    const seriesCounts: Record<string, number> = {};
    const directCounts: Record<string, number> = {};
    
    // 1. Count books for each category name directly
    books.forEach(b => {
      const cat = b.category || '未分類';
      directCounts[cat] = (directCounts[cat] || 0) + 1;
    });

    // 2. Aggregate counts up the tree
    const aggregate = (node: CategoryDef): { books: number, series: number } => {
      let bookSum = directCounts[node.name] || 0;
      // Count as a series if it's type 'series' and has no sub-series children, 
      // or if we just want to count every node that represents a series.
      // Usually, the leaf markers are what the user wants to count as "a series".
      let seriesSum = (node.type === 'series' && (!node.children || node.children.length === 0)) ? 1 : 0;
      
      if (node.children) {
        node.children.forEach(child => {
          const res = aggregate(child);
          bookSum += res.books;
          seriesSum += res.series;
        });
      }
      
      bookCounts[node.id] = bookSum;
      seriesCounts[node.id] = seriesSum;
      
      return { books: bookSum, series: seriesSum };
    };

    categories.forEach(node => aggregate(node));
    return { bookCounts, seriesCounts };
  }, [books, categories]);

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories(prev => {
        const next = new Set(prev);
        if (next.has(catId)) next.delete(catId);
        else next.add(catId);
        return next;
    });
  };

  const renderSidebarItem = (node: CategoryDef, depth: number) => {
    const isExpanded = expandedCategories.has(node.id);
    const isSelected = selectedCategory === node.name;
    const hasChildren = node.children && node.children.length > 0;
    
    // Series branch: show series count. Others: show book count.
    const isSeriesBranch = node.type === 'series' || node.name.includes('系列');
    const displayCount = isSeriesBranch ? (counts.seriesCounts[node.id] || 0) : (counts.bookCounts[node.id] || 0);

    // Get first book cover for selected series
    const firstBook = (node.type === 'series' && isSelected) 
        ? books.find(b => b.category === node.name) 
        : null;

    let textColorClass = 'text-slate-400';
    if (depth === 0) {
        if (node.name === '其他') {
            textColorClass = isSelected ? 'text-amber-400' : 'text-amber-400/80 hover:text-amber-300';
        } else {
            textColorClass = isSelected ? 'text-rose-400' : 'text-rose-400/80 hover:text-rose-300';
        }
    }
    else if (node.type === 'series' || (depth === 1 && node.name.endsWith('系列'))) textColorClass = isSelected ? 'text-indigo-400 font-bold' : 'text-indigo-400/80 hover:text-indigo-300';
    else if (node.type === 'single' || (depth === 1 && node.name === '單行本')) textColorClass = isSelected ? 'text-indigo-400 font-bold' : 'text-indigo-400/80 hover:text-indigo-300';
    else textColorClass = isSelected ? 'text-slate-200' : 'text-slate-400 hover:text-slate-300';

    return (
      <div key={node.id} className="select-none">
        <div className={`flex items-center justify-between pr-2 rounded-xl transition-all duration-200 cursor-pointer group ${
           isSelected 
           ? 'bg-indigo-600/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
           : 'hover:bg-slate-800/40 border border-transparent'
        } ${depth === 0 ? 'py-3 mb-2' : 'py-2 ml-4 border-l-2 border-slate-800 pl-3 mb-1'}`}>
           <button 
              className={`flex-1 flex items-center gap-3 text-left min-w-0 ${textColorClass}`}
              onClick={() => {
                onSelectCategory(node.name);
                if (window.innerWidth < 1024) onClose();
              }}
           >
              <div className={`shrink-0 flex items-center transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                {firstBook?.coverUrl ? (
                    <div className="w-5 h-7 rounded bg-slate-800 overflow-hidden border border-slate-700 shadow-sm relative">
                        <img src={firstBook.coverUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-indigo-500/10" />
                    </div>
                ) : (
                    node.type === 'series' ? (
                        isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />
                    ) : (
                        <BookIcon size={18} className={isSelected ? 'text-indigo-400' : ''} />
                    )
                )}
              </div>
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className={`truncate ${depth === 0 ? 'text-base font-bold tracking-tight' : 'text-sm font-medium'}`}>{node.displayName || node.name}</span>
                <span className="ml-auto text-xs opacity-60 bg-black/20 px-2 py-0.5 rounded-full font-bold shrink-0">{displayCount}</span>
              </div>
              
              {node.type === 'series' && depth === 0 && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded border border-indigo-500/30 whitespace-nowrap shrink-0">系列</span>
              )}

              {isSelected && node.type === 'series' && node.tags && node.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-1 shrink-0">
                  {node.tags.slice(0, 1).map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[9px] border border-slate-600 whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                  {node.tags.length > 1 && <span className="text-[9px] text-slate-500">+1</span>}
                </div>
              )}
           </button>
           {hasChildren && (
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategoryExpand(node.id);
                }}
                className="p-1 rounded hover:bg-slate-700 text-slate-500 ml-1"
             >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
             </button>
           )}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderSidebarItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <>
        <div className="flex items-center justify-between p-4 pb-2 lg:mb-0 mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <BookHeart size={16} className="lg:hidden" />
                書架導航
            </h3>
            <div className="flex gap-2 lg:flex lg:gap-1">
                <button 
                    onClick={onOpenCategoryManager}
                    className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-400 transition-colors"
                    title="編輯書架分類"
                >
                    <SlidersHorizontal size={16} />
                </button>
                 <button onClick={onOpenSettings} className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-800 rounded hover:text-indigo-400"><Nut size={16} /></button>
                 <button onClick={onClose} className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-800 rounded hover:text-indigo-400"><X size={16} /></button>
            </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            <button
                onClick={() => {
                    onSelectCategory(null);
                    if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    !selectedCategory ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
                <BookHeart size={18} />
                所有書籍
                <span className="ml-auto text-xs opacity-60 bg-black/20 px-2 py-0.5 rounded-full">{bookCount}</span>
            </button>
            <div className="pt-2">
                {sortedCategories.map(cat => renderSidebarItem(cat, 0))}
            </div>
        </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-800 bg-slate-950/50">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-slate-900 w-80 h-full shadow-2xl overflow-y-auto flex flex-col">
                <SidebarContent />
            </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
