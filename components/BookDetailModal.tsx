import React, { useState, useEffect, useRef } from 'react';
import { Book, CategoryDef } from '../types';
import { findCategoryByName, isArtbook as checkIsArtbook } from '../utils/categoryUtils';
import { getTagStyles } from './BookCard';
import { 
  X, 
  Trash2, 
  Edit2, 
  Save, 
  Tag, 
  ZoomIn, 
  LayoutGrid, 
  ChevronDown, 
  ChevronRight, 
  Folder, 
  FolderOpen,
  Sparkles,
  ArrowUpRight,
  Layers,
  Palette,
  Brush,
  BookOpen
} from 'lucide-react';

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  categories: CategoryDef[];
  globalTags: string[];
  allBooks?: Book[];
  onUpdate: (updatedBook: Book) => void;
  onDelete: (id: string) => void;
  onNavigateToIp?: (ipName: string, domain?: string) => void;
  onSelectBook?: (book: Book) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  book, 
  categories, 
  globalTags,
  allBooks = [],
  onUpdate, 
  onDelete,
  onNavigateToIp,
  onSelectBook
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Book | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Tree Dropdown State
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [expandedCatIds, setExpandedCatIds] = useState<Set<string>>(new Set());
  const [isTagSelectorOpen, setIsTagSelectorOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const tagSelectorRef = useRef<HTMLDivElement>(null);
  const categoryTreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && book) {
      setEditData({ ...book });
      setIsEditing(false);
      setIsZoomed(false);
      setIsTreeOpen(false);
      setIsTagSelectorOpen(false);
    }
  }, [isOpen, book]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagSelectorRef.current && !tagSelectorRef.current.contains(event.target as Node)) {
        setIsTagSelectorOpen(false);
      }
      if (categoryTreeRef.current && !categoryTreeRef.current.contains(event.target as Node)) {
        setIsTreeOpen(false);
      }
    };

    if (isTagSelectorOpen || isTreeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTagSelectorOpen, isTreeOpen]);

  if (!isOpen || !book || !editData) return null;

  const displayCover = book.coverUrl && book.coverUrl.length > 0 
    ? book.coverUrl 
    : `https://picsum.photos/seed/${book.id}/300/450`;

  const isArtbook = checkIsArtbook(book, categories);

  // Sibling volumes in the same seriesGroup
  const siblingVolumes = isArtbook && book.seriesGroup && allBooks.length > 0
    ? allBooks.filter(b => b.seriesGroup === book.seriesGroup).sort((a, b) => (Number(a.volume) || 0) - (Number(b.volume) || 0))
    : [];

  // Related artbooks when viewing regular books (manga/light novel)
  const relatedArtbooks = !isArtbook && allBooks.length > 0
    ? allBooks.filter(b => {
        if (!checkIsArtbook(b, categories)) return false;
        if (b.relatedIp) {
          const ip = b.relatedIp.trim();
          return ip === book.category || book.title.includes(ip) || (book.category && book.category.includes(ip));
        }
        return false;
      })
    : [];

  // Related series books (when viewing artbook with relatedIp)
  const relatedSeriesBooks = isArtbook && book.relatedIp && allBooks.length > 0
    ? allBooks.filter(b => {
        if (checkIsArtbook(b, categories)) return false;
        const ip = book.relatedIp!.trim();
        return b.category === ip || b.seriesGroup === ip || b.title === ip || (b.title && b.title.includes(ip)) || ip.includes(b.title);
      })
    : [];

  const sortedRelatedBooks = [...relatedSeriesBooks].sort((a, b) => {
    const volA = typeof a.volume === 'number' ? a.volume : parseFloat(String(a.volume)) || 9999;
    const volB = typeof b.volume === 'number' ? b.volume : parseFloat(String(b.volume)) || 9999;
    return volA - volB;
  });

  const representativeBook = sortedRelatedBooks[0];
  const relatedBookCount = sortedRelatedBooks.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  const toggleTag = (tag: string) => {
      setEditData(prev => {
          if (!prev) return prev;
          const currentTags = prev.tags || [];
          const newTags = currentTags.includes(tag)
              ? currentTags.filter(t => t !== tag)
              : [...currentTags, tag];
          return { ...prev, tags: newTags };
      });
  };

  const handleSave = () => {
    if (editData) {
      const categoryDef = editData.category ? findCategoryByName(categories, editData.category) : null;
      const isSeries = categoryDef?.type === 'series';
      
      const finalData = {
        ...editData,
        type: (isSeries ? 'series' : 'single') as 'series' | 'single'
      };
      onUpdate(finalData);
      setIsEditing(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConfirmingDelete(true);
  };

  // Tree Logic
  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setExpandedCatIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
    });
  };

  const selectCategory = (e: React.MouseEvent, name: string) => {
      e.preventDefault();
      setEditData(prev => prev ? ({ ...prev, category: name }) : null);
      setIsTreeOpen(false);
  };

  const renderCategoryTree = (nodes: CategoryDef[], depth = 0) => {
      return nodes.map(node => {
          const hasChildren = node.children && node.children.length > 0;
          const isExpanded = expandedCatIds.has(node.id);
          const isSelected = editData?.category === node.name;

          return (
              <div key={node.id} className="select-none">
                  <div 
                    className={`flex items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isSelected ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:border-slate-700 text-slate-300'}`}
                    style={{ paddingLeft: `${depth * 12 + 8}px` }}
                    onClick={(e) => selectCategory(e, node.name)}
                  >
                      {hasChildren ? (
                          <button 
                            type="button"
                            onClick={(e) => toggleExpand(e, node.id)}
                            className="p-1 hover:bg-white/10 rounded mr-1"
                          >
                              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                      ) : (
                          <span className="w-6" />
                      )}
                      
                      {hasChildren && isExpanded ? <FolderOpen size={16} className={isSelected ? 'text-white' : 'text-indigo-400'} /> : <Folder size={16} className={isSelected ? 'text-white' : 'text-slate-500'} />}
                      
                      <span className="text-sm ml-2">{node.displayName || node.name}</span>
                  </div>
                  
                  {hasChildren && isExpanded && (
                      <div className="border-l border-slate-700 ml-3">
                          {renderCategoryTree(node.children, depth + 1)}
                      </div>
                  )}
              </div>
          );
      });
  };

  const getDomainLabel = (domain?: string) => {
    switch (domain) {
      case 'light_novel': return '輕小說原作關聯';
      case 'manga': return '漫畫原作關聯';
      case 'original': return '繪師個人原創集';
      case 'game': return '遊戲美術設定集';
      case 'other': return '動畫・電影・其他';
      default: return '畫集';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
        >
            <img 
                src={displayCover} 
                alt={book.title} 
                className="max-w-full max-h-full object-contain shadow-2xl"
            />
        </div>
      )}

      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl h-[88vh] overflow-hidden flex flex-col md:flex-row border border-slate-700 animate-in fade-in zoom-in duration-200 relative">
        {isConfirmingDelete && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in">
                <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-2xl max-w-sm w-full">
                    <h3 className="text-xl font-bold text-slate-100 mb-2">確認刪除</h3>
                    <p className="text-sm text-slate-400 mb-6">您確定要永久刪除這本書嗎？<br/><br/><span className="text-white font-bold">《{book.title}》</span><br/><br/>此動作無法復原！</p>
                    <div className="flex gap-3 justify-end">
                        <button 
                            onClick={() => setIsConfirmingDelete(false)}
                            className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium"
                        >
                            取消
                        </button>
                        <button 
                            onClick={() => {
                                setIsConfirmingDelete(false);
                                onDelete(book.id);
                            }}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors text-sm font-bold shadow-lg shadow-rose-600/20"
                        >
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        )}
        <div className="w-full md:w-5/12 bg-slate-950 relative group flex items-center justify-center bg-black">
          <div 
            className="relative w-full h-64 md:h-full cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          >
             <img 
                src={displayCover} 
                alt={book.title} 
                className="w-full h-full object-contain"
             />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <ZoomIn className="text-white drop-shadow-md" size={32} />
             </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col flex-1 bg-slate-900 min-h-0">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16 shrink-0">
                <div className="flex items-center gap-2">
                </div>
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <>
                            <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-slate-400 hover:text-white transition-colors text-sm">取消</button>
                            <button onClick={handleSave} className="flex items-center gap-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
                                <Save size={16} /> 儲存
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors text-sm font-medium">
                            <Edit2 size={16} /> 編輯
                        </button>
                    )}
                    <div className="w-px h-6 bg-slate-700 mx-1"></div>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 min-h-0">
                {isEditing ? (
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">書名</label>
                            <input 
                                name="title"
                                value={editData.title}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">繪師 / 作者</label>
                            <input 
                                name="author"
                                value={editData.author}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Category Selector */}
                        <div className="space-y-1 relative" ref={categoryTreeRef}>
                             <div className="flex items-center gap-2 text-indigo-400 mb-1">
                                <LayoutGrid size={14} />
                                <label className="text-xs font-bold uppercase tracking-wider">分類位置</label>
                             </div>
                             
                             <div className="relative">
                                 <button
                                    type="button"
                                    onClick={() => setIsTreeOpen(!isTreeOpen)}
                                    className="w-full p-2.5 bg-slate-800 border border-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-left flex items-center justify-between transition-colors hover:border-slate-600"
                                 >
                                    <span className={editData.category && editData.category !== '未分類' ? 'text-slate-100' : 'text-slate-500'}>
                                        {editData.category && editData.category !== '未分類' ? (findCategoryByName(categories, editData.category)?.displayName || editData.category) : '未分類'}
                                    </span>
                                    <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${isTreeOpen ? 'rotate-180' : ''}`} />
                                 </button>

                                 {isTreeOpen && (
                                     <div className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-lg max-h-60 overflow-y-auto custom-scrollbar p-2 shadow-lg">
                                          <div 
                                            className={`flex items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${editData.category === '未分類' || !editData.category ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:border-slate-700 text-slate-300'}`}
                                            onClick={(e) => selectCategory(e, '未分類')}
                                          >
                                            <span className="w-6" />
                                            <Folder size={16} className={editData.category === '未分類' || !editData.category ? 'text-white' : 'text-slate-500'} />
                                            <span className="text-sm ml-2">未分類</span>
                                          </div>
                                         {categories.length > 0 && renderCategoryTree(categories)}
                                     </div>
                                 )}
                             </div>
                        </div>

                        {/* Artbook fields if category is 畫集 */}
                        {editData.category === '畫集' && (
                          <div className="p-3.5 bg-fuchsia-950/20 border border-fuchsia-500/20 rounded-xl space-y-3">
                            <div className="flex items-center gap-2 text-fuchsia-400 text-xs font-bold uppercase">
                              <Palette size={14} /> 畫集專屬屬性
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-400">關聯 IP 作品</label>
                                <input 
                                  name="relatedIp"
                                  placeholder="例如：刀劍神域"
                                  value={editData.relatedIp || ''}
                                  onChange={handleInputChange}
                                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-fuchsia-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-400">冊數 (Volume)</label>
                                <input 
                                  name="volume"
                                  placeholder="例如：1"
                                  value={editData.volume || ''}
                                  onChange={handleInputChange}
                                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-fuchsia-500 outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-400">畫集系列組名 (Series Group)</label>
                              <input 
                                name="seriesGroup"
                                placeholder="例如：刀劍神域 abec畫集"
                                value={editData.seriesGroup || ''}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-fuchsia-500 outline-none"
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">封面 URL</label>
                            <input 
                                name="coverUrl"
                                value={editData.coverUrl || ''}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-mono"
                            />
                        </div>

                        {/* Tag Selector */}
                        <div className="space-y-2 relative" ref={tagSelectorRef}>
                            <div className="flex items-center gap-2 text-rose-400 mb-1">
                                <Tag size={14} />
                                <label className="text-xs font-bold uppercase tracking-wider">標籤</label>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-2">
                                {editData.tags?.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-600/20 text-rose-300 text-xs font-medium rounded-full border border-rose-500/30">
                                        {tag}
                                        <button 
                                            onClick={() => toggleTag(tag)}
                                            className="ml-1 hover:text-rose-100 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                                <button
                                    onClick={() => setIsTagSelectorOpen(!isTagSelectorOpen)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 text-slate-400 text-xs font-medium rounded-full border border-slate-700 hover:bg-slate-700 hover:text-slate-300 transition-colors"
                                >
                                    + 添加標籤
                                </button>
                            </div>

                            {isTagSelectorOpen && (
                                <div className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 shadow-lg flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                                    {globalTags.filter(tag => !editData.tags?.includes(tag)).map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                    {globalTags.filter(tag => !editData.tags?.includes(tag)).length === 0 && (
                                        <div className="text-xs text-slate-500 p-2 w-full text-center">沒有更多標籤可選</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 pt-2">
                        <div>
                            {/* Badges Bar (Hidden for artbooks as requested) */}
                            {!isArtbook && (
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">
                                      <Tag size={13} /> {book.category ? (findCategoryByName(categories, book.category)?.displayName || book.category) : '未分類'}
                                  </span>

                                  {book.volume && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-fuchsia-600 text-white text-xs font-black rounded-full shadow-sm">
                                      Vol. {book.volume}
                                    </span>
                                  )}

                                  {book.tags && book.tags.map((tag, index) => {
                                    const style = getTagStyles(tag);
                                    return (
                                      <span key={index} className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                                        {tag}
                                      </span>
                                    );
                                  })}
                              </div>
                            )}

                            <h2 className="text-2xl font-black text-slate-100 leading-tight mb-1">
                                {book.title}
                            </h2>
                            <p className="text-base text-slate-400 font-semibold flex items-center gap-1.5">
                                <Brush size={16} className="text-fuchsia-400" />
                                <span>繪師 / 作者：{book.author}</span>
                            </p>
                        </div>

                        {/* Interactive Related IP Banner & Series Preview Card */}
                        {book.relatedIp && (
                          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-fuchsia-950/30 to-indigo-950/40 border border-fuchsia-500/30 shadow-xl overflow-hidden group/ip transition-all duration-300 hover:border-fuchsia-500/60 hover:shadow-fuchsia-950/30">
                            {/* Card Top Header */}
                            <div className="px-4 py-2.5 bg-fuchsia-950/60 border-b border-fuchsia-500/20 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-fuchsia-300 text-xs font-black">
                                <Sparkles size={15} className="text-fuchsia-400 animate-pulse" />
                                <span>原作系列作品聯動</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold px-2.5 py-0.5 bg-fuchsia-500/10 text-fuchsia-300 rounded-full border border-fuchsia-500/25">
                                  {book.originDomain === 'manga' || book.title.includes('我推的孩子') ? '漫畫原作' : book.originDomain === 'light_novel' ? '輕小說原作' : book.originDomain === 'novel' || book.title.includes('餓殍') ? '小說原作' : book.originDomain === 'game' ? '遊戲原作' : '原作關聯'}
                                </span>
                                {relatedBookCount > 0 && (
                                  <span className="text-[11px] font-bold text-slate-300 px-2.5 py-0.5 bg-slate-800/80 rounded-full border border-slate-700/80">
                                    {relatedBookCount === 1 && representativeBook?.type === 'single' ? '單行本收錄' : `全 ${relatedBookCount} 冊收錄`}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card Content with First Volume Preview */}
                            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                              {/* Series Representative Book (Volume 1) */}
                              <div 
                                onClick={() => {
                                  if (onNavigateToIp) {
                                    onClose();
                                    onNavigateToIp(book.relatedIp!, book.originDomain);
                                  }
                                }}
                                className="relative w-24 sm:w-28 aspect-[2/3] rounded-xl overflow-hidden bg-slate-950 shadow-lg border border-slate-700 group-hover/ip:border-fuchsia-500/60 transition-all shrink-0 cursor-pointer"
                                title={`前往《${book.relatedIp}》原作系列`}
                              >
                                {representativeBook?.coverUrl ? (
                                  <img 
                                    src={representativeBook.coverUrl} 
                                    alt={representativeBook.title}
                                    className="w-full h-full object-cover group-hover/ip:scale-105 transition-transform duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500">
                                    <Folder size={32} />
                                    <span className="text-[10px] mt-1">作品封面</span>
                                  </div>
                                )}
                                
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-6 pb-1 px-1.5 text-center">
                                  <span className="text-[10px] font-black text-white px-2 py-0.5 bg-fuchsia-600/90 rounded-md shadow-sm">
                                    {representativeBook?.volume ? `第 ${representativeBook.volume} 卷` : (representativeBook?.type === 'single' ? '單行本' : '第 1 卷')}
                                  </span>
                                </div>
                              </div>

                              {/* Spacious IP Info & Direct Action */}
                              <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5 gap-3">
                                <div className="space-y-1.5 min-w-0">
                                  {/* Title line with ample width to prevent wrapping */}
                                  <div className="flex items-center gap-2 min-w-0">
                                    <h3 
                                      className="text-lg sm:text-xl font-black text-white truncate min-w-0 group-hover/ip:text-fuchsia-200 transition-colors"
                                      title={book.relatedIp}
                                    >
                                      《{book.relatedIp}》
                                    </h3>
                                  </div>

                                  {representativeBook && (
                                    <p className="text-xs text-slate-300 font-medium truncate flex items-center gap-1.5">
                                      <span className="text-fuchsia-400 font-bold">{representativeBook.type === 'single' ? '書名：' : '首卷：'}</span>
                                      <span className="truncate">{representativeBook.title}</span>
                                    </p>
                                  )}

                                  {representativeBook?.author && (
                                    <p className="text-xs text-slate-400 font-medium truncate">
                                      原作作者：{representativeBook.author}
                                    </p>
                                  )}
                                </div>

                                {onNavigateToIp && (
                                  <div className="pt-1">
                                    <button
                                      onClick={() => {
                                        onClose();
                                        onNavigateToIp(book.relatedIp!, book.originDomain);
                                      }}
                                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-fuchsia-600/30 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                                    >
                                      <span>{representativeBook?.type === 'single' ? `前往《${book.relatedIp}》` : `前往《${book.relatedIp}》原作書架`}</span>
                                      <ArrowUpRight size={16} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Multi-Volume Series Navigation Switcher */}
                        {siblingVolumes.length > 1 && (
                          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                                <Layers size={15} className="text-fuchsia-400" />
                                <span>系列其他卷冊 ({siblingVolumes.length} 冊收錄)</span>
                              </h4>
                              <span className="text-[10px] text-slate-500">{book.seriesGroup}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {siblingVolumes.map(volBook => {
                                const isCurrent = volBook.id === book.id;
                                return (
                                  <button
                                    key={volBook.id}
                                    onClick={() => {
                                      if (onSelectBook) onSelectBook(volBook);
                                    }}
                                    className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all border ${
                                      isCurrent
                                        ? 'bg-fuchsia-600/20 border-fuchsia-500/60 text-white ring-1 ring-fuchsia-500/30'
                                        : 'bg-slate-900/60 hover:bg-slate-800 border-slate-700/60 text-slate-300 hover:text-white'
                                    }`}
                                  >
                                    <div className="w-8 h-11 rounded bg-slate-950 overflow-hidden shrink-0 border border-slate-700">
                                      <img 
                                        src={volBook.coverUrl || `https://picsum.photos/seed/${volBook.id}/100/150`} 
                                        alt={volBook.title}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-black ${
                                          isCurrent ? 'bg-fuchsia-500 text-white' : 'bg-slate-800 text-slate-400'
                                        }`}>
                                          {volBook.volume ? `Vol.${volBook.volume}` : '冊'}
                                        </span>
                                        {isCurrent && <span className="text-[10px] text-fuchsia-400 font-bold">當前瀏覽</span>}
                                      </div>
                                      <p className="text-xs font-bold truncate mt-0.5">{volBook.title}</p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Official Related Artbooks Link for Manga/Novel */}
                        {!isArtbook && relatedArtbooks.length > 0 && (
                          <div className="p-4 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 via-indigo-950/40 to-slate-900 border border-fuchsia-500/30 shadow-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-fuchsia-300 text-xs font-black">
                                <Sparkles size={16} className="text-fuchsia-400" />
                                <span>官方收錄畫集 ({relatedArtbooks.length} 冊)</span>
                              </div>
                              <span className="text-[10px] text-fuchsia-400/80 font-bold">公式插畫集</span>
                            </div>

                            <div className="space-y-2">
                              {relatedArtbooks.map(artbook => (
                                <div 
                                  key={artbook.id} 
                                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all group"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-14 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-fuchsia-500/30 shadow-md">
                                      <img 
                                        src={artbook.coverUrl} 
                                        alt={artbook.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-white truncate group-hover:text-fuchsia-200 transition-colors">
                                        {artbook.title}
                                      </div>
                                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                                        <span>{artbook.author}</span>
                                        <span className="text-fuchsia-400">•</span>
                                        <span className="text-fuchsia-300">畫集</span>
                                      </div>
                                    </div>
                                  </div>

                                  {onSelectBook && (
                                    <button
                                      onClick={() => onSelectBook(artbook)}
                                      className="px-3.5 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-lg shadow-fuchsia-600/30 cursor-pointer hover:scale-105 active:scale-95"
                                    >
                                      <span>查看畫集</span>
                                      <ArrowUpRight size={14} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center shrink-0">
                 <button 
                    onClick={handleDelete}
                    className="px-4 py-2 text-rose-500/60 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all flex items-center gap-2 text-sm font-bold group/del"
                    title="刪除此書籍"
                 >
                    <Trash2 size={16} className="group-hover/del:scale-110 transition-transform" /> 
                    <span>永久刪除此書</span>
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;