'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/settings';

const SettingsContext = createContext<SiteSettings>(DEFAULT_SITE_SETTINGS);

export function SettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings?: SiteSettings;
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings || DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    // Keep settings refreshed on client side
    fetch('/api/settings')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SiteSettings {
  const context = useContext(SettingsContext);
  return context || DEFAULT_SITE_SETTINGS;
}
