window.addEventListener("message", function (event) {
    if (event.source == window && event.data) {
        window.__TEST__ = event.data;
    }
});