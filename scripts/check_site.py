#!/usr/bin/env python3
"""Validate published and retained portfolio pages and their local assets."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html", "projects.html", "architecture.html", "resume/index.html",
    "404.html", "portfolio.html", "doc/index.html",
)
SITEMAP_PAGES = ("index.html", "projects.html", "architecture.html", "resume/index.html")
BASE_URL = "https://iamjpsonkar.github.io/portfolio/"
CSS_URL = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)

class PageAudit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.duplicates, self.references, self.fragments = set(), set(), [], []
        self.images_without_alt = 0
        self.title_count = 0
        self.description_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicates.add(element_id)
            self.ids.add(element_id)
        if tag == "img" and "alt" not in attrs:
            self.images_without_alt += 1
        if tag == "title":
            self.title_count += 1
        if tag == "meta" and attrs.get("name", "").lower() == "description":
            self.description_count += 1
        for attribute in ("href", "src"):
            if attrs.get(attribute):
                self.references.append((tag, attribute, attrs[attribute]))
        if attrs.get("srcset"):
            for candidate in attrs["srcset"].split(","):
                url = candidate.strip().split()[0] if candidate.strip() else ""
                if url:
                    self.references.append((tag, "srcset", url))

def local_target(source_path, reference):
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or reference.startswith("//"):
        return None
    raw_path = unquote(parsed.path)
    if not raw_path:
        return None
    target = (ROOT / raw_path.lstrip("/")) if raw_path.startswith("/") else (ROOT / source_path).parent / raw_path
    target = target.resolve()
    if ROOT not in target.parents and target != ROOT:
        raise ValueError(f"path escapes repository: {reference}")
    if target.is_dir():
        target = target / "index.html"
    return target

def check_css(css_path, errors):
    content = css_path.read_text(encoding="utf-8")
    for match in CSS_URL.finditer(content):
        reference = match.group(2).strip()
        if not reference or reference.startswith(("data:", "#")):
            continue
        try:
            target = local_target(css_path.relative_to(ROOT), reference)
        except ValueError as exc:
            errors.append(f"{css_path.relative_to(ROOT)}: {exc}")
            continue
        if target is not None and not target.exists():
            errors.append(f"{css_path.relative_to(ROOT)}: missing CSS asset: {reference}")

def main():
    errors, audits, stylesheets = [], {}, set()
    for filename in PAGES:
        path = ROOT / filename
        if not path.is_file():
            errors.append(f"{filename}: page does not exist")
            continue
        audit = PageAudit()
        try:
            audit.feed(path.read_text(encoding="utf-8"))
            audit.close()
        except Exception as exc:
            errors.append(f"{filename}: HTML parsing failed: {exc}")
            continue
        audits[filename] = audit
        if audit.duplicates:
            errors.append(f"{filename}: duplicate IDs: {sorted(audit.duplicates)}")
        if audit.images_without_alt:
            errors.append(f"{filename}: {audit.images_without_alt} image(s) missing alt attributes")
        if audit.title_count != 1:
            errors.append(f"{filename}: expected one title, found {audit.title_count}")
        if audit.description_count != 1:
            errors.append(f"{filename}: expected one meta description, found {audit.description_count}")
        for tag, attribute, reference in audit.references:
            try:
                target = local_target(filename, reference)
            except ValueError as exc:
                errors.append(f"{filename}: {exc}")
                continue
            if target is not None and not target.exists():
                errors.append(f"{filename}: missing {tag} {attribute}: {reference}")
            if target is not None and target.suffix.lower() == ".css" and target.is_file():
                stylesheets.add(target)
            fragment = urlsplit(reference).fragment
            if fragment and (target is None or target.suffix.lower() in ("", ".html", ".htm")):
                audits.setdefault(filename + "::fragments", []).append((target, unquote(fragment), reference))

    for key, fragments in list(audits.items()):
        if not key.endswith("::fragments"):
            continue
        page = key.split("::", 1)[0]
        for target, fragment, reference in fragments:
            target_page = target.relative_to(ROOT).as_posix() if target and target.is_file() else page
            target_audit = audits.get(target_page)
            if target_audit is None or fragment not in target_audit.ids:
                errors.append(f"{page}: unresolved fragment #{fragment} in {reference}")

    for stylesheet in sorted(stylesheets):
        check_css(stylesheet, errors)

    try:
        sitemap = ET.parse(ROOT / "sitemap.xml")
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locations = {node.text.strip() for node in sitemap.findall(".//sm:loc", ns) if node.text}
        for filename in SITEMAP_PAGES:
            expected = BASE_URL if filename == "index.html" else BASE_URL + ("resume/" if filename == "resume/index.html" else filename)
            if expected not in locations:
                errors.append(f"sitemap.xml: missing {expected}")
    except (ET.ParseError, OSError) as exc:
        errors.append(f"sitemap.xml: parse failed: {exc}")

    if errors:
        for error in errors:
            print("ERROR:", error)
        raise SystemExit(1)
    for filename, audit in audits.items():
        if filename.endswith("::fragments"):
            continue
        print(f"OK: {filename} — {len(audit.ids)} IDs, {len(audit.references)} references")
    print(f"OK: {len(stylesheets)} referenced stylesheet(s) checked")
    print("OK: sitemap contains all primary published pages")

if __name__ == "__main__":
    main()
