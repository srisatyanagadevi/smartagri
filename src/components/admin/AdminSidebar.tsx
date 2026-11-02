import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { AdminTab } from '../../types/index.ts';
import {
  Home,
  Users,
  UserCheck,
  Sprout,
  FileCheck,
  CloudSun,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

interface AdminNavItem {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export const AdminSidebar: React.FC = () => {
  const {
    adminActiveTab,
    setAdminActiveTab,
    sidebarOpen,
    setSidebarOpen,
    openLogoutModal,
  } = useApp();

  const navItems: AdminNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'farmers', label: 'Farmers', icon: UserCheck },
    { id: 'crops', label: 'Crops', icon: Sprout },
    { id: 'soil', label: 'Soil Reports', icon: FileCheck },
    { id: 'weather', label: 'Weather Data', icon: CloudSun },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (tabId: AdminTab) => {
    setAdminActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    openLogoutModal();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container matching screenshot exact styling */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1D2532] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#151D28] shadow-xl lg:shadow-none lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo Brand Header */}
        <div>
          <div className="h-[74px] px-6 flex items-center justify-between border-b border-[#263142]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#15B064]/20 text-[#15B064] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-[#22C55E]"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <span className="text-[19px] font-bold tracking-tight text-white">
                SmartAgri
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#8B98A5] hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X size={19} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminActiveTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#13884D] text-white shadow-xs font-semibold'
                      : 'text-[#9EACB8] hover:text-white hover:bg-[#253040]'
                  }`}
                >
                  <Icon
                    size={17}
                    className={`shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-[#8495A5]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Logout */}
        <div className="p-4 border-t border-[#263142]/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#9EACB8] hover:text-white hover:bg-[#253040] transition-colors text-left cursor-pointer"
          >
            <LogOut size={17} className="text-[#8495A5] shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
