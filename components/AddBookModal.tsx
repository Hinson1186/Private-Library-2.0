import React, { useState } from 'react';
import { BookDraft, AISearchResult, CategoryDef } from '../types';
import { identifyBook } from '../services/geminiService';
import { findCategoryByName } from '../utils/categoryUtils';
import { X, Search, Sparkles, Plus, Loader2, Book as BookIcon, LayoutGrid, ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: BookDraft) => void;
  categories: CategoryDef[];
  initialCategory?: string | null;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAdd, categories, initialCategory }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [expandedCatIds, setExpandedCatIds] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<BookDraft>({
    title: '',
    author: '',
    genre: '',
    category: initialCategory || '',
    subCategory: '',
    coverUrl: '',
    tags: []
  });

  // Update formData when modal opens with a new initialCategory
  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, category: initialCategory || '' }));
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const result: AISearchResult = await identifyBook(searchQuery);
      setFormData({
        title: result.title,
        author: result.author,
        genre: result.genre,
        category: initialCategory || '', 
        subCategory: '',
        coverUrl: '',
        tags: []
      });
      setActiveTab('manual'); 
    } catch (err) {
      setError("AI 無法識別這本書。請嘗試其他關鍵字或手動輸入。");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryDef = formData.category ? findCategoryByName(categories, formData.category) : null;
    const isSeries = categoryDef?.type === 'series';
    
    const finalData = {
        ...formData,
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category.trim() || '未分類',
        type: (isSeries ? 'series' : 'single') as 'series' | 'single'
    }
    onAdd(finalData);
    setFormData({
      title: '', author: '', genre: '', category: '', subCategory: '', coverUrl: '', tags: []
    });
    setSearchQuery('');
    onClose();
    setActiveTab('ai');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const selectCategory = (e: React.MouseEvent, node: CategoryDef) => {
      e.preventDefault();
      setFormData(prev => ({ 
        ...prev, 
        category: node.name,
        type: node.type === 'series' ? 'series' : 'single'
      }));
      setIsTreeOpen(false);
  };

  const renderCategoryTree = (nodes: CategoryDef[], depth = 0) => {
      return nodes.map(node => {
          const hasChildren = node.children && node.children.length > 0;
          const isExpanded = expandedCatIds.has(node.id);
          const isSelected = formData.category === node.name;

          return (
              <div key={node.id} className="select-none">
                  <div 
                    className={`flex items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors border border-transparent ${isSelected ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:border-slate-700 text-slate-300'}`}
                    style={{ paddingLeft: `${depth * 12 + 8}px` }}
                    onClick={(e) => selectCategory(e, node)}
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
                      {node.type === 'series' && <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded border border-indigo-500/30">系列</span>}
                      {node.type === 'single' && <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded border border-indigo-500/30">單行本</span>}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] flex flex-col border border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 shrink-0">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Plus className="text-indigo-400" /> 新增書籍
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-slate-700 shrink-0">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 relative ${
              activeTab === 'ai' ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
            }`}
          >
            <Sparkles size={16} />
            AI 智慧搜尋
            {activeTab === 'ai' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 relative ${
              activeTab === 'manual' ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
            }`}
          >
            <BookIcon size={16} />
            手動輸入 / 編輯
            {activeTab === 'manual' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
          </button>
        </div>

        <div className="p-6 overflow-y-scroll custom-scrollbar flex-grow">
          {activeTab === 'ai' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 h-full">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-2 animate-pulse">
                <Sparkles className="text-indigo-400" size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">讓 AI 為您尋找書籍</h3>
                <p className="text-slate-400 max-w-sm mx-auto mt-2 text-sm">
                  輸入書名，我們會自動抓取資訊。
                </p>
              </div>
              
              <form onSubmit={handleAiSearch} className="w-full max-w-md relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="例如：'原子習慣'"
                  className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-500"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-1.5 rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                </button>
              </form>
              
              {error && (
                <div className="p-3 bg-red-900/20 border border-red-800 text-red-300 text-sm rounded-lg max-w-md">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <form id="bookForm" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">書名 (選填)</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="輸入書名"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase">作者 (選填)</label>
                  <input
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="作者姓名"
                  />
                </div>
              </div>

              <div className="space-y-1">
                 <label className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-2">
                    <LayoutGrid size={14} /> 選擇分類
                 </label>
                 
                 <div className="relative">
                     <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsTreeOpen(!isTreeOpen);
                        }}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-left flex items-center justify-between transition-colors hover:border-slate-600"
                     >
                        <span className={formData.category ? 'text-slate-100' : 'text-slate-500'}>
                            {formData.category ? (findCategoryByName(categories, formData.category)?.displayName || formData.category) : '選擇分類...'}
                        </span>
                        <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${isTreeOpen ? 'rotate-180' : ''}`} />
                     </button>

                     {isTreeOpen && (
                         <div className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg max-h-60 overflow-y-auto custom-scrollbar p-2 shadow-lg">
                             {categories.length === 0 ? (
                                 <p className="text-slate-500 text-sm text-center py-4">尚無分類，請先建立分類。</p>
                             ) : (
                                 renderCategoryTree(categories)
                             )}
                         </div>
                     )}
                 </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase">封面圖片 URL (選填)</label>
                <div className="flex gap-2">
                  <input
                    name="coverUrl"
                    value={formData.coverUrl}
                    onChange={handleInputChange}
                    className="flex-1 p-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
                {formData.coverUrl && (
                    <p className="text-xs text-indigo-400 mt-1">
                        預覽: <a href={formData.coverUrl} target="_blank" rel="noreferrer" className="underline hover:text-indigo-300">點擊查看</a>
                    </p>
                )}
              </div>
            </form>
          )}
        </div>

        {activeTab === 'manual' && (
          <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex justify-end gap-3 shrink-0">
             <button
              onClick={() => setActiveTab('ai')}
              className="px-4 py-2 text-slate-400 hover:text-slate-200 font-medium text-sm transition-colors"
            >
              返回 AI 搜尋
            </button>
            <button
              type="submit"
              form="bookForm"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              儲存書籍
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBookModal;