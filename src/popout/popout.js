let extensionToggle = document.getElementById('enable-site-blocking');

// Set initial state whenever popout is loaded, based on storage
// todo: fix bug where opening popout shows animation to set the current state
chrome.storage.sync.get('isExtensionActive', storage => {
    extensionToggle.checked = storage.isExtensionActive;
});

// listen for a toggle event
extensionToggle.onclick = setToggleState;

// Update the state
function setToggleState() {
    chrome.storage.sync.get('isExtensionActive', storage => {
        extensionToggle.checked = !storage.isExtensionActive;
        chrome.storage.sync.set({
            isExtensionActive: !storage.isExtensionActive,
        });
    });
}