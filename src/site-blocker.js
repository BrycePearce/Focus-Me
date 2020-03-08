// Content Script
// Handles reading data of the pages the user visits, and passing information to the extension. This is where we orchestrate actions based on events.
// *note: this script will run when a tab is initialized
// https://developer.chrome.com/extensions/content_scripts

// Extension loaded on a new page, check to see if it needs to be blocked
chrome.storage.sync.get('isExtensionActive', storage => {
    blockWebsite(storage.isExtensionActive);
});

// Extension Storage update event
/*
 * todo:
 * Listening for storage updates is probably not the best way to handle this, since it requires re-fetching all important information again, everytime.
 * Consider the following solutions:
 * 1.) Create a global state with active/inactive, blocked site list, etc. Use Background.js?
 * 2.) Create a wrapper for the onChanged events, where I can listen to each change individually. Would still need to maintain some kind of global state.
 * As-is, this is pretty hacky.
 */
chrome.storage.onChanged.addListener(changes => {
    getStorageData('isExtensionActive').then((isExtensionActive) => {
        if (isExtensionActive) {
            blockWebsite(isExtensionActive);
        }
    });
});

// todo: revisit this
function blockWebsite(isActive) {
    getStorageData('blocklist').then((blocklist) => {
        if (isActive) {
            let hostname = new URL(window.location.href).hostname;
            blocklist = blocklist || new Array(); // todo: remove this hack
            hostname = hostname.replace('www.', ''); // todo: remove this hack
            if (blocklist.includes(hostname)) {
                location.replace(`chrome-extension://${chrome.runtime.id}/blocked-page/blocked-page.html`);
            }
        } else {
            // todo: remove event listeners, if necessary
        }
    });
}

function getStorageData(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, storage => {
            resolve(storage[key]);
        });
    });
}