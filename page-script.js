window.addEventListener("message", function (event) {
    if (event.source == window && event.data) {
        eval(event.data);
    }
});