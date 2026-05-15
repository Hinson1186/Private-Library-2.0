import React, { useState } from 'react';
import { CategoryDef } from '../types';
import { X, Folder, FolderOpen, ChevronRight, ChevronDown, Check, ArrowRightLeft } from 'lucide-react';

interface BatchMoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  categories: CategoryDef[];
  onConfirm: (targetCategory: string) => void;
}

const BatchMoveModal: React.FC<BatchMoveModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedCount, 
  categories, 
  onConfirm 
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderTree = (nodes: CategoryDef[], depth = 0) => {
    return nodes.map(node => (
      <div key={node.id} className="select-none">
        <div 
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors border ${
                selectedTarget === node.name 
                ? 'bg-indigo-600 border-indigo-500 text-white' 
                : 'hover:bg-slate-800 border-transparent hover:border-slate-700 text-slate-300'
            }`}
            style={{ marginLeft: `${depth * 16}px` }}
            onClick={() => setSelectedTarget(node.name)}
        >
            {node.children && node.children.length > 0 ? (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(node.id);
                    }}
                    className="p-1 hover:bg-white/10 rounded"
                >
                    {expandedIds.has(node.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
            ) : <span className="w-6" />}
            
            {expandedIds.has(node.id) ? <FolderOpen size={16} /> : <Folder size={16} />}
            <span className="text-sm font-medium truncate flex-1">{node.name}</span>
            {selectedTarget === node.name && <Check size={16} />}
        </div>
        
        {node.children && expandedIds.has(node.id) && (
            <div>
                {renderTree(node.children, depth + 1)}
            </div>
        )}
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 rounded-t-2xl">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ArrowRightLeft className="text-indigo-400" size={20} /> 
            批次移動
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-slate-800 bg-slate-800/30">
            <p className="text-sm text-slate-300">
                將選取的 <span className="font-bold text-white">{selectedCount}</span> 本書籍移動至...
            </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
            <div 
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors border ${
                    selectedTarget === '未分類' 
                    ? 'bg-indigo-600 border-indigo-500 text-white' 
                    : 'hover:bg-slate-800 border-transparent hover:border-slate-700 text-slate-300'
                }`}
                onClick={() => setSelectedTarget('未分類')}
            >
                <span className="w-6" />
                <Folder size={16} />
                <span className="text-sm font-medium truncate flex-1">未分類 (根目錄)</span>
                {selectedTarget === '未分類' && <Check size={16} />}
            </div>
            {renderTree(categories)}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900 rounded-b-2xl flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium">
                取消
            </button>
            <button 
                disabled={!selectedTarget}
                onClick={() => selectedTarget && onConfirm(selectedTarget)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                確認移動
            </button>
        </div>
      </div>
    </div>
  );
};

export default BatchMoveModal;
