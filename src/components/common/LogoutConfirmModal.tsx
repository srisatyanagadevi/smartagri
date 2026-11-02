import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { LogOut, X, AlertTriangle } from 'lucide-react';

export const LogoutConfirmModal: React.FC = () => {
  const { isLogoutModalOpen, closeLogoutModal, confirmLogout } = useApp();

  if (!isLogoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[420px] bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E3EAE1] text-center flex flex-col items-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          onClick={closeLogoutModal}
          className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-[#788C80] hover:text-[#172B24] hover:bg-[#EAEFE8] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Warning / Logout Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#FDF2F2] text-[#B83838] flex items-center justify-center border border-[#F8D2D2] mb-4">
          <LogOut size={26} className="translate-x-0.5" />
        </div>

        {/* Title */}
        <h3 className="text-[19px] sm:text-[20px] font-bold text-[#172B24] tracking-tight mb-2">
          Confirm Logout
        </h3>

        {/* Description */}
        <p className="text-[13.5px] text-[#55695E] leading-relaxed mb-6">
          Are you sure you want to log out of your SmartAgri workspace? You will be safely returned to the landing page.
        </p>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={closeLogoutModal}
            className="py-2.5 px-4 rounded-xl border border-[#DCE4DA] bg-white hover:bg-[#F4F8F3] text-[#33463B] text-[13.5px] font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmLogout}
            className="py-2.5 px-4 rounded-xl bg-[#A83232] hover:bg-[#912828] text-white text-[13.5px] font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
