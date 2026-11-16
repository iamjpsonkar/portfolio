# Jay Prakash Sonkar — Portfolio

Personal portfolio for Jay Prakash Sonkar, Software Development Engineer II at Fynd and independent developer-tools builder.

**Live site:** https://iamjpsonkar.github.io/portfolio/

## What you'll find

- Selected engineering projects: JSAT, PRView, PED Tools, DBMocker, LocalAI, and Cloud-Learnings
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

- `index.html` — homepage content and metadata
- `css/portfolio-v2.css` — visual system and responsive layout
- `js/portfolio-v2.js` — theme, navigation, scroll, and reveal interactions
- `resume/` — detailed résumé
- `images/`, `img/` — visual assets

## Quality checks

```bash
node --check js/portfolio-v2.js
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

class Checker(HTMLParser):
    pass

for path in (Path("index.html"), Path("resume/index.html")):
    parser = Checker()
    parser.feed(path.read_text(encoding="utf-8"))
    parser.close()
    print(f"Parsed: {path}")
PY
```

This is a static GitHub Pages project. Updates to the publishing branch are served by GitHub Pages.

## Attribution

The repository retains legacy assets and attribution files from the earlier FreeFolio template. See `READ-ME.txt` and `LICENSE.txt`.
