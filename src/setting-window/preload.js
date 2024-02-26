const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.invoke('get-url').then(result => {
  const urlInput = document.getElementById("input-url");
  urlInput.value = result;
})

contextBridge.exposeInMainWorld('configAPI', {
  openWebView: (url) => ipcRenderer.send('open-web-view', url),
  openContextMenu: () => ipcRenderer.send('open-context-menu'),
  saveUrl: (url) => ipcRenderer.send('save-url', url),
})

