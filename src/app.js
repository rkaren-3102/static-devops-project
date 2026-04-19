(function () {
  const statusEl = document.getElementById("status-text");
  const toggleBtn = document.getElementById("theme-toggle");
  const STORAGE_KEY = "theme";

  function setStatus() {
    const now = new Date();
    statusEl.textContent = "Pipeline OK — Last checked: " + now.toLocaleTimeString();
  }

  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    toggleBtn.textContent = isDark ? "Light mode" : "Dark mode";
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyTheme(saved === "dark");
    } else {
      applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }

  toggleBtn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark");
    toggleBtn.textContent = isDark ? "Light mode" : "Dark mode";
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  });

  initTheme();
  setStatus();
  setInterval(setStatus, 5000);
}());
