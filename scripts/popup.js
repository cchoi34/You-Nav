const port = chrome.runtime.connect({
    name: "update Popup"
});

const state = {
    tabs: []
}

function setState(newState) {
    if (newState.tabs) {
        state.tabs = newState.tabs;
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
    let copy = message.tabs;
    let loading = false;
    copy.forEach((tab) => {
        if (tab.status === "complete") {
            loading = true;
        }
        else {
            loading = false;
        }
    })

    if (!loading) {
        loadingState();
        port.postMessage("get next state");
    } else {
        setState(message);
    }
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
            loopBut.classList.add("grey");
        }
        else {
            loopBut.classList.remove("grey");
        }
    }
    )
}

function clickPrevious(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/previous.js"
    }, function(hasPrev) {
        const prevButton = document.getElementById(`${"previous" + tabId}`);
        console.log("HasPrev: ", hasPrev);
        port.postMessage("load previous video");
    }
    )
}

function clickNext(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/next.js"
    }, function(hasNext) {
        const nextButton = document.getElementById(`${"next" + tabId}`);
        console.log("HasNext: ", hasNext);
        port.postMessage("load next video");
    }
    )
}

function clickVolume(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/mute.js"
    }, function(volume) {
        const volumeButton = document.getElementById(`${"volume" + tabId}`);
        let resultingVolume = determineVolumeButton(volume[0]);
        if (volumeButton.classList.contains("fa-volume-up")) {
            volumeButton.classList.add("fa-volume-off");
            volumeButton.classList.remove("fa-volume-up");
        } else if (volumeButton.classList.contains("fa-volume-down")) {
            volumeButton.classList.add(resultingVolume);
            volumeButton.classList.remove("fa-volume-down");
        } else if (volumeButton.classList.contains("fa-volume-off")) {
            volumeButton.classList.add(resultingVolume);
            volumeButton.classList.remove("fa-volume-off");
        }
    }
    )
}

// function adjustVolume(tabId) {

// }