// Background is loaded when needed, and unloaded when idle
// Handles events like first installation, version updates, messages from content scripts, etc
// Has it's own debug menu, found in the chrome extensions area
// https://developer.chrome.com/extensions/background_pages

// Listen for installation, and set initial extension state to active
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        isExtensionActive: true
    });
});