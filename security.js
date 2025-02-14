document.addEventListener("DOMContentLoaded", () => {
    const secureButton = document.getElementById("secureButton");
    const infoBox = document.getElementById("infoBox");
    const countdownElement = document.getElementById("countdown");

    // Countdown Timer
    let countdown = 10;
    setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            countdown = 10;
            infoBox.textContent = "Security Check Passed! No threats detected.";
            setTimeout(() => infoBox.textContent = "Monitoring system active...", 3000);
        }
    }, 1000);

    // Show Modal on Button Click
    secureButton.addEventListener("click", () => {
        new bootstrap.Modal(document.getElementById("infoModal")).show();
    });

    // Disable Right-Click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener("keydown", (event) => {
        if (event.key === "F12" || 
            (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
            (event.ctrlKey && event.key === "U")) {
            event.preventDefault();
            return false;
        }
    });

    // Debugger Detection
    (function() {
        function detectDevTools() {
            const startTime = performance.now();
            debugger;
            const endTime = performance.now();
            if (endTime - startTime > 100) {
                alert("DevTools Detected! Please close the developer console.");
                window.location.reload();
            }
        }
        setInterval(detectDevTools, 1000);
    })();

    // Prevent Ctrl + S (Save Page As)
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();
            alert("Saving is disabled!");
            return false;
        }
    });

    // Prevent Dragging and Text Selection
    document.addEventListener("dragstart", (event) => event.preventDefault());
    document.addEventListener("selectstart", (event) => event.preventDefault());
});
