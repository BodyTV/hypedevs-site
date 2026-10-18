/* =====================================================================
   Body & Zunye — application layer
   ===================================================================== */
(function () {
  "use strict";
  var SITE = window.SITE || { services: [], complexity: [], currency: "€", range: .25 };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  var ICONS = {
    bot: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="4"/><path d="M12 8V4M8 14h.01M16 14h.01M9 17h6"/><circle cx="12" cy="3" r="1.4"/></svg>',
    plug: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6M15 3v6M6 9h12v2a6 6 0 0 1-6 6 6 6 0 0 1-6-6V9ZM12 17v4"/></svg>',
    script: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h9l3 3v13H6z"/><path d="M15 4v3h3M9 12h6M9 16h6"/></svg>',
    cube: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/></svg>',
    discord: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.6a18 18 0 0 0-6.2 0L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 0 13.5.3 17.9a20 20 0 0 0 6 3l1.3-2.1-2-1 .5-.4a14 14 0 0 0 12.2 0l.5.4-2 1 1.3 2.1a20 20 0 0 0 6-3c.4-5.1-.7-9.6-3.8-13.5ZM8.5 15.2c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4Zm7 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4Z"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
    github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>'
  };
  window.BZ_ICONS = ICONS;

  /* ------------------------------- theme ------------------------------- */
  var root = document.documentElement;
  var themeBtn = $("#themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bz-theme", next); } catch (e) {}
      themeBtn.setAttribute("aria-label", next === "light" ? "Switch to dark theme" : "Switch to light theme");
    });
  }

  /* --------------------------- header + progress ----------------------- */
  var header = $(".site-header"), bar = $("#scrollbar");
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? Math.min(scrollY, h) / h * 100 : 0) + "%";
    if (header) header.classList.toggle("scrolled", scrollY > 8);
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ------------------------------ burger ------------------------------- */
  var burger = $("#burger"), nav = $("#primary-nav");
  if (burger && nav) {
    var toggle = function (open) {
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    burger.addEventListener("click", function () { toggle(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) toggle(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });
  }

  /* ------------------------------ reveal ------------------------------- */
  var reveals = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    $$("[data-stagger]").forEach(function (c) { Array.prototype.forEach.call(c.children, function (k) { k.classList.remove("rise"); }); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -40px" });
    reveals.forEach(function (el) { io.observe(el); });

    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var kids = Array.prototype.slice.call(e.target.children);
        kids.forEach(function (el, i) {
          if (reduce) { el.classList.remove("rise"); return; }
          el.style.setProperty("--d", (i * 70) + "ms");
          el.classList.add("rise");
          el.addEventListener("animationend", function () { el.classList.remove("rise"); el.style.removeProperty("--d"); }, { once: true });
        });
        io2.unobserve(e.target);
      });
    }, { threshold: .15 });
    $$("[data-stagger]").forEach(function (c) { io2.observe(c); });
  }

  /* ---------------------------- card spotlight ------------------------- */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest(".card.hover"); if (!el) return;
      var b = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - b.left) + "px");
      el.style.setProperty("--my", (e.clientY - b.top) + "px");
    }, { passive: true });
  }

  /* ------------------------------ counters ----------------------------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute("data-count"));
    var suf = el.getAttribute("data-suffix") || "";
    var dec = to % 1 ? 1 : 0, t0 = performance.now(), dur = 1300;
    if (reduce) { el.textContent = (dec ? to.toFixed(1) : to.toLocaleString("en")) + suf; return; }
    (function f(t) {
      var k = Math.min((t - t0) / dur, 1), v = to * (1 - Math.pow(1 - k, 3));
      el.textContent = (dec ? v.toFixed(1) : Math.round(v).toLocaleString("en")) + suf;
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  function observeCounters(scope) {
    var els = $$("[data-count]", scope);
    if (!("IntersectionObserver" in window)) { els.forEach(countUp); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } });
    }, { threshold: .5 });
    els.forEach(function (el) { io.observe(el); });
  }
  observeCounters(document);

  /* ---------------------------- money helpers -------------------------- */
  function eur(n) { return SITE.currency + Math.round(n).toLocaleString("en"); }

  /* ------------------------------ hero art ----------------------------- */
  var codeEl = $("#codeOut");
  if (codeEl) {
    var SNIPPETS = {
      skript: "# Skript — /heal command\ncommand /heal [<player>]:\n    permission: server.heal\n    trigger:\n        set {_p} to arg-1 ? player\n        heal {_p}\n        send \"&aYou were healed!\" to {_p}",
      python: "# discord.py — slash command\n@bot.tree.command(name=\"ping\")\nasync def ping(i: discord.Interaction):\n    ms = round(bot.latency * 1000)\n    await i.response.send_message(\n        f\"Online, {ms} ms\")",
      java: '// Paper plugin — welcome message\n@EventHandler\npublic void onJoin(PlayerJoinEvent e) {\n    Player p = e.getPlayer();\n    p.sendMessage(Component.text(\n        "Welcome, " + p.getName() + "!",\n        NamedTextColor.AQUA));\n}'
    };
    var CHAT = { "/ping": ["Online, 42 ms."], "/roles": ["Pick your roles below ⬇", "✅ Developer   🎮 Gamer   📢 News"], "/ticket": ["Ticket #0142 created. A staff member will be with you soon."] };
    var tabs = $$(".tab"), codePane = $("#codePane"), chatPane = $("#chatPane"), log = $("#chatLog"), timer;
    function typeCode(txt) {
      clearInterval(timer); codeEl.textContent = "";
      if (reduce) { codeEl.textContent = txt; return; }
      var i = 0;
      timer = setInterval(function () { codeEl.textContent = txt.slice(0, i += 3); if (i >= txt.length) { codeEl.textContent = txt; clearInterval(timer); } }, 12);
    }
    function bubble(who, text, bot) {
      var d = document.createElement("div"); d.className = "msg" + (bot ? " bot" : "");
      d.innerHTML = '<div class="av">' + (bot ? "B" : "You") + "</div><div><b>" + who + (bot ? '<span class="bot-tag">BOT</span>' : "") + "</b><p>" + text + "</p></div>";
      log.appendChild(d); log.scrollTop = log.scrollHeight;
    }
    function runCmd(c) {
      bubble("You", c, false);
      setTimeout(function () { CHAT[c].forEach(function (l, i) { setTimeout(function () { bubble("YourBot", l, true); }, i * 320); }); }, 420);
    }
    function select(t) {
      tabs.forEach(function (x) { x.setAttribute("aria-selected", String(x.dataset.tab === t)); });
      var chat = t === "chat";
      if (codePane) codePane.style.display = chat ? "none" : "block";
      if (chatPane) chatPane.classList.toggle("on", chat);
      if (chat) {
        if (log && !log.children.length) { bubble("You", "Can someone set up reaction roles?", false); setTimeout(function () { bubble("YourBot", "Done. Use /roles to pick yours.", true); }, 520); }
      } else typeCode(SNIPPETS[t]);
    }
    tabs.forEach(function (t) { t.addEventListener("click", function () { select(t.dataset.tab); }); });
    $$(".cmd").forEach(function (b) { b.addEventListener("click", function () { runCmd(b.dataset.cmd); }); });
    select("skript");
  }

  /* ------------------------------ bento tiles -------------------------- */
  var bento = $("#bento");
  if (bento) {
    var spans = ["b-4", "b-2", "b-2", "b-4"];
    SITE.services.forEach(function (s, i) {
      var a = document.createElement("a");
      a.href = "services.html#" + s.id;
      a.className = "card hover tile " + (spans[i] || "b-3");
      a.innerHTML = (s.tag ? '<span class="tag">' + s.tag + "</span>" : "") +
        '<span class="ico">' + (ICONS[s.icon] || "") + "</span>" +
        "<h3>" + s.label + "</h3><p>" + s.desc + "</p>" +
        '<div class="price-line">From <b>' + eur(s.one) + '</b><span class="more">Details →</span></div>';
      bento.appendChild(a);
    });
  }

  /* --------------------------- service sections ------------------------ */
  var svcWrap = $("#serviceSections");
  if (svcWrap) {
    SITE.services.forEach(function (s, i) {
      var row = document.createElement("div");
      row.className = "card tile";
      row.id = s.id;
      row.style.scrollMarginTop = "6.5rem";
      row.innerHTML =
        '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">' +
          '<span class="ico" style="margin:0">' + (ICONS[s.icon] || "") + "</span>" +
          "<div><h3>" + s.label + '</h3><div style="color:var(--muted);font-size:.9rem">' + s.sub + "</div></div>" +
          '<div style="margin-left:auto;text-align:right"><div style="font-family:var(--font-mono);font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em">Starting at</div><b style="font-family:var(--font-display);font-size:1.6rem">' + eur(s.one) + "</b></div>" +
        "</div>" +
        '<p style="margin-top:1.2rem;font-size:1.02rem">' + s.desc + "</p>" +
        '<ul style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:1.3rem">' +
          s.features.map(function (f) { return '<li style="display:flex;gap:.55rem;align-items:center;color:var(--ink-2);font-size:.94rem"><span style="color:var(--a2)">✓</span>' + f + "</li>"; }).join("") +
        "</ul>" +
        '<div style="margin-top:1.6rem;display:flex;gap:.7rem;flex-wrap:wrap"><a class="btn btn-sm" href="' + SITE.discord.url + '" target="_blank" rel="noopener">Start a project</a><a class="btn btn-ghost btn-sm" href="contact.html">Ask a question</a></div>';
      svcWrap.appendChild(row);
    });
  }

  /* ------------------------------ estimator ---------------------------- */
  var optList = $("#estOpts");
  if (optList) {
    var sel = {}, cx = SITE.complexity[0].id;
    var cxList = $("#estCx"), summaryEl = $("#estSummary"), totalEl = $("#estTotal"), rangeEl = $("#estRange"), lastSummary = "";

    SITE.services.forEach(function (it) {
      var l = document.createElement("label");
      l.className = "opt";
      l.innerHTML = '<input type="checkbox" value="' + it.id + '"><span style="flex:1"><b>' + it.label + '</b><span>' + it.sub + "</span></span>" +
        '<span style="font-family:var(--font-display);font-weight:700;font-size:.95rem">' + eur(it.one) + "</span>";
      l.querySelector("input").addEventListener("change", function (e) { sel[it.id] = e.target.checked; calc(); });
      optList.appendChild(l);
    });

    SITE.complexity.forEach(function (c, i) {
      var l = document.createElement("label");
      l.innerHTML = '<input type="radio" name="cx" value="' + c.id + '"' + (i === 0 ? " checked" : "") + "><b>" + c.label + "</b><small>" + c.hint + "</small>";
      l.querySelector("input").addEventListener("change", function () { cx = c.id; calc(); });
      cxList.appendChild(l);
    });

    function calc() {
      var mult = SITE.complexity.filter(function (c) { return c.id === cx; })[0].mult;
      var one = 0, lines = [];
      SITE.services.forEach(function (it) { if (sel[it.id]) { one += it.one * mult; lines.push(it.label); } });
      var lo = one * (1 - SITE.range), hi = one * (1 + SITE.range);
      totalEl.textContent = one ? eur(lo) : eur(0);
      rangeEl.textContent = one ? "to " + eur(hi) + " · " + SITE.complexity.filter(function (c) { return c.id === cx; })[0].label : "Pick a service to begin";
      summaryEl.innerHTML = lines.length
        ? lines.map(function (t) { return "<li>" + t + "</li>"; }).join("")
        : '<li class="empty">Nothing selected yet</li>';
      lastSummary = "Project estimate: " + (lines.join(", ") || "nothing selected") + " | " +
        SITE.complexity.filter(function (c) { return c.id === cx; })[0].label + " | " + (one ? eur(lo) + "–" + eur(hi) : eur(0));
    }
    var copyBtn = $("#estCopy");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var b = this;
        (navigator.clipboard ? navigator.clipboard.writeText(lastSummary) : Promise.reject()).then(
          function () { b.textContent = "Copied ✓"; },
          function () { b.textContent = "Copy failed"; }
        );
        setTimeout(function () { b.textContent = "Copy summary"; }, 1800);
      });
    }
    calc();
  }

  /* ------------------------------- discord ----------------------------- */
  var dw = $("#discordWidget");
  if (dw) {
    var D = SITE.discord;
    var set = function (s, v) { var e = $(s, dw); if (e) e.textContent = v; };
    var load = function () {
      var url = D.guildId ? "https://discord.com/api/guilds/" + D.guildId + "/widget.json"
        : "https://discord.com/api/v9/invites/" + D.invite + "?with_counts=true";
      fetch(url).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
        var on = d.presence_count != null ? d.presence_count : d.approximate_presence_count;
        var mem = d.approximate_member_count, name = d.name || (d.guild && d.guild.name);
        if (name) set(".dname", name);
        if (on != null) { set(".don", on.toLocaleString("en")); var a = $(".onl", dw); if (a) a.hidden = false; }
        if (mem != null) { set(".dmem", mem.toLocaleString("en")); var b = $(".mem", dw); if (b) b.hidden = false; }
      }).catch(function () {});
    };
    $$("a.join").forEach(function (a) { a.href = D.url; });
    load(); setInterval(load, 60000);
  }

  /* --------------------------- command palette ------------------------- */
  var pal = $("#palette"), palInput = $("#paletteInput"), palList = $("#paletteList"), palBtn = $("#cmdkBtn");
  if (pal) {
    var items = [
      { label: "Home", href: "index.html", k: "G H" },
      { label: "Services", href: "services.html", k: "G S" },
      { label: "Projects", href: "projects.html", k: "G P" },
      { label: "Team", href: "team.html", k: "G T" },
      { label: "Contact", href: "contact.html", k: "G C" },
      { label: "Privacy policy", href: "privacy.html", k: "" },
      { label: "Estimate a project", href: "services.html#estimator", k: "" },
      { label: "Join our Discord", href: SITE.discord.url, k: "↗" },
      { label: "Email us", href: "mailto:" + SITE.email, k: "" }
    ];
    function draw(q) {
      var f = items.filter(function (i) { return i.label.toLowerCase().indexOf(q.toLowerCase()) > -1; });
      palList.innerHTML = f.length
        ? f.map(function (i, n) { return '<a href="' + i.href + '"' + (n === 0 ? ' class="sel"' : "") + (i.href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ">" + i.label + (i.k ? '<span class="k">' + i.k + "</span>" : "") + "</a>"; }).join("")
        : '<div class="none">No matches</div>';
    }
    function openPal() { pal.classList.add("open"); palInput.value = ""; draw(""); palInput.focus(); }
    function closePal() { pal.classList.remove("open"); }
    if (palBtn) palBtn.addEventListener("click", openPal);
    pal.addEventListener("click", function (e) { if (e.target === pal) closePal(); });
    palInput.addEventListener("input", function () { draw(palInput.value); });
    palInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { var a = $("a", palList); if (a) { a.click(); closePal(); } }
    });
    addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.classList.contains("open") ? closePal() : openPal(); }
      if (e.key === "Escape") closePal();
    });
  }

  /* ------------------------------- to top ------------------------------ */
  var toTop = $("#toTop");
  if (toTop) toTop.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  /* ------------------------------ contact form ------------------------- */
  var form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = $("#cfName"), em = $("#cfEmail"), ms = $("#cfMessage");
      var name = (n && n.value.trim()) || "there";
      var msg = (ms && ms.value.trim()) || "";
      var subject = encodeURIComponent("New project enquiry from " + name);
      var body = encodeURIComponent(msg + "\n\n— " + name + (em && em.value ? " (" + em.value + ")" : ""));
      location.href = "mailto:" + SITE.email + "?subject=" + subject + "&body=" + body;
    });
  }

  /* --------------------------- card pointer glow ----------------------- */
  $$("[data-ico]").forEach(function (el) { el.innerHTML = ICONS[el.getAttribute("data-ico")] || ""; });
})();
