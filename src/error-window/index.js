const { BrowserWindow, ipcMain, app } = require("electron");
const { Menu } = require("electron");
const path = require("path");
const { createSettingsWindow } = require("../setting-window/index.js");

function createErrorWindow(urlPage) {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.once("retry-again", (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    const { createWebWindow } = require("../web-window/index.js");
    createWebWindow(urlPage);
    win.close();
  })

  mainWindow
    .loadFile(path.join("src", "error-window", "index.html"))
    .then(() => {
      mainWindow.setFullScreenable(true);
      mainWindow.setMaximizable(true);
    })
  setMainMenu(mainWindow);
}

const setMainMenu = (mainWindow) => {
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
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

module.exports = {
  createErrorWindow,
}
