import Store from 'electron-store';

const store = new Store({
  defaults: {
    settings: {
      theme: 'dark',
      defaultLength: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    },
  },
});

export default store;
