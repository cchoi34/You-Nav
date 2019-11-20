function checkState() {
    const video = document.querySelector("video");
    console.log("Video in Check State: ", video);
    return {
        paused: video.paused,
    };
}

checkState();