chrome.runtime.onInstalled.addListener(initChromeStorage);

function initChromeStorage() {
  chrome.storage.local.set({ allowedSites: ["google.com"] });
  chrome.storage.local.set({ isExtensionActive: true });
}
