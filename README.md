# iamjpsonkar portfolio

The personal portfolio of Jay Prakash Sonkar—a senior backend engineer focused on payment infrastructure, developer tooling, local-first AI, and platform automation.

![Portfolio preview](images/jaysoft-systems-banner.png)

## Highlights

- Responsive, framework-free homepage
- Dark and light themes with saved preference
- Accessible navigation, focus states, semantic landmarks, and reduced-motion support
- Six evidence-backed engineering case studies
- Career impact, experience timeline, principles, recommendations, and direct contact paths
- Open Graph, Twitter Card, canonical, favicon, and Schema.org metadata

## Local development

    python3 -m http.server 4173

Open `http://localhost:4173`.

## Main files

- `index.html` — homepage content and structure
- `css/portfolio-v2.css` — responsive visual system
- `js/portfolio-v2.js` — theme, mobile navigation, header, and reveal behavior
- `images/jaysoft-systems-banner.png` — branded systems artwork
- `resume/` — web résumé

## Validation

    node --check js/portfolio-v2.js
    python3 -c "import html5lib; parser=html5lib.HTMLParser(strict=False); parser.parse(open('index.html', encoding='utf-8')); print(parser.errors)"

## Deployment

The repository is published through GitHub Pages at [iamjpsonkar.github.io/portfolio](https://iamjpsonkar.github.io/portfolio/).

## Credits

Earlier pages and retained legacy assets originated from the FreeFolio template. See `READ-ME.txt` and `LICENSE.txt` for the original attribution and license.
