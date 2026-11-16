# Jay Prakash Sonkar — Portfolio

Personal portfolio for Jay Prakash Sonkar, Software Development Engineer II at Fynd and independent developer-tools builder. The résumé and portfolio are maintained together so role, experience, and project narratives stay consistent.

**Live site:** https://iamjpsonkar.github.io/portfolio/

## What you'll find

- Seven detailed case studies: JSAT, PRView, PED Tools, DBMocker, LocalAI, Cloud-Learnings, and production payments/refunds
- Dedicated project case studies in `projects.html` covering problem context, approach, and capabilities, including LocalAI and Cloud-Learnings
- High-level Mermaid architecture diagrams in `docs/ARCHITECTURE.md` for selected public projects and payment-platform contributions
- Payment-platform impact and a concise career timeline
- Recommendations, contact links, and résumé
- Responsive layout, dark/light themes, keyboard-accessible navigation, reduced-motion support, and search/social metadata

## Run locally

No build step or package install is required:

```bash
python3 -m http.server 4173
```

Open http://localhost:4173/ when running inside this repository.

## Main files

- `404.html` — branded GitHub Pages not-found page

- `index.html` — homepage content and metadata
- `css/portfolio-v2.css` — visual system and responsive layout
- `js/portfolio-v2.js` — theme, navigation, scroll, and reveal interactions
- `projects.html` — long-form engineering case studies
- `architecture.html` — rendered system diagrams
- `docs/ARCHITECTURE.md` — editable Mermaid diagram source and architecture notes
- `scripts/check_site.py` — HTML, metadata, local-link, image-alt, and sitemap checks
- `resume/print.js` — résumé print action
- `resume/` — detailed résumé
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — crawler and install metadata
- `images/`, `img/` — visual assets

## Quality checks

```bash
node --check js/portfolio-v2.js
node --check js/javascript.js
node --check resume/print.js
python3 scripts/check_site.py
```

The same checks run in GitHub Actions for pull requests targeting `main`.

## Attribution

The repository retains legacy assets and attribution files from the earlier FreeFolio template. See `READ-ME.txt` and `LICENSE.txt`.
