const btnLoad = document.getElementById("btn-load");
const urlInput = document.getElementById("input-url");
const errorMessage = document.getElementById("error-message");

const validateUrl = (url) => {
  const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

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
    if (validateUrl(url)) {
      window.configAPI.saveUrl(url);
      window.configAPI.openWebView(url);
    } else {
      errorMessage.innerText = "Ingrese una url valida.";
    }
  } catch (error) {
    errorMessage.innerText = `Se produjo un error: ${error}`;
  }
});
