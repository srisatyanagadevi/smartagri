import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageId,
  Farm,
  Crop,
  MarketItem,
  ReportItem,
  NotificationItem,
  FarmerProfile,
  NotificationPreferences,
  ToastMessage,
} from '../types/index.ts';

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;

  farms: Farm[];
  addFarm: (farm: Omit<Farm, 'id'>) => void;
  updateFarm: (id: string, farm: Partial<Farm>) => void;
  deleteFarm: (id: string) => void;

  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (id: string, crop: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;

  marketItems: MarketItem[];
  reports: ReportItem[];
  downloadReportCSV: (report: ReportItem) => void;

  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  profile: FarmerProfile;
  updateProfile: (profile: Partial<FarmerProfile>) => void;

  preferences: NotificationPreferences;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;

  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Active modals
  isAddFarmOpen: boolean;
  setIsAddFarmOpen: (open: boolean) => void;
  isAddCropOpen: boolean;
  setIsAddCropOpen: (open: boolean) => void;
  viewingFarm: Farm | null;
  setViewingFarm: (farm: Farm | null) => void;
  editingFarm: Farm | null;
  setEditingFarm: (farm: Farm | null) => void;
}

const initialFarms: Farm[] = [
  {
    id: 'farm-1',
    name: 'Green Valley Farm',
    location: 'East Godavari',
    district: 'East Godavari',
    state: 'Andhra Pradesh',
    area: 12,
    areaUnit: 'Acres',
    primaryCrop: 'Rice',
    soilType: 'Alluvial',
    status: 'Active',
    description: 'Main alluvial river delta farm with automated drip irrigation and organic soil treatment.',
    coordinates: '16.9891° N, 81.7840° E',
  },
  {
    id: 'farm-2',
    name: 'Sunrise Fields',
    location: 'Rajahmundry',
    district: 'East Godavari',
    state: 'Andhra Pradesh',
    area: 8,
    areaUnit: 'Acres',
    primaryCrop: 'Maize',
    soilType: 'Black soil',
    status: 'Active',
    description: 'Elevated black cotton soil block ideal for heavy maize and legume rotations.',
    coordinates: '17.0005° N, 81.8040° E',
  },
  {
    id: 'farm-3',
    name: 'Meadow Brook Farm',
    location: 'Kakinada',
    district: 'Kakinada',
    state: 'Andhra Pradesh',
    area: 5,
    areaUnit: 'Acres',
    primaryCrop: 'Tomato',
    soilType: 'Loamy',
    status: 'Active',
    description: 'Well-drained coastal loamy parcel dedicated to protected vegetable cultivation.',
    coordinates: '16.9890° N, 82.2475° E',
  },
];

