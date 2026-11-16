# Jay Prakash Sonkar — Portfolio

A static GitHub Pages portfolio presenting backend engineering, payment infrastructure, open-source developer tools, and hands-on engineering work.

**Live site:** https://iamjpsonkar.github.io/portfolio/

## Experience

- **Homepage:** professional positioning, selected projects, engineering impact, capabilities, experience, recommendations, and contact.
- **Case studies:** problem/approach/capabilities narratives for JSAT, PRView, PED Tools, DBMocker, LocalAI, Cloud-Learnings, and payment/refund platform work.
- **Résumé:** detailed career history, skills, and a print-friendly Save as PDF action.

## Run locally

No build step or package install is required:

```bash
python3 -m http.server 4173
```

Open http://localhost:4173/ while the server is running.

## Project structure

- `index.html` — portfolio homepage
- `projects.html` — engineering case studies
- `resume/` — detailed résumé and print support
- `css/portfolio-v2.css` — responsive visual system
- `js/portfolio-v2.js` — theme, navigation, and reveal interactions
- `scripts/check_site.py` — static HTML, metadata, local-link, image-alt, and sitemap checks
- `404.html` — branded not-found page
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — crawler and install metadata

## Quality checks

```bash
node --check js/portfolio-v2.js
node --check resume/print.js
python3 scripts/check_site.py
```

GitHub Actions runs the same checks for pull requests targeting `main`.

## Attribution

The repository retains legacy assets and attribution files from the earlier FreeFolio template. See `READ-ME.txt` and `LICENSE.txt`.
