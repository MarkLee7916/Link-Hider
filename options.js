document.addEventListener("DOMContentLoaded", displayAllowedSitesOnPage);

document
  .getElementById("clear-urls")
  .addEventListener("click", clearAllowedSites);

document
  .getElementById("add-url")
  .addEventListener("click", getUrlAndAddToAllowedSites);

document
  .getElementById("url-input")
  .addEventListener("input", toggleAddUrlButtonDisplay);

document.getElementById("url-input").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    getUrlAndAddToAllowedSites();
  }
});

function toggleAddUrlButtonDisplay(event) {
  const inputText = event.target.value;

  if (inputText.length > 0) {
    showAddUrlButton();
  } else {
    hideAddUrlButton();
  }
}

function showAddUrlButton() {
  document.getElementById("add-url").style.visibility = "visible";
}

function hideAddUrlButton() {
  document.getElementById("add-url").style.visibility = "hidden";
}

function getUrlAndAddToAllowedSites() {
  const urlToAdd = document.getElementById("url-input").value;

  addToAllowedSites(urlToAdd);
}

function removeFromAllowedSites(urlRemoved) {
  chrome.storage.local.get("allowedSites", result => {
    const allowedSites = result.allowedSites;

    chrome.storage.local.set({
      allowedSites: allowedSites.filter(url => url !== urlRemoved),
    });
    location.reload();
  });
}

function clearAllowedSites() {
  chrome.storage.local.get("allowedSites", () => {
    chrome.storage.local.set({ allowedSites: [] });
    location.reload();
  });
}

function addToAllowedSites(url) {
  chrome.storage.local.get("allowedSites", result => {
    const allowedSites = result.allowedSites;

    allowedSites.push(url);
    chrome.storage.local.set({ allowedSites: allowedSites });
    location.reload();
  });
}

function displayAllowedSitesOnPage() {
  chrome.storage.local.get("allowedSites", result => {
    const allowedSitesElem = document.getElementById("allowed-sites");

    result.allowedSites.forEach(url => {
      const urlContainerElem = document.createElement("span");
      const urlLabelElem = document.createElement("p");
      const removeUrlButtonElem = document.createElement("button");

      removeUrlButtonElem.textContent = "❌";
      removeUrlButtonElem.className = "remove-url";
      removeUrlButtonElem.addEventListener("click", () => {
        removeFromAllowedSites(url);
      });

      urlLabelElem.textContent = url;
      urlLabelElem.className = "url-label";

      urlContainerElem.className = "url-container";
      urlContainerElem.append(removeUrlButtonElem);
      urlContainerElem.append(urlLabelElem);
      allowedSitesElem.append(urlContainerElem);
    });
  });
}
