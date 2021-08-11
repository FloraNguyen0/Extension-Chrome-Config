
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // if (request.message) { sendResponse({ response: true }); return true; }
    document.getElementById("text-entry").innerText = request.selectedText;
  }
);



