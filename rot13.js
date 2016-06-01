console.log('hello!');

function appendMessage(message) {
  var p = document.createElement("p");
  p.innerText = message;
  document.body.appendChild(p);
}

var port = chrome.runtime.connect();
port.onMessage.addListener(function(msg) {
  var string = JSON.stringify(msg);
  console.log("Content script received from background: " + string);
  appendMessage(string);
});

port.postMessage("hello!");

console.log('Send messages for rot13 encrypting with ' +
    '`window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");`');
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received from webpage: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);
