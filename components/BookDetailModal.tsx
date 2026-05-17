import React, { useState, useEffect, useRef } from 'react';
import { Book, CategoryDef } from '../types';
import { findCategoryByName } from '../utils/categoryUtils';
import { X, Trash2, Edit2, Save, Tag, ZoomIn, LayoutGrid, ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react';

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  categories: CategoryDef[];
  globalTags: string[];
  onUpdate: (updatedBook: Book) => void;
  onDelete: (id: string) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  book, 
  categories, 
  globalTags,
  onUpdate, 
  onDelete
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

      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] overflow-hidden flex flex-col md:flex-row border border-slate-700 animate-in fade-in zoom-in duration-200 relative">
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
                <div className="flex-1"></div>
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
                            <label className="text-xs font-bold text-slate-500 uppercase">作者</label>
                            <input 
                                name="author"
                                value={editData.author}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        
                        {/* Custom Tree Dropdown for Category */}
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
                    <div className="space-y-6 pt-4">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-full border border-indigo-500/20">
                                    <Tag size={14} /> {book.category ? (findCategoryByName(categories, book.category)?.displayName || book.category) : '未分類'}
                                </span>
                                {book.tags && book.tags.map((tag, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-600/20 text-rose-300 text-xs font-medium rounded-full border border-rose-500/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-100 leading-tight mb-2">
                                {book.title}
                            </h2>
                            <p className="text-lg text-slate-400 font-medium">
                                {book.author}
                            </p>
                        </div>
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
                 
                 {!isEditing && (
                    <p className="text-[10px] text-slate-500 font-medium italic">
                        最後更新：{new Date(book.updatedAt || book.addedAt || Date.now()).toLocaleDateString()}
                    </p>
                 )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;