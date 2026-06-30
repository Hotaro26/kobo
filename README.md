# kobo

A clean, minimal, and fully featured web downloader website powered by Cobalt. It doesn't look like it was built in 2008. It's minimal, greyish, and fast as hell.

---

## Features

* **Monochromatic Minimalist Design:** Curated dark modes featuring Slate Grey, Nord Mocha, and Dracula Pink theme variations with smooth CSS spring transitions.
* **Dynamic Brand Detection:** Paste or type a URL (YouTube, TikTok, Instagram, Twitter, Pinterest, etc.) and watch the input icon dynamically swap to the official brand logo, accompanied by a slide-up toast.
* **Direct File Downloader:** Uses a backend streaming proxy (`/api/stream`) to bypass CORS and force native browser "Save As" download dialogs rather than opening media in a new tab.
* **Multi-Platform Cookie Store:** Configure custom cookies for specific platforms (`youtube`, `instagram`, `tiktok`, `twitter`, `facebook`, `reddit`, `bilibili`, or `general`). 
* **Smart Cookie Injection:** Kobo automatically detects the URL you paste and injects the matching cookie profile during download. It even auto-swaps the active cookie tab in your settings!
* **File-Based Cookie Imports:** Don't want to copy-paste? Import your `.txt` (Netscape) or `.json` cookie files directly in the settings modal.
* **Floating TUI Logs:** A retro-styled terminal log stream at the bottom-right of your screen. Hover and scroll your mouse wheel to browse past logs, or click it to expand into a complete TUI terminal.

## Screenshots
<img width="1872" height="921" alt="image" src="https://github.com/user-attachments/assets/c1655391-b9f2-445b-b3f7-74064b203fe6" />
<img width="1872" height="921" alt="image" src="https://github.com/user-attachments/assets/57fcf53b-53f4-4285-b591-fc76e5d5d7cd" />
<img width="1872" height="921" alt="image" src="https://github.com/user-attachments/assets/51876221-421b-440f-b4e0-83b407cacdcb" />
<img width="1872" height="921" alt="image" src="https://github.com/user-attachments/assets/610215eb-597f-4bd5-abb2-344f14f12db7" />

<img width="1872" height="921" alt="image" src="https://github.com/user-attachments/assets/920c554b-81de-4b50-a415-07d35887a9a5" />

---

## Setup & Run (locally)

### 1. Clone & Install
```bash
cd kobo
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
COBALT_API_URL=https://hotaro344yy-cobalt-api.hf.space/
```

### 3. Run Development Server
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## How to Get Cookies to Bypass Blocks
If YouTube or Instagram blocks your downloads, you can bypass it in 30 seconds:
1. Install a browser extension like **Get cookies.txt** (Chrome/Brave) or **Export Cookies** (Firefox).
2. Go to the platform's website (e.g., https://youtube.com) and log in.
3. Click the extension, export/copy your cookies.
4. Open **Settings** in Kobo, click **Import File** (or paste them), select your platform, and click **Save & Close**.

---

*built with next.js, tailwind-free vanilla css, and cobalt.*
