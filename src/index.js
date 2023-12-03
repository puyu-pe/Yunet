const { app, BrowserWindow } = require("electron");
const { createWebWindow } = require("./web-window");
const { createSettingsWindow } = require("./setting-window");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const settings = require("electron-settings");
settings.configure({
	fileName: "puyium-config.json",
	prettify: true,
})



app.whenReady().then( async () => {
	try{
		const isSettingUrl = await settings.has("system.url");
		if(isSettingUrl){
			const url = await settings.get("system.url");
			createWebWindow(url);
		}else{
			createSettingsWindow();
		}
	}catch(error){
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

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
