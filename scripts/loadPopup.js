const popup = document.getElementById("popup");

function determineVolumeButton(volumeLevel) {
    if (volumeLevel <= 1 && volumeLevel > 0.5) {
        return "fa-volume-up";
    }
    else if (volumeLevel <= 0.5 && volumeLevel > 0) {
        return "fa-volume-down";
    }
    else if (volumeLevel === 0) {
        return "fa-volume-mute";
    }
}

function destroyCurrentNodes() {
    popup.innerHTML = '';
}

function createNavbar(tabs) {
    tabs.forEach(tab => {
        const rawTitle = tab.title || "Open up Youtube!";
        let cleanTitle;
        if (rawTitle.startsWith("(") && rawTitle.endsWith(" - YouTube")) {
            let index = rawTitle.indexOf(")"); // in the case of notifications, these will be sliced out of the title
            cleanTitle = rawTitle.slice(index + 2, rawTitle.length - 10); // every Title from YouTube will end with "- YouTube"
        }
        else if (rawTitle.startsWith("(") && !rawTitle.endsWith(" - YouTube")) {
            let index = rawTitle.indexOf(")"); // in the case of notifications, these will be sliced out of the title
            cleanTitle = rawTitle.slice(index + 2, rawTitle.length);
        }
        else {
            cleanTitle = rawTitle;
        }
        console.log("tab: ", tab);
        console.log("TAB.Paused: ", tab.paused)
        let playButton = tab.paused ? "fa-play" : "fa-pause";
        let loopButton = tab.loop ? "green" : "grey";
        let volumeButton = determineVolumeButton(tab.volume);

        const html = `<section class="single-tab">
                        <h2>${cleanTitle}</h2>
                            <section class="navbar">
                                <i class="fa fa-retweet fa-2x ${loopButton}" id=${"loop" + tab.id}></i>
                                <i class="fa fa-step-backward fa-2x" id=${"previous" + tab.id}></i>
                                <i class="fa ${playButton} fa-2x" id=${"play-pause" + tab.id}></i>
                                <i class="fa fa-step-forward fa-2x" id=${"next" + tab.id}></i>
                                <i class="fa ${volumeButton} fa-2x" id=${"volume" + tab.id}></i>
                            </section>
                    </section>`;
        let newNavbar = document.createElement('div');
        newNavbar.innerHTML = html;
        popup.appendChild(newNavbar);
    });
}

function assignEventListeners(tabs) {
    tabs.forEach(tab => {
        const loop = document.getElementById(`${"loop" + tab.id}`);
        const previous = document.getElementById(`${"previous" + tab.id}`);
        const playPause = document.getElementById(`${"play-pause" + tab.id}`);
        const next = document.getElementById(`${"next" + tab.id}`);
        const volume = document.getElementById(`${"volume" + tab.id}`);

        loop.addEventListener("click", () => {
            clickLoop(tab.id);
        })

        previous.addEventListener("click", () => {
            clickPrevious(tab.id);
        })

        playPause.addEventListener("click", () => {
            clickPlayPause(tab.id);
        })

        next.addEventListener("click", () => {
            clickNext(tab.id);
        })

        volume.addEventListener("click", () => {
            clickVolume(tab.id);
        })
    })
}

