const { BrowserWindow, ipcMain } = require("electron");
const { Menu } = require("electron");
const path = require("path");

function createErrorWindow(urlPage) {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
  setMainMenu();
}

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
  createErrorWindow,
}
