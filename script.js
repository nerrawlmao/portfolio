(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-toggle__icon");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const tabButtons = document.querySelectorAll(".tab-btn");

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

  const sections = ["home", "about", "projects", "skills", "contact"]
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

  var projects = [
    {
      type: "app",
      title: "To-Do",
      desc: "A simple and modern to-do app for Android.",
      img: "images/app/To-Do.png",
      alt: "To-Do app screenshot",
      langs: ["Kotlin", "Jetpack Compose"],
      links: [{ text: "Code", href: "https://github.com/nerrawlmao/to-do" }]
    },
    {
      type: "game",
      title: "Cannon Clash",
      desc: "A two-player artillery duel with wind and mass physics.",
      img: "images/game/Cannon Clash.png",
      alt: "Cannon Clash game screenshot",
      langs: ["Java"],
      links: [{ text: "Code", href: "https://github.com/nerrawlmao/cannon-clash" }]
    },
    {
      type: "game",
      title: "Math Obby",
      desc: "An obstacle course that quizzes players on math problems.",
      img: "images/game/Math Obby.png",
      alt: "Math Obby game screenshot",
      langs: ["Luau", "Roblox Studio"],
      links: [{ text: "Play", href: "https://www.roblox.com/games/132959728970709/Math-Obby" }]
    },
    {
      type: "web",
      title: "Wildlife PH",
      desc: "A site highlighting Philippine wildlife and conservation.",
      img: "images/web/Wildlife PH.png",
      alt: "Wildlife PH website screenshot",
      langs: ["HTML", "CSS", "JavaScript"],
      links: [{ text: "Live", href: "https://wildlife-ph.vercel.app/" }, { text: "Code", href: "https://github.com/nerrawlmao/wildlifeph" }]
    },
    {
      type: "web",
      title: "Watch",
      desc: "A web experience built around browsing and discovery.",
      img: "images/web/Watch.png",
      alt: "Watch web app screenshot",
      langs: ["HTML", "CSS", "JavaScript"],
      links: [{ text: "Live", href: "https://jw-watch.vercel.app/" }, { text: "Code", href: "https://github.com/nerrawlmao/watch" }]
    },
    {
      type: "other",
      title: "CueFlow",
      desc: "A system for managing billiard tables, sessions, and payments.",
      img: "images/other/CueFlow.png",
      alt: "CueFlow system screenshot",
      langs: ["Java", "MySQL"],
      links: [{ text: "Code", href: "https://github.com/nerrawlmao/cueflow" }]
    },
    {
      type: "other",
      title: "Student Grading System",
      desc: "A system for managing student records and grades.",
      img: "images/other/Student Grading System.png",
      alt: "Student Grading System Management screenshot",
      langs: ["C"],
      links: [{ text: "Code", href: "https://github.com/nerrawlmao/student-grading-system-management" }]
    }
  ];

  var grid = document.querySelector(".project-grid");

  function renderProjects(type) {
    grid.innerHTML = "";
    var filtered = projects.filter(function (p) { return p.type === type; });

    filtered.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "project-card";
      li.setAttribute("data-type", p.type);

      var img = document.createElement("img");
      img.className = "project-card__image";
      img.src = p.img;
      img.alt = p.alt;
      img.width = 320;
      img.height = 180;
      img.loading = "lazy";
      li.appendChild(img);

      var body = document.createElement("div");
      body.className = "project-card__body";

      var title = document.createElement("h3");
      title.className = "project-card__title";
      title.textContent = p.title;
      body.appendChild(title);

      var desc = document.createElement("p");
      desc.className = "project-card__desc";
      desc.textContent = p.desc;
      body.appendChild(desc);

      var langs = document.createElement("div");
      langs.className = "project-card__langs";
      p.langs.forEach(function (l) {
        var span = document.createElement("span");
        span.className = "project-card__lang";
        span.textContent = l;
        langs.appendChild(span);
      });
      body.appendChild(langs);

      if (p.links.length) {
        var links = document.createElement("div");
        links.className = "project-card__links";
        p.links.forEach(function (lk) {
          var a = document.createElement("a");
          a.className = "project-card__link";
          a.href = lk.href;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.textContent = lk.text;
          links.appendChild(a);
        });
        body.appendChild(links);
      }

      li.appendChild(body);
      grid.appendChild(li);
    });
  }

  function setActiveTab(activeButton) {
    tabButtons.forEach(function (btn) {
      var isActive = btn === activeButton;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  }

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var type = this.getAttribute("data-type");
      renderProjects(type);
      setActiveTab(this);
    });
  });

  renderProjects("app");
})();