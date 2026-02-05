# Kode24 Ad Blocker Extension

A lightweight, open-source browser extension designed to improve the reading experience for developers on [kode24.no](https://www.kode24.no/) by removing commercial clutter.

## 🚀 Features

- **Ad Removal**: Automatically removes banners, commercial content, and partner tiles.
- **Layout Cleanup**: Hides the job listing sidebar and other distracting layout elements.
- **Performance Optimized**: Uses `MutationObserver` to efficiently handle dynamically loaded ads without impacting page performance.

## 🎯 Targeted Elements

This extension specifically targets and strictly removes:
- Commercial content (`.commercial`)
- Banner ads (`.banner`, `.banner-container`, `.top-bar-ad`, `#top-bar-ad`, `.top-bar-ad-desktop`)
- Partner tiles (`#diamond-partners-list-tile`)
- Sidebar elements (`.job-list`, `#desktop-sidemenu-front`)
- Footer (`.main-footer`)

## 📦 Installation (Free for Developers)

This project is open-source. You can install it on Chrome, Edge, Brave, or any Chromium-based browser for free using **Developer Mode**.

### Google Chrome
1.  **Download** this repository (Code -> Download ZIP) and unzip it, or `git clone` it.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** (toggle in the top right corner).
4.  Click **Load unpacked** (top left).
5.  Select the folder containing `manifest.json`.

### Microsoft Edge
1.  **Download** or `git clone` this repository.
2.  Open Edge and navigate to `edge://extensions/`.
3.  Enable **Developer mode** (toggle in the bottom left or sidebar).
4.  Click **Load unpacked**.
5.  Select the folder containing `manifest.json`.

## 🌐 Publishing Guide

If you want to publish this to the official extension stores, here is the process.

### 1. GitHub (Source Code)
Publishing source code to GitHub is free and allows other developers to contribute.
1.  Create a new repository on [GitHub](https://github.com/new).
2.  Run the following commands in your project folder:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/kode24-ad-blocker.git
    git push -u origin main
    ```

### 2. Microsoft Edge Add-ons (Free)
Microsoft Edge offers free publishing for extensions.
1.  **Register**: Go to [Partner Center](https://partner.microsoft.com/en-us/dashboard/microsoftedge/public/login) and register as a developer (Free).
2.  **Package**: Zip the contents of your extension folder (select all files -> Right-click -> Send to -> Compressed (zipped) folder).
3.  **Submit**: Used the "Create a new extension" button in Partner Center and upload your `.zip` file. Fill in the store listing details.

### 3. Chrome Web Store (One-time fee)
Google charges a small one-time fee to verify developers.
1.  **Register**: Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
2.  **Pay Fee**: Pay the one-time $5 USD registration fee.
3.  **Package**: Zip your extension folder contents.
4.  **Submit**: Click "New Item", upload your `.zip` file, and fill out the store listing info.

## 🛠️ Development structure

- `manifest.json`: Configuration file defining permissions and matches.
- `content.js`: The core script that scans the DOM and removes ad elements.

## 🤝 Contributing

Pull requests are welcome! If you find a new ad type that isn't being blocked, please open an issue or submit a PR.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
