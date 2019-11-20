const state = {
    tabs: [],
}

function getYoutubeTabs() {
    chrome.tabs.query({
        url: "*://www.youtube.com/watch?v*",
    }, (tabs) => {
        console.log("Tab: ", tabs);
        state.tabs = tabs;
        console.log("state.tabs: ", state.tabs);
    })
}

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    console.log("updated tab");
    getYoutubeTabs();
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log("Active tab changed");
    getYoutubeTabs();
});

chrome.tabs.onCreated.addListener(function() {
    console.log("Created a new tab");
});

chrome.tabs.onRemoved.addListener(function() {
    console.log("Closed a tab");
});

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        console.log("Message received " + message);
        port.postMessage({tabs: state.tabs});
    })
})





