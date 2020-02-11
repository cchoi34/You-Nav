function loadPrevious() {
    const video = document.querySelector("video");
    const previous = document.querySelector(".ytp-prev-button");
    if (previous !== "") {
        let prevLink = video.previous;
        window.location.href = prevLink;
    }
    else {
        console.log("No previous video!"); 
    }
    return previous; 
}

loadPrevious();