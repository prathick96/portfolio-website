# Padmanabhan Elango Manivannan — Portfolio

An immersive 3D glass portfolio for a **Senior Software Engineer & Forward Deployed Engineer**
transitioning into **AI**. Dark "stargaze" backdrop, gold accents, liquid-glass UI, a live
years-of-experience counter, and a working contact form.

> Live: **https://prathick96.github.io/portfolio-website/**

## ✨ Highlights

- **3D stargaze scene** — Three.js via react-three-fiber: twinkling starfield, a refractive
  liquid-glass crystal, gold dust, and Bloom / Vignette / Chromatic-Aberration post-processing
  that reacts to scroll and pointer.
- **Liquid-glass UI** — glassmorphism cards, gold gradient accents, custom cursor, scroll
  progress, magnetic buttons and anime.js entrance animations.
- **Auto-updating experience** — years in IT and every role duration are computed live from
  `2018-08-09`, so the site never goes stale.
- **Working contact form** — Web3Forms delivery straight to the inbox, with a graceful `mailto`
  fallback before a key is configured.
- **Accessible & resilient** — honors `prefers-reduced-motion`, falls back cleanly when WebGL is
  unavailable, semantic landmarks, labelled form fields.

## 🧱 Stack

Vite · React + TypeScript · Tailwind CSS · three.js / @react-three/fiber · @react-three/drei ·
@react-three/postprocessing · anime.js · Web3Forms

Design system generated with the [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
intelligence skill (see `design-system/`).

## 🚀 Develop

```bash
npm install
npm run dev        # http://localhost:5173/portfolio-website/
npm run build      # production build -> dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

## 📬 Contact form (Web3Forms)

1. Get a free access key at <https://web3forms.com> (use `paddhu.xd96@gmail.com`).
2. Either:
   - add it as a repo secret named `WEB3FORMS_KEY` (used by the deploy workflow), **or**
   - copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=...`, **or**
   - paste it directly into `WEB3FORMS_ACCESS_KEY` in `src/config/site.ts` (these keys are
     designed to be public / client-side).

Until a key is present, the form opens the visitor's email client to `paddhu.xd96@gmail.com`.

## 🌐 Deploy (GitHub Pages)

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/`.
In the repo **Settings → Pages**, set **Source = GitHub Actions** once.

Content lives in `src/config/site.ts` — update profile, experience, skills, projects and socials there.
