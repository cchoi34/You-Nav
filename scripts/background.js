const state = {
    tabs: [],
}

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        console.log("Message received " + message);
        getYoutubeTabs(port);
    })
});

const SET_ALL_TABS = "SET_ALL_TABS";
const ADD_TAB = "ADD_TAB";
const UPDATE_TAB = "UPDATE_TAB";
const DELETE_TAB = "DELETE_TAB";

const sendStateToPopup = (state, port) => {
    console.log("Sending this state from background: ", state);
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

// const updateTab = () => {

// }

// const deleteTab = () => {

// }

const addPropertiesToTab = (tab, properties) => {
    tab.paused = properties.paused;
    tab.loop = properties.loop;
    tab.volume = properties.volume;
    tab.next = properties.next;
    tab.previous = properties.previous;
    addTab(tab);
}

function setState (state, action) {
    switch (action.type) {
        case SET_ALL_TABS:
        case ADD_TAB:
        case UPDATE_TAB:
        case DELETE_TAB:
        default:
            return state;
    }
}

function getYoutubeTabs(port) {
    chrome.tabs.query({
        url: "*://www.youtube.com/watch?v*",
    }, (tabs) => {
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

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    console.log("updated tab");
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log("Active tab changed");
});

chrome.tabs.onCreated.addListener(function() {
    console.log("Created a new tab");
});

chrome.tabs.onRemoved.addListener(function() {
    console.log("Closed a tab");
});






