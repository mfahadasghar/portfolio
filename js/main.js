/* ============================================================
   Renders the whole page from PROFILE / GAMES / COURSES (data.js)
   and handles theme toggle, filters, and the play/preview modal.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- ANALYTICS ---------- */
  // GoatCounter loads async, so it usually isn't ready when this file runs --
  // which would silently drop the cold-load hit from a shared ?game= link, the
  // one most worth counting. Buffer until the script arrives and flush on load.
  // If it never arrives (blocked, or the tag removed) the queue is just dropped
  // and nothing breaks.
  const trackQueue = [];

  function goatReady() {
    return !!(window.goatcounter && typeof window.goatcounter.count === "function");
  }

  function flushTrackQueue() {
    if (!goatReady()) return;
    while (trackQueue.length) window.goatcounter.count(trackQueue.shift());
  }

  function track(path, title, isEvent) {
    const hit = { path: path, title: title, event: !!isEvent };
    if (goatReady()) {
      window.goatcounter.count(hit);
      return;
    }
    // Cap it so a blocked script plus a click-happy visitor can't grow this
    // without bound.
    if (trackQueue.length < 20) trackQueue.push(hit);
  }

  // Async scripts finish before the load event, so this is the earliest point
  // GoatCounter is reliably present.
  window.addEventListener("load", flushTrackQueue);

  // Clipboard with the pre-async fallback, for browsers (and file:// pages)
  // where navigator.clipboard is missing or blocked.
  function copyText(text, done) {
    const legacyCopy = function () {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:-9999px;";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (err) { /* nothing else to try */ }
      document.body.removeChild(ta);
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(legacyCopy);
    } else {
      legacyCopy();
    }
  }

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

  /* ---------- MOBILE NAV ---------- */
  const siteHeader = document.querySelector("header.site");
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const wideNav = window.matchMedia("(min-width:861px)");

  function setNavOpen(open) {
    siteHeader.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", function () {
    setNavOpen(!siteHeader.classList.contains("nav-open"));
  });
  primaryNav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNavOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && siteHeader.classList.contains("nav-open")) {
      setNavOpen(false);
      navToggle.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!siteHeader.classList.contains("nav-open")) return;
    if (!e.target.closest("header.site")) setNavOpen(false);
  });
  // Growing past the breakpoint shows the nav again; drop the open state so the
  // hamburger isn't left stuck as an X when it comes back.
  wideNav.addEventListener("change", function (e) {
    if (e.matches) setNavOpen(false);
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
  if (PROFILE.avatar) {
    const aboutPhoto = document.getElementById("aboutPhoto");
    aboutPhoto.src = PROFILE.avatar;
    aboutPhoto.hidden = false;
  }
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
  document.getElementById("footerLocation").textContent = "© 2026 " + PROFILE.name + ", " + PROFILE.location;
  const linkRow = document.getElementById("linkRow");
  PROFILE.links.forEach(function (link) {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label + " ▸";
    if (link.url.indexOf("http") === 0) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    // A mailto does nothing at all on machines with no mail client registered,
    // so also drop the address on the clipboard and say so.
    if (link.url.indexOf("mailto:") === 0) {
      const address = link.url.slice("mailto:".length);
      a.title = address;
      a.addEventListener("click", function () {
        const label = a.textContent;
        const done = function () {
          a.textContent = "Copied: " + address;
          setTimeout(function () { a.textContent = label; }, 1800);
        };
        const legacyCopy = function () {
          const ta = document.createElement("textarea");
          ta.value = address;
          ta.setAttribute("readonly", "");
          ta.style.cssText = "position:fixed;top:0;left:-9999px;";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (err) { /* nothing else to try */ }
          document.body.removeChild(ta);
          done();
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(address).then(done).catch(legacyCopy);
        } else {
          legacyCopy();
        }
      });
    }
    linkRow.appendChild(a);
  });

  const createLinkBtn = document.createElement("button");
  createLinkBtn.type = "button";
  createLinkBtn.id = "createLinkBtn";
  createLinkBtn.className = "share-link-btn";
  createLinkBtn.textContent = "Create a shareable game link ▸";
  document.getElementById("footerUtilities").appendChild(createLinkBtn);

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
      img.decoding = "async";
      thumb.appendChild(img);
    } else {
      thumb.classList.add("thumb--placeholder");
      const span = document.createElement("span");
      span.textContent = game.title;
      thumb.appendChild(span);
    }
    return thumb;
  }

  // Play / Open / Preview all moved into the detail popup, so the card carries
  // one button. Keeps the grid scannable and makes the detail view the single
  // place a project is actually explored (and counted).
  function buildActions(game) {
    const wrap = document.createElement("div");
    wrap.className = "card-actions";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "View details ▸";
    btn.setAttribute("aria-label", "View details for " + game.title);
    btn.addEventListener("click", function () { openDetail(game); });
    wrap.appendChild(btn);
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
  const gamesFade = document.getElementById("gamesFade");
  let currentFilter = "all";
  let visibleCount = PAGE_SIZE;

  const TECH_FILTERS = {
    phaser: /phaser|html5/i,
    unity: /unity/i,
    web3: /web3/i
  };

  function filteredGames() {
    return GAMES.filter(function (g) {
      if (currentFilter === "all") return true;
      if (TECH_FILTERS[currentFilter]) {
        const re = TECH_FILTERS[currentFilter];
        return g.tags.some(function (t) { return re.test(t); });
      }
      return g.status === currentFilter;
    });
  }

  function renderGames() {
    const filtered = filteredGames();
    gamesGrid.innerHTML = "";
    filtered.slice(0, visibleCount).forEach(function (game) {
      gamesGrid.appendChild(buildCard(game));
    });
    const hasMore = filtered.length > visibleCount;
    loadMoreBtn.style.display = hasMore ? "inline-flex" : "none";
    gamesFade.style.display = hasMore ? "block" : "none";
    // With the button gone there is nothing to tuck into the fade, so the row
    // must stop pulling the section up over the last row of cards.
    loadMoreBtn.parentElement.classList.toggle("is-done", !hasMore);
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

  if (PROFILE.confidentialNote) {
    document.getElementById("confidentialNote").textContent = PROFILE.confidentialNote;
  }

  /* ---------- TESTIMONIALS ---------- */
  const SVG_NS = "http://www.w3.org/2000/svg";
  const STAR_PATH = "M12 2.5l2.9 6.06 6.6.83-4.85 4.6 1.27 6.6L12 17.4l-5.92 3.19 1.27-6.6-4.85-4.6 6.6-.83z";

  function buildStars(rating) {
    const wrap = document.createElement("div");
    wrap.className = "testimonial-stars";
    const filled = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("class", "star-icon" + (i <= filled ? " filled" : ""));
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", STAR_PATH);
      svg.appendChild(path);
      wrap.appendChild(svg);
    }
    const num = document.createElement("span");
    num.className = "testimonial-rating-num";
    num.textContent = rating.toFixed(1);
    wrap.appendChild(num);
    return wrap;
  }

  const testimonialsGrid = document.getElementById("testimonialsGrid");
  (typeof TESTIMONIALS !== "undefined" ? TESTIMONIALS : []).forEach(function (t) {
    const card = document.createElement("div");
    card.className = "testimonial-card";

    if (t.rating) {
      card.appendChild(buildStars(t.rating));
    }

    const quote = document.createElement("p");
    quote.className = "testimonial-quote";
    quote.textContent = t.quote;
    card.appendChild(quote);

    const meta = document.createElement("div");
    meta.className = "testimonial-meta";
    if (t.project) {
      const project = document.createElement("div");
      project.className = "testimonial-project";
      project.textContent = t.project;
      meta.appendChild(project);
    }
    if (t.location) {
      const location = document.createElement("div");
      location.className = "testimonial-location";
      location.textContent = t.location;
      meta.appendChild(location);
    }
    if (t.clientNote) {
      const note = document.createElement("div");
      note.className = "testimonial-clientnote";
      note.textContent = t.clientNote;
      meta.appendChild(note);
    }
    card.appendChild(meta);

    testimonialsGrid.appendChild(card);
  });

  /* ---------- CURATED SHORTLIST (opened via ?games=id1,id2) ---------- */
  (function () {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("games");
    if (!raw) return;
    const ids = raw.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    const picks = ids
      .map(function (id) { return GAMES.find(function (g) { return g.id === id; }); })
      .filter(Boolean);
    if (!picks.length) return;

    const curatedSection = document.getElementById("curated");
    const curatedGrid = document.getElementById("curatedGrid");
    picks.forEach(function (game) {
      curatedGrid.appendChild(buildCard(game));
    });
    curatedSection.hidden = false;

    // This is a stripped-down share link: show only the picks, nothing else.
    ["top", "games", "testimonials", "courses", "about"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.hidden = true;
    });
    const contactFooter = document.getElementById("contact");
    if (contactFooter) contactFooter.hidden = true;
    const ticker = document.querySelector(".ticker");
    if (ticker) ticker.hidden = true;

    // Any in-page nav link (header logo, nav, "see all games") should drop
    // ?games= and do a real navigation back to the full site, not just an
    // anchor-jump within this stripped-down page.
    document.querySelectorAll('header.site a[href^="#"]').forEach(function (a) {
      a.setAttribute("href", "./" + a.getAttribute("href"));
    });
  })();

  /* ---------- TICKER ---------- */
  // The track scrolls by -50%, i.e. exactly one group, so the second group
  // lands where the first started. That only reads as seamless while a single
  // group is at least as wide as the viewport. The display font caps at
  // 1.9rem, so past ~1170px the phrases stop growing while the window doesn't,
  // and a fixed number of them would run out and leave dead space at the right
  // edge. So measure instead: repeat the seed until it covers the viewport,
  // mirror it, and derive the duration from the width to hold speed constant.
  (function () {
    const track = document.querySelector(".ticker-track");
    if (!track) return;
    const seed = track.innerHTML;
    const SPEED = 80; // px per second, independent of how wide the group ends up

    function build() {
      track.innerHTML = seed;
      const group = track.querySelector(".ticker-group");
      if (!group) return;
      const unit = group.innerHTML;
      // Guard the loop: a zero-width unit (missing font, empty phrase) would
      // otherwise spin forever.
      let guard = 200;
      while (group.offsetWidth < window.innerWidth && guard--) {
        group.insertAdjacentHTML("beforeend", unit);
      }
      track.appendChild(group.cloneNode(true));
      track.style.animationDuration = (group.offsetWidth / SPEED).toFixed(2) + "s";
    }

    build();
    // The display font arrives after first paint and is far narrower than the
    // fallback, so the first measurement is usually an overestimate.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);

    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    });
  })();

  /* ---------- COURSES ---------- */
  const courseLog = document.getElementById("courseLog");
  COURSES.forEach(function (c) {
    const row = document.createElement("div");
    row.className = "log-row";
    const titleHtml = c.url
      ? '<span class="check">✓</span><a href="' + c.url + '" target="_blank" rel="noopener">' + c.title + "</a>"
      : '<span class="check">✓</span>' + c.title;
    row.innerHTML =
      '<span class="date mono">' + (c.date || "TBD") + '</span>' +
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

  const modalFullscreen = document.getElementById("modalFullscreen");

  function openModal(title, orientation) {
    lastFocused = document.activeElement;
    modalTitle.textContent = title;
    modalBody.className = "modal-body" + (orientation ? " orient-" + orientation : "");
    modalFullscreen.hidden = true;
    overlay.classList.add("open");
    modalClose.focus();
    document.addEventListener("keydown", onModalKeydown);
  }
  function closeModal() {
    overlay.classList.remove("open");
    modalBody.innerHTML = "";
    modalFullscreen.hidden = true;
    document.removeEventListener("keydown", onModalKeydown);
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  }

  // The modal is capped at 88vh, which is still small for a real game. Offer
  // the whole screen as an escape hatch for anything embedded.
  modalFullscreen.addEventListener("click", function () {
    const frame = modalBody.querySelector("iframe");
    if (!frame || !frame.requestFullscreen) return;
    frame.requestFullscreen().catch(function () { /* denied or unsupported */ });
  });
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
    modalFullscreen.hidden = !iframe.requestFullscreen;
  }

  function openVideoModal(game) {
    openModal(game.title + ": preview", "landscape");
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + game.youtubeId;
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    modalBody.appendChild(iframe);
  }

  function openGalleryModal(game) {
    openModal(game.title + ": photos", null);
    modalBody.classList.add("is-scroll");
    const gallery = document.createElement("div");
    gallery.className = "modal-gallery";
    game.images.forEach(function (src, i) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = game.title;
      // The first shot is what the modal opens on; the rest wait for a scroll.
      if (i > 0) img.loading = "lazy";
      img.decoding = "async";
      gallery.appendChild(img);
    });
    modalBody.appendChild(gallery);
  }

  /* ---------- PROJECT DETAIL (opened via ?game=id) ---------- */
  const detailOverlay = document.getElementById("detailOverlay");
  const detailTitle = document.getElementById("detailTitle");
  const detailBody = document.getElementById("detailBody");
  const detailClose = document.getElementById("detailClose");
  let detailGame = null;
  let detailLastFocused = null;
  // Whether the open state came from a click (so there's a history entry to go
  // back to) or from a cold load on ?game=, where back would leave the site.
  let detailPushed = false;

  function gameById(id) {
    return GAMES.find(function (g) { return g.id === id; }) || null;
  }

  // Keep every other param intact -- a detail opened from a ?games= curated
  // link has to stay inside that curated view when it closes.
  function detailUrlFor(id) {
    const params = new URLSearchParams(window.location.search);
    if (id) params.set("game", id);
    else params.delete("game");
    const qs = params.toString();
    return window.location.origin + window.location.pathname + (qs ? "?" + qs : "");
  }

  function detailSection(title, node) {
    const section = document.createElement("div");
    section.className = "detail-section";
    const heading = document.createElement("div");
    heading.className = "detail-section-title";
    heading.textContent = title;
    section.appendChild(heading);
    section.appendChild(node);
    return section;
  }

  // Copy the bare URL and nothing else. The native share sheet was pasting the
  // title and tagline along with the link, which isn't what you want when you
  // drop a project link into a chat.
  function shareGame(game, btn) {
    const url = detailUrlFor(game.id);
    track("share/" + game.id, "Share: " + game.title, true);
    const label = btn.textContent;
    copyText(url, function () {
      btn.textContent = "Link copied ✓";
      setTimeout(function () { btn.textContent = label; }, 1800);
    });
  }

  function buildDetailActions(game) {
    const wrap = document.createElement("div");
    wrap.className = "detail-actions";
    let hasAny = false;

    const primaryClass = function () { return hasAny ? "" : "is-primary"; };

    if (game.status === "live" && game.embedUrl) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = primaryClass();
      btn.textContent = "Play here ▸";
      btn.addEventListener("click", function () {
        track("play/" + game.id, "Play: " + game.title, true);
        openEmbedModal(game);
      });
      wrap.appendChild(btn);
      hasAny = true;
    }
    if (game.status === "live" && game.playUrl) {
      const a = document.createElement("a");
      a.className = primaryClass();
      a.href = game.playUrl;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Open ↗";
      a.addEventListener("click", function () {
        track("open/" + game.id, "Open: " + game.title, true);
      });
      wrap.appendChild(a);
      hasAny = true;
    }
    // Unlike the old card row, the detail view shows every preview a game has
    // rather than only falling back to one -- there's room for all of them.
    if (game.youtubeId) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = primaryClass();
      btn.textContent = "Watch preview ▸";
      btn.addEventListener("click", function () {
        track("preview/" + game.id, "Preview: " + game.title, true);
        openVideoModal(game);
      });
      wrap.appendChild(btn);
      hasAny = true;
    }
    if (game.images && game.images.length) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = primaryClass();
      btn.textContent = "View photos ▸";
      btn.addEventListener("click", function () {
        track("photos/" + game.id, "Photos: " + game.title, true);
        openGalleryModal(game);
      });
      wrap.appendChild(btn);
      hasAny = true;
    }
    if (!hasAny) {
      const span = document.createElement("span");
      span.className = "muted";
      span.textContent = game.status === "live" ? "Link coming soon" : "Preview coming soon";
      wrap.appendChild(span);
    }

    const share = document.createElement("button");
    share.type = "button";
    share.className = "is-share";
    share.textContent = "Share ↗";
    share.addEventListener("click", function () { shareGame(game, share); });
    wrap.appendChild(share);

    return wrap;
  }

  function renderDetail(game) {
    detailBody.innerHTML = "";
    detailTitle.textContent = game.id + "." + fileExtFor(game);

    if (game.image) {
      const hero = document.createElement("div");
      hero.className = "detail-hero" +
        (game.orientation === "portrait" ? " detail-hero--portrait" : "");
      const img = document.createElement("img");
      img.src = game.image;
      img.alt = game.title;
      img.decoding = "async";
      hero.appendChild(img);
      detailBody.appendChild(hero);
    }

    const content = document.createElement("div");
    content.className = "detail-content";

    const h2 = document.createElement("h2");
    h2.id = "detailHeading";
    h2.textContent = game.title;
    content.appendChild(h2);

    if (game.tagline) {
      const tagline = document.createElement("p");
      tagline.className = "detail-tagline";
      tagline.textContent = game.tagline;
      content.appendChild(tagline);
    }

    const pairs = [
      ["Status", game.status === "live" ? "Live" : "Prototype"],
      ["Year", game.year],
      ["Client", game.client],
      ["Role", game.role],
      ["Timeline", game.timeline],
      ["Team", game.team]
    ].filter(function (pair) { return pair[1]; });
    if (pairs.length) {
      const meta = document.createElement("div");
      meta.className = "detail-meta";
      pairs.forEach(function (pair) {
        const item = document.createElement("div");
        item.className = "detail-meta-item";
        const label = document.createElement("span");
        label.className = "detail-meta-label";
        label.textContent = pair[0];
        const value = document.createElement("span");
        value.className = "detail-meta-value";
        value.textContent = pair[1];
        item.appendChild(label);
        item.appendChild(value);
        meta.appendChild(item);
      });
      content.appendChild(meta);
    }

    const desc = document.createElement("p");
    desc.className = "detail-desc";
    desc.textContent = game.description;
    content.appendChild(detailSection("About", desc));

    if (game.highlights && game.highlights.length) {
      const list = document.createElement("ul");
      list.className = "detail-highlights";
      game.highlights.forEach(function (h) {
        const li = document.createElement("li");
        li.textContent = h;
        list.appendChild(li);
      });
      content.appendChild(detailSection("Highlights", list));
    }

    if (game.challenges && game.challenges.length) {
      const wrap = document.createElement("div");
      game.challenges.forEach(function (c) {
        const block = document.createElement("div");
        block.className = "detail-challenge";
        const title = document.createElement("div");
        title.className = "detail-challenge-title";
        title.textContent = c.title;
        const body = document.createElement("div");
        body.className = "detail-challenge-body";
        body.textContent = c.body;
        block.appendChild(title);
        block.appendChild(body);
        wrap.appendChild(block);
      });
      content.appendChild(detailSection("Challenges", wrap));
    }

    const tags = document.createElement("div");
    tags.className = "tags";
    game.tags.forEach(function (t) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tags.appendChild(span);
    });
    content.appendChild(detailSection("Built with", tags));

    content.appendChild(buildDetailActions(game));
    detailBody.appendChild(content);
  }

  function openDetail(game, opts) {
    const fromHistory = !!(opts && opts.fromHistory);
    detailGame = game;
    detailLastFocused = document.activeElement;
    renderDetail(game);
    detailOverlay.classList.add("open");
    detailBody.scrollTop = 0;
    detailClose.focus();
    document.addEventListener("keydown", onDetailKeydown);
    if (!fromHistory) {
      history.pushState({ game: game.id }, "", detailUrlFor(game.id));
      detailPushed = true;
    }
    track("game/" + game.id, game.title + " — project detail");
  }

  function closeDetail(opts) {
    if (!detailOverlay.classList.contains("open")) return;
    const pushed = detailPushed;
    detailPushed = false;
    detailOverlay.classList.remove("open");
    detailBody.innerHTML = "";
    detailGame = null;
    document.removeEventListener("keydown", onDetailKeydown);
    if (detailLastFocused && document.contains(detailLastFocused)) detailLastFocused.focus();
    if (opts && opts.fromHistory) return;
    // Going back keeps the history stack honest. On a cold load of ?game= there
    // is nothing behind us, so just rewrite the URL in place instead.
    if (pushed) history.back();
    else history.replaceState({}, "", detailUrlFor(null));
  }

  function onDetailKeydown(e) {
    if (e.key !== "Escape") return;
    // The play/video modal stacks on top of this one; let it take Escape first.
    if (overlay.classList.contains("open")) return;
    closeDetail();
  }

  detailClose.addEventListener("click", function () { closeDetail(); });
  detailOverlay.addEventListener("click", function (e) {
    if (e.target === detailOverlay) closeDetail();
  });

  window.addEventListener("popstate", function () {
    const id = new URLSearchParams(window.location.search).get("game");
    const game = id ? gameById(id) : null;
    if (game) {
      if (detailGame && detailGame.id === game.id) return;
      openDetail(game, { fromHistory: true });
    } else {
      closeDetail({ fromHistory: true });
    }
  });

  // Cold load straight onto a shared ?game= link.
  (function () {
    const id = new URLSearchParams(window.location.search).get("game");
    if (!id) return;
    const game = gameById(id);
    if (game) openDetail(game, { fromHistory: true });
  })();

  /* ---------- SHAREABLE GAME-LINK PICKER ---------- */
  const pickerOverlay = document.getElementById("pickerOverlay");
  const pickerClose = document.getElementById("pickerClose");
  const pickerList = document.getElementById("pickerList");
  const pickerCount = document.getElementById("pickerCount");
  const pickerClearBtn = document.getElementById("pickerClear");
  const pickerGenerateBtn = document.getElementById("pickerGenerate");
  const pickerResult = document.getElementById("pickerResult");
  const pickerLinkInput = document.getElementById("pickerLinkInput");
  const pickerCopyBtn = document.getElementById("pickerCopyBtn");

  GAMES.forEach(function (game) {
    const label = document.createElement("label");
    label.className = "picker-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("data-id", game.id);

    let thumb;
    if (game.image) {
      thumb = document.createElement("img");
      thumb.src = game.image;
      thumb.alt = "";
      thumb.loading = "lazy";
      thumb.decoding = "async";
    } else {
      thumb = document.createElement("span");
    }
    thumb.className = "picker-thumb-mini";

    const text = document.createElement("div");
    text.className = "picker-item-text";
    const titleEl = document.createElement("div");
    titleEl.className = "picker-item-title";
    titleEl.textContent = game.title;
    text.appendChild(titleEl);
    if (game.tagline) {
      const taglineEl = document.createElement("div");
      taglineEl.className = "picker-item-tagline";
      taglineEl.textContent = game.tagline;
      text.appendChild(taglineEl);
    }

    label.appendChild(checkbox);
    label.appendChild(thumb);
    label.appendChild(text);
    pickerList.appendChild(label);
  });

  function pickerSelectedIds() {
    return Array.prototype.slice.call(pickerList.querySelectorAll('input[type="checkbox"]:checked'))
      .map(function (cb) { return cb.getAttribute("data-id"); });
  }

  function updatePickerCount() {
    const n = pickerSelectedIds().length;
    pickerCount.textContent = n + (n === 1 ? " selected" : " selected");
    pickerGenerateBtn.disabled = n === 0;
    pickerResult.hidden = true;
  }

  pickerList.addEventListener("change", updatePickerCount);

  pickerClearBtn.addEventListener("click", function () {
    Array.prototype.forEach.call(pickerList.querySelectorAll('input[type="checkbox"]'), function (cb) {
      cb.checked = false;
    });
    updatePickerCount();
  });

  pickerGenerateBtn.addEventListener("click", function () {
    const ids = pickerSelectedIds();
    if (!ids.length) return;
    const url = window.location.origin + window.location.pathname + "?games=" + encodeURIComponent(ids.join(","));
    pickerLinkInput.value = url;
    pickerResult.hidden = false;
    pickerLinkInput.focus();
    pickerLinkInput.select();
  });

  pickerCopyBtn.addEventListener("click", function () {
    pickerLinkInput.focus();
    pickerLinkInput.select();
    const restoreLabel = function () {
      setTimeout(function () { pickerCopyBtn.textContent = "Copy link"; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pickerLinkInput.value).then(function () {
        pickerCopyBtn.textContent = "Copied!";
        restoreLabel();
      }).catch(function () {
        document.execCommand("copy");
        pickerCopyBtn.textContent = "Copied!";
        restoreLabel();
      });
    } else {
      document.execCommand("copy");
      pickerCopyBtn.textContent = "Copied!";
      restoreLabel();
    }
  });

  function openPicker() {
    pickerOverlay.classList.add("open");
    document.addEventListener("keydown", onPickerKeydown);
  }
  function closePicker() {
    pickerOverlay.classList.remove("open");
    document.removeEventListener("keydown", onPickerKeydown);
  }
  function onPickerKeydown(e) {
    if (e.key === "Escape") closePicker();
  }
  createLinkBtn.addEventListener("click", openPicker);
  pickerClose.addEventListener("click", closePicker);
  pickerOverlay.addEventListener("click", function (e) {
    if (e.target === pickerOverlay) closePicker();
  });
})();
