function adjustVolume() {
    const video = document.querySelector("video");
    console.log("video before mute: ", video.volume)
    if (video.volume !== 0) {
        video.volume = 0;
    }
    else {
        video.volume = 1;
    }
    console.log("video after mute: ", video.volume)
    return video.volume; 
}

adjustVolume();