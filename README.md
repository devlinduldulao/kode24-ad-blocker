# Kode24 Ad Blocker Extension

A lightweight, open-source browser extension designed to improve the reading experience for developers on [kode24.no](https://www.kode24.no/) by removing targeted links from subpages.

## 🚀 Features

- **Subpage-only Removal**: Removes `a[itemprop="url"]` links on article and other subpages.
- **Homepage Safe**: Leaves the top-level homepage untouched.
- **Performance Optimized**: Uses `MutationObserver` to efficiently handle dynamically loaded links without impacting page performance.

## 🎯 Targeted Elements

This extension specifically targets and strictly removes:
- Links matching `a[itemprop="url"]` on subpages only
- Matching links injected dynamically after page load

## 📦 Installation (Free for Developers)

This project is open-source. You can install it on Chrome, Edge, Brave, or any Chromium-based browser for free using **Developer Mode**.

### 1. Get the code
You can download the repository as a ZIP file or clone it using Git:

```bash
git clone https://github.com/devlinduldulao/kode24-ad-blocker.git
```

### 2. Load into Browser

#### Google Chrome
1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (toggle in the top right corner).
3.  Click **Load unpacked** (top left).
4.  Select the folder where you cloned/downloaded this repository (the folder containing `manifest.json`).

#### Microsoft Edge
1.  Open Edge and navigate to `edge://extensions/`.
2.  Enable **Developer mode** (toggle in the bottom left or sidebar).
3.  Click **Load unpacked**.
4.  Select the folder containing `manifest.json`.

## 🏪 Store Listing Copy

Use the text below for your store listing (Chrome Web Store and Microsoft Edge Add-ons).

**Title**
Kode24 Ad Blocker

**Short description (up to 132 characters)**
Removes `a[itemprop="url"]` links from kode24.no subpages while leaving the homepage untouched.

**Detailed description**
Kode24 Ad Blocker removes `a[itemprop="url"]` links from kode24.no subpages while leaving the homepage unchanged. It runs locally in your browser, does not collect data, and uses a lightweight MutationObserver to keep subpages clean even when content loads dynamically.

**Keywords**
kode24, ad blocker, clutter removal, clean reading, developer, norway

**Category suggestions**
Productivity, Accessibility

**Screenshots**
Take a before/after screenshot of kode24.no showing the cleaned layout (required by stores).

**Support email**
devlinduldulao@gmail.com

**Website**
https://devlinduldulao.vercel.app

## 🔒 Privacy Policy (Store Requirement)

This extension runs locally in your browser and only modifies the webpage content on kode24.no to remove targeted links from subpages.

- No data is collected, stored, or transmitted.
- No personal information is accessed.
- No analytics, tracking, or external requests are performed by the extension.

Full policy: [PRIVACY.md](PRIVACY.md)

## 🌐 Publishing Guide (Optional)

At this stage, the extension is distributed as source code on GitHub. If you wish to publish it to the official extension stores for broader reach, follow these steps:

### Microsoft Edge Add-ons (Free)
1.  **Register**: Go to [Partner Center](https://partner.microsoft.com/en-us/dashboard/microsoftedge/public/login) and register as a developer (Free).
2.  **Package**: Zip the contents of your extension folder (select all files -> Right-click -> Send to -> Compressed (zipped) folder).
3.  **Submit**: Use the "Create a new extension" button in Partner Center and upload your `.zip` file. Fill in the store listing details.

### Chrome Web Store (One-time fee)
1.  **Register**: Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
2.  **Pay Fee**: Pay the one-time $5 USD registration fee.
3.  **Package**: Zip your extension folder contents.
4.  **Submit**: Click "New Item", upload your `.zip` file, and fill out the store listing info.

## 🛠️ Development structure

- `manifest.json`: Configuration file defining permissions and matches.
- `content.js`: The core script that scans the DOM and removes ad elements.

## 🤝 Contributing

Pull requests are welcome! If you find a new ad type that isn't being blocked, please open an issue or submit a PR at [https://github.com/devlinduldulao/kode24-ad-blocker](https://github.com/devlinduldulao/kode24-ad-blocker).

## 📫 Support

Email: devlinduldulao@gmail.com

Website: https://devlinduldulao.vercel.app

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