const initialCrops: Crop[] = [
  {
    id: 'crop-1',
    name: 'Rice',
    farmId: 'farm-1',
    farmName: 'Green Valley Farm',
    status: 'Growing',
    plantedDate: '15 Aug 2026',
    harvestDate: '20 Nov 2026',
    cultivatedArea: '6 Acres',
    healthStatus: 'Excellent',
    stage: 'Tillering',
    notes: 'BPT 5204 Samba Mahsuri variety. Healthy canopy with optimal water ponding.',
  },
  {
    id: 'crop-2',
    name: 'Maize',
    farmId: 'farm-2',
    farmName: 'Sunrise Fields',
    status: 'Growing',
    plantedDate: '28 Aug 2026',
    harvestDate: '28 Nov 2026',
    cultivatedArea: '4 Acres',
    healthStatus: 'Good',
    stage: 'Knee-high vegetative',
    notes: 'Hybrid Pioneer 3396. Fertilizer basal application completed on schedule.',
  },
  {
    id: 'crop-3',
    name: 'Tomato',
    farmId: 'farm-3',
    farmName: 'Meadow Brook Farm',
    status: 'Ready',
    plantedDate: '20 Jun 2026',
    harvestDate: '19 Sep 2026',
    cultivatedArea: '3 Acres',
    healthStatus: 'Excellent',
    stage: 'Ripening / Picking',
    notes: 'Arka Rakshak variety. First batch harvest planned for tomorrow morning.',
  },
  {
    id: 'crop-4',
    name: 'Groundnut',
    farmId: 'farm-1',
    farmName: 'Green Valley Farm',
    status: 'Completed',
    plantedDate: '10 May 2026',
    harvestDate: '12 Sep 2026',
    cultivatedArea: '3.5 Acres',
    healthStatus: 'Good',
    stage: 'Harvested & Cured',
    notes: 'K6 Kadiri variety. 28 quintals harvested and stored in dry warehouse.',
  },
  {
    id: 'crop-5',
    name: 'Rice',
    farmId: 'farm-2',
    farmName: 'Sunrise Fields',
    status: 'Growing',
    plantedDate: '20 Aug 2026',
    harvestDate: '25 Nov 2026',
    cultivatedArea: '4 Acres',
    healthStatus: 'Good',
    stage: 'Vegetative',
    notes: 'Swarna sub1 flood-tolerant variety. Excellent root anchorage.',
  },
  {
    id: 'crop-6',
    name: 'Maize',
    farmId: 'farm-1',
    farmName: 'Green Valley Farm',
    status: 'Growing',
    plantedDate: '01 Sep 2026',
    harvestDate: '01 Dec 2026',
    cultivatedArea: '2.5 Acres',
    healthStatus: 'Excellent',
    stage: 'Seedling emergence',
    notes: 'Sweet corn trial block with mulched rows.',
  },
  {
    id: 'crop-7',
    name: 'Tomato',
    farmId: 'farm-3',
    farmName: 'Meadow Brook Farm',
    status: 'Growing',
    plantedDate: '15 Jul 2026',
    harvestDate: '15 Oct 2026',
    cultivatedArea: '2 Acres',
    healthStatus: 'Good',
    stage: 'Flowering & Fruit set',
    notes: 'Staked trellises with organic neem pest spray application.',
  },
  {
    id: 'crop-8',
    name: 'Groundnut',
    farmId: 'farm-2',
    farmName: 'Sunrise Fields',
    status: 'Growing',
    plantedDate: '10 Jul 2026',
    harvestDate: '15 Oct 2026',
    cultivatedArea: '4 Acres',
    healthStatus: 'Good',
    stage: 'Pod development',
    notes: 'Gypsum application completed to promote solid pod filling.',
  },
];

const initialMarketItems: MarketItem[] = [
  {
    id: 'market-1',
    crop: 'Rice',
    market: 'Kakinada Market',
    pricePerQuintal: 2450,
    change: 4.2,
    changeType: 'up',
    updated: '18 Sep, 10:30 AM',
    variety: 'Samba Mahsuri Grade A',
  },
  {
    id: 'market-2',
    crop: 'Maize',
    market: 'Rajahmundry Market',
    pricePerQuintal: 2100,
    change: 2.1,
    changeType: 'up',
    updated: '18 Sep, 10:15 AM',
    variety: 'Feed Quality Hybrid',
  },
  {
    id: 'market-3',
    crop: 'Groundnut',
    market: 'Guntur Market',
    pricePerQuintal: 6200,
    change: -1.3,
    changeType: 'down',
    updated: '18 Sep, 10:00 AM',
    variety: 'Bold Pods 70/80',
  },
  {
    id: 'market-4',
    crop: 'Tomato',
    market: 'Madanapalle Market',
    pricePerQuintal: 1850,
    change: 5.8,
    changeType: 'up',
    updated: '18 Sep, 09:45 AM',
    variety: 'Hybrid Red Firm',
  },
  {
    id: 'market-5',
    crop: 'Cotton',
    market: 'Adilabad Market',
    pricePerQuintal: 7420,
    change: -0.8,
    changeType: 'down',
    updated: '18 Sep, 09:30 AM',
    variety: 'Medium Staple',
  },
];

