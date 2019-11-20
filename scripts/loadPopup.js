const popup = document.getElementById("popup");

function destroyCurrentNodes() {
    popup.innerHTML = '';
}

function createNavbar(tabs) {
    tabs.forEach(tab => {
        const rawTitle = tab.title || "Open up Youtube!";
        let cleanTitle;
        if (rawTitle.startsWith("(") && rawTitle.endsWith(" - YouTube")) {
            let index = rawTitle.indexOf(")"); // in the case of notifications, these will be sliced out of the title
            cleanTitle = rawTitle.slice(index + 2, rawTitle.length - 10); // every Title from YouTube will end with "- YoutTube"
        }
        else if (rawTitle.startsWith("(") && !rawTitle.endsWith(" - YouTube")) {
            let index = rawTitle.indexOf(")"); // in the case of notifications, these will be sliced out of the title
            cleanTitle = rawTitle.slice(index + 2, rawTitle.length);
        }
        else {
            cleanTitle = rawTitle;
        }
        let playButton = tab.paused ? "fa-play" : "fa-pause";

        const html = `<section class="single-tab">
                        <h2>${cleanTitle}</h2>
                            <section class="navbar">
                                <i class="fa fa-retweet fa-2x" id=${"loop" + tab.id}></i>
                                <i class="fa fa-step-backward fa-2x" id=${"previous" + tab.id}></i>
                                <i class="fa ${playButton} fa-2x" id=${"play-pause" + tab.id}></i>
                                <i class="fa fa-step-forward fa-2x" id=${"next" + tab.id}></i>
                                <i class="fa fa-volume-up fa-2x" id=${"volume" + tab.id}></i>
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