/* Renders publications.json into the homepage and publications page.
   No dependencies, no build step. Edit publications.json, not this file. */

const TYPE_LABELS = {
  conference: "Conference",
  journal: "Journal",
  preprint: "Preprint",
  workshop: "Workshop",
  thesis: "Thesis"
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

async function loadPubs() {
  const res = await fetch("publications.json");
  if (!res.ok) throw new Error(`publications.json: ${res.status}`);
  const data = await res.json();
  const pubs = [...data.publications].sort((a, b) => b.year - a.year);
  return { me: data.me, pubs };
}

function authorLine(authors, me) {
  return authors
    .map((a) => (a === me ? `<strong>${esc(a)}</strong>` : esc(a)))
    .join(", ");
}

function linkList(links = {}) {
  const order = ["pdf", "arxiv", "doi", "code", "bibtex", "slides", "video"];
  const items = order
    .filter((k) => links[k])
    .map((k) => `<a href="${esc(links[k])}">${k === "doi" ? "DOI" : k === "pdf" ? "PDF" : k === "arxiv" ? "arXiv" : k}</a>`);
  return items.length ? `<div class="pub__links">${items.join("")}</div>` : "";
}

function pubHTML(p, me, number, opts = {}) {
  const tag = p.type === "preprint" || p.type === "workshop"
    ? `<span class="tag">${esc(TYPE_LABELS[p.type] || p.type)}</span>` : "";
  const summary = opts.summary && p.summary
    ? `<p class="pub__summary">${esc(p.summary)}</p>` : "";
  const links = opts.links ? linkList(p.links) : "";
  return `
    <article class="pub" data-type="${esc(p.type)}">
      <div class="pub__margin">
        <span class="note">n.${String(number).padStart(2, "0")}</span>
        <span class="note">${esc(p.short || p.year)}</span>
      </div>
      <div class="pub__body">
        <h3 class="pub__title">${esc(p.title)}${tag}</h3>
        <p class="pub__authors">${authorLine(p.authors, me)}</p>
        <p class="pub__venue">${esc(p.venue)}, ${esc(p.year)}</p>
        ${summary}${links}
      </div>
    </article>`;
}

/* ── Homepage: selected only, no summaries ─────────────────── */
async function renderSelected(targetId) {
  const el = document.getElementById(targetId);
  try {
    const { me, pubs } = await loadPubs();
    const total = pubs.length;
    const html = pubs
      .map((p, i) => ({ p, n: total - i }))
      .filter(({ p }) => p.selected)
      .map(({ p, n }) => pubHTML(p, me, n, { links: true }))
      .join("");
    el.innerHTML = html || `<p class="loading">No publications marked as selected.</p>`;
  } catch (e) {
    el.innerHTML = `<p class="loading">Publications didn't load. Serve the folder over HTTP — opening the file directly blocks the fetch.</p>`;
    console.error(e);
  }
}

/* ── Publications page: everything, grouped by year ────────── */
async function renderAll(targetId, filterId, countId) {
  const el = document.getElementById(targetId);
  try {
    const { me, pubs } = await loadPubs();
    const total = pubs.length;
    const numbered = pubs.map((p, i) => ({ ...p, n: total - i }));

    const draw = (type) => {
      const shown = type === "all" ? numbered : numbered.filter((p) => p.type === type);
      const years = [...new Set(shown.map((p) => p.year))];
      el.innerHTML = years.map((y) => `
        <div class="yeargroup">
          ${shown.filter((p) => p.year === y)
            .map((p) => pubHTML(p, me, p.n, { summary: true, links: true })).join("")}
        </div>`).join("");
    };

    if (countId) {
      const c = document.getElementById(countId);
      if (c) c.textContent = `${total} entries`;
    }

    if (filterId) {
      const bar = document.getElementById(filterId);
      const types = ["all", ...new Set(numbered.map((p) => p.type))];
      bar.innerHTML = types.map((t, i) =>
        `<button type="button" data-type="${esc(t)}" aria-pressed="${i === 0}">${
          t === "all" ? "All" : esc(TYPE_LABELS[t] || t)}</button>`).join("");
      bar.addEventListener("click", (ev) => {
        const btn = ev.target.closest("button");
        if (!btn) return;
        bar.querySelectorAll("button").forEach((b) =>
          b.setAttribute("aria-pressed", String(b === btn)));
        draw(btn.dataset.type);
      });
    }

    draw("all");
  } catch (e) {
    el.innerHTML = `<p class="loading">Publications didn't load. Serve the folder over HTTP — opening the file directly blocks the fetch.</p>`;
    console.error(e);
  }
}
