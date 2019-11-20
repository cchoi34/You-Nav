const port = chrome.extension.connect({
    name: "update Popup"
});

port.postMessage("Clicked Popup");

port.onMessage.addListener(function(message) {
    console.log("Message: ", message);
})

function clickPlayPause(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "scripts/execute/playPause.js"
    }, function(isPaused) {
        const playButton = document.getElementById(`${"play-pause" + tabId}`)
        console.log("isPaused: ", isPaused);
        if (isPaused) {
            playButton.classList.add("fa-pause");
            playButton.classList.remove("fa-play");
            console.log("Video is playing");
            console.log("PlayButton classList: ", playButton.classList);
        }
        else {
            playButton.classList.remove("fa-pause");
            playButton.classList.add("fa-play");
            console.log("Video is paused");
            console.log("PlayButton classList: ", playButton.classList);
        }
    })
}

function clickLoop(tabId) {
    console.log("Hit the loop button on tab: " + tabId);
}

function clickPrevious(tabId) {
    console.log("Hit the previous button on tab: " + tabId);
}

function clickNext(tabId) {
    console.log("Hit the next button on tab: " + tabId);
}

function clickVolume(tabId) {
    console.log("Hit the volume buttonon tab: " + tabId);
}



