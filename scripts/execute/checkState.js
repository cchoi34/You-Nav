function checkState() {
    const video = document.querySelector("video");
    const next = document.querySelector(".ytp-next-button");
    const prev = document.querySelector(".ytp-prev-button");
    console.log("History: ", history);
    console.log("Video in Check State: ", video);
    console.log("A tag: ", next);
    return {
        paused: video.paused,
        loop: video.loop,
        volume: video.volume,
        next: next.href,
        previous: prev.href
    };
}

checkState();