import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const CenteredNotificationModal: React.FC = () => {
  const { centeredNotification, closeCenteredNotification } = useApp();

  if (!centeredNotification) return null;

  const { title, message, type = 'success', actionLabel = 'Continue', onAction } = centeredNotification;

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    closeCenteredNotification();
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center border border-red-200">
            <AlertTriangle size={28} />
          </div>
        );
      case 'info':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#E8F1FC] text-[#2563EB] flex items-center justify-center border border-[#CFE0F8]">
            <Info size={28} />
          </div>
        );
      case 'success':
      default:
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#EAF4E6] text-[#165A36] flex items-center justify-center border border-[#D0E6CA]">
            <CheckCircle2 size={30} />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[440px] bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DCE8D8] text-center flex flex-col items-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeCenteredNotification}
          className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-[#788C80] hover:text-[#172B24] hover:bg-[#EAEFE8] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mb-4">{getIcon()}</div>

        {/* Title */}
        <h3 className="text-[19px] sm:text-[21px] font-bold text-[#172B24] tracking-tight mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-[13.5px] text-[#55695E] leading-relaxed mb-6 max-w-sm">
          {message}
        </p>

        {/* Action Button */}
        <button
          onClick={handleAction}
          className="w-full py-3 px-5 rounded-xl bg-[#165A36] hover:bg-[#124D2E] text-white text-[14px] font-semibold transition-all shadow-xs cursor-pointer"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};
