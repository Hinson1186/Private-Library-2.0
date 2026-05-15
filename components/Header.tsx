import React from 'react';
import { Search, BookHeart, Plus, Nut, CheckSquare, ArrowRightLeft, Trash2, Menu, Tag, Tags, LogIn, LogOut, User as UserIcon, Key, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, User, signInWithEmailAndPassword } from 'firebase/auth';

interface HeaderProps {
  onToggleSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isBatchMode: boolean;
  setIsBatchMode: (mode: boolean) => void;
  selectedCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBatchMove: () => void;
  onBatchTags: () => void;
  onBatchDelete: () => void;
  onOpenSettings: () => void;
  onOpenAddModal: () => void;
  allTags: string[];
  selectedTags: Set<string>;
  setSelectedTag: (tag: string | null) => void;
  onOpenTagManager: () => void;
  isTagManagerOpen: boolean;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchTerm,
  setSearchTerm,
  isBatchMode,
  setIsBatchMode,
  selectedCount,
  onSelectAll,
  onClearSelection,
  onBatchMove,
  onBatchTags,
  onBatchDelete,
  onOpenSettings,
  onOpenAddModal,
  allTags,
  selectedTags,
  setSelectedTag,
  onOpenTagManager,
  isTagManagerOpen,
  user
}) => {
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [showKeyLogin, setShowKeyLogin] = React.useState(false);
  const [accessKey, setAccessKey] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  
  const sortedTags = React.useMemo(() => [...allTags].sort((a, b) => a.localeCompare(b, 'zh-TW', { numeric: true })), [allTags]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current && !isDragging) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
            setScrollProgress((scrollLeft / maxScroll) * 100);
        }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setScrollProgress(value);
    
    if (scrollContainerRef.current) {
        const el = scrollContainerRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        // Direct setting is often more responsive than rAF for direct input manipulation
        el.scrollLeft = (value / 100) * maxScroll;
    }
  };

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    
    const provider = new GoogleAuthProvider();
    // 強制選擇帳號，有助於解決某些環境下的彈窗問題
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("登入視窗被關閉。請確保您已完成登入流程，且瀏覽器未封鎖彈窗。");
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.warn("登入請求已取消。");
      } else {
        console.error("Login failed", error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleKeyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim() || isLoggingIn) return;
    
    setIsLoggingIn(true);
    setLoginError('');
    
    try {
      // 使用您的 Email 作為帳號，Access Key 作為密碼
      await signInWithEmailAndPassword(auth, 'iamkfc1186@gmail.com', accessKey);
      setShowKeyLogin(false);
      setAccessKey('');
    } catch (error: any) {
      console.error("Key login failed", error);
      setLoginError('密碼錯誤或尚未在 Firebase 啟用 Email 登入。');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="shrink-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="w-full px-4 flex flex-col">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <button 
                onClick={onToggleSidebar}
                className="lg:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-lg"
            >
                <Menu size={24} />
            </button>
            <div className="bg-rose-500/10 p-2 rounded-xl text-rose-400 border border-rose-500/20">
              <BookHeart size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-indigo-400 hidden sm:block tracking-wide">
              輕．文庫
            </h1>
          </div>
          
          <div className="flex-1 max-w-2xl mx-auto flex items-center gap-4">
            <div className="relative group flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                <Search size={18} />
                </div>
                <input
                type="text"
                placeholder="搜尋藏書..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-full leading-5 bg-slate-900/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-slate-900 sm:text-sm transition-all"
                />
            </div>
            
            <button 
                onClick={() => {
                    setIsBatchMode(!isBatchMode);
                    if (isBatchMode) onClearSelection();
                }}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    isBatchMode 
                    ? 'bg-indigo-600 text-white border-indigo-500' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title="批次管理"
            >
                <CheckSquare size={16} />
                <span className="text-sm font-medium">多選</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <div className="flex items-center gap-2 mr-2">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-xs font-medium text-slate-200">{user.displayName}</span>
                  <button onClick={handleLogout} className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors">登出</button>
                </div>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-slate-700" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                    <UserIcon size={16} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className={`flex items-center gap-2 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-all text-sm font-medium ${isLoggingIn ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <LogIn size={18} className={isLoggingIn ? 'animate-pulse' : ''} />
                  <span className="hidden md:inline">{isLoggingIn ? '登入中...' : '登入同步'}</span>
                </button>
                <button
                  onClick={() => setShowKeyLogin(true)}
                  className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all"
                  title="使用密碼登入"
                >
                  <Key size={18} />
                </button>
              </div>
            )}

            <button
                onClick={onOpenSettings}
                className="p-2 text-slate-400 hover:bg-slate-800 hover:text-indigo-400 rounded-lg transition-colors hidden sm:block"
                title="設定與備份"
            >
                <Nut size={22} />
            </button>
            <button
                onClick={onOpenAddModal}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-lg hover:shadow-indigo-500/25"
            >
                <Plus size={18} />
                <span className="hidden sm:inline">入庫</span>
            </button>
          </div>
        </div>

        {/* Integrated Tag Filter Bar */}
        {!isTagManagerOpen && (
            <div className="pb-3 flex flex-col gap-2 w-full animate-in fade-in slide-in-from-top-2 duration-300">
                {/* Selected Tags Display */}
                {selectedTags.size > 0 && (
                    <div className="flex flex-wrap items-center gap-2 px-2">
                        <div className="flex items-center gap-1.5 text-rose-500 mr-1 shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">已選標籤</span>
                        </div>
                        {Array.from(selectedTags).map(tag => (
                            <button
                                key={`selected-${tag}`}
                                onClick={() => setSelectedTag(tag)}
                                className="group flex items-center gap-1.5 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-bold shadow-lg shadow-rose-600/20 border border-rose-500 hover:bg-rose-500 transition-all scale-100 hover:scale-105 active:scale-95"
                            >
                                {tag}
                                <X size={12} className="opacity-60 group-hover:opacity-100" />
                            </button>
                        ))}
                        <button
                            onClick={() => setSelectedTag(null)}
                            className="text-[10px] font-bold text-slate-500 hover:text-white underline underline-offset-4 decoration-slate-700 hover:decoration-white transition-all ml-2"
                        >
                            清除全部
                        </button>
                    </div>
                )}

                <div className="relative group/tags-container">
                    <div className="w-full flex items-center justify-between bg-slate-800/20 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-700/40 relative group/tags">
                        <div 
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className={`flex items-center gap-2 overflow-x-auto custom-scrollbar no-scrollbar flex-1 px-2 ${isDragging ? '' : 'scroll-smooth'}`}
                        >
                            <div className="shrink-0 flex items-center gap-1.5 text-slate-500 mr-2">
                                <Tag size={14} className="text-slate-400" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">熱門標籤</span>
                            </div>
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={`shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                    selectedTags.size === 0 
                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20' 
                                    : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                                }`}
                            >
                                全部
                            </button>
                            {sortedTags.map(tag => {
                                const isSelected = selectedTags.has(tag);
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                            isSelected 
                                            ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/10' 
                                            : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                        
                        <div className="flex gap-1 ml-2 border-l border-slate-700/50 pl-2">
                            <button 
                                onClick={onOpenTagManager}
                                className="shrink-0 px-3 py-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all flex items-center gap-1.5 border border-transparent active:scale-95"
                                title="標籤管理"
                            >
                                <Tags size={16} />
                                <span className="text-[10px] font-black hidden sm:inline uppercase">管理</span>
                            </button>
                        </div>

                        {/* Slider integrated INSIDE the container box at the bottom */}
                        <div className="absolute bottom-0.5 left-4 right-16 h-1 flex items-center group/slider pointer-events-none opacity-0 group-hover/tags:opacity-100 transition-opacity">
                            <div className="w-full h-1 bg-slate-900/40 rounded-full relative overflow-hidden ring-1 ring-slate-800/50">
                                <div 
                                    className="absolute inset-y-0 left-0 bg-indigo-500/20 rounded-full transition-all duration-150"
                                    style={{ width: `${scrollProgress}%` }}
                                />
                            </div>
                            <input 
                                type="range"
                                min="0"
                                max="100"
                                step="0.01"
                                value={scrollProgress}
                                onMouseDown={() => setIsDragging(true)}
                                onMouseUp={() => setIsDragging(false)}
                                onTouchStart={() => setIsDragging(true)}
                                onTouchEnd={() => setIsDragging(false)}
                                onChange={handleSliderChange}
                                className="absolute inset-x-0 w-full h-6 opacity-0 cursor-pointer pointer-events-auto z-10"
                                title="滑動瀏覽標籤"
                            />
                            {/* Scrollbar thumb (Modern Bean) */}
                            <div 
                                className={`absolute h-1.5 w-16 bg-slate-600 rounded-full transition-all duration-200 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)] ${isDragging ? 'bg-indigo-500 opacity-100 scale-y-110' : 'opacity-60 lg:group-hover/slider:opacity-100 lg:group-hover/slider:bg-slate-500'}`}
                                style={{ 
                                    left: `calc(${scrollProgress}% - (${scrollProgress} * 64px / 100))`, 
                                    transform: 'translateX(0)' 
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
      
      {isBatchMode && (
          <div className="w-full bg-indigo-900/30 border-t border-indigo-500/30 px-4 py-2 flex items-center justify-between animate-in slide-in-from-top-2">
              <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-indigo-300">已選取 {selectedCount} 本</span>
                  <button onClick={onSelectAll} className="text-xs text-indigo-400 hover:text-white hover:underline">全選</button>
                  <button onClick={onClearSelection} className="text-xs text-indigo-400 hover:text-white hover:underline">取消選取</button>
              </div>
              <div className="flex items-center gap-2">
                  <button 
                      disabled={selectedCount === 0}
                      onClick={onBatchMove}
                      className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <ArrowRightLeft size={14} /> 移動
                  </button>
                  <button 
                      disabled={selectedCount === 0}
                      onClick={onBatchTags}
                      className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <Tag size={14} /> 標籤
                  </button>
                  <button 
                      disabled={selectedCount === 0}
                      onClick={onBatchDelete}
                      className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg text-sm border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <Trash2 size={14} /> 刪除
                  </button>
              </div>
          </div>
      )}
      {/* Key Login Modal */}
      {showKeyLogin && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-32 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Key size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-100">密碼登入</h3>
              </div>
              <button 
                onClick={() => {
                  setShowKeyLogin(false);
                  setLoginError('');
                  setAccessKey('');
                }}
                className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleKeyLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  請輸入您的存取密碼
                </label>
                <input
                  type="password"
                  autoFocus
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="您的專屬密碼"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {loginError && (
                <p className="text-xs text-rose-400 bg-rose-400/10 p-3 rounded-lg border border-rose-400/20">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoggingIn || !accessKey.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    驗證中...
                  </>
                ) : (
                  '確認登入'
                )}
              </button>
            </form>
            
            <p className="mt-6 text-[10px] text-slate-500 text-center leading-relaxed">
              提示：此功能需要先在 Firebase 控制台啟用 Email/Password 登入，並為您的帳號設定密碼。
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
