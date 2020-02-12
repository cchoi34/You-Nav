const state = {
    tabs: [],
}

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        getYoutubeTabs(port);
    })
});

const sendStateToPopup = (state, port) => {
    port.postMessage(state);
}

const addTab = (tab) => {
    let uniqueTabIds = [];
    if (state.tabs.length > 0) {
        state.tabs.forEach(stateTab => {
            uniqueTabIds.push(stateTab.id)
        })
    }
    if (!uniqueTabIds.includes(tab.id)) {
        state.tabs.push(tab);
    }
}

const addPropertiesToTab = (tab, properties) => {
    tab.paused = properties.paused;
    tab.loop = properties.loop;
    tab.volume = properties.volume;
    tab.next = properties.next;
    tab.previous = properties.previous;
    addTab(tab);
}

const clearState = () => {
    state.tabs = [];
}

function getYoutubeTabs(port) {
    chrome.tabs.query({
        url: "*://www.youtube.com/watch?v*",
    }, (tabs) => {
        console.log("TABS query: ", tabs)
        clearState();
        tabs.forEach(tab => {
            chrome.tabs.executeScript(tab.id, {
                file: "scripts/execute/checkState.js"
            }, (properties) => {
                addPropertiesToTab(tab, properties[0]);
                sendStateToPopup(state, port);
            })
        })
    })
}






