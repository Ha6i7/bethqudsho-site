// Sprache wählen: ?lang=de|en, sonst gespeicherte Wahl, sonst Browsersprache (Deutsch → de, sonst en).
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var param = new URLSearchParams(location.search).get("lang");
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var lang = param || stored || ((navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en");
  if (lang !== "de" && lang !== "en") lang = "en";
  apply(lang);

  function apply(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === l));
    });
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem("lang", b.dataset.lang); } catch (e) {}
        apply(b.dataset.lang);
      });
    });
  });
})();
