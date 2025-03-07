# LeakAlert by 0xKaran ![LeakAlert Logo](Firefox/icon.png)

**LeakAlert** is a cross-browser extension that automatically detects leaked secrets and credentials while browsing. It highlights, alerts, and stores potentially sensitive information to help security researchers, developers, and curious hackers quickly identify accidental exposures.

[Watch the Demo](https://vimeo.com/1063630365)

---

## Table of Contents
1. [Features](#features)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Configuration](#configuration) 
7. [Contributing](#contributing)  
8. [Contact](#contact)

---

## Features

- **Automatic Detection**  
  Scans every webpage for known secret patterns (AWS, Slack, Google API Keys, and many more).

- **Highlighting & Alerting**  
  Each found leak is highlighted inline, and (optionally) alerts appear to warn you immediately.

- **History Tracking**  
  Stores all discovered leaks across all visited pages in a global history for reference.

- **Configurable Patterns**  
  Add, remove, or update patterns in `regexPatterns.js` to fit your needs.

- **Minimal, Professional UI**  
  A simple popup interface provides a quick overview of all discovered leaks.

---

## Installation

### Chrome
1. **Clone or Download** this repository.
2. **Open** Chrome and go to: `chrome://extensions/`
3. **Enable** Developer mode (toggle in the top-right corner).
4. **Load Unpacked** extension by selecting the whole folder that contains `manifest.json`.
5. **LeakAlert** will appear in your Chrome extensions list.

### Firefox
1. **Clone or Download** this repository.
2. **Manifest V2** is provided for compatibility with Firefox.
3. **Go to**: `about:debugging#/runtime/this-firefox`
4. Click **“Load Temporary Add-on”** (or **“Load Unpacked”** in newer versions).
5. **Select** the `manifest.json` file.

For **permanent installation** in Firefox, you’ll need to sign the extension or disable signature checks in Developer Edition / Nightly. Check the [Mozilla documentation](https://extensionworkshop.com/documentation/publish/) for more details.

---

## Usage

1. **Open any webpage**  
- The extension will automatically scan the page for common credentials and secrets.

2. **Review Detected Leaks**  
- Alerts appear if configured (one per leak).  
- The icon badge shows how many leaks were found on the current page.

3. **Check the Global History**  
- Click the LeakAlert icon in the browser toolbar.  
- The popup displays a list of all unique leaks discovered, with the domain, pattern, matched text, and location in the DOM.

---

## Configuration

- You can easily customize detection patterns, style, and behaviors by adding new patterns or modify existing ones to detect specific secrets in **regexPatterns.js**  .  
- Create pull request if you have new regex secret.

---

## Contributing

Contributions are welcome for new secrets/token/api regex or any code change!

---

## Contact

For questions, suggestions, or support, please reach out:

- **X (formerly Twitter)**: [@0xkaran](https://x.com/0xkaran)  
- **LinkedIn**: [0xKaran](https://www.linkedin.com/in/0xkaran/)  
- **Instagram**: [@0xkaran_](https://www.instagram.com/0xkaran_/)  
- **Hire Me**: [0xKaranChaudhary@gmail.com](mailto:0xKaranChaudhary@gmail.com)
