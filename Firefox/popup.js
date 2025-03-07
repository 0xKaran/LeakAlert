// popup.js

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ type: "getGlobalHistory" }, response => {
    if (!response || !response.history) {
      document.getElementById("report").textContent = "No leak history found.";
      return;
    }
    const history = response.history;
    displayHistory(history);
  });
});

function displayHistory(history) {
  const reportDiv = document.getElementById("report");
  if (history.length === 0) {
    reportDiv.textContent = "No leaks detected so far.";
    return;
  }

  const totalHeading = document.createElement("h2");
  totalHeading.textContent = `Total leaks found: ${history.length}`;
  reportDiv.appendChild(totalHeading);

  const ul = document.createElement("ul");
  history.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Domain:</strong> ${item.domain}<br>
      <strong>Pattern:</strong> ${item.pattern}<br>
      <strong>Match:</strong> ${item.match}<br>
      <strong>Location:</strong> ${item.domPath}
    `;
    ul.appendChild(li);
  });

  reportDiv.appendChild(ul);
}
