function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.match(/.*\.valencepm\.com/)) {
    chrome.pageAction.show(tabId);
  }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    chrome.runtime.sendNativeMessage(
      "com.valencepm.rot13",
      { message: msg },
      function(response) {
        port.postMessage(response.zrffntr);
      }
    );
  });
});