const initialReports: ReportItem[] = [
  {
    id: 'rep-1',
    title: 'Farm Overview',
    period: 'September 2026',
    fileType: 'Sample CSV',
    description: 'Consolidated acreage, soil classifications, water usage metrics, and active farm boundaries.',
  },
  {
    id: 'rep-2',
    title: 'Crop Summary',
    period: 'September 2026',
    fileType: 'Sample CSV',
    description: 'Current growth status, planted areas, expected yields, and cultivation milestones across all fields.',
  },
  {
    id: 'rep-3',
    title: 'Market Price Summary',
    period: 'September 2026',
    fileType: 'Sample CSV',
    description: 'Regional mandi price trends, 30-day moving averages, and commodity price comparisons for East Godavari.',
  },
  {
    id: 'rep-4',
    title: 'Harvest Schedule',
    period: 'September 2026',
    fileType: 'Sample CSV',
    description: 'Upcoming harvest windows, labor allocation plan, transport logistics, and warehouse bay reservations.',
  },
  {
    id: 'rep-5',
    title: 'Farm Activity Summary',
    period: 'September 2026',
    fileType: 'Sample CSV',
    description: 'Daily operational log of sowing, spraying, irrigation cycles, inspection notes, and soil amendments.',
  },
  {
    id: 'rep-6',
    title: 'Season Planning',
    period: 'September 2026',
    fileType: 'Sample CSV',
    description: 'Kharif-Rabi transition roadmap, seed procurement estimates, fertilizer budgeting, and crop rotation matrix.',
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Your tomatoes are ready for harvest',
    description: 'The expected harvest for Meadow Brook Farm is tomorrow. Review your crop plan.',
    timeAgo: '10 minutes ago',
    timestamp: '18 Sep 2026, 11:20 AM',
    read: false,
    type: 'harvest',
    targetPage: 'crops',
  },
  {
    id: 'notif-2',
    title: 'Rice prices are trending up',
    description: 'The sample Kakinada Market price has increased by 4.2%. Take a look at the latest market information.',
    timeAgo: '35 minutes ago',
    timestamp: '18 Sep 2026, 10:55 AM',
    read: false,
    type: 'market',
    targetPage: 'market',
  },
  {
    id: 'notif-3',
    title: 'Your September farm report is available',
    description: 'Review your farm and crop summary in Reports.',
    timeAgo: '1 hour ago',
    timestamp: '18 Sep 2026, 10:30 AM',
    read: false,
    type: 'report',
    targetPage: 'reports',
  },
];

const initialProfile: FarmerProfile = {
  fullName: 'Ravi Kumar',
  email: 'ravi.kumar@example.com',
  mobile: '+91 98765 43210',
  role: 'Farmer',
  community: 'Farmer · SmartAgri community',
  initials: 'RK',
};

