(function () {
  var toggleBtn = document.getElementById("theme-toggle");
  var STORAGE_KEY = "theme";
  var buildCount = 5;
  var seconds = 0;

  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    toggleBtn.textContent = isDark ? "Light mode" : "Dark mode";
  }

  function initTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyTheme(saved === "dark");
    } else {
      applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }

  toggleBtn.addEventListener("click", function () {
    var isDark = document.body.classList.toggle("dark");
    toggleBtn.textContent = isDark ? "Light mode" : "Dark mode";
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  });

  function updateClock() {
    var now = new Date();
    var clockEl = document.getElementById("clock");
    var dateEl = document.getElementById("date-str");
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString();
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }

  function updateUptime() {
    seconds++;
    var uptimeEl = document.getElementById("uptime");
    if (!uptimeEl) {
      return;
    }
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    if (h > 0) {
      uptimeEl.textContent = h + "h " + m + "m";
    } else if (m > 0) {
      uptimeEl.textContent = m + "m " + s + "s";
    } else {
      uptimeEl.textContent = s + "s";
    }
  }

  function initBuildCount() {
    var el = document.getElementById("build-count");
    if (el) {
      el.textContent = buildCount;
    }
  }

  initTheme();
  initBuildCount();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(updateUptime, 1000);
}());