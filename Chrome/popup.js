// popup.js

document.addEventListener('DOMContentLoaded', () => {
    // Ask the background script for the entire global leak history
    chrome.runtime.sendMessage({ type: "getGlobalHistory" }, (response) => {
      if (!response || !response.history) {
        document.getElementById("report").textContent = "No leak history found.";
        return;
      }
      const history = response.history; // all leaks across all tabs/pages
      updateReport(history);
    });
  });
  
  function updateReport(history) {
    const reportDiv = document.getElementById("report");
    if (history.length === 0) {
      reportDiv.textContent = "No leaks detected so far.";
      return;
    }
  
    reportDiv.textContent = ""; // Clear loading text
  
    const title = document.createElement("h2");
    title.textContent = `Total leaks found: ${history.length}`;
    reportDiv.appendChild(title);
  
    // Create a list for display
    const list = document.createElement("ul");
    history.forEach((item) => {
      const li = document.createElement("li");
      // Show domain, pattern name, matched text, and location
      li.innerHTML = `
        <strong>Domain:</strong> ${item.domain}<br>
        <strong>Pattern:</strong> ${item.pattern}<br>
        <strong>Match:</strong> ${item.match}<br>
        <strong>Location:</strong> ${item.domPath}
      `;
      list.appendChild(li);
    });
  
    reportDiv.appendChild(list);
  }
  