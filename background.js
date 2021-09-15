function scriptInjector(arg) {

    const scriptURL = chrome.runtime.getURL("page-script.js");
    const script = document.createElement("script");

    script.src = scriptURL;

    document.body.appendChild(script);

    setTimeout(() => {
        window.postMessage(arg, "*");
    }, 500);
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scriptInjector,
        args: ['123456']
    });
});