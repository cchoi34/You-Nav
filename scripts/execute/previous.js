function loadPrevious() {
    const video = document.querySelector("video");
    if (video.currentTime < 3) { // go to the previous video
        window.history.back();
    }
    else { // replay the current video
        video.currentTime = 0;
    }
    console.log("window history: ", window.history)
    return window.history; 
}

loadPrevious();