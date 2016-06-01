function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.match(/.*\.valencepm\.com/)) {
    chrome.pageAction.show(tabId);
  }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);

var rot13Port = chrome.runtime.connectNative('com.valencepm.rot13');
rot13Port.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log("Received: " + JSON.stringify(msg));
  if (this.contentScriptPort) {
    this.contentScriptPort.postMessage(msg.zrffntr);
  }
});

chrome.runtime.onConnect.addListener(function(port) {
  var contentScriptPort = null;
  port.onMessage.addListener(function(msg) {
    this.contentScriptPort = port;
    rot13Port.postMessage({ message: msg });
  });
});
