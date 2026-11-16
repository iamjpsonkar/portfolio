# Jay Prakash Sonkar — Portfolio

Personal portfolio for Jay Prakash Sonkar, Software Development Engineer II at Fynd and independent developer-tools builder.

**Live site:** https://iamjpsonkar.github.io/portfolio/

## Portfolio map

- index.html — professional positioning, selected projects, engineering impact, experience, recommendations, and contact
- projects.html — engineering case studies covering JSAT, PRView, PED Tools, DBMocker, LocalAI, Cloud-Learnings, and payment systems
- resume/ — detailed résumé
- 404.html — branded not-found page
- css/portfolio-v2.css and js/portfolio-v2.js — responsive design system and accessible interactions

## Run locally

No build step or package installation is required:

~~~bash
python3 -m http.server 4173
~~~

Open http://localhost:4173/.

## Quality checks

The GitHub Actions workflow validates JavaScript syntax, parses every public HTML page, checks duplicate IDs and broken local links/fragments, validates the sitemap, and verifies that sitemap URLs correspond to published pages.

Run the lightweight checks locally:

~~~bash
node --check js/portfolio-v2.js
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ET

class PageCheck(HTMLParser):
    pass

for page in ("index.html", "projects.html", "404.html", "resume/index.html"):
    parser = PageCheck()
    parser.feed(Path(page).read_text(encoding="utf-8"))
    parser.close()
    print("Parsed:", page)

ET.parse("sitemap.xml")
print("Parsed: sitemap.xml")
PY
~~~

## Deployment

This is a static GitHub Pages site. The publishing branch and custom domain settings are managed in the repository's Pages configuration.

## Attribution

The repository retains legacy assets and attribution files from the earlier FreeFolio template. See READ-ME.txt and LICENSE.txt.
