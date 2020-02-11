const port = chrome.runtime.connect({
    name: "update Popup"
});

const state = {
    tabs: []
}

function setState(newState) {
    if (newState.tabs) {
        state.tabs = newState.tabs;
        console.log("state: ", state);
    }
    else {
        console.log("Incorrect newState!");
    }
    destroyCurrentNodes();
    createNavbar(state.tabs);
    assignEventListeners(state.tabs)
}

port.postMessage("load initial data");

port.onMessage.addListener(function(message) {
    setState(message);
    console.log("current State: ", state);
})

function clickPlayPause(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/playPause.js"
    }, function(isPaused) {
        const playButton = document.getElementById(`${"play-pause" + tabId}`);
        if (!isPaused[0]) {
            playButton.classList.add("fa-pause");
            playButton.classList.remove("fa-play");
        }
        else {
            playButton.classList.remove("fa-pause");
            playButton.classList.add("fa-play");
        }
    })
}

function clickLoop(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/loop.js"
    }, function(isLooped) {
        const loopBut = document.getElementById(`${"loop" + tabId}`);
        if (!isLooped[0]) {
            loopBut.classList.add("fa-random");
            loopBut.classList.remove("fa-retweet");
        }
        else {
            loopBut.classList.remove("fa-random");
            loopBut.classList.add("fa-retweet");
        }
    }
    )
    port.postMessage("update state");
}

function clickPrevious(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/previous.js"
    }, function(hasPrev) {
        const prevButton = document.getElementById(`${"previous" + tabId}`);
        console.log("HasPrev: ", hasPrev);
    }
    )
}

function clickNext(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/next.js"
    }, function(hasNext) {
        const nextButton = document.getElementById(`${"next" + tabId}`);
        console.log("HasNext: ", hasNext);
    }
    )
}

function clickVolume(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/volume.js"
    }, function(volume) {
        const volumeButton = document.getElementById(`${"volume" + tabId}`);
        console.log("currentVolume: ", volume);
    }
    )
}



