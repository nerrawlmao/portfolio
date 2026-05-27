(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-toggle__icon");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const tabButtons = document.querySelectorAll(".tab-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!header || !toggle || !nav) return;

  function setNavOpen(open) {
    header.classList.toggle("nav-open", open);
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  function setHeaderScrolled() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  function setTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", isDark ? "#1c1c1a" : "#fffef5");
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  setTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      setTheme(next);
    });
  }

  const sections = ["home", "projects", "about", "skills", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          if (!id) return;

          navLinks.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("data-nav") === id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function filterProjects(type) {
    projectCards.forEach(function (card) {
      const tag = card.querySelector(".project-card__tag");
      const tagText = tag ? tag.textContent.trim().toLowerCase() : "";
      const isActive = tagText === type;
      card.style.display = isActive ? "" : "none";
    });
  }

  function setActiveTab(activeButton) {
    tabButtons.forEach(function (btn) {
      const isActive = btn === activeButton;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  }

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const type = this.getAttribute("data-type");
      filterProjects(type);
      setActiveTab(this);
    });
  });

  filterProjects("app");
})();