function playPause() {
    const video = document.querySelector("video");
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
    return video.paused; // to update the state of the video
}

playPause();