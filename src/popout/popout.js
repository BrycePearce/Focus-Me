// Set initial state whenever popout is loaded, based on storage
// todo: fix bug where opening popout shows animation to set the current state
chrome.storage.sync.get('isExtensionActive', storage => {
    extensionToggle.checked = storage.isExtensionActive;
});

document.addEventListener(('DOMContentLoaded'), () => {
    setDOMValues();
});

/* DOM Elements */
let extensionToggle = document.getElementById('toggle-blocking-btn');
let addBlockedButton = document.getElementById('blocklist');


/* Event Listeners */
extensionToggle.onclick = setToggleState;
addBlockedButton.onclick = addToBlockList;

/* Methods */
// Update the extension active state
function setToggleState() {
    chrome.storage.sync.get('isExtensionActive', storage => {
        extensionToggle.checked = !storage.isExtensionActive;
        chrome.storage.sync.set({
            isExtensionActive: !storage.isExtensionActive,
        });
    });
}

// todo: refactor tabs into an async method, if possible? Using here and in addToBlockList
function setDOMValues() {
    chrome.tabs.query({
        'active': true,
        'currentWindow': true
    }, (tabs) => {
        // todo: handle invalid URL's
        const currentlyActiveUrl = tabs[0].url;
        document.getElementById('domainer-banner-text').textContent = getDomainFromUrl(currentlyActiveUrl);
    });
}

function addToBlockList() {
    // fetch the current blocklist
    chrome.storage.sync.get(['blocklist'], (storage) => {
        let blockList = storage['blocklist'] ? storage['blocklist'] : new Array();
        // get the current tab, append the current tab URL to our blocklist
        chrome.tabs.query({
            'active': true,
            'currentWindow': true
        }, (tabs) => {
            const currentlyActiveUrl = tabs[0] ? getDomainFromUrl(tabs[0].url) : null;
            if (currentlyActiveUrl && !blockList.includes(currentlyActiveUrl)) {
                blockList.push(currentlyActiveUrl);
                // update our storage with the updated blocklist
                chrome.storage.sync.set({
                    'blocklist': blockList
                });
            }
        });
    });
}

function getDomainFromUrl(url) {
    const urlRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'g');
    const isValidUrl = urlRegex.test(url);
    if (isValidUrl) {
        // https://www.google.com/hello -> google.com
        return new URL(url).hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    } else {
        return undefined;
    }
}