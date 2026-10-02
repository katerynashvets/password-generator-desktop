import { app, BrowserWindow, ipcMain, net, protocol } from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import store from './store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;
const outDir = isDev
  ? path.join(__dirname, '../out')
  : path.join(__dirname, 'out');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

function resolveFile(pathname) {
  const filePath = path.normalize(
    path.join(outDir, decodeURIComponent(pathname)),
  );

  const rel = path.relative(outDir, filePath);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;

  const candidates = [
    filePath,
    path.join(filePath, 'index.html'),
    `${filePath}.html`,
  ];
  return (
    candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile()) ?? null
  );
}

function registerAppProtocol() {
  protocol.handle('app', (request) => {
    const { pathname } = new URL(request.url);
    const filePath = resolveFile(pathname) ?? resolveFile('/404.html');

    if (!filePath) return new Response('Not found', { status: 404 });
    return net.fetch(pathToFileURL(filePath).toString());
  });
}

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
    win.loadURL('app://local/');
  }
}

app.whenReady().then(() => {
  registerAppProtocol();

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
