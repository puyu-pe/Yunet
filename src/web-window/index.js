const { BrowserWindow, Menu } = require("electron");
const { createSettingsWindow } = require("../setting-window");
const { shell } = require('electron');
const { createErrorWindow } = require("../error-window");

let isMenuVisible = false;
function createWebWindow(url) {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    width,
    height,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      allowRunningInsecureContent: true,
    },
  });
  isMenuVisible = !mainWindow.isMenuBarAutoHide;
  setMainMenu(mainWindow);
  mainWindow
    .loadURL(url)
    .then(() => {
      mainWindow.setFullScreenable(true);
      mainWindow.setMaximizable(true);
    })
    .catch(() => {
      createErrorWindow(url);
      mainWindow.close();
    });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url); // Abre URL en el navegador del usuario.
    return { action: 'deny' };
  });
}

const setMainMenu = (mainWindow) => {
  const { app } = require("electron");
  const isMac = process.platform === "darwin";
  const template = [
    {
      label: app.name,
      submenu: [
        {
          label: "Configuración",
          click() {
            createSettingsWindow();
            mainWindow.close();
          },
        },

        isMac
          ? { label: "Salir", role: "close" }
          : { label: "Salir", role: "quit" },
      ],
    },
    {
      label: "View",
      submenu: [
        { label: "Recargar Página", role: "reload" },
        {
          label: "Recargar sin cache",
          accelerator: "CmdOrCtrl+F5",
          click() {
            mainWindow.webContents.reloadIgnoringCache();
          },
        },
        { label: "Forzar Recargar Página", role: "forceReload" },
        { label: "Inspeccionar", role: "toggleDevTools" },
        { type: "separator" },
        { label: "Alternar Pantalla Completa", role: "toggleFullScreen" },
      ],
    },
    {
      label: 'Mostrar Menú',
      accelerator: 'Alt+M',
      click: () => {
        isMenuVisible = !isMenuVisible;
        mainWindow.setMenuBarVisibility(isMenuVisible)
      }
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

module.exports = {
  createWebWindow,
};
