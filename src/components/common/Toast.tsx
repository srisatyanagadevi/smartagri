import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 size={16} className="text-[#1E5E36] shrink-0" />;
        let borderClass = 'border-[#CDE0C7] bg-[#F4F9F2] text-[#172B24]';

        if (toast.type === 'error') {
          icon = <AlertCircle size={16} className="text-[#C43E3E] shrink-0" />;
          borderClass = 'border-[#F8D5D5] bg-[#FFF5F5] text-[#7A1E1E]';
        } else if (toast.type === 'info') {
          icon = <Info size={16} className="text-[#2C6291] shrink-0" />;
          borderClass = 'border-[#D4E4F5] bg-[#F2F8FD] text-[#1C4368]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-md text-[13px] font-medium animate-in fade-in slide-in-from-bottom-2 duration-200 ${borderClass}`}
          >
            {icon}
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-current opacity-60 hover:opacity-100 p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
