(function () {
  const THEME_KEY = "theme";

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);

    const checkbox = document.getElementById("checkbox");
    if (checkbox) {
      checkbox.checked = theme === "dark";
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "light";
    setTheme(saved);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();

    const checkbox = document.getElementById("checkbox");
    if (!checkbox) return;

    checkbox.addEventListener("change", () => {
      const theme = checkbox.checked ? "dark" : "light";
      setTheme(theme);
    });
  });
})();