document.addEventListener("message", function (event) {
    eval(event.detail)
});