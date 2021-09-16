/* injectPageScript executes in 'isolated world' context
 * https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
 *
 * We can manage page DOM from this function, but cannot share variables directly
 * 
 * 'eval' call or injecting script tag with inline source in this context cause CSP error,
 *  but we can load script from web_accessible_resources and execute script string there 
 * 
 * window.postMessage is used for transferring the payload to the page script
 */
function injectPageScript(payload) {
    const script = document.createElement("script");

    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', chrome.runtime.getURL("page-script.js"));

    script.onload = () => {
        window.postMessage(payload, "*");
        document.head.removeChild(script)
    }

    document.head.appendChild(script);
}


// script executes in page context without CSP limitations
const payload = `alert('hi')`;


chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: injectPageScript,
        args: [payload]
    });
});