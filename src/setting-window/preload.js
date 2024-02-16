const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('configAPI', {
  saveUrl: (url) => ipcRenderer.send('save-url', url),
  gerUrl: () => ipcRenderer.invoke('get-url'),
  openWebView: (url) => ipcRenderer.send('open-web-view', url),
  openContextMenu: () => ipcRenderer.send('open-context-menu')
})
