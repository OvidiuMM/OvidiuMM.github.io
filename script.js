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

  // Initial language: stored preference > browser language > Spanish
  var initial = "es";
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) initial = stored;
    else if ((navigator.language || "").toLowerCase().indexOf("es") !== 0) initial = "en";
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

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
