function injectedMainWorldFunc(key, value){
    window[key] = value;
    return key;
}

const executeScriptConfig = {
    world: "MAIN",
    func: injectedMainWorldFunc,
}

chrome.action.onClicked.addListener(async (tab) => {

    //Callback
    chrome.scripting.executeScript({
        ...executeScriptConfig,
        target: { tabId: tab.id },
        args: ['__BEEP__', 'beep']
    }, (res) => {
        console.log('Callback responce', res);
    });

    //Promise
    const res = await chrome.scripting.executeScript({
        ...executeScriptConfig,
        target: { tabId: tab.id },
        args: ['__BOOP__', 'boop']
    });

    console.log('Promise responce',res);
});