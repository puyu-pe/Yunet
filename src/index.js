const { app, BrowserWindow } = require("electron");
const { createWebWindow } = require("./web-window");
const { createSettingsWindow } = require("./setting-window");

// determinar si estamos en entorno de desarrollo
var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;

// obtener el argv URL_ARG de los parametros por linea de comando
let URL_ARG = process.argv[1];
if (isDev) {
  URL_ARG = process.argv[2];
}

// Inicializar archivo de configuración yunet
const settings = require("electron-settings");
settings.configure({
  fileName: "yunet-config.json",
  prettify: true,
})

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.commandLine.appendSwitch('ignore-certificate-errors')

app.whenReady().then(async () => {
  const isSettingUrl = await settings.has("system.url");
  try {
    if (typeof URL_ARG === "string" && URL_ARG.length > 7) {
      createWebWindow(URL_ARG);
    } else if (isSettingUrl) {
      const url = await settings.get("system.url");
      createWebWindow(url);
    } else {
      createSettingsWindow();
    }
  } catch (error) {
    console.log(error);
  }
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWebWindow(URL_ARG);
  }
});
