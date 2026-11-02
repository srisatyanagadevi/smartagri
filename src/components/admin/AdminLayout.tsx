import React from 'react';
import { AdminSidebar } from './AdminSidebar.tsx';
import { AdminTopbar } from './AdminTopbar.tsx';
import { Footer } from '../layout/Footer.tsx';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F6F9F6] text-[#172B24] flex flex-col font-sans antialiased">
      {/* Fixed Left Sidebar matching Farmer layout */}
      <AdminSidebar />

      {/* Main Content Area with desktop left padding matching sidebar width */}
      <div className="flex-1 lg:pl-[235px] flex flex-col min-w-0 transition-all duration-300">
        <AdminTopbar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 w-full max-w-[1400px] mx-auto">
          <div className="w-full">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
