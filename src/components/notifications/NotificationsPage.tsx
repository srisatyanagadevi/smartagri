import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Sprout, TrendingUp, FileText, Bell, Clock, Check } from 'lucide-react';
import { NotificationItem } from '../../types/index.ts';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActivePage,
  } = useApp();

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'harvest':
        return <Sprout size={17} />;
      case 'market':
        return <TrendingUp size={17} />;
      case 'report':
        return <FileText size={17} />;
      default:
        return <Bell size={17} />;
    }
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markNotificationAsRead(item.id);
    if (item.targetPage) {
      setActivePage(item.targetPage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Notifications Card matching Reference 5 */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-7 shadow-2xs space-y-4">
        {/* Top Header Row with Title and Mark all as read */}
        <div className="flex items-center justify-between pb-2 border-b border-[#F0F5EE]">
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#172B24] tracking-tight">
            Your notifications
          </h2>

          <button
            onClick={markAllNotificationsAsRead}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#165A36] hover:text-[#11492B] hover:underline cursor-pointer"
          >
            <span>Mark all as read</span>
            <Check size={14} className="text-[#165A36]" />
          </button>
        </div>

        {/* Notification items list */}
        <div className="divide-y divide-[#F0F5EE]">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className="py-4.5 px-2 flex items-start gap-4 hover:bg-[#FAFDF9] rounded-xl transition-colors cursor-pointer group"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-[#EDF5EA] text-[#175A36] border border-[#DCEAD7] flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              {/* Notification Content */}
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-[14px] font-semibold text-[#172B24] group-hover:text-[#165A36] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#55695E] mt-0.5 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#829187] mt-2">
                  <Clock size={12} className="text-[#96A89E]" />
                  <span>{item.timeAgo}</span>
                </div>
              </div>

              {/* Unread Indicator Green Dot */}
              {!item.read && (
                <div className="shrink-0 self-center">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#165A36] block"
                    title="Unread"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
