import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, ArrowLeft, Tag, X } from 'lucide-react';

import { CategoryDef } from '../types';

interface TagManagerPageProps {
  onClose: () => void;
  globalTags: string[];
  onAddTag: (tag: string) => void;
  onRenameTag: (oldTag: string, newTag: string) => void;
  onDeleteTag: (tag: string) => void;
  onSelectTag: (tag: string) => void;
  categories: CategoryDef[];
  selectedCategory: string | null;
  onToggleCategoryTag: (categoryId: string, tag: string) => void;
}

const TagManagerPage: React.FC<TagManagerPageProps> = ({
  onClose, globalTags, onAddTag, onRenameTag, onDeleteTag, onSelectTag,
  categories, selectedCategory, onToggleCategoryTag
}) => {
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'global' | 'series'>('global');
  
  // Flatten categories to find all series
  const getAllSeries = (nodes: CategoryDef[]): CategoryDef[] => {
    let series: CategoryDef[] = [];
    nodes.forEach(node => {
      if (node.type === 'series' || node.name === '系列') {
        series.push(node);
      }
      if (node.children) {
        series = series.concat(getAllSeries(node.children));
      }
    });
    return series;
  };
  
  const allSeries = getAllSeries(categories);
  
  // Find initially selected series
  const initialSeries = allSeries.find(s => s.name === selectedCategory) || allSeries[0];
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(initialSeries?.id || null);

  const activeSeries = allSeries.find(s => s.id === selectedSeriesId);
  const seriesTags = activeSeries?.tags || [];

  const sortedTags = [...globalTags].sort((a, b) => a.localeCompare(b, 'zh-TW', { numeric: true }));
  const sortedSeriesTags = [...seriesTags].sort((a, b) => a.localeCompare(b, 'zh-TW', { numeric: true }));

  const displayTags = activeTab === 'global' ? sortedTags : sortedSeriesTags;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      const tag = newTag.trim();
      if (activeTab === 'global') {
        if (!globalTags.includes(tag)) {
          onAddTag(tag);
        }
      } else if (activeTab === 'series' && activeSeries) {
        if (!seriesTags.includes(tag)) {
          onToggleCategoryTag(activeSeries.id, tag);
        }
      }
      setNewTag('');
    }
  };

  const handleStartEdit = (tag: string) => {
    setEditingTag(tag);
    setEditValue(tag);
  };

  const handleSaveEdit = () => {
    if (editingTag && editValue.trim() && editValue.trim() !== editingTag) {
      if (!globalTags.includes(editValue.trim())) {
        onRenameTag(editingTag, editValue.trim());
      }
    }
    setEditingTag(null);
  };

  const handleBatchDelete = () => {
    if (selectedTags.size === 0) return;
    if (activeTab === 'global') {
      if (window.confirm(`確定要刪除選取的 ${selectedTags.size} 個標籤嗎？這會從所有書籍和分類中移除這些標籤。`)) {
        selectedTags.forEach(tag => onDeleteTag(tag));
        setSelectedTags(new Set());
        setIsEditMode(false);
      }
    } else if (activeTab === 'series' && activeSeries) {
      if (window.confirm(`確定要從此系列中移除選取的 ${selectedTags.size} 個標籤嗎？`)) {
        selectedTags.forEach(tag => onToggleCategoryTag(activeSeries.id, tag));
        setSelectedTags(new Set());
        setIsEditMode(false);
      }
    }
  };

  const toggleSelectTag = (tag: string) => {
    const newSet = new Set(selectedTags);
    if (newSet.has(tag)) {
      newSet.delete(tag);
    } else {
      newSet.add(tag);
    }
    setSelectedTags(newSet);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="text-rose-400"><Tag size={18} /></span>
            標籤管理
          </h2>
          <div className="flex bg-slate-900 rounded-lg p-1 ml-4">
            <button
              onClick={() => { setActiveTab('global'); setSelectedTags(new Set()); setIsEditMode(false); }}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'global' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              全域標籤
            </button>
            <button
              onClick={() => { setActiveTab('series'); setSelectedTags(new Set()); setIsEditMode(false); }}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'series' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              系列標籤
            </button>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full ml-2">
            共 {displayTags.length} 個
          </span>

          <div className="w-px h-4 bg-slate-700 mx-2 hidden sm:block"></div>

          {isEditMode ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { setIsEditMode(false); setSelectedTags(new Set()); setEditingTag(null); }} 
                className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Check size={16} /> 完成
              </button>
              {selectedTags.size > 0 && (
                <button 
                  onClick={handleBatchDelete} 
                  className="text-rose-400 hover:text-rose-300 text-sm font-medium flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 size={16} /> 刪除 ({selectedTags.size})
                </button>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsEditMode(true)} 
              className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Edit2 size={16} /> 修改標籤
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleAdd} className="flex items-center gap-2">
            <input
              type="text"
              list="global-tags-list"
              placeholder={activeTab === 'global' ? "輸入新標籤名稱..." : "輸入或選擇標籤..."}
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              className="w-48 sm:w-64 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
            />
            <datalist id="global-tags-list">
              {globalTags.map(tag => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
            <button 
              type="submit" 
              disabled={!newTag.trim()} 
              className="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-rose-500 disabled:opacity-50 flex items-center justify-center gap-1.5 transition-colors shadow-sm shrink-0"
            >
              <Plus size={16} /> <span className="hidden sm:inline">新增</span>
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'series' && (
            <div className="mb-6 flex items-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <label className="text-sm font-medium text-slate-300">選擇系列：</label>
              <select
                value={selectedSeriesId || ''}
                onChange={(e) => setSelectedSeriesId(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-64 p-2"
              >
                {allSeries.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          )}
          {/* Tag List Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayTags.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 py-24 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
                目前沒有任何標籤
              </div>
            ) : (
              displayTags.map(tag => {
                const isSelected = selectedTags.has(tag);
                return (
                  <div 
                    key={tag} 
                    className={`group relative flex items-center justify-center rounded-2xl transition-all h-20 sm:h-24 border-2 cursor-pointer overflow-hidden ${
                      isSelected 
                        ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]' 
                        : 'border-slate-800 hover:border-rose-500/50 shadow-sm'
                    }`}
                    onClick={() => {
                      if (isEditMode) {
                        toggleSelectTag(tag);
                      } else if (editingTag !== tag) {
                        onSelectTag(tag);
                        onClose();
                      }
                    }}
                  >
                    {/* 標籤背景圖片 */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={`https://picsum.photos/seed/${tag}/400/200`} 
                        alt="" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                      {/* 黑色膠膜疊加 */}
                      <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-rose-950/40' : 'bg-black/50 group-hover:bg-black/30'}`} />
                    </div>

                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      {editingTag === tag ? (
                        <div className="flex flex-col items-center gap-2 w-full px-3" onClick={e => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            className="w-full bg-slate-950/90 border border-rose-400 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none text-center backdrop-blur-sm"
                            autoFocus
                            onKeyDown={e => e.key === 'Enter' && handleSaveEdit()}
                          />
                          <div className="flex items-center gap-2">
                            <button onClick={handleSaveEdit} className="p-1.5 text-rose-400 hover:bg-rose-400/20 rounded-lg transition-colors bg-slate-900/50 backdrop-blur-sm">
                              <Check size={18} />
                            </button>
                            <button onClick={() => setEditingTag(null)} className="p-1.5 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors bg-slate-900/50 backdrop-blur-sm">
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isEditMode && (
                            <div className="absolute top-3 left-3">
                              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-rose-500 border-rose-500' : 'border-slate-400 bg-slate-950/50'}`}>
                                {isSelected && <Check size={14} className="text-white font-bold" />}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-base sm:text-lg font-bold tracking-wide transition-colors drop-shadow-lg ${isSelected ? 'text-white' : 'text-slate-100 group-hover:text-white'}`}>
                              {tag}
                            </span>
                            {!isEditMode && (
                              <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold group-hover:text-white transition-colors drop-shadow-md">
                                點擊篩選
                              </span>
                            )}
                          </div>

                          {isEditMode && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleStartEdit(tag); }} 
                              className="absolute top-2 right-2 p-2 text-slate-200 hover:text-white hover:bg-white/20 rounded-xl transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm" 
                              title="編輯名稱"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagManagerPage;
