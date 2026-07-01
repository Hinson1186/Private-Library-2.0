
import { useState, useEffect } from 'react';
import { Book, BookDraft, CategoryDef } from '../types';
import { initialBooks, initialCategories } from '../data/initialData';
import { migrateCategories, restoreSingleCategory, findCategoryByName } from '../utils/categoryUtils';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

// 當您大幅更新 initialData.ts 並希望所有人都能看到最新內容時，請提升這裡的版本號（例如 v18 -> v19）
// 這會強制程式忽略舊的瀏覽器暫存，重新載入 initialData.ts 內的資料。
const STORAGE_KEY = 'ai-library-books-v33'; 
const CATEGORIES_KEY = 'ai-library-categories-tree-v33'; 
const TAGS_KEY = 'ai-library-tags-v4';

export const DEFAULT_TAGS = [
  "校園", "奇幻", "懸疑", "黑暗", "推理", "青春",
  "冒險", "熱血", "戀愛", "愛情", "科幻", "恐怖", "治癒", "歷史", "百合", "耽美", "日常",
  "末日", "末世", "旅行", "人生", "職場", "獵奇", "絕症", "宮廷", "權謀"
];

// Ensure all "關於我在無意間被隔壁的天使變成廢柴這件事" (angel-next-door) volumes have correct Tong Li cover URLs
const ensureAngelCovers = (booksList: Book[]): Book[] => {
  return booksList.map(book => {
    if (book.id && book.id.startsWith('angel-next-door-')) {
      const volNumStr = book.id.replace('angel-next-door-', '');
      const volNum = parseInt(volNumStr, 10);
      if (!isNaN(volNum) && volNum >= 1 && volNum <= 11) {
        const formattedNum = String(volNum).padStart(3, '0');
        const correctCover = `https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018${formattedNum}/NY0018${formattedNum}.jpg`;
        if (book.coverUrl !== correctCover) {
          return { ...book, coverUrl: correctCover };
        }
      }
    }
    return book;
  });
};

// Firestore does not allow undefined properties in objects. This utility purges them recursively.
const cleanForFirestore = (data: any): any => {
  if (data === undefined) return null;
  return JSON.parse(JSON.stringify(data));
};

