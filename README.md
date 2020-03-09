# Focus-Me
A chrome extension for blocking websites.

![Work In Progress](https://i.imgur.com/PRaPUTE.png)

# Roadmap

Core Functionality
- [x] Add sites to blocklist
- [x] Redirect when a user navigates to a blocked site
- [x] Remove blocked site from blocklist

To-do
- [ ] Design and implement a cleaner popout interface
- [ ] Rewrite the redirect page. Add background images that cycle on a 15 minute cache. Integrate optional cat/dog api background pictures.
- [ ] Return the current, and all other tabs, to their intended targets when the app is toggled off.
- [ ] Find a better way to handle state. Currently listening for state changes based on `chrome.storage.onChanged`. Either abstract this method out for individual listeners, or maintain a global state and listen for individual changes.
- [ ] Once global state is better integrated, remvoe the currently necessary duplicate code in `popout.js`. 
- [ ] Create an icon/logo.
