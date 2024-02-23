const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('configAPI', {
  retryAgain: () => ipcRenderer.send('retry-again'),
})
