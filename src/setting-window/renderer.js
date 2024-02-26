const btnLoad = document.getElementById("btn-load");
const urlInput = document.getElementById("input-url");
const errorMessage = document.getElementById("error-message");

urlInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    btnLoad.click()
  }
})

window.addEventListener('load', async () => {
  const url = await window.configAPI.getUrl();
  if (url) {
    urlInput.value = url;
  }
})

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  window.configAPI.openContextMenu()
}, false)

btnLoad.addEventListener("click", async () => {
  try {
    const url = urlInput.value;
    window.configAPI.openWebView(url);
    window.configAPI.saveUrl(url);
    window.configAPI.openWebView(url);
  } catch (error) {
    errorMessage.innerText = `Se produjo un error: ${error}`;
  }
});
