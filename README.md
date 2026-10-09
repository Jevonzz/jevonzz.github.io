# jevonzz.github.io

Source for my portfolio at **https://jevonzz.github.io**.

Built with React, Vite, Tailwind CSS and three.js (via react-three-fiber). Every push to `main` builds and deploys automatically through GitHub Actions.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Editing content

All text (about, experience, projects, skills, links) lives in `src/data/content.js`. Add your LinkedIn URL or a CV path there to show those buttons.

The contact form uses EmailJS. You can override the keys with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`.

## One-time setup

In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
