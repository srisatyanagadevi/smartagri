import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { FarmerLayout } from './components/layout/FarmerLayout.tsx';
import { LandingPage } from './components/landing/LandingPage.tsx';
import { DashboardPage } from './components/dashboard/DashboardPage.tsx';
import { MyFarmPage } from './components/farms/MyFarmPage.tsx';
import { CropManagementPage } from './components/crops/CropManagementPage.tsx';
import { ReportsPage } from './components/reports/ReportsPage.tsx';
import { NotificationsPage } from './components/notifications/NotificationsPage.tsx';
import { ProfilePage } from './components/profile/ProfilePage.tsx';
import { SettingsPage } from './components/settings/SettingsPage.tsx';
import { MarketInformationPage } from './components/market/MarketInformationPage.tsx';
import { WeatherInformationPage } from './components/weather/WeatherInformationPage.tsx';
import { ToastContainer } from './components/common/Toast.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';
import { CenteredNotificationModal } from './components/common/CenteredNotificationModal.tsx';
import { LogoutConfirmModal } from './components/common/LogoutConfirmModal.tsx';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  const renderActiveScreen = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'farms':
        return <MyFarmPage />;
      case 'crops':
        return <CropManagementPage />;
      case 'reports':
        return <ReportsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'market':
        return <MarketInformationPage />;
      case 'weather':
        return <WeatherInformationPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      {activePage === 'landing' ? (
        <LandingPage />
      ) : (
        <FarmerLayout>{renderActiveScreen()}</FarmerLayout>
      )}

      {/* Global Modals & Notifications */}
      <AuthModal />
      <LogoutConfirmModal />
      <CenteredNotificationModal />
      <ToastContainer />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
