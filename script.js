(function () {
  "use strict";

  var body = document.body;
  var STORAGE_KEY = "om-lang";

  /* ---------- Language toggle ---------- */
  function setLang(lang) {
    if (lang !== "es" && lang !== "en") lang = "es";
    body.classList.toggle("lang-en", lang === "en");
    document.documentElement.lang = lang;

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  // Detect language from the visitor's browser:
  // Spanish-speaking browser -> Spanish; any other -> English.
  function detectFromBrowser() {
    var primary = (
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      ""
    ).toLowerCase();
    return primary.indexOf("es") === 0 ? "es" : "en";
  }

  // Initial language: a previous manual choice wins; otherwise auto-detect.
  var initial = detectFromBrowser();
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") initial = stored;
  } catch (e) {}
  setLang(initial);

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Contact form: Google Forms only loads on request (its cookies) ---------- */
  document.querySelectorAll(".form-embed[data-form-src]").forEach(function (box) {
    var button = box.querySelector(".form-show");
    if (!button) return;
    button.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.title = "Formulario de contacto / Contact form";
      frame.src = box.getAttribute("data-form-src");
      frame.referrerPolicy = "no-referrer";
      box.innerHTML = "";
      box.appendChild(frame);
      frame.focus();
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
