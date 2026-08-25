import React, { useState, useMemo } from 'react';
import { Book, CategoryDef, OriginDomain } from '../types';
import BookCard from './BookCard';
import { isArtbook } from '../utils/categoryUtils';
import { 
  Palette, 
  BookOpen, 
  Book as BookIcon, 
  Brush, 
  Gamepad2, 
  Compass, 
  BookHeart, 
  Sparkles,
  Search
} from 'lucide-react';

interface ArtbookGalleryViewProps {
  books: Book[];
  categories: CategoryDef[];
  isBatchMode: boolean;
  selectedBookIds: Set<string>;
  onBookClick: (book: Book) => void;
  onBatchSelect: (id: string) => void;
  onNavigateToIp?: (ipName: string, domain?: string) => void;
  searchTerm?: string;
  selectedTags?: Set<string>;
  onTagClick?: (tag: string) => void;
}

type DomainTab = 'all' | 'light_novel' | 'manga' | 'original' | 'game' | 'other';

export const ArtbookGalleryView: React.FC<ArtbookGalleryViewProps> = ({
  books,
  categories,
  isBatchMode,
  selectedBookIds,
  onBookClick,
  onBatchSelect,
  searchTerm = '',
}) => {
  const [activeDomain, setActiveDomain] = useState<DomainTab>('all');

  // Filter books that belong to Artbook category across all subcategories
  const allArtbooks = useMemo(() => {
    const list = books.filter(b => isArtbook(b, categories));
    // Randomize initial order on mount / books change for fresh discovery
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [books, categories]);

  // Compute counts per domain
  const domainCounts = useMemo(() => {
    const counts = {
      all: allArtbooks.length,
      light_novel: 0,
      manga: 0,
      original: 0,
      game: 0,
      other: 0
    };

    allArtbooks.forEach(b => {
      const d = b.originDomain;
      if (d === 'light_novel') counts.light_novel++;
      else if (d === 'manga') counts.manga++;
      else if (d === 'original') counts.original++;
      else if (d === 'game') counts.game++;
      else counts.other++;
    });

    return counts;
  }, [allArtbooks]);

  // Filter based on active domain and search term
  const filteredArtbooks = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    let filtered = allArtbooks.filter(book => {
      // Domain filter
      if (activeDomain !== 'all') {
        if (activeDomain === 'other') {
          if (
            book.originDomain === 'light_novel' || 
            book.originDomain === 'manga' || 
            book.originDomain === 'original' ||
            book.originDomain === 'game'
          ) {
            return false;
          }
        } else if (book.originDomain !== activeDomain) {
          return false;
        }
      }

      // Search term filter
      if (searchTerm) {
        const matchTitle = (book.title || '').toLowerCase().includes(lowerSearch);
        const matchAuthor = (book.author || '').toLowerCase().includes(lowerSearch);
        const matchIp = (book.relatedIp || '').toLowerCase().includes(lowerSearch);
        const matchGroup = (book.seriesGroup || '').toLowerCase().includes(lowerSearch);
        if (!matchTitle && !matchAuthor && !matchIp && !matchGroup) {
          return false;
        }
      }

      return true;
    });

    // When viewing specific category tabs, sort alphabetically by title
    if (activeDomain !== 'all') {
      filtered = [...filtered].sort((a, b) => {
        return (a.title || '').localeCompare(b.title || '', 'zh-Hant', { numeric: true, sensitivity: 'base' });
      });
    }

    return filtered;
  }, [allArtbooks, activeDomain, searchTerm]);

  // 6 specific domain tabs with distinct color identities matching the book badges
  const domainTabs: { 
    id: DomainTab; 
    label: string;
    activeStyle: string;
    inactiveStyle: string;
    activeBadgeStyle: string;
    inactiveBadgeStyle: string;
  }[] = [
    { 
      id: 'all', 
      label: '全部畫集',
      activeStyle: 'bg-gradient-to-r from-fuchsia-600/35 via-purple-600/30 to-indigo-600/35 text-white border-fuchsia-500/70 shadow-lg shadow-fuchsia-500/25 ring-1 ring-fuchsia-500/50',
      inactiveStyle: 'bg-slate-950/70 text-slate-300 border-slate-800/90 hover:border-fuchsia-600/60 hover:text-fuchsia-200 hover:bg-fuchsia-950/20',
      activeBadgeStyle: 'bg-fuchsia-500/30 text-fuchsia-100 border border-fuchsia-400/50 shadow-sm',
      inactiveBadgeStyle: 'bg-slate-800/90 text-slate-400 group-hover:text-fuchsia-200 group-hover:bg-fuchsia-950/40',
    },
    { 
      id: 'light_novel', 
      label: '輕小說關聯',
      activeStyle: 'bg-gradient-to-r from-violet-600/35 via-indigo-600/30 to-purple-600/35 text-white border-violet-500/70 shadow-lg shadow-violet-500/25 ring-1 ring-violet-500/50',
      inactiveStyle: 'bg-slate-950/70 text-violet-300/80 border-violet-900/40 hover:border-violet-500/70 hover:text-violet-100 hover:bg-violet-950/30',
      activeBadgeStyle: 'bg-violet-500/30 text-violet-100 border border-violet-400/50 shadow-sm',
      inactiveBadgeStyle: 'bg-violet-950/60 text-violet-300/80 border border-violet-900/40 group-hover:text-violet-100 group-hover:bg-violet-900/40',
    },
    { 
      id: 'manga', 
      label: '漫畫關聯',
      activeStyle: 'bg-gradient-to-r from-emerald-600/35 via-teal-600/30 to-green-600/35 text-white border-emerald-500/70 shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-500/50',
      inactiveStyle: 'bg-slate-950/70 text-emerald-300/80 border-emerald-900/40 hover:border-emerald-500/70 hover:text-emerald-100 hover:bg-emerald-950/30',
      activeBadgeStyle: 'bg-emerald-500/30 text-emerald-100 border border-emerald-400/50 shadow-sm',
      inactiveBadgeStyle: 'bg-emerald-950/60 text-emerald-300/80 border border-emerald-900/40 group-hover:text-emerald-100 group-hover:bg-emerald-900/40',
    },
    { 
      id: 'original', 
      label: '繪師個人集',
      activeStyle: 'bg-gradient-to-r from-amber-600/35 via-orange-600/30 to-yellow-600/35 text-white border-amber-500/70 shadow-lg shadow-amber-500/25 ring-1 ring-amber-500/50',
      inactiveStyle: 'bg-slate-950/70 text-amber-300/80 border-amber-900/40 hover:border-amber-500/70 hover:text-amber-100 hover:bg-amber-950/30',
      activeBadgeStyle: 'bg-amber-500/30 text-amber-100 border border-amber-400/50 shadow-sm',
      inactiveBadgeStyle: 'bg-amber-950/60 text-amber-300/80 border border-amber-900/40 group-hover:text-amber-100 group-hover:bg-amber-900/40',
    },
    { 
      id: 'game', 
      label: '遊戲美術集',
      activeStyle: 'bg-gradient-to-r from-pink-600/35 via-rose-600/30 to-fuchsia-600/35 text-white border-pink-500/70 shadow-lg shadow-pink-500/25 ring-1 ring-pink-500/50',
      inactiveStyle: 'bg-slate-950/70 text-pink-300/80 border-pink-900/40 hover:border-pink-500/70 hover:text-pink-100 hover:bg-pink-950/30',
      activeBadgeStyle: 'bg-pink-500/30 text-pink-100 border border-pink-400/50 shadow-sm',
      inactiveBadgeStyle: 'bg-pink-950/60 text-pink-300/80 border border-pink-900/40 group-hover:text-pink-100 group-hover:bg-pink-900/40',
    },
    { 
      id: 'other', 
      label: '其他',
      activeStyle: 'bg-gradient-to-r from-sky-600/35 via-cyan-600/30 to-blue-600/35 text-white border-sky-500/70 shadow-lg shadow-sky-500/25 ring-1 ring-sky-500/50',
      inactiveStyle: 'bg-slate-950/70 text-sky-300/80 border-sky-900/40 hover:border-sky-500/70 hover:text-sky-100 hover:bg-sky-950/30',
      activeBadgeStyle: 'bg-sky-500/30 text-sky-100 border border-sky-400/50 shadow-sm',
      inactiveBadgeStyle: 'bg-sky-950/60 text-sky-300/80 border border-sky-900/40 group-hover:text-sky-100 group-hover:bg-sky-900/40',
    },
  ];

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Domain Filter Tabs with Category Themed Colors */}
      <div className="shrink-0 mb-5 bg-slate-900/60 rounded-2xl border border-slate-800/80 p-2.5 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2.5 overflow-x-auto custom-scrollbar no-scrollbar">
          {domainTabs.map(tab => {
            const count = domainCounts[tab.id];
            const isActive = activeDomain === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveDomain(tab.id)}
                className={`group flex-1 min-w-[130px] flex items-center justify-center text-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isActive ? tab.activeStyle : tab.inactiveStyle
                }`}
              >
                <span className="text-center">{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold shrink-0 text-center transition-all ${
                  isActive ? tab.activeBadgeStyle : tab.inactiveBadgeStyle
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area - Standard Identical Book Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-24">
        {filteredArtbooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20 p-8">
            <div className="w-16 h-16 bg-slate-800/60 text-fuchsia-400 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <Palette size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-1">查無符合條件的畫集</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-4">
              {searchTerm ? `未找到與「${searchTerm}」相關的畫集` : '此分類下暫無收錄內容，可切換至「全部畫集」瀏覽。'}
            </p>
            {activeDomain !== 'all' && (
              <button
                onClick={() => setActiveDomain('all')}
                className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-fuchsia-600/20 cursor-pointer"
              >
                切換至全部畫集
              </button>
            )}
          </div>
        ) : (
          /* Standard Book Grid with Identical Book Cards */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4">
            {filteredArtbooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onClick={isBatchMode ? () => onBatchSelect(book.id) : onBookClick}
                isSelectable={isBatchMode}
                isSelected={selectedBookIds.has(book.id)}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtbookGalleryView;
