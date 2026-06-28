import React, { useMemo, useState } from 'react';
import { X, PieChart, Tags, Layers, BookMarked, Eye, Search } from 'lucide-react';
import { Book, CategoryDef } from '../types';
import { findCategoryByName } from '../utils/categoryUtils';

interface LibraryInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  categories: CategoryDef[];
  globalTags?: string[];
}

export const LibraryInsightsModal: React.FC<LibraryInsightsModalProps> = ({
  isOpen,
  onClose,
  books,
  categories,
  globalTags = [],
}) => {
  const [isTagDetailOpen, setIsTagDetailOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  // 1. Core Metrics Memory
  const metrics = useMemo(() => {
    const totalBooks = books.length;

    // A. Gather series categories count
    const seriesCategories = new Set<string>();
    const findSeries = (nodes: CategoryDef[]) => {
      nodes.forEach(n => {
        if (n.type === 'series') {
          seriesCategories.add(n.name);
        }
        if (n.children) findSeries(n.children);
      });
    };
    findSeries(categories);
    const seriesCount = seriesCategories.size;

    // B. Category distribution
    const getTopLevelParent = (categoryName: string): string => {
      const hasDescendant = (node: CategoryDef, target: string): boolean => {
        if (node.name === target) return true;
        if (node.children) {
          return node.children.some(child => hasDescendant(child, target));
        }
        return false;
      };

      const topParent = categories.find(rootCat => hasDescendant(rootCat, categoryName));
      return topParent ? topParent.name : categoryName;
    };

    const parentCategoryCounts: Record<string, number> = {};

    books.forEach(book => {
      if (!book.category) {
        return;
      }
      const topParent = getTopLevelParent(book.category);
      parentCategoryCounts[topParent] = (parentCategoryCounts[topParent] || 0) + 1;
    });

    const categoryStats = Object.entries(parentCategoryCounts).map(([name, count]) => {
      const catDef = categories.find(c => c.name === name);
      const displayName = catDef?.displayName || name;
      const percentage = totalBooks > 0 ? Math.round((count / totalBooks) * 100) : 0;
      return {
        name,
        displayName,
        count,
        percentage
      };
    }).sort((a, b) => b.count - a.count);

    // C. Tag distribution (書籍標籤數量與分佈 - 所有標籤)
    const tagCounts: Record<string, number> = {};

    // First populate from globalTags with count 0 so every defined tag from tag system is visible
    if (globalTags && Array.isArray(globalTags)) {
      globalTags.forEach(tag => {
        if (tag && tag.trim()) {
          tagCounts[tag.trim()] = 0;
        }
      });
    }

    // Then increment based on actual books
    books.forEach(book => {
      const bookTags = book.tags && Array.isArray(book.tags) ? book.tags : [];
      const cat = findCategoryByName(categories, book.category);
      const catTags = cat?.tags && Array.isArray(cat.tags) ? cat.tags : [];
      
      const combinedTags = Array.from(new Set([
        ...bookTags.map(t => t.trim()),
        ...catTags.map(t => t.trim())
      ]));

      combinedTags.forEach(tag => {
        if (tag) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    });

    const tagStats = Object.entries(tagCounts).map(([name, count]) => {
      const percentage = totalBooks > 0 ? Math.round((count / totalBooks) * 100) : 0;
      return {
        name,
        count,
        percentage
      };
    }).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name, 'zh-TW');
    });

    // D. Book Types (單行本 vs 系列集 - 排除未指定)
    let seriesBookCount = 0;
    let singleBookCount = 0;

    books.forEach(book => {
      if (book.type === 'series') seriesBookCount++;
      else if (book.type === 'single') singleBookCount++;
    });

    const totalDefined = seriesBookCount + singleBookCount;

    return {
      totalBooks,
      seriesCount,
      categoryStats,
      tagStats,
      typeRatio: {
        series: seriesBookCount,
        single: singleBookCount,
        totalDefined
      }
    };
  }, [books, categories, globalTags]);

  // Filter tags in full description details window
  const filteredTags = useMemo(() => {
    if (!tagSearchQuery.trim()) return metrics.tagStats;
    const query = tagSearchQuery.toLowerCase().trim();
    return metrics.tagStats.filter(tag => tag.name.toLowerCase().includes(query));
  }, [metrics.tagStats, tagSearchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Light Glassmorphic Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container Dashboard */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Block */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <PieChart size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 tracking-tight">微型藏書統計儀表板</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Analytics Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
          
          {/* Bento Stats KPI Grid - Two Prominent Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* KPI 1 - Total Books */}
            <div className="bg-slate-950/35 border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/20 transition-all flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                <BookMarked size={28} />
              </div>
              <div className="space-y-1">
                <span className="text-lg sm:text-xl text-slate-100 font-extrabold block">館藏總書量</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-300 tracking-tight block">
                  {metrics.totalBooks}
                </span>
              </div>
            </div>

            {/* KPI 2 - Series Count */}
            <div className="bg-slate-950/35 border border-slate-800/80 rounded-2xl p-6 hover:border-emerald-500/20 transition-all flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Layers size={28} />
              </div>
              <div className="space-y-1">
                <span className="text-lg sm:text-xl text-slate-100 font-extrabold block">館藏書籍系列</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight block">
                  {metrics.seriesCount}
                </span>
              </div>
            </div>

          </div>

          {/* Main Visual Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Panel A: Categories Distribution */}
            <div className="bg-slate-950/35 border border-slate-800/80 rounded-xl p-6 flex flex-col space-y-4">
              <div className="flex items-center gap-2 justify-between border-b border-slate-800/50 pb-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-3 rounded-full bg-indigo-500" />
                  分類館藏分佈統計
                </h3>
              </div>

              <div className="space-y-4 flex-1">
                {metrics.categoryStats.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 py-10">
                    <BookMarked size={28} className="opacity-35 mb-2" />
                    <span className="text-xs text-slate-400">尚無任何分類書籍可供統計</span>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                    {metrics.categoryStats.map((stat, idx) => {
                      const colors = [
                        'bg-indigo-500',
                        'bg-emerald-500',
                        'bg-rose-500',
                        'bg-amber-500',
                        'bg-violet-500',
                        'bg-sky-500'
                      ];
                      const activeColor = colors[idx % colors.length];
                      return (
                        <div key={stat.name} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-300 truncate max-w-[200px]" title={stat.displayName || stat.name}>
                              {stat.displayName || stat.name}
                            </span>
                            <span className="text-slate-400 text-xs font-mono font-bold">
                              {stat.count} 冊 <span className="text-slate-600">/</span> {stat.percentage}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                            <div 
                              className={`h-full rounded-full ${activeColor} transition-all duration-500`}
                              style={{ width: `${stat.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Panel B: Tags distribution statistics (All Tags) */}
            <div className="bg-slate-950/35 border border-slate-800/80 rounded-xl p-6 flex flex-col space-y-4">
              <div className="flex items-center gap-2 justify-between border-b border-slate-800/50 pb-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-3 rounded-full bg-rose-500" />
                  所有標籤分佈統計
                </h3>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {metrics.tagStats.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 py-10">
                    <Tags size={28} className="opacity-35 mb-2" />
                    <span className="text-xs text-slate-400">書籍中尚無標籤，請於編輯時加入標籤</span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                      {metrics.tagStats.slice(0, 5).map((stat, idx) => {
                        const tagColors = [
                          'bg-rose-500/80',
                          'bg-indigo-500/80',
                          'bg-emerald-500/80',
                          'bg-amber-500/80',
                          'bg-teal-500/80'
                        ];
                        const activeColor = tagColors[idx % tagColors.length];
                        return (
                          <div key={stat.name} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-300 flex items-center gap-1.5 truncate max-w-[200px]">
                                <Tags size={12} className="text-slate-500" />
                                {stat.name}
                              </span>
                              <span className="text-slate-400 text-xs font-mono font-bold">
                                {stat.count} 冊 <span className="text-slate-600">/</span> {stat.percentage}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                              <div 
                                className={`h-full rounded-full ${activeColor} transition-all duration-500`}
                                style={{ width: `${stat.percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={() => setIsTagDetailOpen(true)}
                      className="w-full mt-2 py-2.5 px-4 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 hover:border-rose-500/30 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye size={14} />
                      查看完整所有標籤統計 ({metrics.tagStats.length})
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Book Type (Series vs Single) Visualizer Section */}
          <div className="bg-slate-950/35 border border-slate-800/80 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/50 pb-4 mb-4 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-200">單行本與系列集佔比統計</h3>
              </div>
            </div>

            <div className="w-full space-y-4">
              
              {/* Pie/Segment bar representation */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>館藏佔比比例條</span>
                    <span>100% 館藏總覽</span>
                  </div>
                  {/* Proportional Compound progress bar */}
                  <div className="w-full h-5 rounded-lg overflow-hidden flex border border-slate-950">
                    {metrics.typeRatio.totalDefined === 0 ? (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-[10px] text-slate-600">無數據</div>
                    ) : (
                      <>
                        <div 
                           className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 relative group transition-all"
                          style={{ width: `${(metrics.typeRatio.series / metrics.typeRatio.totalDefined) * 100}%` }}
                          title={`系列集: ${metrics.typeRatio.series}冊`}
                        />
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 relative group border-l border-slate-950 transition-all"
                          style={{ width: `${(metrics.typeRatio.single / metrics.typeRatio.totalDefined) * 100}%` }}
                          title={`單行本: ${metrics.typeRatio.single}冊`}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Compound Bar Legends - Unassigned is removed according to user prompt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/40">
                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-1">
                      <span className="w-2.5 h-2.5 rounded bg-indigo-500 shrink-0" />
                      <span>系列集</span>
                    </div>
                    <span className="text-sm font-extrabold text-slate-200">
                      {metrics.typeRatio.series} 冊 
                      <span className="text-xs text-slate-500 ml-1.5 font-normal">
                        ({metrics.typeRatio.totalDefined > 0 ? Math.round((metrics.typeRatio.series / metrics.typeRatio.totalDefined) * 100) : 0}%)
                      </span>
                    </span>
                  </div>

                  <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/40">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                      <span className="w-2.5 h-2.5 rounded bg-emerald-500 shrink-0" />
                      <span>單行本</span>
                    </div>
                    <span className="text-sm font-extrabold text-slate-200">
                      {metrics.typeRatio.single} 冊 
                      <span className="text-xs text-slate-500 ml-1.5 font-normal">
                        ({metrics.typeRatio.totalDefined > 0 ? Math.round((metrics.typeRatio.single / metrics.typeRatio.totalDefined) * 100) : 0}%)
                      </span>
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Footer info banner - Remnants of product version/English deleted */}
        <div className="px-6 py-4 border-t border-slate-800/60 bg-slate-950/50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            數據已全面與本機快取及雲端資料庫完美同步。
          </span>
        </div>

      </div>

      {/* Embedded Secondary Modal Detail Overlay for "所有標籤分佈詳情" */}
      {isTagDetailOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-150">
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsTagDetailOpen(false)}
          />

          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-950/40">
              <div className="flex items-center gap-2">
                <Tags className="text-rose-400 shrink-0" size={20} />
                <h3 className="text-base font-bold text-slate-100">完整所有標籤分析詳情</h3>
              </div>
              <button 
                onClick={() => setIsTagDetailOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter Input */}
            <div className="px-6 py-3 border-b border-slate-800/40 bg-slate-900/50 flex items-center gap-2">
              <Search className="text-slate-500 shrink-0" size={16} />
              <input 
                type="text"
                placeholder="搜尋篩選書籍標籤..."
                value={tagSearchQuery}
                onChange={(e) => setTagSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-sm text-slate-200 placeholder-slate-500 focus:ring-0"
              />
              {tagSearchQuery && (
                <button 
                  onClick={() => setTagSearchQuery('')}
                  className="text-xs text-slate-500 hover:text-slate-300 font-bold px-1 cursor-pointer"
                >
                  清除
                </button>
              )}
            </div>

            {/* Scrollable grid representation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {filteredTags.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  無符合篩選條件的書籍標籤
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredTags.map((stat, idx) => {
                    const tagColors = [
                      'bg-rose-500/80',
                      'bg-indigo-500/80',
                      'bg-emerald-500/80',
                      'bg-amber-500/80',
                      'bg-teal-500/80',
                      'bg-fuchsia-500/80',
                      'bg-sky-500/80'
                    ];
                    const activeColor = tagColors[idx % tagColors.length];
                    return (
                      <div key={stat.name} className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-200 font-semibold flex items-center gap-1.5 truncate max-w-[170px]" title={stat.name}>
                            <Tags size={11} className="text-slate-500 shrink-0" />
                            {stat.name}
                          </span>
                          <span className="text-slate-400 font-mono font-bold shrink-0">
                            {stat.count} 冊 <span className="text-slate-600">/</span> {stat.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${activeColor}`}
                            style={{ width: `${stat.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer count representation */}
            <div className="px-6 py-3 border-t border-slate-800/60 bg-slate-950/40 text-center">
              <span className="text-xs text-slate-400">
                總計顯示 {filteredTags.length} / {metrics.tagStats.length} 個標籤資料
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
