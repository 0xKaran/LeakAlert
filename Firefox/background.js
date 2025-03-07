// background.js

// Global leak history: each entry is { tabId, url, domain, pattern, match, domPath }
let globalLeakHistory = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateLeaks") {
    const { leaks } = message;
    const tabId = sender.tab.id;
    const url = sender.tab.url || "";
    const domain = extractDomain(url);

    // Add each leak to global history if it's not already there
    leaks.forEach(leak => {
      const exists = globalLeakHistory.some(item =>
        item.domain === domain &&
        item.pattern === leak.pattern &&
        item.match === leak.match &&
        item.domPath === leak.domPath
      );

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

    // Badge text to indicate how many leaks discovered in this scan
    chrome.browserAction.setBadgeText({
      text: leaks.length.toString(),
      tabId: tabId
    });

    sendResponse({ status: "Leak details stored (no duplicates)" });
  }

  if (message.type === "getGlobalHistory") {
    sendResponse({ history: globalLeakHistory });
  }
});

// Helper function to extract domain
function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return "unknown";
  }
}
