const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('configAPI', {
  openWebView: (url) => ipcRenderer.send('open-web-view', url),
  openContextMenu: () => ipcRenderer.send('open-context-menu')
})
