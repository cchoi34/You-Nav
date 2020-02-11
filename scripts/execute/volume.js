function toggleVolume() {
    const video = document.querySelector("video");
    if (video.volume !== 0) {
        video.volume = 0;
    }
    else {
        video.volume = 1;
    }
    return video.volume; 
}

toggleVolume();