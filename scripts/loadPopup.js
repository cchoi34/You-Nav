const popup = document.getElementById("popup");

function determineVolumeButton(volumeLevel) {
    if (volumeLevel <= 1 && volumeLevel > 0.5) {
        return "fa-volume-up";
    }
    else if (volumeLevel <= 0.5 && volumeLevel > 0) {
        return "fa-volume-down";
    }
    else if (volumeLevel === 0) {
        return "fa-volume-off";
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
        else if (rawTitle.endsWith(" - YouTube")) {
            cleanTitle = rawTitle.slice(0, rawTitle.length - 10);
        }
        else {
            cleanTitle = rawTitle;
        }
        let playButton = tab.paused ? "fa-play" : "fa-pause";
        let color = tab.loop ? "" : "grey";
        let volumeButton = determineVolumeButton(tab.volume);
        // let volumePercentage = Math.round(tab.volume * 100).toString();

        const html = `<section class="single-tab">
                        <h2>${cleanTitle}</h2>
                            <section class="navbar">
                                <div class="icon-container">
                                    <i class="fa fa-retweet fa-2x ${color}" id=${"loop" + tab.id}></i>
                                </div>

                                <div class="icon-container">
                                    <i class="fa fa-step-backward fa-2x" id=${"previous" + tab.id}></i>
                                </div>

                                <div class="icon-container">
                                    <i class="fa ${playButton} fa-2x" id=${"play-pause" + tab.id}></i>
                                </div>

                                <div class="icon-container">
                                    <i class="fa fa-step-forward fa-2x" id=${"next" + tab.id}></i>
                                </div>

                                <div class="icon-container">
                                    <i class="fa ${volumeButton} fa-2x" id=${"volume" + tab.id}></i>
                                </div>
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
        const volumeMute = document.getElementById(`${"volume" + tab.id}`);
        // const volumeAdjust = document.getElementById(`${"adjust-volume" + tab.id}`)
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

        volumeMute.addEventListener("click", () => {
            clickVolume(tab.id);
        })

        // volumeAdjust.addEventListener("click", () => {
        //     adjustVolume(tab.id)
        // <div class="slide-container hidden">
        //                             <input type="range" min="1" max="100" value=${volumePercentage} id=${"adjust-volume" + tab.id} class="slider" >
        //                         </div>
        // })
    })
}

function loadingState() {
    destroyCurrentNodes();
    const loadingHTML = `
    <section class="single-tab">
        <h2><i class="fa fa-spinner fa-spin"></i></h2>
            <section class="navbar">
                <i class="fa fa-retweet fa-2x"></i>
                <i class="fa fa-step-backward fa-2x"></i>
                <i class="fa fa-play fa-2x" ></i>
                <i class="fa fa-step-forward fa-2x"></i>
                <i class="fa fa-volume-up fa-2x"></i>
            </section>
    </section>`;
    let loadingNavbar = document.createElement('div');
        loadingNavbar.innerHTML = loadingHTML;
        popup.appendChild(loadingNavbar);
}

