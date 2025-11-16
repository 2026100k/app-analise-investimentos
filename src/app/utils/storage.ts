// Local Storage utilities

import { UserProfile, Notification } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'investment_user_profile',
  NOTIFICATIONS: 'investment_notifications',
  WATCHLIST: 'investment_watchlist',
};

export const storage = {
  // User Profile
  saveUserProfile: (profile: UserProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    }
  },

  getUserProfile: (): UserProfile | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  // Notifications
  saveNotifications: (notifications: Notification[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  },

  getNotifications: (): Notification[] => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    }
    return [];
  },

  // Watchlist
  saveWatchlist: (watchlist: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
    }
  },

  getWatchlist: (): string[] => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      return data ? JSON.parse(data) : [];
    }
    return [];
  },
};
