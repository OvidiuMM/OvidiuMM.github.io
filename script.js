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

  /* ---------- Contact form (Formspree-friendly, graceful fallback) ---------- */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var status = form.querySelector(".form-status");
      var isEn = body.classList.contains("lang-en");
      var action = form.getAttribute("action") || "";

      // If the form endpoint hasn't been configured yet, prevent submit and inform the user.
      if (action.indexOf("TU_ID") !== -1 || action.indexOf("formspree.io/f/") === -1) {
        e.preventDefault();
        if (status) {
          status.textContent = isEn
            ? "Form not configured yet — set your Formspree ID (see README), or email contact@ovidiu.moldovan.es."
            : "Formulario sin configurar — añade tu ID de Formspree (ver README) o escribe a contact@ovidiu.moldovan.es.";
        }
        return;
      }

      // Otherwise submit via fetch for a no-reload experience.
      e.preventDefault();
      var data = new FormData(form);
      if (status) status.textContent = isEn ? "Sending…" : "Enviando…";

      fetch(action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (status) status.textContent = isEn ? "Thanks! I'll reply soon." : "¡Gracias! Te responderé pronto.";
          } else {
            if (status) status.textContent = isEn ? "Something went wrong. Please email me." : "Algo falló. Escríbeme por correo.";
          }
        })
        .catch(function () {
          if (status) status.textContent = isEn ? "Network error. Please email me." : "Error de red. Escríbeme por correo.";
        });
    });
  }
})();
