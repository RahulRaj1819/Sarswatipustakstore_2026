import React from 'react';
import { StoreSettings } from '../../types';

interface AnnouncementBarProps {
  settings?: StoreSettings;
  onOpenBooklist?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = () => {
  // Announcement bar has been removed for a clean, user-friendly interface
  return null;
};

