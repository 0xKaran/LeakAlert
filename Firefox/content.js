// content.js

function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .leak-alert-highlight {
      background-color: #ffff99;
      color: #333;
      border: 1px solid #ffcc00;
      padding: 2px 4px;
      border-radius: 3px;
    }
  `;
  document.head.appendChild(style);
}

// Utility to get a unique DOM path for a node (for proof of concept)
function getDomPath(node) {
  if (!node || !node.parentNode) return "";
  let stack = [];
  let currentNode = node;
  while (currentNode.parentNode) {
    let sibCount = 0;
    let sibIndex = 0;

    // Count siblings with the same tag
    let sibling = currentNode.parentNode.firstChild;
    while (sibling) {
      if (sibling.nodeName === currentNode.nodeName) {
        sibCount++;
      }
      if (sibling === currentNode) {
        sibIndex = sibCount;
      }
      sibling = sibling.nextSibling;
    }

    let nodeName = currentNode.nodeName.toLowerCase();
    if (sibCount > 1) {
      // If more than one sibling with the same tag, append an index
      stack.unshift(nodeName + `:nth-of-type(${sibIndex})`);
    } else {
      stack.unshift(nodeName);
    }
    currentNode = currentNode.parentNode;
    if (currentNode === document) break;
  }
  return stack.join(" > ");
}

function scanPageForLeaks() {
  injectCSS();

  let foundLeaks = []; // We'll collect each leak as {pattern, match, domPath}

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    let originalText = node.textContent;
    let newHTML = originalText;
    let foundMatch = false;

    // regexPatterns is an array of { name: string, regex: RegExp }
    regexPatterns.forEach(pattern => {
      pattern.regex.lastIndex = 0;
      let match;
      while ((match = pattern.regex.exec(originalText)) !== null) {
        foundMatch = true;
        const domPath = getDomPath(node);
        foundLeaks.push({
          pattern: pattern.name,
          match: match[0],
          domPath
        });
      }

      // Replace to highlight text
      pattern.regex.lastIndex = 0;
      newHTML = newHTML.replace(pattern.regex, m => {
        return `<span class="leak-alert-highlight" title="Leak detected: ${pattern.name}">${m}</span>`;
      });
    });

    if (foundMatch && newHTML !== originalText) {
      const span = document.createElement('span');
      span.innerHTML = newHTML;
      node.parentNode.replaceChild(span, node);
    }
  }

  // If any leaks found, show them one by one in alerts
  if (foundLeaks.length > 0) {
    for (const leak of foundLeaks) {
      alert(
        `Leak detected!\n` +
        `Pattern: ${leak.pattern}\n` +
        `Match: ${leak.match}\n` +
        `Location: ${leak.domPath}`
      );
    }

    // Send found leaks to background script for global storage
    chrome.runtime.sendMessage(
      { type: "updateLeaks", leaks: foundLeaks },
      response => {
        if (chrome.runtime.lastError) {
          console.log("LeakAlert: Error sending leaks to background", chrome.runtime.lastError);
        } else {
          console.log("LeakAlert:", response.status);
        }
      }
    );
  }
}

// Run scan on page load
scanPageForLeaks();
