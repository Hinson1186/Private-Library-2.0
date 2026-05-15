import React, { useState, useEffect } from 'react';
import { X, Tag, Plus, Check } from 'lucide-react';

interface BatchTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  globalTags: string[];
  onConfirm: (tagsToAdd: string[], tagsToRemove: string[]) => void;
}

const BatchTagsModal: React.FC<BatchTagsModalProps> = ({ isOpen, onClose, selectedCount, globalTags, onConfirm }) => {
  const [tagsToAdd, setTagsToAdd] = useState<Set<string>>(new Set());
  const [tagsToRemove, setTagsToRemove] = useState<Set<string>>(new Set());

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTagsToAdd(new Set());
      setTagsToRemove(new Set());
      setNewTag('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddNewTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      toggleTag(newTag.trim(), 'add');
      setNewTag('');
    }
  };

  const toggleTag = (tag: string, list: 'add' | 'remove') => {
    if (list === 'add') {
      setTagsToAdd(prev => {
        const next = new Set(prev);
        if (next.has(tag)) next.delete(tag);
        else {
          next.add(tag);
          setTagsToRemove(prevRem => {
            const nextRem = new Set(prevRem);
            nextRem.delete(tag);
            return nextRem;
          });
        }
        return next;
      });
    } else {
      setTagsToRemove(prev => {
        const next = new Set(prev);
        if (next.has(tag)) next.delete(tag);
        else {
          next.add(tag);
          setTagsToAdd(prevAdd => {
            const nextAdd = new Set(prevAdd);
            nextAdd.delete(tag);
            return nextAdd;
          });
        }
        return next;
      });
    }
  };

  const handleSubmit = () => {
    onConfirm(Array.from(tagsToAdd), Array.from(tagsToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-700 shrink-0">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Tag className="text-indigo-400" /> 批次管理標籤
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <p className="text-slate-300 mb-6 font-medium">
            您已選取 <span className="text-indigo-400 font-bold text-lg">{selectedCount}</span> 本書籍。請選擇要新增或移除的標籤。
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                  <Plus size={16} /> 新增標籤
                </h3>
                <form onSubmit={handleAddNewTag} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="輸入新標籤..."
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    className="w-32 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button type="submit" disabled={!newTag.trim()} className="text-emerald-400 hover:text-emerald-300 disabled:opacity-50">
                    <Plus size={16} />
                  </button>
                </form>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set([...globalTags, ...Array.from(tagsToAdd)])).map(tag => (
                  <button
                    key={`add-${tag}`}
                    onClick={() => toggleTag(tag, 'add')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      tagsToAdd.has(tag)
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {globalTags.length === 0 && <p className="text-slate-500 text-sm">尚無任何標籤</p>}
              </div>
            </div>

            <div className="h-px bg-slate-700/50 w-full" />

            <div>
              <h3 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                <X size={16} /> 移除標籤
              </h3>
              <div className="flex flex-wrap gap-2">
                {globalTags.map(tag => (
                  <button
                    key={`remove-${tag}`}
                    onClick={() => toggleTag(tag, 'remove')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                      tagsToRemove.has(tag)
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-rose-500/50 hover:text-rose-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {globalTags.length === 0 && <p className="text-slate-500 text-sm">尚無任何標籤</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-slate-200 font-medium text-sm transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={tagsToAdd.size === 0 && tagsToRemove.size === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check size={16} /> 確認修改
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchTagsModal;
