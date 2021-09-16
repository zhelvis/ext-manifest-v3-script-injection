// script executes in page context without CSP limitations
const payload = `alert('hi')`;

function handleMessage(_request, _sender, sendResponse) {
    sendResponse(payload);
}

chrome.runtime.onMessage.addListener(handleMessage);