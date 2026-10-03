#!/usr/bin/env python3
"""Generate PDF from HTML using Playwright directly."""

import sys
import os
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Installing playwright...")
    os.system(f"{sys.executable} -m pip install playwright")
    from playwright.sync_api import sync_playwright

HTML_FILE = "/home/z/my-project/download/bautismo_folleto.html"
PDF_FILE = "/home/z/my-project/download/bautismo_folleto.pdf"
PNG_FILE = "/home/z/my-project/download/bautismo_folleto_preview.png"


def main():
    if not Path(HTML_FILE).exists():
        print(f"ERROR: HTML file not found: {HTML_FILE}")
        sys.exit(1)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        # Load the HTML
        page.goto(f"file://{HTML_FILE}", wait_until="networkidle")
        page.wait_for_timeout(3000)

        # Generate PDF - landscape letter size (279.4mm x 215.9mm)
        page.pdf(
            path=PDF_FILE,
            width="279.4mm",
            height="215.9mm",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            prefer_css_page_size=False,
        )
        print(f"PDF generated: {PDF_FILE}")
        print(f"PDF size: {os.path.getsize(PDF_FILE)} bytes")

        # Also take a screenshot for preview
        page.set_viewport_size({"width": 1056, "height": 816})
        page.screenshot(
            path=PNG_FILE,
            full_page=True,
        )
        print(f"Preview image generated: {PNG_FILE}")
        print(f"PNG size: {os.path.getsize(PNG_FILE)} bytes")

        browser.close()


if __name__ == "__main__":
    main()
