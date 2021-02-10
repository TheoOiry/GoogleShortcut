chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    chrome.tabs.executeScript({
        code: 'window.getSelection().toString();'
    }, function (selection) {
        console.log(selection)
    });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.startsWith("https://www.google.") && tab.url.includes("/search?") && changeInfo.status === "complete") {
        chrome.tabs.executeScript(tabId, {
            file: 'inject.js'
        });
        console.log("injected on tab:" + tabId)
    }
});
