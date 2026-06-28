import React, { useRef, useState } from 'react';
import { Book, CategoryDef } from '../types';
import { exportData, importData } from '../services/storageService';
import { X, Download, Upload, AlertCircle, CheckCircle2, Copy, Code2, Nut, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  categories: CategoryDef[];
  onImport: (books: Book[], categories: CategoryDef[]) => void;
  onSaveCloud: () => Promise<void>;
  onDownloadInitialData: () => void;
  onUploadInitialData: (file: File) => Promise<void> | void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  books, 
  categories,
  onImport,
  onSaveCloud,
  onDownloadInitialData,
  onUploadInitialData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  
  // UI 訊息回饋
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 替換瀏覽器 confirm 的內部 UI 確認狀態
  const [showCloudConfirm, setShowCloudConfirm] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    onDownloadInitialData();
  };

  const handleUploadInitialData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setMessage(null);
    try {
      await onUploadInitialData(file);
      setMessage({ type: 'success', text: '成功上傳並覆蓋伺服器預設檔案！' });
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: `上傳失敗：${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setIsProcessing(false);
      if (uploadInputRef.current) uploadInputRef.current.value = '';
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setMessage(null);
    
    try {
      const data = await importData(file);
      setTimeout(() => {
          onImport(data.books, data.categories);
          setMessage({ type: 'success', text: `成功匯入 ${data.books.length} 本書籍！` });
          setIsProcessing(false);
          setTimeout(onClose, 1500);
      }, 500);
      
    } catch (err) {
      setIsProcessing(false);
      const errorMsg = err instanceof Error ? err.message : '檔案格式錯誤';
      setMessage({ type: 'error', text: `匯入失敗：${errorMsg}` });
    } finally {
       if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const executeSaveCloud = async () => {
    setShowCloudConfirm(false);
    setIsProcessing(true);
    setMessage(null);
    try {
      await onSaveCloud();
      setMessage({ type: 'success', text: '🎉 雲端快照與本機書籍已成功更新為最新的 initialData.ts 預設資料！' });
      setTimeout(() => setMessage(null), 6000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setMessage({ type: 'error', text: `儲存至雲端快照失敗：${errorMsg}` });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 flex flex-col max-h-[85vh]">
        
        {/* 標題欄 */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 shrink-0">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Nut size={20} className="text-indigo-400" /> 設定與備份
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* 滾動內容區（具備細緻滑桿/滾動條） */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(85vh-80px)] pr-3 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          
          {message && (
            <div className={`p-3 rounded-lg text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
               {message.type === 'success' ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
               <span className="leading-normal font-medium">{message.text}</span>
            </div>
          )}

          <div className="bg-slate-700/30 border border-slate-600/40 rounded-xl p-4 flex items-start gap-3">
             <AlertCircle className="text-indigo-400 shrink-0 mt-0.5" size={18} />
             <div className="text-xs text-slate-200 leading-relaxed">
                這裡提供雲端快照同步、伺服器預設檔案管理以及本地端手動匯入匯出備份，讓您的書庫資料安全無虞。
             </div>
          </div>

          {/* 扁平化按鈕列表 */}
          <div className="space-y-4">
            
            {/* 1. 儲存目前預設資料至雲端 */}
            <div className="space-y-2">
              {!showCloudConfirm ? (
                <button 
                  onClick={() => setShowCloudConfirm(true)}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/50 text-white rounded-xl transition-all font-bold shadow-lg shadow-indigo-600/15 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <RefreshCw size={18} className={isProcessing ? "animate-spin" : ""} />
                  {isProcessing ? '同步處理中...' : '儲存目前的 initialData.ts 至雲端快照'}
                </button>
              ) : (
                <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-3 space-y-2.5 animate-in fade-in slide-in-from-top-1">
                  <div className="text-xs text-indigo-200 font-medium leading-relaxed">
                    ⚠️ 確定要將伺服器上最新的 <b>initialData.ts</b> 覆蓋並儲存至您登入帳號的雲端 Firebase 資料庫中嗎？
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={executeSaveCloud}
                      className="flex-1 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      確定覆蓋雲端
                    </button>
                    <button
                      onClick={() => setShowCloudConfirm(false)}
                      className="flex-1 p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700/50 my-2"></div>

            {/* 2. 下載目前資料 */}
            <div className="space-y-2">
              <button 
                onClick={handleExport}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 p-3.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors border border-slate-600 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                下載目前資料 (initialData.ts)
              </button>
            </div>

            <div className="border-t border-slate-700/50 my-2"></div>

            {/* 3. 上傳並覆蓋伺服器 */}
            <div className="space-y-2">
              <div className="relative">
                <input 
                  ref={uploadInputRef}
                  type="file" 
                  accept=".ts"
                  onChange={handleUploadInitialData}
                  disabled={isProcessing}
                  className="hidden"
                />
                <button 
                  onClick={() => uploadInputRef.current?.click()}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-white rounded-xl transition-colors border border-slate-700 border-dashed text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Upload size={18} />}
                  {isProcessing ? '正在上傳...' : '上傳並覆蓋伺服器預設檔案 (initialData.ts)'}
                </button>
              </div>
            </div>

            <div className="border-t border-slate-700/50 my-2"></div>

            {/* 4. 匯入本地檔案 */}
            <div className="space-y-2">
              <div className="relative">
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".ts,.json,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700 text-sm font-semibold disabled:opacity-50"
                >
                  {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                  {isProcessing ? '正在處理...' : '匯入本地備份檔案'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
