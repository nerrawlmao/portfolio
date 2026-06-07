(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var navLinks = document.querySelectorAll(".site-nav a");
  var navIndicator = document.querySelector(".nav-indicator");
  var tabButtons = document.querySelectorAll(".tab-btn");

  if (!header || !toggle || !nav) return;

  function updateNavIndicator() {
    if (!navIndicator) return;
    var active = document.querySelector(".site-nav a.is-active");
    if (!active) return;
    var navRect = nav.getBoundingClientRect();
    var linkRect = active.getBoundingClientRect();
    navIndicator.style.width = linkRect.width + "px";
    navIndicator.style.left = (linkRect.left - navRect.left) + "px";
  }

  function setNavOpen(open) {
    header.classList.toggle("nav-open", open);
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setNavOpen(false); });
  });

  var lastScrollY = window.scrollY;

  function onScroll() {
    var sy = window.scrollY;
    if (sy <= 8) {
      header.classList.remove("is-scrolled", "is-hidden");
    } else {
      header.classList.add("is-scrolled");
      header.classList.toggle("is-hidden", sy > lastScrollY);
    }
    lastScrollY = sy;
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  updateNavIndicator();
  window.addEventListener("resize", updateNavIndicator);

  var sections = ["home", "about", "projects", "skills", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("id");
        if (!id) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("data-nav") === id);
        });
        updateNavIndicator();
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  var projects = [
    { type: "app",  title: "To-Do",          desc: "A simple and modern to-do app for Android.",                                 img: "images/app/To-Do.png",                  alt: "To-Do app screenshot",                         langs: ["Kotlin", "Jetpack Compose"], links: [{ text: "Code", href: "https://github.com/nerrawlmao/to-do" }] },
    { type: "game", title: "Cannon Clash",    desc: "A two-player artillery duel with wind and mass physics.",                     img: "images/game/Cannon Clash.png",          alt: "Cannon Clash game screenshot",                  langs: ["Java"],                links: [{ text: "Code", href: "https://github.com/nerrawlmao/cannon-clash" }] },
    { type: "game", title: "Math Obby",       desc: "An obstacle course that quizzes players on math problems.",                   img: "images/game/Math Obby.png",             alt: "Math Obby game screenshot",                     langs: ["Luau", "Roblox Studio"], links: [{ text: "Play", href: "https://www.roblox.com/games/132959728970709/Math-Obby" }] },
    { type: "web",  title: "Wildlife PH",     desc: "A site highlighting Philippine wildlife and conservation.",                    img: "images/web/Wildlife PH.png",            alt: "Wildlife PH website screenshot",                langs: ["HTML", "CSS", "JavaScript"], links: [{ text: "Live", href: "https://wildlife-ph.vercel.app/" }, { text: "Code", href: "https://github.com/nerrawlmao/wildlifeph" }] },
    { type: "web",  title: "Watch",           desc: "A web experience built around browsing and discovery.",                        img: "images/web/Watch.png",                  alt: "Watch web app screenshot",                      langs: ["HTML", "CSS", "JavaScript"], links: [{ text: "Live", href: "https://jw-watch.vercel.app/" }, { text: "Code", href: "https://github.com/nerrawlmao/watch" }] },
    { type: "other",title: "CueFlow",         desc: "A system for managing billiard tables, sessions, and payments.",               img: "images/other/CueFlow.png",              alt: "CueFlow system screenshot",                    langs: ["Java", "MySQL"],       links: [{ text: "Code", href: "https://github.com/nerrawlmao/cueflow" }] },
    { type: "other",title: "Student Grading System", desc: "A system for managing student records and grades.",                     img: "images/other/Student Grading System.png", alt: "Student Grading System Management screenshot", langs: ["C"],                   links: [{ text: "Code", href: "https://github.com/nerrawlmao/student-grading-system-management" }] }
  ];

  var grid = document.querySelector(".project-grid");

  function renderProjects(type) {
    grid.innerHTML = "";
    var filtered = projects.filter(function (p) { return p.type === type; });

    filtered.forEach(function (p, idx) {
      var li = document.createElement("li");
      li.className = "project-card reveal";
      li.setAttribute("data-type", p.type);
      li.style.transitionDelay = (idx * 0.06) + "s";

      var img = document.createElement("img");
      img.className = "project-card__image";
      img.src = p.img;
      img.alt = p.alt;
      img.width = 640;
      img.height = 400;
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

    var newCards = grid.querySelectorAll(".reveal");
    newCards.forEach(function (el) { revealObserver.observe(el); });
  }

  function setActiveTab(activeButton) {
    tabButtons.forEach(function (btn) {
      var isActive = btn === activeButton;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var type = this.getAttribute("data-type");
      renderProjects(type);
      setActiveTab(this);
    });
  });

  var skillsData = [
    { label: "Languages", items: [
      { icon: "https://cdn.simpleicons.org/c/currentColor", text: "C" },
      { icon: "https://cdn.simpleicons.org/cplusplus/currentColor", text: "C++" },
      { icon: "images/icon/java.png", text: "Java" },
      { icon: "https://cdn.simpleicons.org/javascript/currentColor", text: "JavaScript" },
      { icon: "https://cdn.simpleicons.org/kotlin/currentColor", text: "Kotlin" },
      { icon: "https://cdn.simpleicons.org/luau/currentColor", text: "Luau" },
      { icon: "https://cdn.simpleicons.org/php/currentColor", text: "PHP" },
      { icon: "https://cdn.simpleicons.org/python/currentColor", text: "Python" },
      { icon: "https://cdn.simpleicons.org/typescript/currentColor", text: "TypeScript" }
    ]},
    { label: "Frontend", items: [
      { icon: "https://cdn.simpleicons.org/css/currentColor", text: "CSS" },
      { icon: "https://cdn.simpleicons.org/expo/currentColor", text: "Expo" },
      { icon: "https://cdn.simpleicons.org/html5/currentColor", text: "HTML" },
      { icon: "https://cdn.simpleicons.org/jetpackcompose/currentColor", text: "Jetpack Compose" },
      { icon: "https://cdn.simpleicons.org/react/currentColor", text: "React" },
      { icon: "https://cdn.simpleicons.org/react/currentColor", text: "React Native" },
      { icon: "https://cdn.simpleicons.org/vite/currentColor", text: "Vite" }
    ]},
    { label: "Backend & Databases", items: [
      { icon: "https://cdn.simpleicons.org/appwrite/currentColor", text: "Appwrite" },
      { icon: "https://cdn.simpleicons.org/django/currentColor", text: "Django" },
      { icon: "https://cdn.simpleicons.org/firebase/currentColor", text: "Firebase" },
      { icon: "https://cdn.simpleicons.org/mysql/currentColor", text: "MySQL" },
      { icon: "https://cdn.simpleicons.org/nodedotjs/currentColor", text: "Node.js" },
      { icon: "https://cdn.simpleicons.org/pandas/currentColor", text: "Pandas" },
      { icon: "https://cdn.simpleicons.org/postgresql/currentColor", text: "PostgreSQL" },
      { icon: "https://cdn.simpleicons.org/supabase/currentColor", text: "Supabase" }
    ]},
    { label: "Tools", items: [
      { icon: "https://cdn.simpleicons.org/blender/currentColor", text: "Blender" },
      { icon: "https://cdn.simpleicons.org/figma/currentColor", text: "Figma" },
      { icon: "https://cdn.simpleicons.org/github/currentColor", text: "GitHub" },
      { icon: "https://cdn.simpleicons.org/railway/currentColor", text: "Railway" },
      { icon: "https://cdn.simpleicons.org/roblox/currentColor", text: "Roblox Studio" },
      { icon: "https://cdn.simpleicons.org/vercel/currentColor", text: "Vercel" }
    ]}
  ];

  var skillsContainer = document.getElementById("skills-container");

  function renderSkills() {
    skillsContainer.innerHTML = "";
    skillsData.forEach(function (group) {
      var groupDiv = document.createElement("div");
      groupDiv.className = "skills__group";

      var label = document.createElement("h3");
      label.className = "skills__label";
      label.textContent = group.label;
      groupDiv.appendChild(label);

      var list = document.createElement("ul");
      list.className = "skills__chips";

      group.items.forEach(function (item) {
        var li = document.createElement("li");

        var icon = document.createElement("span");
        icon.className = "skill-icon";
        icon.style.cssText = "mask-image:url('" + item.icon + "');-webkit-mask-image:url('" + item.icon + "')";
        li.appendChild(icon);

        li.appendChild(document.createTextNode(item.text));
        list.appendChild(li);
      });

      groupDiv.appendChild(list);
      skillsContainer.appendChild(groupDiv);
    });
  }

  renderSkills();

  renderProjects("app");

  function updateParallax() {
    var scrollY = window.pageYOffset;
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
      el.style.transform = "translateY(" + (scrollY * speed).toFixed(2) + "px)";
    });
  }
  window.addEventListener("scroll", updateParallax, { passive: true });
})();
