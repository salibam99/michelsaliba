# michelsaliba

Personal academic site. Plain HTML/CSS/JS, no build step.

```
index.html          about, research, selected publications, CV highlights
publications.html   full publication list
publications.js     ← your publications; the file you edit most
style.css           all styling (light + dark)
site.js             light/dark toggle
cv.pdf              downloadable CV
```

## Adding a publication

Add an entry to the top of the right group in `publications.js`:

```js
{ kind: "journal", year: 2027, selected: true,
  title: "Paper title in sentence case",
  authors: "M. Saliba, A. Coauthor",
  venue: "Journal name", details: "12, 345–356",
  url: "https://doi.org/..." },
```

- `kind` is `journal`, `conference` or `preprint`.
- `selected: true` also lists it on the home page.
- `details`, `url` and `note` are optional.
- Numbering (J1, C1, ...) is automatic.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` and go to http://localhost:8000.

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **None**. Build command: *(empty)*. Build output directory: `/`.
4. Every push to `main` redeploys. Add a custom domain under the project's **Custom domains** tab.
