document.addEventListener("DOMContentLoaded", () => {
  createNewTabWhenClickingOnLinks();
  loadExtensionActiveToggle();
});

document
  .getElementById("extension-active-toggle")
  .addEventListener("change", event => {
    const isChecked = event.target.checked;

    chrome.storage.local.set({ isExtensionActive: isChecked });
  });

function createNewTabWhenClickingOnLinks() {
  const links = document.querySelectorAll("a");

  links.forEach(link => {
    const location = link.getAttribute("href");
    link.addEventListener("click", () =>
      chrome.tabs.create({ active: true, url: location })
    );
  });
}

function loadExtensionActiveToggle() {
  chrome.storage.local.get("isExtensionActive", result => {
    const toggleElem = document.getElementById("extension-active-toggle");

    toggleElem.checked = !!result.isExtensionActive;
  });
}
