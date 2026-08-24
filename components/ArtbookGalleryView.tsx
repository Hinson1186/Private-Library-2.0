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

  // 6 specific domain tabs as requested
  const domainTabs: { id: DomainTab; label: string; icon: any; color: string }[] = [
    { id: 'all', label: '全部畫集', icon: Palette, color: 'text-fuchsia-400' },
    { id: 'light_novel', label: '輕小說關聯', icon: BookOpen, color: 'text-indigo-400' },
    { id: 'manga', label: '漫畫關聯', icon: BookIcon, color: 'text-emerald-400' },
    { id: 'original', label: '繪師個人集', icon: Brush, color: 'text-amber-400' },
    { id: 'game', label: '遊戲美術集', icon: Gamepad2, color: 'text-pink-400' },
    { id: 'other', label: '其他', icon: Compass, color: 'text-sky-400' },
  ];

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Enlarged Domain Filter Tabs in Fuchsia / Slate Theme with Shuffle Button */}
      <div className="shrink-0 mb-5 bg-slate-900/60 rounded-2xl border border-slate-800/80 p-2.5 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2.5 overflow-x-auto custom-scrollbar no-scrollbar">
          {domainTabs.map(tab => {
            const Icon = tab.icon;
            const count = domainCounts[tab.id];
            const isActive = activeDomain === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveDomain(tab.id)}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-fuchsia-600/30 via-purple-600/25 to-indigo-600/30 text-white border-fuchsia-500/60 shadow-lg shadow-fuchsia-500/20 ring-1 ring-fuchsia-500/40'
                    : 'bg-slate-950/70 text-slate-300 border-slate-800/90 hover:border-slate-700 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <Icon size={18} className={isActive ? tab.color : 'text-slate-400'} />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                  isActive ? 'bg-fuchsia-500/30 text-fuchsia-200 border border-fuchsia-500/40' : 'bg-slate-800 text-slate-400'
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
