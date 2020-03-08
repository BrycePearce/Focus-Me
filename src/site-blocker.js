// Content Script
// Handles reading data of the pages the user visits, and passing information to the extension
// https://developer.chrome.com/extensions/content_scripts

// Extension loaded on a new page
chrome.storage.sync.get('isExtensionActive', storage => {
    handleToggleEvent(storage.isExtensionActive);
});

// Status is changed on the current tab
chrome.storage.onChanged.addListener(changes => {
    if (changes.isExtensionActive) {
        handleToggleEvent(changes.isExtensionActive.newValue);
    }
});

function handleToggleEvent(state) {
    console.log('new state:', state);
}