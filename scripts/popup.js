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
        file: "scripts/execute/mute.js"
    }, function(volume) {
        console.log("volume: ", volume);
        const volumeButton = document.getElementById(`${"volume" + tabId}`);
        let resultingVolume = determineVolumeButton(volume[0]);
        console.log("resulting Volume: ", resultingVolume);
        if (volumeButton.classList.contains("fa-volume-up")) {
            volumeButton.classList.add("fa-volume-mute");
            volumeButton.classList.remove("fa-volume-up");
            console.log("removed volume up: ", volumeButton);
        } else if (volumeButton.classList.contains("fa-volume-down")) {
            volumeButton.classList.add(resultingVolume);
            volumeButton.classList.remove("fa-volume-down");
            console.log("removed volume down")
        } else if (volumeButton.classList.contains("fa-volume-mute")) {
            volumeButton.classList.add(resultingVolume);
            volumeButton.classList.remove("fa-volume-mute");
            console.log("removed volume mute")
        }
    }
    )
}

function adjustVolume(tabId) {

}



