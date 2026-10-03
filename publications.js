// ---------------------------------------------------------------
// Your publications. This is the only file to edit when you publish.
// Newest first within each kind. Your name is bolded automatically.
//
//   kind:     "journal" | "conference" | "preprint"
//   selected: true  -> also shown on the home page
//   note:     optional short tag, e.g. "Best Student Paper"
//   url:      optional link (DOI, PDF, ...)
// ---------------------------------------------------------------
var ME = "M. Saliba";

var PUBLICATIONS = [
  // Journal articles
  { kind: "journal", year: 2026, selected: true,
    title: "Collision tracking in OpenMC: methods and applications in neutron noise, neutron imaging, time-of-flight, and multiplicity counting",
    authors: "M. Saliba, J. R. Tramm, P. K. Romano, E. B. Knudsen, A. Pautz, O. V. Pakari",
    venue: "Nuclear Science and Engineering", details: "pp. 1–11" },
  { kind: "journal", year: 2026, selected: true,
    title: "First neutron imaging experiments at the CROCUS zero-power reactor",
    authors: "M. Saliba, E. Lehmann, P. Trtik, V. Lamirand, A. Dupont-Bembinoff, C. Montecchio, D. Clément, A. Pautz, O. Pakari",
    venue: "Nuclear Instruments and Methods in Physics Research A", details: "171590" },
  { kind: "journal", year: 2026,
    title: "Synchronization of neutron and gamma detector signals for noise studies",
    authors: "C. M. Kostelac, F. B. Darby, V. Lamirand, S. A. Pozzi, M. Saliba, O. V. Pakari",
    venue: "Nuclear Instruments and Methods in Physics Research A", details: "171475" },
  { kind: "journal", year: 2026, selected: true,
    title: "Measurement of the prompt neutron decay constant in a zero-power reactor using a novel 3D detector system",
    authors: "M. Saliba, V. Lamirand, W. Monange, F. Vitullo, M. Hursin, A. Pautz, O. Pakari",
    venue: "Nuclear Science and Engineering", details: "200 (sup. 1), S406–S414" },
  { kind: "journal", year: 2025,
    title: "Monitoring <sup>135</sup>Xe after the shutdown of a research reactor using gamma-ray spectroscopy",
    authors: "F. B. Darby, A. Lucas, M. Saliba, S. Pozzi, O. Pakari",
    venue: "Nuclear Instruments and Methods in Physics Research A", details: "171252" },

  // Conference papers
  { kind: "conference", year: 2025,
    title: "Measuring neutron noise in a research reactor using a 3D core mapping system",
    authors: "M. Saliba, O. Pakari",
    venue: "ETSON Conference 2025" },
  { kind: "conference", year: 2025,
    title: "Development of an event tracking feature in OpenMC for neutron spectroscopy and scatter camera systems",
    authors: "M. Saliba, P. Romano, J. Tramm, E. B. Knudsen, D. Siefman, A. Pautz, O. Pakari",
    venue: "International Conference on Mathematics and Computational Methods Applied to Nuclear Science and Engineering (M&amp;C 2025)" },
  { kind: "conference", year: 2025,
    title: "Development of an event tracking feature in OpenMC for neutron noise analysis",
    authors: "M. Saliba, J. Tramm, P. Romano, E. B. Knudsen, A. Pautz, O. Pakari",
    venue: "EPJ Web of Conferences", details: "338, 04001" },
  { kind: "conference", year: 2025,
    title: "Simulations of a new neutron imaging station at the CROCUS zero-power reactor",
    authors: "M. Saliba, E. Lehmann, P. Trtik, V. Lamirand, A. Pautz, O. Pakari",
    venue: "EPJ Web of Conferences", details: "338, 04012" },
  { kind: "conference", year: 2025,
    title: "Towards the direct observation of xenon-135 poisoning in a zero-power reactor via gamma spectroscopy",
    authors: "O. Pakari, A. Lucas, F. Darby, M. Saliba, V. Lamirand, A. Pautz, S. Pozzi",
    venue: "EPJ Web of Conferences", details: "338, 04010" },
  { kind: "conference", year: 2025,
    title: "Predicting neutron noise detector responses for zero-power molten salt reactor experiments",
    authors: "O. Pakari, J. Świątkowska, M. Saliba",
    venue: "EPJ Web of Conferences", details: "338, 04011" },
  { kind: "conference", year: 2025,
    title: "Investigation of noise detection systems in the CROCUS reactor from SANDcaStLE",
    authors: "F. B. Darby, C. Kostelac, M. Saliba, V. Lamirand, S. D. Clarke, A. Pautz, S. A. Pozzi, O. V. Pakari",
    venue: "EPJ Web of Conferences", details: "338, 04015" },
  { kind: "conference", year: 2024, note: "Best Student Paper",
    title: "Measurement of the prompt decay constant in a zero power reactor using a novel 3D detector system",
    authors: "M. Saliba, O. Pakari, W. Monange, A. Pautz, V. Lamirand",
    venue: "PHYSOR 2024, International Conference on Physics of Reactors", details: "pp. 155–163" },

  // In preparation
  { kind: "preprint",
    title: "Verification of the collision tracking feature in OpenMC with MCNPX-PoliMi and preliminary validation with a <sup>252</sup>Cf experiment",
    authors: "O. Pakari, M. Saliba, D. Breitenmoser, S. Pozzi",
    venue: "In preparation" },
  { kind: "preprint",
    title: "Investigation of neutron noise phenomena in multiplying breeding blankets of fusion reactors",
    authors: "M. Saliba, O. Pakari",
    venue: "In preparation" }
];

// ---------------------------------------------------------------
// Rendering. No need to touch anything below.
// ---------------------------------------------------------------
(function () {
  var PREFIX = { journal: "J", conference: "C", preprint: "P" };

  function item(p, key) {
    var authors = p.authors.replace(ME, '<span class="me">' + ME + "</span>");
    var title = p.url ? '<a href="' + p.url + '">' + p.title + "</a>" : p.title;
    var venue = '<span class="venue">' + p.venue + "</span>";
    var tail = [p.details, p.year].filter(Boolean).join(", ");
    var note = p.note ? '<span class="note">' + p.note + "</span>" : "";
    return '<li><span class="key">' + key + "</span><span>" + authors + ". " + title + ". " +
      venue + (tail ? ", " + tail : "") + "." + note + "</span></li>";
  }

  // Number each kind from oldest (1) to newest, like a CV.
  function keyed(list) {
    var counts = {};
    list.forEach(function (p) { counts[p.kind] = (counts[p.kind] || 0) + 1; });
    var seen = {};
    return list.map(function (p) {
      seen[p.kind] = (seen[p.kind] || 0) + 1;
      return { p: p, key: PREFIX[p.kind] + (counts[p.kind] - seen[p.kind] + 1) };
    });
  }

  var all = keyed(PUBLICATIONS);
  document.querySelectorAll("[data-pubs]").forEach(function (ol) {
    var which = ol.getAttribute("data-pubs");
    ol.innerHTML = all.filter(function (x) {
      return which === "selected" ? x.p.selected : x.p.kind === which;
    }).map(function (x) { return item(x.p, x.key); }).join("");
  });
})();
