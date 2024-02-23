const btnLoad = document.getElementById("btn-load");
const urlInput = document.getElementById("input-url");
const errorMessage = document.getElementById("error-message");

urlInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    btnLoad.click()
  }
})

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  window.configAPI.openContextMenu()
}, false)

btnLoad.addEventListener("click", () => {
  try {
    const url = urlInput.value;
    window.configAPI.openWebView(url);
  } catch (error) {
    errorMessage.innerText = `Se produjo un error: ${error}`;
  }
});
