import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Menu, Search, Bell, ChevronDown, Settings, LogOut, Check, Shield } from 'lucide-react';
import { AdminTab } from '../../types/index.ts';

const adminTabTitleMap: Record<AdminTab, string> = {
  dashboard: 'Admin Dashboard',
  users: 'Platform Users',
  farmers: 'Registered Farmers',
  crops: 'Crop Oversight',
  soil: 'Soil Reports Registry',
  weather: 'Weather Monitoring',
  analytics: 'Platform Analytics',
  reports: 'System Reports',
  settings: 'Platform Settings',
};

export const AdminTopbar: React.FC = () => {
  const {
    toggleSidebar,
    unreadCount,
    profile,
    openLogoutModal,
    addToast,
    markAllNotificationsAsRead,
    adminActiveTab,
    setAdminActiveTab,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminSearch.trim()) return;
    addToast(`Filtering administrative registry for "${adminSearch}"...`, 'info');
  };

  return (
    <header className="h-[76px] bg-white border-b border-[#E3EAE1] px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left zone: Hamburger Menu Toggle matching screenshot */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 -ml-1.5 rounded-lg text-[#172B24] hover:bg-[#F2F7F1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#165A36]/30 cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu size={22} className="text-[#172B24]" />
        </button>
      </div>

      {/* Right zone: Search + Notification Bell + Divider + Profile */}
      <div className="flex items-center gap-3 lg:gap-5" ref={dropdownRef}>
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8E9F94]">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            placeholder="Search platform data..."
            className="w-[200px] lg:w-[240px] pl-9 pr-3 py-2 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] placeholder-[#8E9F94] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
          />
        </form>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="relative p-2 rounded-lg text-[#3E5247] hover:bg-[#F2F7F1] hover:text-[#165A36] transition-colors focus:outline-none cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#165A36] text-white text-[10px] font-semibold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Notification Dropdown */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E3EAE1] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-2 border-b border-[#EAEFE9] flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#172B24]">
                  Admin Alerts
                </span>
                <button
                  onClick={() => {
                    markAllNotificationsAsRead();
                    addToast('All notifications marked as read');
                  }}
                  className="text-[11px] text-[#165A36] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Check size={12} />
                  <span>Mark all read</span>
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto divide-y divide-[#F2F6F1]">
                <div className="p-3 text-[12px] hover:bg-[#F9FBF8]">
                  <p className="font-semibold text-[#172B24]">New user registered</p>
                  <p className="text-[#65786D] text-[11px]">ramu@gmail.com joined 2 mins ago</p>
                </div>
                <div className="p-3 text-[12px] hover:bg-[#F9FBF8]">
                  <p className="font-semibold text-[#172B24]">New crop added: Paddy</p>
                  <p className="text-[#65786D] text-[11px]">Added in East Godavari farm 5 mins ago</p>
                </div>
                <div className="p-3 text-[12px] hover:bg-[#F9FBF8]">
                  <p className="font-semibold text-[#172B24]">Soil report submitted</p>
                  <p className="text-[#65786D] text-[11px]">Farmer123 uploaded new soil lab results</p>
                </div>
                <div className="p-3 text-[12px] hover:bg-[#F9FBF8]">
                  <p className="font-semibold text-[#172B24]">High rainfall warning</p>
                  <p className="text-[#65786D] text-[11px]">Delta region weather advisory triggered</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-7 w-[1px] bg-[#E3EAE1] hidden sm:block" />

        {/* Profile Pill Dropdown matching Farmer styling */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#F2F7F1] transition-colors text-left focus:outline-none group cursor-pointer"
          >
            {/* Avatar with Initials matching Farmer theme */}
            <div className="w-9 h-9 rounded-full bg-[#DFEADA] text-[#1E5E36] font-semibold text-[13px] flex items-center justify-center shrink-0 border border-[#CEE0C7]">
              A
            </div>

            <div className="hidden sm:flex flex-col pr-1">
              <span className="text-[13px] font-semibold text-[#172B24] leading-tight group-hover:text-[#165A36] transition-colors">
                Admin
              </span>
              <span className="text-[11px] text-[#829187] leading-tight">
                Administrator
              </span>
            </div>

            <ChevronDown
              size={15}
              className={`text-[#829187] transition-transform duration-200 ${
                profileDropdownOpen ? 'rotate-180 text-[#165A36]' : ''
              }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E3EAE1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2.5 border-b border-[#EAEFE9]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5EC] text-[#13884D] uppercase tracking-wider">
                    Administrator
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-[#172B24] mt-1">
                  {profile.fullName || 'Admin User'}
                </p>
                <p className="text-[11px] text-[#829187] truncate">
                  {profile.email || 'admin@smartagri.com'}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setAdminActiveTab('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-[#2C4035] hover:bg-[#F4F9F2] hover:text-[#165A36] transition-colors text-left cursor-pointer"
                >
                  <Settings size={14} />
                  <span>Platform Settings</span>
                </button>
              </div>

              <div className="border-t border-[#EAEFE9] pt-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    openLogoutModal();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-[#A33A3A] hover:bg-[#FDF2F2] transition-colors text-left cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
