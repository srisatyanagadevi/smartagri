import React from 'react';
import { AdminSidebar } from './AdminSidebar.tsx';
import { AdminTopbar } from './AdminTopbar.tsx';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#F6F9F6] text-[#172B24] font-sans antialiased">
      {/* Dark Navy Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
