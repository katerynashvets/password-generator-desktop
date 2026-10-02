import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import store from './store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1100,
    minHeight: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile(path.join(__dirname, '../out/index.html'));
  }
}

app.whenReady().then(() => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    let url = request.url.replace('file://', '');
    if (!url.includes('.')) {
      url = path.join(__dirname, '../out', url, 'index.html');
    }
    callback({ path: url });
  });

  ipcMain.handle('settings:get', () => {
    return store.get('settings');
  });

  ipcMain.handle('settings:set', (_, key, value) => {
    store.set(`settings.${key}`, value);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
