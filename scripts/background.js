const initialState = {
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

const setAllTabs = (tabs) => {
    return {
        
    }
}

const addTab = () => {

}

const updateTab = () => {

}

const deleteTab = () => {

}

function setState (state = initialState, action) {
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
                let newTabs = [];
                newTabs.push({tab, properties})
                
                state.tabs = newTabs;
                console.log("state.tabs: ", state.tabs);
                port.postMessage({tabs: state.tabs})
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






