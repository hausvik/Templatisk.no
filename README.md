# Templatisk.no

Marketing website for [Templatisk](https://templatisk.no), a template tool for Word and Outlook.

The site is a few static pages in Norwegian (Bokmål): `index.html`, `sikkerhet.html`, `pilot.html` and `sporsmal.html`, with shared `site.css` and `menu.js`, plus `favicon.svg`, `logo/` and `og-image.png`. There is no build step and no dependencies. To preview it, open `index.html` in a browser.

## Demo

`demo/` is the interactive product demo, served at `/demo/`. It uses fake data only.

It is a build output from the product's private repository (`npm run build:demo`) and is copied here as it is. Don't edit it by hand. Its code is bundled and minified.

The product source is closed and lives in a private repository. This repository does not contain it.

## Deployment

A GitHub Actions workflow deploys the site to Azure Static Web Apps on every push to `main`. Pull requests get preview deployments. The deployment token is stored in the repository secrets, and nothing secret is kept in the repo.

## Contact

[kontakt@templatisk.no](mailto:kontakt@templatisk.no)

## Copyright

© Templatisk. All rights reserved. The site content, logo and demo may not be reused or redistributed without permission. No open-source licence is granted.
