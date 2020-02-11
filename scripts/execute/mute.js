function toggleMute(basevolume) {
    const video = document.querySelector("video");
    if (video.volume !== 0) {
        video.volume = 0;
    }
    else {
        video.volume = baseVolume;
    }
    console.log("video after mute: ", video.volume)
    return video.volume; 
}

toggleMute(1);
