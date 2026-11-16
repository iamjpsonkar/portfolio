(() => {
  "use strict";
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeIcon = document.querySelector("[data-theme-icon]");
  const themeColor = document.querySelector("[data-theme-color]");
  const storageKey = "portfolio-theme";
  const lightPreference = window.matchMedia("(prefers-color-scheme: light)");

  function storedTheme() {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function setTheme(theme, persist) {
    const next = theme === "light" ? "light" : "dark";
    root.dataset.theme = next;
    if (themeIcon) themeIcon.textContent = next === "light" ? "☀" : "☾";
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", next === "light" ? "Switch to dark theme" : "Switch to light theme");
      themeToggle.setAttribute("aria-pressed", String(next === "light"));
    }
    if (themeColor) themeColor.setAttribute("content", next === "light" ? "#f4f7fc" : "#070b14");

    if (persist) {
      try {
        window.localStorage.setItem(storageKey, next);
      } catch (error) {
        // The theme remains usable even when browser storage is unavailable.
      }
    }
  }

  setTheme(storedTheme() || (lightPreference.matches ? "light" : "dark"), false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.dataset.theme === "light" ? "dark" : "light", true);
    });
  }

  function closeNavigation() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("click", function (event) {
      if (!navLinks.classList.contains("is-open")) return;
      if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
      closeNavigation();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navLinks && navLinks.classList.contains("is-open")) {
      closeNavigation();
      if (navToggle) navToggle.focus();
    }
  });

  let scrollPending = false;
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    scrollPending = false;
  }

  updateHeader();
  window.addEventListener("scroll", function () {
    if (!scrollPending) {
      window.requestAnimationFrame(updateHeader);
      scrollPending = true;
    }
  }, { passive: true });

  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -28px" });

    revealItems.forEach(function (item) {
      item.classList.add("is-prepared");
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (item) {
    item.textContent = String(new Date().getFullYear());
  });
})();