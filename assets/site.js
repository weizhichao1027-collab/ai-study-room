(function () {
  var stored = null;
  try { stored = localStorage.getItem("study-room-lang"); } catch (error) { stored = null; }
  var lang = stored === "en" || stored === "zh-Hans" ? stored : preferred();
  apply(lang);

  document.querySelectorAll("[data-set-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      var next = document.documentElement.lang === "en" ? "zh-Hans" : "en";
      try { localStorage.setItem("study-room-lang", next); } catch (error) { /* keep the choice for this visit */ }
      apply(next);
    });
  });

  function preferred() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    return list.some(function (code) { return /^zh/i.test(code); }) ? "zh-Hans" : "en";
  }

  function apply(value) {
    document.documentElement.lang = value;
    var titles = {
      home: { "zh-Hans": "AI 自习室", en: "AI Study Room" },
      privacy: { "zh-Hans": "隐私政策 · AI 自习室", en: "Privacy policy · AI Study Room" },
      support: { "zh-Hans": "技术支持 · AI 自习室", en: "Support · AI Study Room" }
    };
    var page = document.body.dataset.page || "home";
    document.title = (titles[page] || titles.home)[value];
    document.querySelectorAll("nav.nav").forEach(function (nav) {
      nav.setAttribute("aria-label", value === "en" ? "Site" : "站点");
    });
    document.querySelectorAll("nav.contents").forEach(function (nav) {
      nav.setAttribute("aria-label", value === "en" ? "Contents" : "目录");
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.textContent = value === "en" ? "中文" : "English";
      button.setAttribute("aria-label", value === "en" ? "切换到中文" : "Switch to English");
    });
  }
})();
