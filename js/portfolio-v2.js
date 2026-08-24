(function () {
    "use strict";

    const root = document.documentElement;
    const header = document.querySelector("[data-header]");
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navLinks = document.querySelector("[data-nav-links]");
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const themeIcon = document.querySelector("[data-theme-icon]");
    const storedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    function setTheme(theme) {
        root.dataset.theme = theme;
        themeIcon.textContent = theme === "light" ? "◒" : "◐";
        themeToggle.setAttribute(
            "aria-label",
            theme === "light" ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    setTheme(storedTheme || (systemPrefersLight ? "light" : "dark"));

    themeToggle.addEventListener("click", function () {
        const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
        localStorage.setItem("portfolio-theme", nextTheme);
        setTheme(nextTheme);
    });

    function closeNavigation() {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    }

    navToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeNavigation();
        }
    });

    function updateHeader() {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealItems.forEach(function (item) {
            item.classList.add("is-prepared");
        });

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -30px" }
        );

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    }

    document.querySelectorAll("[data-year]").forEach(function (item) {
        item.textContent = new Date().getFullYear();
    });
})();
