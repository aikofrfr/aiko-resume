# Aiko — Developer Portfolio

A responsive, single-page developer resume website for Aiko. Built with plain HTML, CSS and JavaScript so it can be hosted for free without a paid API, database or subscription.

## Run locally

1. Extract the project folder.
2. Open `index.html` in a modern browser.
3. For a local web server (recommended), open a terminal in this folder and run:

   ```bash
   python -m http.server 8000
   ```

4. Visit `http://localhost:8000`.

No package installation or build step is required.

## Publish for free

### GitHub Pages
1. Create a public GitHub repository, for example `aiko-portfolio`.
2. Upload the contents of this folder (keep `index.html` at the repository root).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will provide the public website address when deployment completes.

### Cloudflare Pages or Netlify
Create a new static site and upload this folder, or connect the GitHub repository. No build command is needed; use the project root as the publish directory.

## Edit your details

Open `index.html` in VS Code or another code editor. Search for the text you want to change. The Discord username is also defined near the top of `script.js` as:

```js
const discord = 'yourstruly.aiko';
```

Update that value if your Discord handle changes.

## Update client reviews

The two original review screenshot images are linked from Aiko's existing Carrd resume. They are loaded from the original Carrd asset URLs. If you prefer to host them locally, save the images into `assets/` and update the two `img src` values in `index.html`.

## Print / save as PDF

Use the **PRINT / SAVE CV** control in the footer. In the browser's print dialog, select **Save as PDF**. The print stylesheet hides decorative UI and reformats the page for printing. The printed CV is a concise web-resume print view; it is not a separately typeset one-page document.

## Features

- Responsive desktop, tablet and mobile layouts
- Sticky navigation and active-section indicator
- Scroll progress bar and reveal-on-scroll motion
- Dark/light theme toggle (saved locally in the browser)
- Copy-to-clipboard Discord contact controls
- Mobile navigation menu
- Original testimonial screenshots (loaded from Carrd)
- Print stylesheet for Save as PDF
- Reduced-motion support and keyboard-friendly controls
- 404 page, favicon and SEO/social metadata

## Accuracy notes

The site uses Aiko's supplied details and current Carrd resume content, with the experience updated to **5 years** as Aiko specified. Historical server roles are labelled as former roles. No dates, qualifications, email address, Discord ID or unverified project case studies have been invented.
