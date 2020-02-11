function loadNext() {
    const next = document.querySelector(".ytp-next-button");
    if (next.href !== "") {
        let nextLink = next.href;
        window.location.href = nextLink;
    }
    else {
        console.log("No next video!"); 
    }
    return next; 
}

loadNext();