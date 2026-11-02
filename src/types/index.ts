export type PageId =
  | 'dashboard'
  | 'farms'
  | 'crops'
  | 'market'
  | 'weather'
  | 'reports'
  | 'notifications'
  | 'profile'
  | 'settings';

export interface Farm {
  id: string;
  name: string;
  location: string;
  district?: string;
  state?: string;
  area: number;
  areaUnit: string;
  primaryCrop: string;
  soilType: string;
  status: 'Active' | 'Inactive';
  description?: string;
  coordinates?: string;
}

export interface Crop {
  id: string;
  name: string;
  farmId: string;
  farmName: string;
  status: 'Growing' | 'Ready' | 'Completed';
  plantedDate: string;
  harvestDate: string;
  cultivatedArea?: string;
  healthStatus?: 'Excellent' | 'Good' | 'Needs Attention';
  stage?: string;
  notes?: string;
}

export interface MarketItem {
  id: string;
  crop: string;
  market: string;
  pricePerQuintal: number;
  change: number;
  changeType: 'up' | 'down';
  updated: string;
  variety?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  period: string;
  fileType: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  read: boolean;
  type: 'harvest' | 'market' | 'report' | 'system';
  targetPage?: PageId;
}

export interface FarmerProfile {
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  community: string;
  initials: string;
}

export interface NotificationPreferences {
  marketUpdates: boolean;
  harvestReminders: boolean;
  reportUpdates: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
