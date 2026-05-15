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
  onUploadInitialData: (file: File) => void;
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
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    onDownloadInitialData();
  };

  const handleUploadInitialData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadInitialData(file);
    }
  };

  const handleCopySource = () => {
    try {
        const code = `
import { Book, CategoryDef } from '../types';

/**
 * 這裡是您的「永久資料庫」。
 * 如果您希望某些書籍或分類在清除瀏覽器快取後仍然存在，
 * 請將您備份的 JSON 資料內容填入這裡。
 */

export const initialCategories: CategoryDef[] = ${JSON.stringify(categories, null, 2)};

export const initialBooks: Book[] = ${JSON.stringify(books, null, 2)};
`;
        navigator.clipboard.writeText(code.trim());
        setMessage({ type: 'success', text: '程式碼已複製！請貼上至 data/initialData.ts' });
    } catch (e) {
        setMessage({ type: 'error', text: '複製失敗' });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (confirm("【注意】匯入將會覆蓋您目前的現有資料。\n\n確定要繼續嗎？")) {
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
    } else {
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveCloud = async () => {
    setIsProcessing(true);
    setMessage(null);
    try {
      await onSaveCloud();
      setMessage({ type: 'success', text: '已成功儲存至雲端快照！' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: '儲存至雲端快照失敗。' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Nut size={20} className="text-indigo-400" /> 設定與備份
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 flex items-start gap-3">
             <AlertCircle className="text-indigo-400 shrink-0 mt-0.5" size={18} />
             <div className="text-sm text-indigo-200">
                <b>永久保存方式：</b><br/>
                點擊下方「下載 initialData.ts」，並覆蓋專案中的 <code>data/initialData.ts</code> 檔案。
             </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleSaveCloud}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors border border-indigo-400/30 font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={20} className={isProcessing ? "animate-spin" : ""} />
              {isProcessing ? '儲存中...' : '儲存至雲端快照 (Firebase)'}
            </button>

            <button 
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 p-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors border border-slate-600 font-medium"
            >
              <Download size={20} />
              下載目前資料 (initialData.ts)
            </button>

            <div className="relative">
              <input 
                ref={uploadInputRef}
                type="file" 
                accept=".ts"
                onChange={handleUploadInitialData}
                className="hidden"
              />
              <button 
                onClick={() => uploadInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 p-4 bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-white rounded-xl transition-colors border border-slate-700 border-dashed"
              >
                <Upload size={20} />
                上傳並覆蓋伺服器 initialData.ts
              </button>
            </div>

            <div className="border-t border-slate-700 my-4 pt-4">
              <div className="text-xs text-slate-500 uppercase font-bold mb-3 tracking-wider">
                本地匯入/匯出 (不影響伺服器)
              </div>
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
                  className="w-full flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700 disabled:opacity-50"
                >
                  {isProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                  {isProcessing ? '正在處理...' : '匯入本地檔案'}
                </button>
              </div>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
               {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
               {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;