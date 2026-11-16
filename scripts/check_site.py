#!/usr/bin/env python3
"""Validate local HTML references, image alternatives, metadata, and sitemap entries."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index.html", "projects.html", "architecture.html", "resume/index.html", "404.html")
BASE_URL = "https://iamjpsonkar.github.io/portfolio/"

class PageAudit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.duplicates, self.references = set(), set(), []
        self.images_without_alt = 0
        self.title_count = 0
        self.description_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids: self.duplicates.add(element_id)
            self.ids.add(element_id)
        if tag == "img" and "alt" not in attrs: self.images_without_alt += 1
        if tag == "title": self.title_count += 1
        if tag == "meta" and attrs.get("name", "").lower() == "description": self.description_count += 1
        for attribute in ("href", "src"):
            if attrs.get(attribute): self.references.append((tag, attribute, attrs[attribute]))

def resolve_local_reference(page_path, reference):
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or reference.startswith("#"): return None
    raw_path = unquote(parsed.path)
    if not raw_path: return None
    target = (ROOT / raw_path.lstrip("/")) if raw_path.startswith("/") else (ROOT / page_path).parent / raw_path
    target = target.resolve()
    if ROOT not in target.parents and target != ROOT: raise ValueError(f"path escapes repository: {reference}")
    if target.is_dir(): target = target / "index.html"
    return target

def main():
    errors, page_audits = [], {}
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
        page_audits[filename] = audit
        if audit.duplicates: errors.append(f"{filename}: duplicate IDs: {sorted(audit.duplicates)}")
        if audit.images_without_alt: errors.append(f"{filename}: {audit.images_without_alt} image(s) missing alt attributes")
        if audit.title_count != 1: errors.append(f"{filename}: expected one title, found {audit.title_count}")
        if audit.description_count != 1: errors.append(f"{filename}: expected one meta description, found {audit.description_count}")
        for tag, attribute, reference in audit.references:
            try: target = resolve_local_reference(filename, reference)
            except ValueError as exc:
                errors.append(f"{filename}: {exc}")
                continue
            if target is not None and not target.exists(): errors.append(f"{filename}: missing {tag} {attribute}: {reference}")

    try:
        sitemap = ET.parse(ROOT / "sitemap.xml")
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locations = {node.text.strip() for node in sitemap.findall(".//sm:loc", ns) if node.text}
        for filename in PAGES:
            expected = BASE_URL if filename == "index.html" else BASE_URL + ("resume/" if filename == "resume/index.html" else filename)
            if expected not in locations: errors.append(f"sitemap.xml: missing {expected}")
    except (ET.ParseError, OSError) as exc: errors.append(f"sitemap.xml: parse failed: {exc}")

    if errors:
        for error in errors: print("ERROR:", error)
        raise SystemExit(1)
    for filename, audit in page_audits.items():
        print(f"OK: {filename} — {len(audit.ids)} IDs, {len(audit.references)} references, no duplicate IDs or missing image alt attributes")
    print("OK: sitemap contains all published HTML pages")

if __name__ == "__main__": main()
