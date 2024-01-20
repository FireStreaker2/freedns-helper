chrome.webNavigation.onCompleted.addListener((details) => {
	if (details.url.startsWith("https://freedns.afraid.org/domain/registry")) {
		chrome.tabs.sendMessage(details.tabId, { action: "inject" });
	}
});
