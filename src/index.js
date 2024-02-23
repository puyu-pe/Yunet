const { app, BrowserWindow } = require("electron");
const { createWebWindow } = require("./web-window");
const { createSettingsWindow } = require("./setting-window");

var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;
// read args
let URL_ARG = process.argv[1];
if (isDev) {
  URL_ARG = process.argv[2];
}

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.commandLine.appendSwitch('ignore-certificate-errors')

app.whenReady().then(async () => {
  try {
    if (typeof URL_ARG === "string" && URL_ARG.length > 0) {
      createWebWindow(URL_ARG);
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
