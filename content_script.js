window.addEventListener("load", hideLinks);

async function hideLinks() {
  const resultForAllowedSites = await asyncStorageGet("allowedSites");
  const allowedSites = resultForAllowedSites.allowedSites;
  const resultForIsExtensionActive = await asyncStorageGet("isExtensionActive");
  const isExtensionActive = resultForIsExtensionActive.isExtensionActive;

  if (isExtensionActive && !isCurrentUrlInAllowedSites(allowedSites)) {
    document.querySelectorAll("a").forEach(link => {
      link.style.display = "none";
    });
  }
}

function isCurrentUrlInAllowedSites(allowedSites) {
  return allowedSites.some(url => window.location.href.includes(url));
}

function asyncStorageGet(key) {
  return new Promise(resolve => {
    chrome.storage.local.get(key, result => {
      resolve(result);
    });
  });
}
