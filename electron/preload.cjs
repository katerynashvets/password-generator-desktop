const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (key, value) => ipcRenderer.invoke('settings:set', key, value),
});
