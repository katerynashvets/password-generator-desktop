import { create } from 'zustand';
import { SettingsType } from '../types/Settings';

const defaultSettings: SettingsType = {
  theme: 'dark',
  defaultLength: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  clearHistoryOnExit: false,
};

type SettingsStore = {
  settings: SettingsType;
  loaded: boolean;
  loadSettings: () => Promise<void>;
  saveSettings: (values: SettingsType) => Promise<void>;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: defaultSettings,
  loaded: false,

  loadSettings: async () => {
    const stored = await window.electronAPI?.getSettings();
    set({ settings: { ...defaultSettings, ...stored }, loaded: true });
  },

  saveSettings: async (values) => {
    for (const key of Object.keys(values) as (keyof SettingsType)[]) {
      await window.electronAPI.setSettings(key, values[key]);
    }
    set({ settings: values });
  },
}));
