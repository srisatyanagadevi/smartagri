import React from 'react';
import { Sidebar } from './Sidebar.tsx';
import { Topbar } from './Topbar.tsx';
import { PageIntro } from './PageIntro.tsx';
import { Footer } from './Footer.tsx';
import { ToastContainer } from '../common/Toast.tsx';
import { AddFarmModal } from '../farms/AddFarmModal.tsx';
import { FarmDetailModal } from '../farms/FarmDetailModal.tsx';
import { AddCropModal } from '../crops/AddCropModal.tsx';

interface FarmerLayoutProps {
  children: React.ReactNode;
}

export const FarmerLayout: React.FC<FarmerLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F6F9F6] text-[#172B24] flex flex-col">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[235px] flex flex-col transition-all duration-300">
        {/* Top Navigation */}
        <Topbar />

        {/* Inner Page Viewport */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 w-full max-w-[1400px] mx-auto">
          {/* Page Introduction Banner */}
          <PageIntro />

          {/* Page-Specific Content */}
          <div className="w-full">
            {children}
          </div>

          {/* Application Footer */}
          <Footer />
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <AddFarmModal />
      <FarmDetailModal />
      <AddCropModal />
      <ToastContainer />
    </div>
  );
};
