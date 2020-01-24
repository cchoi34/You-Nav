function checkState() {
    const video = document.querySelector("video");
    const next = document.querySelector(".ytp-next-button");
    const history = window.history;
    console.log("History: ", history);
    console.log("Video in Check State: ", video);
    console.log("A tag: ", next);
    return {
        paused: video.paused,
        loop: video.loop,
        volume: video.volume,
        next: next.href,
        previous: history
    };
}

checkState();