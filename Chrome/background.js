// background.js

// Global leak history: each entry is an object { tabId, url, domain, pattern, match, domPath }
let globalLeakHistory = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateLeaks") {
    const { leaks } = message;
    const tabId = sender.tab.id;
    const url = sender.tab.url || "";
    const domain = new URL(url).hostname;

    // For each new leak, check if it already exists in globalLeakHistory
    leaks.forEach(leak => {
      const exists = globalLeakHistory.some(item =>
        item.domain === domain &&
        item.pattern === leak.pattern &&
        item.match === leak.match &&
        item.domPath === leak.domPath
      );

      // If it doesn’t exist, push it
      if (!exists) {
        globalLeakHistory.push({
          tabId,
          url,
          domain,
          pattern: leak.pattern,
          match: leak.match,
          domPath: leak.domPath
        });
      }
    });

    // Update badge to show how many new leaks were detected on this pass
    chrome.action.setBadgeText({
      text: leaks.length.toString(),
      tabId: tabId
    });

    sendResponse({ status: "Leak details stored (no duplicates)" });
  }

  if (message.type === "getGlobalHistory") {
    // Return the entire global history
    sendResponse({ history: globalLeakHistory });
  }
});
