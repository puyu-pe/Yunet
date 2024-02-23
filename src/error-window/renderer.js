const btnRetry = document.getElementById("btnRetry");

btnRetry.addEventListener("click", () => {
  try {
    window.configAPI.retryAgain();
  } catch (error) {
    errorMessage.innerText = `Se produjo un error: ${error}`;
  }
});


