
// Add React import to resolve React.ReactNode type reference
import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export interface SiteInfo {
  id: string;
  name: string;
  manager: string;
}