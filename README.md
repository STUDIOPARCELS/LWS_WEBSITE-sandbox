# Lisa Wood Studio

Static website for Lisa Wood Studio.

## Content and build

All editable content lives in **`content/site.json`** — the single source of
truth. It holds the site metadata, navigation, intro copy, every category and
project, the practice statement, and the footer.

The home page is generated from that data. After editing `content/site.json`,
run the build:

```powershell
npm run build
```

This regenerates four files from `content/site.json` + `tools/template.html`:

- `index.html` — the studio home page (content, meta tags, and JSON-LD baked in).
- `llms.txt` — a plain-text site summary for AI agents and crawlers.
- `sitemap.xml` — crawler sitemap.
- `robots.txt` — crawler directives.

**Do not hand-edit `index.html`, `llms.txt`, `sitemap.xml`, or `robots.txt`** —
they are generated and will be overwritten. Edit `content/site.json` (data) or
`tools/template.html` (layout, styles, interaction script) instead.

Other pages:

- `observatory.html` — The Observatory Sun Valley commission presentation (a
  standalone page, not generated from the build).

## Run locally

```powershell
npm run start
```

`npm run start` runs the build first, then serves on `http://localhost:4173`.

For the local copy/style editor:

```powershell
npm run editor
```

Open `http://127.0.0.1:4174/?edit=1`.

## Notes

- No runtime dependencies are required.
- Images are loaded from the local `assets/` folder.
- The Observatory page supports keyboard, wheel, touch, and dot navigation.
- Use the small `Preview Controls` panel to revise copy in the browser; edits autosave locally to `edits/latest-edits.json`.
