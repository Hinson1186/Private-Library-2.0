
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Book, CategoryDef } from './types';
import { useLibrary } from './hooks/useLibrary';
import { findCategoryByName, getAllDescendantNames, findParentCategoryByName } from './utils/categoryUtils';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BookGrid from './components/BookGrid';

import AddBookModal from './components/AddBookModal';
import CategoryManagerModal from './components/CategoryManagerModal';
import TagManagerPage from './components/TagManagerPage';
import BookDetailModal from './components/BookDetailModal';
import SettingsModal from './components/SettingsModal';
import BatchMoveModal from './components/BatchMoveModal';
import BatchTagsModal from './components/BatchTagsModal';
import { Dices, X, FolderOpen, BookHeart, Plus, ArrowLeft, Tag, Settings, Tags, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const { 
    books, 
    categories, 
    globalTags,
    isLoading, 
    user,
    addBook, 
    updateBook, 
    deleteBook, 
    updateCategories, 
    importData,
    batchMove,
    batchDelete,
    batchUpdateTags,
    addGlobalTag,
    addMultipleGlobalTags,
    renameGlobalTag,
    deleteGlobalTag,
    saveSnapshotToCloud,
    downloadInitialData,
    uploadInitialData
  } = useLibrary();

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBatchMoveOpen, setIsBatchMoveOpen] = useState(false);
  const [isBatchTagsOpen, setIsBatchTagsOpen] = useState(false);
  const [isCatTagSelectorOpen, setIsCatTagSelectorOpen] = useState(false);
  
  // State
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [randomSeed, setRandomSeed] = useState(0); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Batch Mode
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [isManagingCatTags, setIsManagingCatTags] = useState(false);
  const [selectedBookIds, setSelectedBookIds] = useState<Set<string>>(new Set());

  // Helper Functions
  const allTags = globalTags;

  const shuffleBooks = () => {
    setRandomSeed(prev => prev + 1);
  };

  const toggleBatchSelection = (bookId: string) => {
    setSelectedBookIds(prev => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });
  };

  const handleBatchDelete = () => {
    if (window.confirm(`確定要刪除選取的 ${selectedBookIds.size} 本書籍嗎？`)) {
      batchDelete(selectedBookIds);
      setSelectedBookIds(new Set());
      setIsBatchMode(false);
    }
  };

  const handleBatchMove = (targetCategory: string) => {
    batchMove(selectedBookIds, targetCategory);
    setSelectedBookIds(new Set());
    setIsBatchMode(false);
    setIsBatchMoveOpen(false);
  };

  const handleBatchTags = (tagsToAdd: string[], tagsToRemove: string[]) => {
    batchUpdateTags(selectedBookIds, tagsToAdd, tagsToRemove);
    setSelectedBookIds(new Set());
    setIsBatchMode(false);
    setIsBatchTagsOpen(false);
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
    const idsToMove = new Set(books.filter(b => b.category === oldName).map(b => b.id));
    if (idsToMove.size > 0) {
        batchMove(idsToMove, newName);
    }
    if (selectedCategory === oldName) {
        setSelectedCategory(newName);
    }
  };

  useEffect(() => {
    setIsManagingCatTags(false);
    setIsCatTagSelectorOpen(false);
  }, [selectedCategory]);

  const toggleCategoryTag = (categoryId: string, tag: string) => {
    const updateInTree = (nodes: CategoryDef[]): CategoryDef[] => {
        return nodes.map(node => {
            if (node.id === categoryId) {
                const currentTags = node.tags || [];
                const newTags = currentTags.includes(tag)
                    ? currentTags.filter(t => t !== tag)
                    : [...currentTags, tag];
                return { ...node, tags: newTags };
            }
            if (node.children) {
                return { ...node, children: updateInTree(node.children) };
            }
            return node;
        });
    };
    updateCategories(updateInTree(categories));
  };

  const viewData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filterBook = (b: Book) => {
        const bookTags = b.tags || [];
        const cat = findCategoryByName(categories, b.category);
        const catTags = cat?.tags || [];
        const combinedTags = Array.from(new Set([...bookTags, ...catTags]));
        
        // Tag filter (AND logic)
        if (selectedTags.size > 0) {
            for (const tag of selectedTags) {
                if (!combinedTags.includes(tag)) return false;
            }
        }

        if (!searchTerm) return true;

        const matchTitle = (b.title || '').toLowerCase().includes(lowerSearch);
        const matchAuthor = (b.author || '').toLowerCase().includes(lowerSearch);
        const matchTags = combinedTags.some(tag => (tag || '').toLowerCase().includes(lowerSearch));

        return matchTitle || matchAuthor || matchTags;
    };

    const filterCategory = (c: CategoryDef) => {
        const catTags = c.tags || [];
        
        // Tag filter (AND logic)
        if (selectedTags.size > 0) {
            for (const tag of selectedTags) {
                if (!catTags.includes(tag)) return false;
            }
        }

        if (!searchTerm) return true;

        const matchName = (c.name || '').toLowerCase().includes(lowerSearch);
        const matchDisplayName = (c.displayName || '').toLowerCase().includes(lowerSearch);
        const matchTags = catTags.some(tag => (tag || '').toLowerCase().includes(lowerSearch));
        return matchName || matchDisplayName || matchTags;
    };

    if (!selectedCategory) {
        // All Books Mode
        if (searchTerm || selectedTags.size > 0) {
            // Mixed search mode: search all categories and books
            const matchingBooks = books.filter(filterBook);
            
            const finalMixedItems: (Book | CategoryDef)[] = [];
            const processedSeriesNames = new Set<string>();
            const processedBookIds = new Set<string>();

            // 1. Identify which series folders should be shown instead of individual books
            // Strategy: For leaf series folders, if more than 1 matching book exists inside,
            // or if the folder itself matches the search criteria, group them.
            
            const searchAndGroup = (nodes: CategoryDef[]) => {
                nodes.forEach(n => {
                    const isLeafSeries = n.type === 'series' && n.displayName !== '系列';
                    
                    if (isLeafSeries) {
                        const descendantNames = getAllDescendantNames(n);
                        const matchingBooksInSeries = matchingBooks.filter(b => descendantNames.includes(b.category));
                        const folderMatches = filterCategory(n);
                        
                        // Grouping Condition: 
                        // - Folder itself matches the search/tags
                        // - OR more than 1 matching book inside
                        // - OR exactly 1 matching book but it's part of a series (collectors usually prefer folder access)
                        if (folderMatches || matchingBooksInSeries.length > 0) {
                            finalMixedItems.push(n);
                            processedSeriesNames.add(n.name);
                            matchingBooksInSeries.forEach(b => processedBookIds.add(b.id));
                            // Once a series folder is added to mixed view, we don't go deeper
                            return; 
                        }
                    }
                    
                    if (n.children && n.children.length > 0) searchAndGroup(n.children);
                });
            };
            searchAndGroup(categories);

            // 2. Add matching books that were NOT grouped into a series folder
            matchingBooks.forEach(b => {
                if (!processedBookIds.has(b.id)) {
                    finalMixedItems.push(b);
                }
            });

            return { type: 'mixed' as const, items: finalMixedItems };
        } else {
            // Normal All Books mode
            let result = books.filter(filterBook);

            // Randomize order for fresh look
            if (randomSeed >= 0) {
                for (let i = result.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [result[i], result[j]] = [result[j], result[i]];
                }
            }

            const items = result.map(b => {
                const isSeries = findCategoryByName(categories, b.category)?.type === 'series';
                return isSeries ? { ...b, tags: undefined } : b;
            });
            return { type: 'books' as const, items };
        }
    } else {
        const categoryNode = findCategoryByName(categories, selectedCategory);
        
        // Folder Logic
        if (categoryNode && categoryNode.children && categoryNode.children.length > 0) {
            let subCats = categoryNode.children.filter(filterCategory);

            // Find all books that are descendants of categoryNode
            const allDescendants = getAllDescendantNames(categoryNode);
            const matchingBooks = books.filter(b => allDescendants.includes(b.category)).filter(filterBook);
            
            const finalMixedItems: (Book | CategoryDef)[] = [...subCats];
            const seenCategoryIds = new Set<string>(subCats.map(c => c.id));
            
            matchingBooks.forEach(b => {
                let isSingleVolume = true;
                
                // Check if the book belongs to any child category of categoryNode
                for (const child of categoryNode.children || []) {
                    const childDescendants = getAllDescendantNames(child);
                    if (childDescendants.includes(b.category)) {
                        // The book is in a sub-category (series folder)
                        if (!seenCategoryIds.has(child.id)) {
                            finalMixedItems.push(child);
                            seenCategoryIds.add(child.id);
                        }
                        isSingleVolume = false;
                        break;
                    }
                }
                
                // If it's a single volume (directly in categoryNode), add the book itself
                if (isSingleVolume) {
                    finalMixedItems.push(b);
                }
            });
            
            // Sort finalMixedItems: categories first, then books, sorted by name/title
            finalMixedItems.sort((a, b) => {
                const nameA = ('title' in a ? a.title : a.name) || '';
                const nameB = ('title' in b ? b.title : b.name) || '';
                return nameA.localeCompare(nameB, 'zh-TW', { numeric: true });
            });
            
            const onlyCategories = finalMixedItems.every(item => 'children' in item);
            if (onlyCategories) {
                return { type: 'categories' as const, items: finalMixedItems as CategoryDef[] };
            }
            
            return { type: 'mixed' as const, items: finalMixedItems };
        } else {
            // Leaf Category: Show books (sorted by title/volume)
            let result = books.filter(book => book.category === selectedCategory).filter(filterBook);
            
            result = result.sort((a, b) => (a.title || '').localeCompare((b.title || ''), 'zh-TW', { numeric: true })).map(b => {
                const isSeries = findCategoryByName(categories, b.category)?.type === 'series';
                return isSeries ? { ...b, tags: undefined } : b;
            });
            return { type: 'books' as const, items: result };
        }
    }
  }, [books, searchTerm, selectedCategory, selectedTags, randomSeed, categories]);

  const toggleTag = (tag: string | null) => {
    if (tag === null) {
        setSelectedTags(new Set());
        return;
    }
    setSelectedTags(prev => {
        const next = new Set(prev);
        if (next.has(tag)) next.delete(tag);
        else next.add(tag);
        return next;
    });
  };

  const setSingleTag = (tag: string | null) => {
    if (tag === null) {
        setSelectedTags(new Set());
    } else {
        setSelectedTags(new Set([tag]));
    }
  };

  const handleDeleteBook = (id: string, title: string) => {
    if (window.confirm(`【警告】\n\n您確定要永久刪除「${title}」這本書嗎？\n此動作無法復原。`)) {
        deleteBook(id);
    }
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-200 font-inter flex flex-col overflow-hidden">
      <Header 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isBatchMode={isBatchMode}
        setIsBatchMode={setIsBatchMode}
        selectedCount={selectedBookIds.size}
        onSelectAll={() => {
            if (viewData.type === 'books') {
                const ids = viewData.items.map(b => (b as Book).id);
                setSelectedBookIds(new Set(ids));
            } else if (viewData.type === 'mixed') {
                const ids = viewData.items.filter(item => !('children' in item)).map(b => (b as Book).id);
                setSelectedBookIds(new Set(ids));
            }
        }}
        onClearSelection={() => setSelectedBookIds(new Set())}
        onBatchMove={() => setIsBatchMoveOpen(true)}
        onBatchTags={() => setIsBatchTagsOpen(true)}
        onBatchDelete={handleBatchDelete}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAddModal={() => setIsModalOpen(true)}
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTag={toggleTag}
        onOpenTagManager={() => setIsTagManagerOpen(true)}
        isTagManagerOpen={isTagManagerOpen}
        user={user}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setIsTagManagerOpen(false);
            }}
            bookCount={books.length}
            books={books}
            onOpenCategoryManager={() => setIsCategoryManagerOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-6 overflow-hidden flex flex-col bg-slate-950 relative">
            {isTagManagerOpen ? (
                <TagManagerPage 
                    onClose={() => setIsTagManagerOpen(false)} 
                    globalTags={globalTags} 
                    onAddTag={addGlobalTag} 
                    onRenameTag={renameGlobalTag} 
                    onDeleteTag={deleteGlobalTag} 
                    onSelectTag={setSingleTag}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onToggleCategoryTag={toggleCategoryTag}
                />
            ) : (
                <>
                    <div className="flex flex-col shrink-0 bg-slate-950/95 backdrop-blur z-30 py-4 border-b border-slate-800/50">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 flex-wrap">
                                    {selectedCategory ? (
                                        <>
                                        <span className="text-indigo-400"><FolderOpen size={22} /></span>
                                        {findCategoryByName(categories, selectedCategory)?.displayName || selectedCategory}
                                        
                                        {/* Category Tags Display - Moved to Left and Made Vibrant */}
                                        {(() => {
                                            const cat = findCategoryByName(categories, selectedCategory);
                                            if (!cat || !cat.tags || cat.tags.length === 0) return null;
                                            return (
                                                <div className="flex items-center gap-1.5 ml-2">
                                                    {cat.tags.map(tag => (
                                                        <button
                                                            key={tag}
                                                            onClick={() => {
                                                                if (isManagingCatTags) {
                                                                    toggleCategoryTag(cat.id, tag);
                                                                }
                                                            }}
                                                            className={`text-[10px] flex items-center gap-1 px-2.5 py-1 rounded-full transition-all border shadow-sm ${
                                                                isManagingCatTags 
                                                                ? 'bg-rose-500 text-white border-rose-400 hover:bg-rose-600 scale-105' 
                                                                : 'bg-rose-500/20 text-rose-300 border-rose-500/30 cursor-default'
                                                            }`}
                                                        >
                                                            <Tag size={10} />
                                                            {tag}
                                                            {isManagingCatTags && <X size={10} className="ml-0.5" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                        </>
                                    ) : (
                                        <>
                                        <span className="text-rose-400"><BookHeart size={22} /></span>
                                        所有書籍
                                        </>
                                    )}
                                </h2>
                                {selectedTags.size > 0 && (
                                    <div className="flex items-center flex-wrap gap-2 ml-8">
                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">正在篩選標籤:</span>
                                        {Array.from(selectedTags).map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-xs font-bold rounded-md border border-rose-500/30 flex items-center gap-1.5">
                                                <Tag size={10} />
                                                {tag}
                                                <button 
                                                    onClick={() => toggleTag(tag)}
                                                    className="hover:text-white transition-colors"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </span>
                                        ))}
                                        {selectedTags.size > 1 && (
                                            <button 
                                                onClick={() => setSelectedTags(new Set())}
                                                className="text-[10px] text-slate-500 hover:text-rose-400 underline underline-offset-2"
                                            >
                                                清除全部
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {!selectedCategory && !isBatchMode && (
                                    <button 
                                        onClick={shuffleBooks}
                                        className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 bg-slate-800 hover:bg-slate-800/80 px-3.5 py-2 rounded-full transition-colors group border border-slate-700/50"
                                        title="隨機排列"
                                    >
                                        <Dices size={14} className="group-hover:rotate-180 transition-transform duration-500" /> 換一批
                                    </button>
                                )}
                                {selectedCategory && (
                                    <div className="flex items-center gap-2 flex-wrap justify-end">
                                        {/* Category Management Actions */}
                                        {(() => {
                                            const cat = findCategoryByName(categories, selectedCategory);
                                            const isSeries = cat?.type === 'series';
                                            const isSeriesContainer = cat?.displayName === '系列';
                                            
                                            return (
                                                <>
                                                    {/* Manage Category Tags (only for specific series folders) */}
                                                    {isSeries && !isSeriesContainer && (
                                                        <>
                                                            <button 
                                                                onClick={() => {
                                                                    if (isManagingCatTags) setIsCatTagSelectorOpen(false);
                                                                    setIsManagingCatTags(!isManagingCatTags);
                                                                }}
                                                                className={`text-xs flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all border font-bold ${
                                                                    isManagingCatTags 
                                                                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-500/30' 
                                                                    : 'bg-rose-700 text-white border-rose-600 hover:bg-rose-600 shadow-lg shadow-rose-900/40'
                                                                }`}
                                                            >
                                                                <Tags size={14} /> {isManagingCatTags ? '完成分類管理' : '管理分類標籤'}
                                                            </button>

                                                            {isManagingCatTags && (
                                                                <div className="relative">
                                                                    <button
                                                                        onClick={() => setIsCatTagSelectorOpen(!isCatTagSelectorOpen)}
                                                                        className={`text-xs flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors border font-bold ${
                                                                            isCatTagSelectorOpen 
                                                                            ? 'bg-rose-500 text-white border-rose-400' 
                                                                            : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700/50 hover:bg-slate-700'
                                                                        }`}
                                                                    >
                                                                        <Plus size={14} /> 添加分類標籤
                                                                    </button>

                                                                    {isCatTagSelectorOpen && (
                                                                        <div className="absolute top-full right-0 mt-2 w-64 max-h-60 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 flex flex-wrap gap-1">
                                                                            {[...globalTags]
                                                                                .sort((a, b) => a.localeCompare(b, 'zh-TW'))
                                                                                .filter(tag => !cat?.tags?.includes(tag))
                                                                                .map(tag => (
                                                                                    <button
                                                                                        key={tag}
                                                                                        onClick={() => toggleCategoryTag(cat.id, tag)}
                                                                                        className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
                                                                                    >
                                                                                        {tag}
                                                                                    </button>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    {isCatTagSelectorOpen && (
                                                                        <div className="fixed inset-0 z-40" onClick={() => setIsCatTagSelectorOpen(false)} />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            );
                                        })()}

                                        <button 
                                            onClick={() => setSelectedCategory(null)}
                                            className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-full transition-colors border border-slate-700/50"
                                        >
                                            <X size={14} /> 清除篩選
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const parent = findParentCategoryByName(categories, selectedCategory);
                                                setSelectedCategory(parent ? parent.name : null);
                                            }}
                                            className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-full transition-colors border border-slate-700/50"
                                        >
                                            <ArrowLeft size={14} /> 回到上一層
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <BookGrid 
                        viewData={viewData}
                        books={books}
                        isBatchMode={isBatchMode}
                        selectedBookIds={selectedBookIds}
                        onBookClick={setSelectedBook}
                        onDeleteBook={handleDeleteBook}
                        onBatchSelect={toggleBatchSelection}
                        onCategoryClick={setSelectedCategory}
                        onAddFirstBook={() => setIsModalOpen(true)}
                        isLoading={isLoading}
                    />
                </>
            )}
        </main>
      </div>

      {!isTagManagerOpen && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/40 flex items-center justify-center hover:bg-indigo-500 z-40 border border-indigo-400/20"
        >
          <Plus size={28} />
        </button>
      )}

      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addBook} categories={categories} initialCategory={selectedCategory} />
      <CategoryManagerModal 
        isOpen={isCategoryManagerOpen} 
        onClose={() => setIsCategoryManagerOpen(false)} 
        categories={categories} 
        onUpdateCategories={updateCategories} 
        onRenameCategory={handleRenameCategory} 
        onAddTags={addMultipleGlobalTags} 
        globalTags={globalTags}
        onToggleCategoryTag={toggleCategoryTag}
      />
      <BookDetailModal 
        isOpen={!!selectedBook} 
        onClose={() => setSelectedBook(null)} 
        book={selectedBook} 
        categories={categories} 
        globalTags={globalTags} 
        onUpdate={updateBook} 
        onDelete={(id) => {
            deleteBook(id);
            setSelectedBook(null);
        }} 
      />
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        books={books} 
        categories={categories} 
        onImport={importData} 
        onSaveCloud={saveSnapshotToCloud}
        onDownloadInitialData={downloadInitialData}
        onUploadInitialData={uploadInitialData}
      />
      <BatchMoveModal isOpen={isBatchMoveOpen} onClose={() => setIsBatchMoveOpen(false)} selectedCount={selectedBookIds.size} categories={categories} onConfirm={handleBatchMove} />
      <BatchTagsModal isOpen={isBatchTagsOpen} onClose={() => setIsBatchTagsOpen(false)} selectedCount={selectedBookIds.size} globalTags={allTags} onConfirm={handleBatchTags} />
    </div>
  );
};

export default App;
