# Elias Harvey-Nilsson — Personal Website

> Reliable software. Thoughtful work.

A personal portfolio for Elias Harvey-Nilsson, a senior software engineer focused on .NET, Azure, cloud systems, and integrations. The site presents his engineering profile, career experience, technical focus, and contact information in a clean, accessible format.

**Live site:** [harvnil.com](https://harvnil.com/)

## What the site highlights

- Building and operating reliable cloud software and integrations
- Modernizing services and infrastructure with .NET, Azure, Terraform, and CI/CD
- Engineering practices including testing, observability, and security
- A career spanning cloud software, developer tooling, and full-stack work

The site includes responsive layouts, light and dark themes, accessible navigation, and a downloadable resume.

## Built with

- HTML and CSS
- TypeScript, compiled to browser-native JavaScript modules
- Google Fonts: Manrope, DM Sans, and DM Mono

## Run locally

The site is in `PersonalWebsite/PersonalWebsite`. From that directory, install dependencies and compile the TypeScript:

```sh
npm ci
npm run build
```

Serve that directory with a local static web server and open its `index.html` through the server. The page loads its compiled module from `dist/app.js`, so use an HTTP server rather than opening the file directly.

## Project structure

- `PersonalWebsite/PersonalWebsite/index.html` — page content and metadata
- `PersonalWebsite/PersonalWebsite/styles.css` — layout, responsive styles, and themes
- `PersonalWebsite/PersonalWebsite/app.ts` — header, footer, and theme behavior
- `PersonalWebsite/PersonalWebsite/dist/` — compiled TypeScript output
- `PersonalWebsite/PersonalWebsite/resume/` — downloadable resume

## Contact

- Email: [eli@harvnil.com](mailto:eli@harvnil.com)
- LinkedIn: [elias-harvey-nilsson](https://www.linkedin.com/in/elias-harvey-nilsson/)
