import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Menu, Bell, ChevronDown, User, Settings, LogOut, Check } from 'lucide-react';

export const AdminTopbar: React.FC = () => {
  const {
    toggleSidebar,
    unreadCount,
    profile,
    openLogoutModal,
    addToast,
    markAllNotificationsAsRead,
    setAdminActiveTab,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
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

  return (
    <header className="h-[74px] bg-white border-b border-[#E3EAE1] px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left zone: Hamburger menu button */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-[#55695E] hover:text-[#172B24] hover:bg-[#F2F6F1] transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right zone: Notification Bell + Admin Profile */}
      <div className="flex items-center gap-4 sm:gap-6" ref={dropdownRef}>
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="relative p-2 rounded-lg text-[#55695E] hover:text-[#172B24] hover:bg-[#F2F6F1] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-[#374151]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#15B064] ring-2 ring-white" />
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
                  className="text-[11px] text-[#165A36] hover:underline flex items-center gap-1"
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
              </div>
            </div>
          )}
        </div>

        {/* Profile / Admin Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 py-1 px-2 rounded-xl hover:bg-[#F4F9F2] transition-colors cursor-pointer"
          >
            {/* Circular Dark Avatar with "A" */}
            <div className="w-8 h-8 rounded-full bg-[#1D2532] text-white flex items-center justify-center font-bold text-[13px] shadow-2xs">
              A
            </div>

            <span className="text-[13.5px] font-semibold text-[#172B24]">
              Admin
            </span>

            <ChevronDown
              size={15}
              className={`text-[#829187] transition-transform duration-200 ${
                profileDropdownOpen ? 'rotate-180 text-[#165A36]' : ''
              }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#E3EAE1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-[#2C4035] hover:bg-[#F4F9F2] hover:text-[#165A36] transition-colors text-left"
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
