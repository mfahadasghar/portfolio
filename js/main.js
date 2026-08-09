/* ============================================================
   Renders the whole page from PROFILE / GAMES / COURSES (data.js)
   and handles theme toggle, filters, and the play/preview modal.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- THEME ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const iconSun = document.getElementById("iconSun");
  const iconMoon = document.getElementById("iconMoon");

  function effectiveTheme() {
    const stamped = root.getAttribute("data-theme");
    if (stamped) return stamped;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncThemeIcon() {
    const t = effectiveTheme();
    iconSun.style.display = t === "dark" ? "block" : "none";
    iconMoon.style.display = t === "dark" ? "none" : "block";
  }
  const storedTheme = localStorage.getItem("fa-theme");
  if (storedTheme) root.setAttribute("data-theme", storedTheme);
  syncThemeIcon();

  themeBtn.addEventListener("click", function () {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("fa-theme", next);
    syncThemeIcon();
  });

  /* ---------- HERO ---------- */
  document.getElementById("heroLead").textContent = PROFILE.tagline;

  const statRow = document.getElementById("statRow");
  PROFILE.stats.forEach(function (s) {
    const el = document.createElement("div");
    el.className = "stat";
    el.innerHTML =
      '<div class="num">' + s.value + '</div><div class="label">' + s.label + "</div>";
    statRow.appendChild(el);
  });

  /* ---------- ABOUT ---------- */
  document.getElementById("aboutBio").textContent = PROFILE.bio;
  const skillsList = document.getElementById("skillsList");
  PROFILE.skills.forEach(function (skill) {
    const span = document.createElement("span");
    span.textContent = skill;
    skillsList.appendChild(span);
  });

  const educationList = document.getElementById("educationList");
  (PROFILE.education || []).forEach(function (edu) {
    const item = document.createElement("div");
    item.className = "edu-item";
    item.innerHTML =
      '<div class="edu-school">' + edu.school + "</div>" +
      '<div class="edu-degree">' + edu.degree + (edu.years ? " · " + edu.years : "") + "</div>";
    educationList.appendChild(item);
  });

  /* ---------- FOOTER ---------- */
  document.getElementById("footerLocation").textContent = "© 2026 " + PROFILE.name + " — " + PROFILE.location;
  const linkRow = document.getElementById("linkRow");
  PROFILE.links.forEach(function (link) {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label + " ▸";
    if (link.url.indexOf("http") === 0) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    linkRow.appendChild(a);
  });

  /* ---------- GAME CARDS ---------- */
  const gamesGrid = document.getElementById("gamesGrid");

  function fileExtFor(game) {
    const isUnity = game.tags.some(function (t) { return /unity/i.test(t); });
    return isUnity ? "unity" : "phaser";
  }

  function buildThumb(game) {
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.setAttribute("data-orientation", game.orientation);
    if (game.image) {
      const img = document.createElement("img");
      img.src = game.image;
      img.alt = game.title;
      img.loading = "lazy";
      thumb.appendChild(img);
    } else {
      thumb.classList.add("thumb--placeholder");
      const span = document.createElement("span");
      span.textContent = game.title;
      thumb.appendChild(span);
    }
    return thumb;
  }

  function buildActions(game) {
    const wrap = document.createElement("div");
    wrap.className = "card-actions";

    if (game.status === "live") {
      if (game.embedUrl) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Play here ▸";
        btn.addEventListener("click", function () {
          openEmbedModal(game);
        });
        wrap.appendChild(btn);
      }
      if (game.playUrl) {
        const a = document.createElement("a");
        a.href = game.playUrl;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = "Open ↗";
        wrap.appendChild(a);
      }
      if (!game.embedUrl && !game.playUrl && game.youtubeId) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Watch preview ▸";
        btn.addEventListener("click", function () {
          openVideoModal(game);
        });
        wrap.appendChild(btn);
      }
      if (!game.embedUrl && !game.playUrl && !game.youtubeId) {
        const span = document.createElement("span");
        span.className = "muted";
        span.textContent = "Link coming soon";
        wrap.appendChild(span);
      }
    } else {
      if (game.youtubeId) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Watch preview ▸";
        btn.addEventListener("click", function () {
          openVideoModal(game);
        });
        wrap.appendChild(btn);
      } else if (game.images && game.images.length) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "View photos ▸";
        btn.addEventListener("click", function () {
          openGalleryModal(game);
        });
        wrap.appendChild(btn);
      } else {
        const span = document.createElement("span");
        span.className = "muted";
        span.textContent = "Preview coming soon";
        wrap.appendChild(span);
      }
    }
    return wrap;
  }

  function buildCard(game) {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-status", game.status);

    const bar = document.createElement("div");
    bar.className = "card-bar";
    const fname = document.createElement("span");
    fname.className = "fname mono";
    fname.textContent = game.id + "." + fileExtFor(game);
    const chip = document.createElement("span");
    chip.className = "status-chip " + game.status;
    chip.innerHTML = '<span class="dot"></span>' + (game.status === "live" ? "Live" : "Prototype");
    bar.appendChild(fname);
    bar.appendChild(chip);
    card.appendChild(bar);

    card.appendChild(buildThumb(game));

    const body = document.createElement("div");
    body.className = "card-body";

    const h3 = document.createElement("h3");
    h3.textContent = game.title;
    body.appendChild(h3);

    if (game.tagline) {
      const tagline = document.createElement("p");
      tagline.className = "card-tagline";
      tagline.textContent = game.tagline;
      body.appendChild(tagline);
    }

    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = game.description;
    body.appendChild(desc);

    const tags = document.createElement("div");
    tags.className = "tags";
    game.tags.forEach(function (t) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tags.appendChild(span);
    });
    body.appendChild(tags);

    body.appendChild(buildActions(game));
    card.appendChild(body);

    return card;
  }

  const PAGE_SIZE = 9;
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let currentFilter = "all";
  let visibleCount = PAGE_SIZE;

  function filteredGames() {
    return GAMES.filter(function (g) {
      return currentFilter === "all" || g.status === currentFilter;
    });
  }

  function renderGames() {
    const filtered = filteredGames();
    gamesGrid.innerHTML = "";
    filtered.slice(0, visibleCount).forEach(function (game) {
      gamesGrid.appendChild(buildCard(game));
    });
    loadMoreBtn.style.display = filtered.length > visibleCount ? "inline-flex" : "none";
  }
  renderGames();

  loadMoreBtn.addEventListener("click", function () {
    visibleCount += PAGE_SIZE;
    renderGames();
  });

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      visibleCount = PAGE_SIZE;
      renderGames();
    });
  });

  /* ---------- COURSES ---------- */
  const courseLog = document.getElementById("courseLog");
  COURSES.forEach(function (c) {
    const row = document.createElement("div");
    row.className = "log-row";
    const titleHtml = c.url
      ? '<span class="check">✓</span><a href="' + c.url + '" target="_blank" rel="noopener">' + c.title + "</a>"
      : '<span class="check">✓</span>' + c.title;
    row.innerHTML =
      '<span class="date mono">' + (c.date || "—") + '</span>' +
      '<span class="title">' + titleHtml + '</span>' +
      '<span class="provider">' + c.provider + '</span>';
    courseLog.appendChild(row);
  });

  /* ---------- MODAL ---------- */
  const overlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");
  let lastFocused = null;

  function openModal(title, orientation) {
    lastFocused = document.activeElement;
    modalTitle.textContent = title;
    modalBody.className = "modal-body" + (orientation ? " orient-" + orientation : "");
    overlay.classList.add("open");
    modalClose.focus();
    document.addEventListener("keydown", onModalKeydown);
  }
  function closeModal() {
    overlay.classList.remove("open");
    modalBody.innerHTML = "";
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocused) lastFocused.focus();
  }
  function onModalKeydown(e) {
    if (e.key === "Escape") closeModal();
  }
  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  function openEmbedModal(game) {
    openModal(game.id + "." + fileExtFor(game), game.orientation);
    const iframe = document.createElement("iframe");
    iframe.src = game.embedUrl;
    iframe.setAttribute("allow", "fullscreen; gamepad");
    iframe.setAttribute("allowfullscreen", "");
    modalBody.appendChild(iframe);
  }

  function openVideoModal(game) {
    openModal(game.title + " — preview", "landscape");
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + game.youtubeId;
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    modalBody.appendChild(iframe);
  }

  function openGalleryModal(game) {
    openModal(game.title + " — photos", null);
    const gallery = document.createElement("div");
    gallery.className = "modal-gallery";
    game.images.forEach(function (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = game.title;
      gallery.appendChild(img);
    });
    modalBody.appendChild(gallery);
  }
})();
