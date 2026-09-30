'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';

type ThemeContextValue = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSettingsStore((s) => s.settings.theme);
  const loadSettings = useSettingsStore((s) => s.loadSettings);
  // Unsaved preview from the settings page; falls back to the stored theme.
  const [preview, setIsDark] = useState<boolean | null>(null);
  const isDark = preview ?? theme !== 'light';

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
