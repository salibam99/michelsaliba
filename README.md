# Personal site

Static HTML/CSS/JS. No build step, no dependencies.

```
index.html          about + experience + selected work
publications.html   full list, grouped by year, filterable
publications.json   ← the only file you edit regularly
pubs.js             renders the JSON into both pages
style.css           all styling
cv.pdf              add your own
papers/             optional: hosted PDFs
```

## Run it locally

`fetch()` is blocked on `file://`, so the publications won't load if you just
double-click `index.html`. Serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Adding a publication

Append an object to `publications.json`. Nothing else to touch.

```json
{
  "title": "...",
  "authors": ["Y. Name", "A. Coauthor"],
  "venue": "Proceedings of ...",
  "short": "CONF 2026",
  "year": 2026,
  "type": "conference",
  "selected": true,
  "summary": "Two sentences.",
  "links": { "pdf": "papers/x.pdf", "arxiv": "https://arxiv.org/abs/..." }
}
```

- `me` at the top of the JSON must match your string in `authors` exactly, or
  your name won't be bolded.
- `selected: true` promotes it to the homepage.
- `type` drives the filter buttons: `conference`, `journal`, `preprint`,
  `workshop`, `thesis`.
- Any `links` key you omit is simply not rendered.

## Deploying to GitHub Pages

```sh
git init && git add -A && git commit -m "Initial site"
gh repo create yourname.github.io --public --source=. --push
```

Then:

1. Repo → **Settings → Pages** → Source: `main`, folder `/`.
2. Under **Custom domain**, enter `yourname.com` and save. This writes a
   `CNAME` file to the repo.
3. At your registrar, add these DNS records:

   | Type  | Name  | Value                                  |
   |-------|-------|----------------------------------------|
   | A     | `@`   | `185.199.108.153`                      |
   | A     | `@`   | `185.199.109.153`                      |
   | A     | `@`   | `185.199.110.153`                      |
   | A     | `@`   | `185.199.111.153`                      |
   | CNAME | `www` | `yourname.github.io.`                  |

4. Wait for DNS to propagate, then tick **Enforce HTTPS**.

Verify the current GitHub Pages IPs in their docs before pasting — they change
rarely, but they do change.

## Before you publish

- [ ] Replace every placeholder in `index.html` (name, role, bio, links)
- [ ] Update the `<title>` and `<meta name="description">` on both pages
- [ ] Drop in `cv.pdf`
- [ ] Add a photo if you want one — a plain `<img>` in the hero is enough
- [ ] Check it on a phone
