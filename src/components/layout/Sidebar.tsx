import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { PageId } from '../../types/index.ts';
import {
  LayoutDashboard,
  Home,
  Sprout,
  TrendingUp,
  Sun,
  FileText,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ExternalLink,
  Globe,
  X,
} from 'lucide-react';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    sidebarOpen,
    setSidebarOpen,
    unreadCount,
    addToast,
  } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'farms', label: 'My Farm', icon: Home },
    { id: 'crops', label: 'Crop Management', icon: Sprout },
    { id: 'market', label: 'Market Information', icon: TrendingUp },
    { id: 'weather', label: 'Weather Information', icon: Sun },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    setActivePage('landing');
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    addToast('You have been logged out. Returned to SmartAgri landing page.', 'info');
  };

  const handleHelp = () => {
    addToast('Opening SmartAgri Farmer Support Center (Documentation & Toll-Free 1800-AGRI-CARE)', 'info');
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

      {/* Sidebar Container */}
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
              onClick={() => handleNavClick('dashboard')}
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
          <div className="px-2 mb-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8DBE9F] uppercase select-none">
              Workspace
            </p>
          </div>

          {/* Nav List */}
          <nav className="space-y-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all group ${
                    isActive
                      ? 'bg-[#DDEAD0] text-[#1E5633] shadow-xs'
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
        <div className="p-4 pt-2 border-t border-[#1C643D]/40 space-y-3">
          {/* Promo Card matching screenshot */}
          <div className="rounded-xl bg-[#114E2B] border border-[#1D6039] p-3.5 relative overflow-hidden">
            <div className="w-6 h-6 mb-2 text-[#9AD6AF]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12a10 10 0 0 1 10-10z" className="opacity-0" />
                <path d="M5 19C5 12 9 6 19 5C19 15 13 19 5 19Z" />
                <path d="M8 16L19 5" />
              </svg>
            </div>
            <h4 className="text-[13px] font-semibold text-white leading-snug">
              A little smarter.
              <br />
              A whole lot greener.
            </h4>
            <p className="text-[11px] text-[#86B798] mt-1.5 leading-normal">
              Your next season starts here.
            </p>
          </div>

          {/* Landing Page */}
          <button
            onClick={() => handleNavClick('landing')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#C1DBC7] hover:text-white hover:bg-[#1C6941] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Globe size={17} className="text-[#9FC6AA]" />
              <span>Landing Page</span>
            </div>
            <ExternalLink size={13} className="text-[#84B091]" />
          </button>

          {/* Help & Support */}
          <button
            onClick={handleHelp}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] text-[#C1DBC7] hover:text-white hover:bg-[#1C6941] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle size={17} className="text-[#9FC6AA]" />
              <span>Help &amp; Support</span>
            </div>
            <ExternalLink size={14} className="text-[#84B091]" />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[#C1DBC7] hover:text-white hover:bg-[#1C6941] transition-colors"
          >
            <LogOut size={17} className="text-[#9FC6AA]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