const initialPreferences: NotificationPreferences = {
  marketUpdates: true,
  harvestReminders: true,
  reportUpdates: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Persistent-friendly state
  const [farms, setFarms] = useState<Farm[]>(() => {
    try {
      const saved = localStorage.getItem('smartagri_farms');
      return saved ? JSON.parse(saved) : initialFarms;
    } catch {
      return initialFarms;
    }
  });

  const [crops, setCrops] = useState<Crop[]>(() => {
    try {
      const saved = localStorage.getItem('smartagri_crops');
      return saved ? JSON.parse(saved) : initialCrops;
    } catch {
      return initialCrops;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('smartagri_notifications');
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [profile, setProfile] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem('smartagri_profile');
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    try {
      const saved = localStorage.getItem('smartagri_preferences');
      return saved ? JSON.parse(saved) : initialPreferences;
    } catch {
      return initialPreferences;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [viewingFarm, setViewingFarm] = useState<Farm | null>(null);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('smartagri_farms', JSON.stringify(farms));
    } catch (e) {
      console.warn('Failed to save farms to local storage', e);
    }
  }, [farms]);

  useEffect(() => {
    try {
      localStorage.setItem('smartagri_crops', JSON.stringify(crops));
    } catch (e) {
      console.warn('Failed to save crops to local storage', e);
    }
  }, [crops]);

  useEffect(() => {
    try {
      localStorage.setItem('smartagri_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications to local storage', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('smartagri_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to local storage', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('smartagri_preferences', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Failed to save preferences to local storage', e);
    }
  }, [preferences]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const addFarm = (farmData: Omit<Farm, 'id'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: `farm-${Date.now()}`,
    };
    setFarms((prev) => [newFarm, ...prev]);
    addToast(`Farm "${newFarm.name}" added successfully.`);
  };

  const updateFarm = (id: string, farmData: Partial<Farm>) => {
    setFarms((prev) =>
      prev.map((farm) => (farm.id === id ? { ...farm, ...farmData } : farm))
    );
    // If farm name changed, also update crop farm names
    if (farmData.name) {
      setCrops((prev) =>
        prev.map((c) => (c.farmId === id ? { ...c, farmName: farmData.name! } : c))
      );
    }
    addToast('Farm updated successfully.');
  };

  const deleteFarm = (id: string) => {
    const target = farms.find((f) => f.id === id);
    setFarms((prev) => prev.filter((f) => f.id !== id));
    addToast(`Farm "${target?.name || ''}" removed.`, 'info');
  };

  const addCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`,
    };
    setCrops((prev) => [newCrop, ...prev]);
    addToast(`Crop "${newCrop.name}" registered successfully.`);
  };

  const updateCrop = (id: string, cropData: Partial<Crop>) => {
    setCrops((prev) =>
      prev.map((crop) => (crop.id === id ? { ...crop, ...cropData } : crop))
    );
    addToast('Crop record updated successfully.');
  };

  const deleteCrop = (id: string) => {
    const target = crops.find((c) => c.id === id);
    setCrops((prev) => prev.filter((c) => c.id !== id));
    addToast(`Crop record "${target?.name || ''}" archived.`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read.');
  };

  const updateProfile = (data: Partial<FarmerProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      if (data.fullName) {
        const parts = data.fullName.trim().split(/\s+/);
        updated.initials = parts
          .slice(0, 2)
          .map((p) => p[0]?.toUpperCase() || '')
          .join('');
      }
      return updated;
    });
    addToast('Profile updated successfully.');
  };

  const updatePreferences = (data: Partial<NotificationPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...data }));
    addToast('Notification preferences saved.');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const downloadReportCSV = (report: ReportItem) => {
    let csvContent = '';
    const dateStr = new Date().toISOString().split('T')[0];

    if (report.title.includes('Farm')) {
      csvContent = 'Farm ID,Farm Name,Location,District,State,Total Area (Acres),Primary Crop,Soil Type,Status\n';
      farms.forEach((f) => {
        csvContent += `"${f.id}","${f.name}","${f.location}","${f.district || ''}","${f.state || ''}",${f.area},"${f.primaryCrop}","${f.soilType}","${f.status}"\n`;
      });
    } else if (report.title.includes('Crop')) {
      csvContent = 'Crop ID,Crop Name,Farm Name,Status,Planted Date,Expected Harvest,Cultivated Area,Health Status,Stage\n';
      crops.forEach((c) => {
        csvContent += `"${c.id}","${c.name}","${c.farmName}","${c.status}","${c.plantedDate}","${c.harvestDate}","${c.cultivatedArea || ''}","${c.healthStatus || ''}","${c.stage || ''}"\n`;
      });
    } else if (report.title.includes('Market')) {
      csvContent = 'Commodity,Market,Price Per Quintal (INR),Change (%),Price Direction,Last Updated\n';
      initialMarketItems.forEach((m) => {
        csvContent += `"${m.crop}","${m.market}",${m.pricePerQuintal},${m.change},"${m.changeType}","${m.updated}"\n`;
      });
    } else {
      csvContent = 'Category,Item,Farm,Scheduled Date,Status,Assigned Lead\n';
      crops.forEach((c) => {
        csvContent += `"Harvest Plan","${c.name}","${c.farmName}","${c.harvestDate}","${c.status}","Ravi Kumar"\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTitle = report.title.toLowerCase().replace(/\s+/g, '_');
    link.setAttribute('href', url);
    link.setAttribute('download', `smartagri_${safeTitle}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Downloaded ${report.title} (${report.period}).`);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        globalSearchQuery,
        setGlobalSearchQuery,

        farms,
        addFarm,
        updateFarm,
        deleteFarm,

        crops,
        addCrop,
        updateCrop,
        deleteCrop,

        marketItems: initialMarketItems,
        reports: initialReports,
        downloadReportCSV,

        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,

        profile,
        updateProfile,

        preferences,
        updatePreferences,

        toasts,
        addToast,
        removeToast,

        isAddFarmOpen,
        setIsAddFarmOpen,
        isAddCropOpen,
        setIsAddCropOpen,
        viewingFarm,
        setViewingFarm,
        editingFarm,
        setEditingFarm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
