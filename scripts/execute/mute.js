function toggleMute(baseVolume) {
    const video = document.querySelector("video");
    if (video.volume !== 0) {
        video.volume = 0;
    }
    else {
        video.volume = baseVolume;
    }
    return video.volume; 
}

toggleMute(1);
