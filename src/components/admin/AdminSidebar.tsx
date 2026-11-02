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
  Shield,
} from 'lucide-react';

interface AdminNavItem {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number;
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
    { id: 'users', label: 'Users', icon: Users, badge: 12 },
    { id: 'farmers', label: 'Farmers', icon: UserCheck },
    { id: 'crops', label: 'Crops', icon: Sprout },
    { id: 'soil', label: 'Soil Reports', icon: FileCheck, badge: 3 },
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
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container matching Farmer Sidebar's exact green theme */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[235px] bg-[#165A36] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-6 pb-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center justify-between px-2 mb-6">
            <div
              onClick={() => handleTabClick('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              {/* Leaf Mark SVG */}
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                >
                  <path
                    d="M6 21C6 14 11 7 21 6C21 16 14 21 6 21Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 17C14 14 18 10 21 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-[22px] font-semibold tracking-tight text-white font-['Inter']">
                SmartAgri<span className="text-[#96DEAE]">.</span>
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 lg:hidden"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          {/* Section Heading */}
          <div className="px-2 mb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8DBE9F] uppercase select-none">
              Admin Portal
            </p>
            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-[#11482B] text-[#9EE2B7] uppercase tracking-wider border border-[#217046]">
              Admin
            </span>
          </div>

          {/* Nav List */}
          <nav className="space-y-1" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const isActive = adminActiveTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-[#DDEAD0] text-[#1E5633] shadow-xs font-semibold'
                      : 'text-[#C1DBC7] hover:text-white hover:bg-[#1C6941]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#1E5633]'
                          : 'text-[#9FC6AA] group-hover:text-white'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-full min-w-5 text-center leading-tight ${
                        isActive
                          ? 'bg-[#1E5633] text-white'
                          : 'bg-[#0E4325] text-[#A6E2BA] border border-[#227145]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-3">
          {/* Promotional / Control Card */}
          <div className="bg-[#124B2C] border border-[#206840] rounded-xl p-3.5 text-white select-none hidden sm:block">
            <div className="flex items-center gap-2 mb-1.5">
              <Shield size={16} className="text-[#96DEAE]" />
              <span className="text-[12px] font-semibold text-[#D3EEDC]">
                Admin Control Center
              </span>
            </div>
            <p className="text-[11px] text-[#A2C7B0] leading-snug">
              Platform analytics and agricultural compliance monitoring.
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-[#C1DBC7] hover:text-white hover:bg-[#1C6941] transition-colors cursor-pointer"
          >
            <LogOut size={17} className="text-[#9FC6AA]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
