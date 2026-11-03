# Jevon's Portfolio

Source for my personal portfolio at **[jevonzz.github.io](https://jevonzz.github.io)**. It brings together my background, experience, skills and selected projects, with a contact form for enquiries.

Built with React 18, Vite 5, Tailwind CSS 3 and Three.js through React Three Fiber. The hero uses a custom animated shader, with light/dark themes and reduced-motion support.

## Local development

Use **Node.js 20 or newer** and npm; the GitHub Pages workflow uses Node 20.

```bash
git clone https://github.com/Jevonzz/jevonzz.github.io.git
cd jevonzz.github.io
npm ci
npm run dev
```

Vite prints the local URL, normally [localhost:5173](http://localhost:5173).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite with hot reload |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Preview the production build locally |

## Editing content

| Path | What to change |
| --- | --- |
| `src/data/content.js` | Profile, About, experience, projects, skills, links and EmailJS configuration |
| `public/projects/` | Project screenshots referenced by the content data |
| `public/logos/`, `public/icons/` | Employer logos and skill icons |
| `public/cv.pdf` | Downloadable CV; its link is controlled by the profile data |
| `src/components/` | Page sections, navigation, contact form and footer |
| `src/three/HeroScene.jsx` | Three.js hero scene and shader |
| `src/hooks/` | Theme, scroll-reveal and reduced-motion behaviour |
| `src/index.css`, `tailwind.config.js` | Shared visual styles and theme configuration |
| `index.html`, `public/og.png` | Page metadata and social preview image |

Keep project screenshots and live links aligned when adding or updating a project. Public assets are referenced from the site root, for example `/projects/lift.png`.

## Contact form

The form loads the EmailJS browser SDK when a visitor sends a message. Default configuration lives in `src/data/content.js`; override it with a `.env.local` file when using your own EmailJS service:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The EmailJS template receives `from_name`, `to_name`, `from_email` and `message`. Configure the service and template in EmailJS, then restart Vite after changing environment values. These `VITE_` settings are browser-visible configuration; do not put private server credentials in them.

For GitHub Actions builds, values must be available to the build step to override the defaults. The checked-in workflow does not currently map custom EmailJS secrets or variables into that step.

## Deployment

In **Settings → Pages**, choose **GitHub Actions** as the source. `.github/workflows/deploy.yml` installs dependencies with `npm ci`, builds `dist/`, uploads the Pages artifact and deploys it on pushes to `main`. It also supports manual runs from the Actions tab.

This repository is a user-site deployment at the domain root. If moving it under a repository subpath, review Vite's `base` setting and the root-relative asset paths.

## Checking changes

Run `npm run build` and `npm run preview`. Check mobile and desktop layouts, both themes, project/CV links, keyboard navigation and the contact form's success/error states. The repository currently has no lint or automated-test script.
