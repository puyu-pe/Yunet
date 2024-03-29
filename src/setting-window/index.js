const { BrowserWindow, ipcMain, MenuItem } = require("electron");
const path = require("path");
const { Menu } = require("electron");

function createSettingsWindow() {
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

  ipcMain.once("save-url", (_, url) => {
    const settings = require("electron-settings");
    if (typeof url !== "string") return;
    url = url.trim();
    if (url.length === 0) return;
    settings.set("system.url", url);
  });

  ipcMain.once("open-web-view", (event, url) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    const { createWebWindow } = require("../web-window/index.js");
    createWebWindow(url);
    win.close();
  })

  ipcMain.on('open-context-menu', (event) => {
    const menu = new Menu()
    menu.append(new MenuItem({ label: 'Copiar', role: 'copy' }))
    menu.append(new MenuItem({ label: 'Pegar', role: 'paste' }))
    menu.popup(BrowserWindow.fromWebContents(event.sender));
  })

  mainWindow
    .loadFile(path.join("src", "setting-window", "index.html"))
    .then(() => {
      mainWindow.setFullScreenable(true);
      mainWindow.setMaximizable(true);
    })
  setMainMenu();
}

ipcMain.handle('get-url', async (e) => {
  const settings = require("electron-settings");
  const result = await settings.get("system.url");
  if (result != null) {
    return result
  }
  return "";
})

const setMainMenu = () => {
  const isMac = process.platform === "darwin";
  const template = [
    {
      label: "Menu",
      submenu: [
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
  createSettingsWindow,
};
