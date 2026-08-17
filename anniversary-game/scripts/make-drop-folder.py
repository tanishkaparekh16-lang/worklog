#!/usr/bin/env python3
"""Build the folder that gets dragged onto Netlify.

    cd anniversary-game
    npm run build:single
    python3 scripts/make-drop-folder.py

Produces `deploy/2yearsofus/` containing a single self-contained index.html:
every photo, font reference and script inlined, so there are no side files to
lose and no external requests except Google Fonts. Drag that folder onto the
site's Deploys page on Netlify — same URL, so the save file survives.
"""
import base64
import mimetypes
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'dist-single' / 'index.html'
PUB = ROOT / 'public'
OUT_DIR = ROOT / 'deploy' / '2yearsofus'

if not SRC.exists():
    sys.exit(f'{SRC} not found — run `npm run build:single` first.')

html = SRC.read_text()

refs = sorted(set(re.findall(r'assets/(?:images|audio|video)/[A-Za-z0-9._-]+', html)))
missing = []
for ref in refs:
    f = PUB / ref
    if not f.exists():
        missing.append(ref)
        continue
    mime = mimetypes.guess_type(f.name)[0] or 'application/octet-stream'
    html = html.replace(ref, f'data:{mime};base64,{base64.b64encode(f.read_bytes()).decode()}')

OUT_DIR.mkdir(parents=True, exist_ok=True)
(OUT_DIR / 'index.html').write_text(html)

# Keep the site out of search results — the URL is guessable and the
# contents are not meant for strangers.
(OUT_DIR / 'robots.txt').write_text('User-agent: *\nDisallow: /\n')
(OUT_DIR / '_headers').write_text('/*\n  X-Robots-Tag: noindex\n')

size = (OUT_DIR / 'index.html').stat().st_size / 1_000_000
print(f'inlined {len(refs) - len(missing)}/{len(refs)} assets → {OUT_DIR} ({size:.2f} MB)')
if missing:
    print('MISSING (left as broken paths):')
    for m in missing:
        print('  ' + m)