export const useLibrary = () => {
  const [books, setBooksState] = useState<Book[]>([]);
  const [categories, setCategories] = useState<CategoryDef[]>([]);
  const [globalTags, setGlobalTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [syncConflict, setSyncConflict] = useState<{
    localBooks: Book[];
    localCategories: CategoryDef[];
    localTags: string[];
    cloudBooks: Book[];
    cloudCategories: CategoryDef[];
    cloudTags: string[];
  } | null>(null);

  const setBooks = (newBooks: Book[] | ((prev: Book[]) => Book[])) => {
    if (typeof newBooks === 'function') {
      setBooksState(prev => ensureAngelCovers(newBooks(prev)));
    } else {
      setBooksState(ensureAngelCovers(newBooks));
    }
  };

  // 處理使用者登入狀態
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    import('../firebase').then(({ auth, isValidConfig }) => {
      if (!isValidConfig || !auth) {
        setUser(null);
        return;
      }
      unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
      });
    }).catch(console.error);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // 載入資料 (優先從 Firestore，其次 LocalStorage 與 InitialData 合併)
  useEffect(() => {
    // 讀取本地 localStorage 的資料
    const savedBooks = localStorage.getItem(STORAGE_KEY);
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    const savedTags = localStorage.getItem(TAGS_KEY);
    
    const localBooks: Book[] = savedBooks ? JSON.parse(savedBooks) : [];
    const localCategories: CategoryDef[] = savedCategories ? JSON.parse(savedCategories) : [];
    const localTags: string[] = savedTags ? JSON.parse(savedTags) : [];

    if (!user) {
      // 未登入時：從 LocalStorage 讀取並與 initialData.ts 對比合併
      let mergedBooks = [...localBooks];
      initialBooks.forEach(ib => {
        const index = mergedBooks.findIndex(lb => lb.id === ib.id);
        if (index === -1) {
          mergedBooks.push(ib);
        } else {
          // 如果 initialData 有更新，覆蓋本地舊資料
          mergedBooks[index] = ib;
        }
      });

      // 智能合併分類：同樣邏輯
      let mergedCategories = [...localCategories];
      const initialMigratedCats = migrateCategories(initialCategories);
      initialMigratedCats.forEach(ic => {
        const index = mergedCategories.findIndex(lc => lc.id === ic.id || lc.name === ic.name);
        if (index === -1) {
          mergedCategories.push(ic);
        } else {
          mergedCategories[index] = ic;
        }
      });

      if (mergedCategories.length === 0) mergedCategories = initialMigratedCats;
      if (mergedBooks.length === 0) mergedBooks = initialBooks;

      const migrationResult = restoreSingleCategory(mergedCategories, mergedBooks);
      const finalCategories = migrationResult.newCategories;
      const finalBooks = migrationResult.newBooks;

      const tagsSet = new Set<string>(DEFAULT_TAGS);
      const loadedTags: string[] = savedTags ? JSON.parse(savedTags) : [];
      loadedTags.forEach(t => tagsSet.add(t));
      finalBooks.forEach(b => b.tags?.forEach(t => tagsSet.add(t)));
      
      setBooks(finalBooks);
      setCategories(finalCategories);
      setGlobalTags(Array.from(tagsSet).sort((a, b) => a.localeCompare(b, 'zh-TW', { numeric: true })));
      setIsLoading(false);
      return;
    }

    // 已登入：監聽 Firestore 快照 (單一 JSON 模式)
    setIsLoading(true);
    
    // 獲取雲端快照
    const snapshotUnsubscribe = onSnapshot(doc(db, 'users', user.uid, 'snapshots', 'current'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        let loadedCategories = data.categories || [];
        let loadedBooks = data.books || [];
        
        loadedCategories = migrateCategories(loadedCategories);
        const migrationResult = restoreSingleCategory(loadedCategories, loadedBooks);
        
        const cloudBooks = migrationResult.newBooks;
        const cloudCategories = migrationResult.newCategories;
        const cloudTags = data.tags || DEFAULT_TAGS;

        // 檢查是否有本機客端修改過的資料（比起 default/initialData 有變更過）
        const initialMigratedCats = migrateCategories(initialCategories);
        const hasLocalChanges = (() => {
          if (localBooks.length > 0 && JSON.stringify(localBooks) !== JSON.stringify(initialBooks)) {
            return true;
          }
          if (localCategories.length > 0 && JSON.stringify(localCategories) !== JSON.stringify(initialMigratedCats)) {
            return true;
          }
          return false;
        })();

        // 檢查本機客端修改是否與雲端資料不同
        const isDifferentFromCloud = JSON.stringify(localBooks) !== JSON.stringify(cloudBooks) || 
                                     JSON.stringify(localCategories) !== JSON.stringify(cloudCategories);

        if (hasLocalChanges && isDifferentFromCloud && !syncConflict) {
          // 有衝突：設定衝突狀態讓使用者選擇 (不直接覆蓋本機狀態)
          setSyncConflict({
            localBooks,
            localCategories,
            localTags: localTags.length > 0 ? localTags : DEFAULT_TAGS,
            cloudBooks,
            cloudCategories,
            cloudTags
          });
        } else {
          // 無衝突，直接套用雲端資料
          setCategories(cloudCategories);
          setBooks(cloudBooks);
          setGlobalTags(cloudTags);
        }
      } else {
        // 如果雲端沒快照，自動將目前本機客端的修改（如果有）或 initialData 上傳至雲端作為初始快照！
        // 這樣能把登入前的本地修改保留並覆蓋雲端的空資料
        const initialMigratedCats = migrateCategories(initialCategories);
        const finalBooks = localBooks.length > 0 ? localBooks : initialBooks;
        const finalCats = localCategories.length > 0 ? localCategories : initialMigratedCats;
        const finalTags = localTags.length > 0 ? localTags : DEFAULT_TAGS;

        setBooks(finalBooks);
        setCategories(finalCats);
        setGlobalTags(finalTags);

        setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
          books: finalBooks,
          categories: finalCats,
          tags: finalTags,
          updatedAt: new Date().toISOString()
        })).catch(e => console.error("Initialize cloud snapshot error:", e));
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore snapshot error:", error);
      setIsLoading(false);
    });

    return () => {
      snapshotUnsubscribe();
    };
  }, [user]);

  // 重新啟用本地暫存備份 (加速未登入時的讀取)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
      localStorage.setItem(TAGS_KEY, JSON.stringify(globalTags));

      // 自動同步到伺服器端的 initialData.ts
      if (!window.location.hostname.includes('github.io') && !window.location.hostname.includes('web.app')) {
        fetch('/api/save-initial-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ books, categories })
        }).catch(err => console.error('Auto sync to backend failed', err));
      }
    }
  }, [books, categories, globalTags, isLoading]);

  // 將目前的 initialData.ts 檔案直接覆蓋雲端現有檔案，並同步更新本機狀態 (加上 8 秒超時處理)
  const saveSnapshotToCloud = async () => {
    if (!user) throw new Error('使用者未登入。請先登入帳號。');
    
    const initialMigratedCats = migrateCategories(initialCategories);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('雲端連線逾時，請檢查您的 Firebase 資料庫是否已啟用或網路狀態。')), 8000);
    });

    try {
      await Promise.race([
        setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
          books: initialBooks,
          categories: initialMigratedCats,
          tags: DEFAULT_TAGS,
          updatedAt: new Date().toISOString()
        })),
        timeoutPromise
      ]);

      // 同步更新本機狀態與暫存，讓使用者立即在網頁上看到最新的預設書籍
      setBooks(initialBooks);
      setCategories(initialMigratedCats);
      setGlobalTags(DEFAULT_TAGS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialMigratedCats));
      localStorage.setItem(TAGS_KEY, JSON.stringify(DEFAULT_TAGS));
    } catch (error) {
      console.error('Save snapshot error:', error);
      throw error;
    }
  };

  // 解決本機與雲端的同步衝突
  const resolveConflict = async (useLocal: boolean) => {
    if (!user || !syncConflict) return;
    
    if (useLocal) {
      // 1. 將本地客端修改的資料寫入雲端
      try {
        await setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
          books: syncConflict.localBooks,
          categories: syncConflict.localCategories,
          tags: syncConflict.localTags,
          updatedAt: new Date().toISOString()
        }));
        setBooks(syncConflict.localBooks);
        setCategories(syncConflict.localCategories);
        setGlobalTags(syncConflict.localTags);
      } catch (err) {
        console.error("Failed to overwrite cloud with local data:", err);
      }
    } else {
      // 2. 載入雲端資料，並更新本機快取與狀態
      setBooks(syncConflict.cloudBooks);
      setCategories(syncConflict.cloudCategories);
      setGlobalTags(syncConflict.cloudTags);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(syncConflict.cloudBooks));
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(syncConflict.cloudCategories));
      localStorage.setItem(TAGS_KEY, JSON.stringify(syncConflict.cloudTags));
    }
    
    setSyncConflict(null);
  };

  // 下載目前資料為 initialData.ts (客戶端實現，不依賴伺服器)
  const downloadInitialData = async () => {
    try {
      const content = `import { Book, CategoryDef } from '../types';
import { createBook, createSeries } from '../utils/bookFactory';

/**
 * 這裡是您的「永久資料庫」。
 * 此檔案由網頁自動生成。
 */

export const initialCategories: CategoryDef[] = ${JSON.stringify(categories, null, 2)};

export const initialBooks: Book[] = ${JSON.stringify(books, null, 2)};
`;
      
      const blob = new Blob([content], { type: 'text/typescript' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'initialData.ts';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('下載失敗。');
    }
  };

  // 上傳並覆蓋 initialData.ts (注意：在 GitHub Pages 上此功能將無效，因為沒有後端服務)
  const uploadInitialData = async (file: File) => {
    if (window.location.hostname.includes('github.io')) {
      alert('GitHub Pages 不支援直接上傳並修改伺服器檔案。請使用「儲存至雲端」功能或在本地環境運行。');
      return;
    }
    if (!file.name.endsWith('.ts')) {
      alert('僅支援 .ts 檔案。');
      return;
    }

    if (!confirm('確定要覆蓋目前的 initialData.ts 嗎？這將會更新伺服器上的預設資料。')) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-initial-data', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('上傳失敗');
      
      const result = await response.json();
      alert(result.message);
      window.location.reload(); // 重新整理以載入新資料
    } catch (error) {
      console.error('Upload error:', error);
      alert('上傳失敗。');
    }
  };

  const addGlobalTag = async (tag: string) => {
    // 暫時性修改，不自動同步到雲端
    setGlobalTags(prev => {
      if (!prev.includes(tag)) {
        return [...prev, tag].sort((a, b) => a.localeCompare(b, 'zh-TW', { numeric: true }));
      }
      return prev;
    });
  };

  const addMultipleGlobalTags = async (tags: string[]) => {
    // 暫時性修改
    setGlobalTags(prev => {
      const newTags = [...prev];
      let added = false;
      tags.forEach(tag => {
        if (!newTags.includes(tag)) {
          newTags.push(tag);
          added = true;
        }
      });
      return added ? newTags.sort((a, b) => a.localeCompare(b, 'zh-TW', { numeric: true })) : prev;
    });
  };

  const renameGlobalTag = async (oldTag: string, newTag: string) => {
    // 暫時性修改
    setGlobalTags(prev => {
      const newTags = prev.map(t => t === oldTag ? newTag : t);
      return Array.from(new Set(newTags)).sort((a, b) => a.localeCompare(b, 'zh-TW', { numeric: true }));
    });
    
    setBooks(prev => prev.map(b => {
      if (b.tags?.includes(oldTag)) {
        return { ...b, tags: b.tags.map(t => t === oldTag ? newTag : t) };
      }
      return b;
    }));

    setCategories(prev => {
      const renameInCats = (nodes: CategoryDef[]): CategoryDef[] => {
        return nodes.map(n => {
          const updatedNode = { ...n };
          if (updatedNode.tags?.includes(oldTag)) {
            updatedNode.tags = updatedNode.tags.map(t => t === oldTag ? newTag : t);
          }
          if (updatedNode.children) {
            updatedNode.children = renameInCats(updatedNode.children);
          }
          return updatedNode;
        });
      };
      return renameInCats(prev);
    });
  };

  const deleteGlobalTag = async (tag: string) => {
    // 暫時性修改
    setGlobalTags(prev => prev.filter(t => t !== tag));
    setBooks(prev => prev.map(b => {
      if (b.tags?.includes(tag)) {
        return { ...b, tags: b.tags.filter(t => t !== tag) };
      }
      return b;
    }));
    setCategories(prev => {
      const deleteInCats = (nodes: CategoryDef[]): CategoryDef[] => {
        return nodes.map(n => {
          const updatedNode = { ...n };
          if (updatedNode.tags?.includes(tag)) {
            updatedNode.tags = updatedNode.tags.filter(t => t !== tag);
          }
          if (updatedNode.children) {
            updatedNode.children = deleteInCats(updatedNode.children);
          }
          return updatedNode;
        });
      };
      return deleteInCats(prev);
    });
  };

  const addBook = async (draft: BookDraft) => {
    const newBook: Book = {
      ...draft,
      id: crypto.randomUUID(),
      addedAt: Date.now()
    };
    
    setBooks(prev => {
        const next = [newBook, ...prev];
        if (user) {
            setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
                books: next,
                categories,
                tags: globalTags,
                updatedAt: new Date().toISOString()
            })).catch(e => console.error("Sync error:", e));
        }
        return next;
    });
    
    draft.tags?.forEach(t => addGlobalTag(t));
  };

  const updateBook = async (updatedBook: Book) => {
    setBooks(prev => {
        const next = prev.map(b => b.id === updatedBook.id ? updatedBook : b);
        if (user) {
            setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
                books: next,
                categories,
                tags: globalTags,
                updatedAt: new Date().toISOString()
            })).catch(e => console.error("Sync error:", e));
        }
        return next;
    });
    updatedBook.tags?.forEach(t => addGlobalTag(t));
  };

  const deleteBook = async (id: string) => {
    setBooks(prev => {
        const next = prev.filter(b => b.id !== id);
        if (user) {
            setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
                books: next,
                categories,
                tags: globalTags,
                updatedAt: new Date().toISOString()
            })).catch(e => console.error("Sync error:", e));
        }
        return next;
    });
  };

  const updateCategories = async (newCats: CategoryDef[]) => {
    // 暫時性修改
    setCategories(newCats);
  };

  const importData = async (newBooks: Book[], newCats: CategoryDef[]) => {
    if (user) {
      const batch = writeBatch(db);
      newBooks.forEach(b => batch.set(doc(db, 'users', user.uid, 'books', b.id), cleanForFirestore(b)));
      const flatten = (nodes: CategoryDef[]) => {
        nodes.forEach(n => {
          batch.set(doc(db, 'users', user.uid, 'categories', n.id), cleanForFirestore(n));
          if (n.children) flatten(n.children);
        });
      };
      flatten(newCats);
      
      const tagsSet = new Set<string>();
      newBooks.forEach(b => b.tags?.forEach(t => tagsSet.add(t)));
      tagsSet.forEach(t => batch.set(doc(db, 'users', user.uid, 'tags', t), { name: t }));
      
      await batch.commit();
    } else {
      setBooks(newBooks);
      setCategories(newCats);
      // ... derived tags logic ...
    }
  };

  const batchMove = async (bookIds: Set<string>, targetCategory: string) => {
    setBooks(prev => {
      const next = prev.map(b => bookIds.has(b.id) ? { ...b, category: targetCategory, tags: b.tags } : b);
      if (user) {
        setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
          books: next,
          categories,
          tags: globalTags,
          updatedAt: new Date().toISOString()
        })).catch(e => console.error("Sync error:", e));
      }
      return next;
    });
  };

  const batchDelete = async (bookIds: Set<string>) => {
    setBooks(prev => {
      const next = prev.filter(b => !bookIds.has(b.id));
      if (user) {
        setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
          books: next,
          categories,
          tags: globalTags,
          updatedAt: new Date().toISOString()
        })).catch(e => console.error("Sync error:", e));
      }
      return next;
    });
  };

  const batchUpdateTags = async (bookIds: Set<string>, tagsToAdd: string[], tagsToRemove: string[]) => {
    setBooks(prev => {
      const next = prev.map(b => {
        if (bookIds.has(b.id)) {
          let newTags = [...(b.tags || [])];
          tagsToAdd.forEach(t => { if (!newTags.includes(t)) newTags.push(t); });
          newTags = newTags.filter(t => !tagsToRemove.includes(t));
          return { ...b, tags: newTags };
        }
        return b;
      });
      if (user) {
        setDoc(doc(db, 'users', user.uid, 'snapshots', 'current'), cleanForFirestore({
          books: next,
          categories,
          tags: globalTags,
          updatedAt: new Date().toISOString()
        })).catch(e => console.error("Sync error:", e));
      }
      return next;
    });
  };

  return {
    books,
    categories,
    globalTags,
    isLoading,
    user,
    syncConflict,
    resolveConflict,
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
  };
};
