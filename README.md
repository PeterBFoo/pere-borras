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
pnpm seo:check
pnpm test --watch=false
pnpm build
```

## Deployment

The workflow in `.github/workflows/deploy.yml` builds the Angular application and publishes it to GitHub Pages whenever `main` changes. In the GitHub repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.

The workflow sets Angular's base URL dynamically from the repository name, so the site works at `https://<username>.github.io/<repository>/` without hard-coded account details.

Set the optional repository variable `BASE_HREF` to `/` after attaching a custom domain.

## SEO

The site is statically prerendered so search engines receive its complete content without needing to execute Angular. It also includes a canonical URL, crawl directives, Open Graph and Twitter metadata, `ProfilePage`/`Person` structured data, a sitemap, a web app manifest, branded icons, a social preview, an `llms.txt` discovery file and the persistent Google Search Console verification file. The deployment workflow runs `pnpm seo:check` before every build.

After moving to a custom domain, replace `https://peterbfoo.github.io/pere-borras/` in `src/index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` and `scripts/check-seo.mjs`. Set `start_url` and `scope` in `public/site.webmanifest` to `/`, configure the domain in GitHub Pages, set `BASE_HREF=/`, verify the property in Google Search Console and submit `/sitemap.xml`.

## Content sources

Professional content is based on `CV-InnoIT-Pere-Borras-Exposito--3.pdf` and the verified LinkedIn profile. The contact email was supplied directly by Pere.
