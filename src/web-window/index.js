const { BrowserWindow, Menu } = require("electron");

function createWebWindow(url) {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.loadURL(url);
  mainWindow.setFullScreenable(true);
  mainWindow.setMaximizable(true);
  setMainMenu(mainWindow);
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
						const { createSettingsWindow } = require("../setting-window");
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
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

module.exports = {
  createWebWindow,
};
