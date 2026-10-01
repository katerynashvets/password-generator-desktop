interface ElectronAPI {
  test: () => string;
  getSettings: () => Promise<{
    theme: 'light' | 'dark';
    defaultLength: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  }>;
  setSettings: (
    key:
      | 'theme'
      | 'defaultLength'
      | 'includeUppercase'
      | 'includeLowercase'
      | 'includeNumbers'
      | 'includeSymbols',
    value: string | number | boolean,
  ) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
