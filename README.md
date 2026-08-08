# Pere Borras - Personal portfolio

A focused personal-brand website built with Angular. The visual system takes cues from Apple's editorial approach: generous space, strong typography, restrained colour, rounded surfaces and subtle motion.

## Local development

```bash
pnpm install
pnpm start
```

Open `http://localhost:4200`.

## Quality checks

```bash
pnpm test -- --run
pnpm build
```

## Deployment

The workflow in `.github/workflows/deploy.yml` builds the Angular application and publishes it to GitHub Pages whenever `main` changes. In the GitHub repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.

The workflow sets Angular's base URL dynamically from the repository name, so the site works at `https://<username>.github.io/<repository>/` without hard-coded account details.

## Content sources

Professional content is based exclusively on `CV-InnoIT-Pere-Borras-Exposito--3.pdf`. Contact and location details that are not present in that document are intentionally excluded from the public site.
