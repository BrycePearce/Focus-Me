let isActive = false;

toggleBlocker();

function toggleBlocker() {
    isActive = !isActive;
    if (isActive) {
        const url = new URL(window.location.href);
        console.log(`Hostname: ${url.hostname}`);
    } else {
        console.log("Not active!");
    }
}