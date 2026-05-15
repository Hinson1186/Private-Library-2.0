import React, { useState, useEffect } from 'react';
import { CategoryDef } from '../types';
import { sortCategoriesRecursive, findCategoryById } from '../utils/categoryUtils';
import { X, Plus, Trash2, Edit2, ChevronDown, ChevronRight, Save, FolderOpen, Folder, SlidersHorizontal, ArrowRightLeft, Tag, CheckSquare } from 'lucide-react';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryDef[];
  onUpdateCategories: (newCategories: CategoryDef[]) => void;
  onRenameCategory?: (oldName: string, newName: string) => void;
  onAddTags?: (tags: string[]) => void;
  globalTags?: string[];
  onToggleCategoryTag?: (id: string, tag: string) => void;
}

const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onUpdateCategories,
  onRenameCategory,
  onAddTags,
  globalTags = [],
  onToggleCategoryTag
}) => {
  const [localCategories, setLocalCategories] = useState<CategoryDef[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [addingChildToId, setAddingChildToId] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const [movingId, setMovingId] = useState<string | null>(null);
  const [movingName, setMovingName] = useState('');
  const [tagSelectorId, setTagSelectorId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBatchTagMode, setIsBatchTagMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Sort immediately upon opening
      const sorted = sortCategoriesRecursive(JSON.parse(JSON.stringify(categories)));
      setLocalCategories(sorted);
      setMovingId(null);
      setSelectedIds(new Set());
      setIsBatchTagMode(false);
    }
  }, [isOpen, categories]);

  const handleBatchToggleTag = (tag: string) => {
    if (!onToggleCategoryTag) return;
    selectedIds.forEach(id => {
       onToggleCategoryTag(id, tag);
    });
  };

  const toggleSelection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
    });
  };

  if (!isOpen) return null;

  const updateNodeInTree = (nodes: CategoryDef[], id: string, transform: (node: CategoryDef) => CategoryDef): CategoryDef[] => {
    const newNodes = nodes.map(node => {
      if (node.id === id) return transform(node);
      if (node.children) {
        return { ...node, children: updateNodeInTree(node.children, id, transform) };
      }
      return node;
    });
    // Sort after update
    return sortCategoriesRecursive(newNodes);
  };

  const deleteNodeFromTree = (nodes: CategoryDef[], id: string): CategoryDef[] => {
    return nodes.filter(node => node.id !== id).map(node => ({
      ...node,
      children: deleteNodeFromTree(node.children || [], id)
    }));
  };

  const addChildToNode = (nodes: CategoryDef[], parentId: string, newChild: CategoryDef): CategoryDef[] => {
    const newNodes = nodes.map(node => {
      if (node.id === parentId) {
        return { ...node, children: [...(node.children || []), newChild] };
      }
      if (node.children) {
        return { ...node, children: addChildToNode(node.children, parentId, newChild) };
      }
      return node;
    });
    // Sort after adding
    return sortCategoriesRecursive(newNodes);
  };

  const removeAndGetNode = (nodes: CategoryDef[], id: string): { node: CategoryDef | null, tree: CategoryDef[] } => {
    let foundNode: CategoryDef | null = null;
    const filterRec = (currentNodes: CategoryDef[]): CategoryDef[] => {
        return currentNodes.filter(node => {
            if (node.id === id) {
                foundNode = node;
                return false; 
            }
            if (node.children) {
                node.children = filterRec(node.children);
            }
            return true;
        });
    };
    const newTree = filterRec(JSON.parse(JSON.stringify(nodes))); 
    return { node: foundNode, tree: newTree };
  };

  const flattenCategoriesForMove = (nodes: CategoryDef[], excludeId: string, prefix = ''): { id: string, name: string }[] => {
    let result: { id: string, name: string }[] = [];
    nodes.forEach(node => {
        if (node.id === excludeId) return; 
        const currentName = prefix ? `${prefix} > ${node.name}` : node.name;
        result.push({ id: node.id, name: currentName });
        if (node.children) {
            result = result.concat(flattenCategoriesForMove(node.children, excludeId, currentName));
        }
    });
    return result;
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddCategory = (parentId: string | null) => {
    if (!newCatName.trim()) return;
    
    let newType: 'series' | 'single' | 'default' = 'default';
    if (parentId) {
      const parentNode = findCategoryById(localCategories, parentId);
      if (parentNode) {
        if (parentNode.name === '系列' || parentNode.type === 'series') newType = 'series';
      }
    }

    const newCat: CategoryDef = {
      id: crypto.randomUUID(),
      name: newCatName.trim(),
      children: [],
      type: newType
    };
    let updated: CategoryDef[];
    if (parentId === null) {
      updated = sortCategoriesRecursive([...localCategories, newCat]);
    } else {
      updated = addChildToNode(localCategories, parentId, newCat);
      setExpandedIds(prev => new Set(prev).add(parentId));
    }
    setLocalCategories(updated);
    onUpdateCategories(updated);
    setNewCatName('');
    setAddingChildToId(null);
  };

  const handleRename = (id: string) => {
    if (!editValue.trim()) return;
    const oldNode = findCategoryById(localCategories, id);
    const oldName = oldNode?.name;
    const newName = editValue.trim();

    if (!oldName || oldName === newName) {
      setEditingId(null);
      return;
    }

    // Helper to recursively rename descendants and collect all old/new name pairs
    const renamePairs: { oldName: string, newName: string }[] = [{ oldName, newName }];
    
    const renameDescendants = (nodes: CategoryDef[]): CategoryDef[] => {
      return nodes.map(node => {
        let updatedNode = { ...node };
        if (node.name.includes(oldName)) {
          const newChildName = node.name.replace(oldName, newName);
          renamePairs.push({ oldName: node.name, newName: newChildName });
          updatedNode.name = newChildName;
        }
        if (updatedNode.children) {
          updatedNode.children = renameDescendants(updatedNode.children);
        }
        return updatedNode;
      });
    };

    const updated = updateNodeInTree(localCategories, id, node => ({ 
      ...node, 
      name: newName,
      children: node.children ? renameDescendants(node.children) : []
    }));

    setLocalCategories(updated);
    onUpdateCategories(updated);
    
    if (onRenameCategory) {
      // Call onRenameCategory for the main category and all renamed descendants
      renamePairs.forEach(pair => {
        onRenameCategory(pair.oldName, pair.newName);
      });
    }
    setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (confirm(`確定要刪除「${name}」嗎？\n該分類下的所有子分類也會被刪除。`)) {
      const updated = deleteNodeFromTree(localCategories, id);
      setLocalCategories(updated);
      onUpdateCategories(updated);
    }
  };

  const initMove = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setMovingId(id);
    setMovingName(name);
  };

  const executeMove = (targetParentId: string | null) => {
    if (!movingId) return;
    const { node, tree } = removeAndGetNode(localCategories, movingId);
    if (node) {
        let finalTree: CategoryDef[];
        
        let newType: 'series' | 'single' | 'default' = 'default';
        if (targetParentId) {
          const parentNode = findCategoryById(tree, targetParentId);
          if (parentNode) {
            if (parentNode.name === '系列' || parentNode.type === 'series') newType = 'series';
          }
        }
        
        const updateTypeRecursively = (n: CategoryDef, t: 'series' | 'single' | 'default'): CategoryDef => ({
          ...n,
          type: t,
          children: n.children ? n.children.map(c => updateTypeRecursively(c, t)) : []
        });

        const updatedNode = updateTypeRecursively(node, newType);

        if (targetParentId === null) {
            finalTree = sortCategoriesRecursive([...tree, updatedNode]);
        } else {
            finalTree = addChildToNode(tree, targetParentId, updatedNode);
            setExpandedIds(prev => new Set(prev).add(targetParentId));
        }
        setLocalCategories(finalTree);
        onUpdateCategories(finalTree);
    }
    setMovingId(null);
  };

  const renderTree = (nodes: CategoryDef[], depth = 0) => {
    return nodes.map(node => (
      <div key={node.id} className="select-none">
        <div 
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 mb-1 group transition-colors ${depth > 0 ? 'ml-6' : ''}`}
            onClick={() => toggleExpand(node.id)}
        >
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(node.id);
                }}
                className={`p-1 text-slate-500 hover:text-indigo-400 transition-colors ${!node.children?.length ? 'opacity-30' : ''}`}
                disabled={!node.children?.length}
            >
                {expandedIds.has(node.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {isBatchTagMode && node.type === 'series' && (
                <button 
                    onClick={(e) => toggleSelection(e, node.id)}
                    className={`shrink-0 p-1 transition-colors ${selectedIds.has(node.id) ? 'text-indigo-400' : 'text-slate-600'}`}
                >
                    <CheckSquare size={18} fill={selectedIds.has(node.id) ? 'currentColor' : 'none'} />
                </button>
            )}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                    {expandedIds.has(node.id) ? <FolderOpen size={16} className="text-indigo-400 shrink-0" /> : <Folder size={16} className="text-slate-500 shrink-0" />}
                    {editingId === node.id ? (
                        <div className="flex flex-col flex-1 gap-1" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                                <input 
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full bg-slate-900 border border-indigo-500 rounded px-2 py-1 text-sm text-white outline-none"
                                    autoFocus
                                    placeholder="分類名稱"
                                    onKeyDown={(e) => e.key === 'Enter' && handleRename(node.id)}
                                />
                                <button onClick={() => handleRename(node.id)} className="text-indigo-400 hover:text-indigo-300"><Save size={16} /></button>
                                <button onClick={() => setEditingId(null)} className="text-red-400 hover:text-red-300"><X size={16} /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col min-w-0">
                            <span className={`text-sm font-medium truncate ${depth === 0 ? 'text-slate-200' : 'text-slate-400'}`}>
                                {node.name}
                            </span>
                            {node.type === 'series' && node.displayName !== '系列' && node.displayName !== '單行本' && (
                                <div className="mt-2 pl-6" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Tag size={12} className="text-indigo-400" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">系列專屬標籤</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 items-center relative min-h-[24px]">
                                        {/* Assigned Tags */}
                                        {node.tags?.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => onToggleCategoryTag?.(node.id, tag)}
                                                className="group inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 transition-all"
                                                title="點擊移除標籤"
                                            >
                                                {tag}
                                                <X size={10} className="opacity-40 group-hover:opacity-100" />
                                            </button>
                                        ))}

                                        {/* Add Tag Selector */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setTagSelectorId(tagSelectorId === node.id ? null : node.id)}
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                                                    tagSelectorId === node.id 
                                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20' 
                                                    : 'bg-slate-700/50 text-slate-400 border-slate-600/50 hover:bg-slate-700 hover:text-slate-200'
                                                }`}
                                            >
                                                <Plus size={10} />
                                                設定標籤
                                            </button>

                                            {tagSelectorId === node.id && (
                                                <div className="absolute top-full left-0 mt-2 w-56 max-h-56 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="px-2 py-1 mb-1 border-b border-slate-800">
                                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">可選全域標籤</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {globalTags
                                                                .slice()
                                                                .sort((a, b) => a.localeCompare(b, 'zh-TW'))
                                                                .map(tag => {
                                                                    const isAssigned = node.tags?.includes(tag);
                                                                    return (
                                                                        <button
                                                                            key={tag}
                                                                            onClick={() => onToggleCategoryTag?.(node.id, tag)}
                                                                            className={`inline-flex items-center px-2 py-1 rounded-lg text-[9px] font-bold transition-all border ${
                                                                                isAssigned
                                                                                ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                                                                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200 hover:border-slate-600'
                                                                            }`}
                                                                        >
                                                                            {tag}
                                                                            {isAssigned && <CheckSquare size={10} className="ml-1" />}
                                                                        </button>
                                                                    );
                                                                })
                                                            }
                                                        </div>
                                                        {globalTags.length === 0 && (
                                                            <div className="text-[10px] text-slate-500 p-3 italic text-center">請先前往標籤管理員建立全域標籤</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Backdrop for selector */}
                                        {tagSelectorId === node.id && (
                                            <div 
                                                className="fixed inset-0 z-40 cursor-default" 
                                                onClick={() => setTagSelectorId(null)}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                            {node.type !== 'series' && node.tags && node.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {node.tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-700 text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                    onClick={(e) => initMove(e, node.id, node.name)}
                    className="p-1.5 text-slate-500 hover:text-amber-400 hover:bg-slate-700/50 rounded"
                    title="移動分類"
                >
                    <ArrowRightLeft size={14} />
                </button>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setAddingChildToId(node.id);
                        setNewCatName('');
                    }}
                    className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-slate-700/50 rounded"
                    title="新增子分類"
                >
                    <Plus size={14} />
                </button>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(node.id);
                        setEditValue(node.name);
                    }}
                    className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-slate-700/50 rounded"
                    title="重新命名"
                >
                    <Edit2 size={14} />
                </button>
                <button 
                    onClick={(e) => handleDelete(e, node.id, node.name)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-700/50 rounded"
                    title="刪除"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
        {addingChildToId === node.id && (
             <div className={`flex items-center gap-2 p-2 mb-1 ml-${(depth + 1) * 6 + 6} pl-8`}>
                <div className="w-4 h-4 border-l border-b border-slate-700 rounded-bl mr-2"></div>
                <input 
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="輸入子分類名稱..."
                    className="flex-1 bg-slate-900 border border-indigo-500 rounded px-2 py-1 text-sm text-white outline-none"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory(node.id)}
                />
                <button onClick={() => handleAddCategory(node.id)} className="text-indigo-400"><Save size={16} /></button>
                <button onClick={() => setAddingChildToId(null)} className="text-slate-500"><X size={16} /></button>
            </div>
        )}
        {node.children && expandedIds.has(node.id) && (
            <div>
                {renderTree(node.children, depth + 1)}
            </div>
        )}
      </div>
    ));
  };

  const moveTargets = movingId ? flattenCategoriesForMove(localCategories, movingId) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg h-[80vh] flex flex-col border border-slate-700 relative">
        {movingId ? (
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50 rounded-t-2xl">
                    <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                        <ArrowRightLeft size={20} /> 移動分類
                    </h2>
                    <button onClick={() => setMovingId(null)} className="p-2 hover:bg-slate-700 rounded-full text-slate-400">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                    <p className="text-slate-300 mb-4">
                        請選擇 <span className="font-bold text-white">「{movingName}」</span> 的新位置：
                    </p>
                    <button 
                        onClick={() => executeMove(null)}
                        className="w-full text-left p-3 mb-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 font-bold flex items-center gap-2"
                    >
                        <FolderOpen size={18} /> 移至最上層 (根目錄)
                    </button>
                    <div className="space-y-1">
                        {moveTargets.map(target => (
                             <button 
                                key={target.id}
                                onClick={() => executeMove(target.id)}
                                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                            >
                                <Folder size={16} className="text-slate-500" />
                                {target.name}
                            </button>
                        ))}
                        {moveTargets.length === 0 && <p className="text-slate-500 text-sm p-2">沒有其他可移動的目標位置。</p>}
                    </div>
                </div>
            </div>
        ) : (
            <>
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/50 rounded-t-2xl">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <SlidersHorizontal className="text-indigo-400" size={20} /> 分類架構管理
                    {isBatchTagMode && <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 ml-2">批量模式: 已選 {selectedIds.size}</span>}
                </h2>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => {
                            setIsBatchTagMode(!isBatchTagMode);
                            setSelectedIds(new Set());
                        }}
                        className={`p-2 rounded-lg transition-all ${isBatchTagMode ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-700 text-slate-400'}`}
                        title="批量修改標籤"
                    >
                        <CheckSquare size={18} />
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-200">
                        <X size={20} />
                    </button>
                </div>
                </div>

                {isBatchTagMode && selectedIds.size > 0 && (
                    <div className="p-3 bg-indigo-600/10 border-b border-indigo-500/20 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest whitespace-nowrap">批量為系列添加標籤:</span>
                        <div className="flex flex-wrap gap-1.5 flex-1 max-h-20 overflow-y-auto p-1">
                            {globalTags.map(tag => (
                                <button
                                    key={`batch-${tag}`}
                                    onClick={() => handleBatchToggleTag(tag)}
                                    className="px-2 py-1 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-lg text-[10px] font-bold text-slate-400 border border-slate-700 transition-all"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                    {localCategories.length === 0 && (
                        <div className="text-center py-10 text-slate-500 flex flex-col items-center gap-2">
                            <FolderOpen size={40} strokeWidth={1.5} />
                            <p>尚無分類，請在下方建立第一個分類。</p>
                        </div>
                    )}
                    {renderTree(localCategories)}
                </div>

                {addingChildToId === null && (
                    <div className="p-4 bg-slate-900 border-t border-slate-700">
                        <div className="flex gap-2">
                            <input 
                                value={newCatName}
                                onChange={(e) => setNewCatName(e.target.value)}
                                placeholder="新增主分類..."
                                className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory(null)}
                            />
                            <button 
                                onClick={() => handleAddCategory(null)}
                                disabled={!newCatName.trim()}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default CategoryManagerModal;
