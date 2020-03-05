// when the toggle is updated, run our script
document.getElementById('enable-site-blocking').onclick = executeBlocking;

function executeBlocking() {
    chrome.tabs.executeScript({
        code: "toggleBlocker()"
    });
}