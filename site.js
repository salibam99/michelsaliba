// Light/dark toggle. Follows the visitor's system setting until they click,
// then remembers their choice.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  function current() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function label() {
    var next = current() === "dark" ? "light" : "dark";
    btn.querySelector("span").textContent = next;
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
  }

  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", label);
  label();
})();
