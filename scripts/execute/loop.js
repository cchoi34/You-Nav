function loop() {
    const video = document.querySelector("video");
    if (!video.loop) {
        video.loop = true;
    }
    else {
        video.loop = false;
    }
    return video.loop; // to update the state of the video
}

loop();