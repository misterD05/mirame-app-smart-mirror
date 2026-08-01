import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,       // Schermo intero per lo specchio
    autoHideMenuBar: true,  // Nasconde la barra dei menu in alto
    kiosk: true,            // Blocca il mouse/finestra in modalità specchio
    webPreferences: {
      // Sicurezza locale: isola il rendering ma permette il preload se servirà
        nodeIntegration: false,
        contextIsolation: true,
    },
    });

  // In sviluppo, carichiamo il server locale di Vite
    if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
        win.loadURL('http://localhost:5173');
        // win.webContents.openDevTools(); // Scommenta questa riga se vuoi vedere la console di debug
    } else {
        // In produzione (quando l'app è compilata), carichiamo il file statico generato
        win.loadFile(path.join(__dirname, '/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
