import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut, Check } from 'lucide-react';
import { PageId } from '../../types/index.ts';

const pageTitleMap: Record<PageId, string> = {
  landing: 'Home',
  dashboard: 'Dashboard',
  farms: 'My Farm',
  crops: 'Crop Management',
  market: 'Market Information',
  weather: 'Weather Information',
  reports: 'Reports',
  notifications: 'Notifications',
  profile: 'Profile',
  settings: 'Settings',
};

export const Topbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    toggleSidebar,
    unreadCount,
    profile,
    globalSearchQuery,
    setGlobalSearchQuery,
    addToast,
    markAllNotificationsAsRead,
    openLogoutModal,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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
    if (!globalSearchQuery.trim()) return;
    addToast(`Searching for "${globalSearchQuery}" across farms, crops and records...`, 'info');
  };

  // Guard against any leftover 'Admin' name or avatar in Farmer workspace
  const isFarmerRole = profile.role === 'Farmer';
  const displayFarmerName = isFarmerRole && profile.fullName.toLowerCase() === 'admin'
    ? (profile.email && !profile.email.toLowerCase().includes('admin')
        ? profile.email.split('@')[0].charAt(0).toUpperCase() + profile.email.split('@')[0].slice(1)
        : 'Ravi Kumar')
    : (profile.fullName || 'Ravi Kumar');

  const displayFarmerInitials = isFarmerRole && (profile.fullName.toLowerCase() === 'admin' || profile.initials === 'A')
    ? (displayFarmerName === 'Ravi Kumar' ? 'RK' : displayFarmerName.slice(0, 2).toUpperCase())
    : (profile.initials || 'RK');

  return (
    <header className="h-[76px] bg-white border-b border-[#E3EAE1] px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left zone: Hamburger + Title + Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-1.5 -ml-1.5 rounded-lg text-[#172B24] hover:bg-[#F2F7F1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#165A36]/30"
          aria-label="Toggle navigation"
        >
          <Menu size={20} className="text-[#172B24]" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-[20px] lg:text-[22px] font-semibold text-[#172B24] leading-tight tracking-tight">
            {pageTitleMap[activePage] || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-1.5 text-[11px] text-[#829187] mt-0.5">
            <span
              onClick={() => setActivePage('dashboard')}
              className="hover:text-[#165A36] cursor-pointer transition-colors"
            >
              Home
            </span>
            <span>/</span>
            <span className="font-medium text-[#4D6257]">
              {pageTitleMap[activePage] || 'Dashboard'}
            </span>
          </div>
        </div>
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
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search anything..."
            className="w-[200px] lg:w-[240px] pl-9 pr-3 py-2 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] placeholder-[#8E9F94] focus:outline-none focus:border-[#165A36] focus:bg-white transition-all shadow-2xs"
          />
        </form>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setActivePage('notifications')}
            className="relative p-2 rounded-lg text-[#3E5247] hover:bg-[#F2F7F1] hover:text-[#165A36] transition-colors focus:outline-none"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 rounded-full bg-[#165A36] text-white text-[10px] font-semibold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-7 w-[1px] bg-[#E3EAE1] hidden sm:block" />

        {/* Profile Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#F2F7F1] transition-colors text-left focus:outline-none group cursor-pointer"
            aria-expanded={profileDropdownOpen}
          >
            {/* Avatar with Initials */}
            <div className="w-9 h-9 rounded-full bg-[#DFEADA] text-[#1E5E36] font-medium text-[13px] flex items-center justify-center shrink-0 border border-[#CEE0C7]">
              {displayFarmerInitials}
            </div>

            {/* Name and Role */}
            <div className="hidden sm:flex flex-col pr-1">
              <span className="text-[13px] font-semibold text-[#172B24] leading-tight group-hover:text-[#165A36] transition-colors">
                {displayFarmerName}
              </span>
              <span className="text-[11px] text-[#829187] leading-tight">
                Farmer
              </span>
            </div>

            <ChevronDown
              size={15}
              className={`text-[#829187] transition-transform duration-200 ${
                profileDropdownOpen ? 'rotate-180 text-[#165A36]' : ''
              }`}
            />
          </button>

          {/* Profile Menu Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E3EAE1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-[#EAEFE9]">
                <p className="text-[13px] font-semibold text-[#172B24]">
                  {displayFarmerName}
                </p>
                <p className="text-[11px] text-[#829187] truncate">
                  {profile.email}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActivePage('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#2C4035] hover:bg-[#F4F9F2] hover:text-[#165A36] transition-colors text-left"
                >
                  <User size={15} />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#2C4035] hover:bg-[#F4F9F2] hover:text-[#165A36] transition-colors text-left"
                >
                  <Settings size={15} />
                  <span>Notification Settings</span>
                </button>
              </div>

              <div className="border-t border-[#EAEFE9] pt-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    openLogoutModal();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-[#A33A3A] hover:bg-[#FDF2F2] transition-colors text-left cursor-pointer"
                >
                  <LogOut size={15} />
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
