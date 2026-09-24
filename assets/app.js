/*
  Roadmaps tracker. Plain JavaScript, no build step, no dependencies.

  Progress lives in localStorage under "roadmaps:state:v1" and, when a GitHub token is
  connected, in one secret gist (file "roadmaps-progress.json"). Every entry carries its own
  timestamp, so merging two devices is a per-entry "latest write wins".

    items:    key -> [done 0|1, timestamp, known 0|1]   key = "t:<topic>:<hash>" or "p:<project>:<hash>"
    notes:    id  -> [text, timestamp]
    settings: name -> [value, timestamp]                 focus line, weekly goal
*/
(function () {
  "use strict";

  const RM = window.RM;
  if (!RM || !Array.isArray(RM.roadmaps)) return;

  const P = "roadmaps:";
  const K = {
    state: P + "state:v1",
    ui: P + "ui:v1",
    token: P + "gh-token",
    gist: P + "gist-id",
    login: P + "gh-login",
    theme: P + "theme"
  };
  const GIST_FILE = "roadmaps-progress.json";
  const API = "https://api.github.com";
  const DAY = 86400000;
  const HEAT_WEEKS = 26;
  const PACE_DAYS = 28;

  /* ---------- helpers ---------- */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const pad = (n) => String(n).padStart(2, "0");
  const plural = (n, one, many) => n + " " + (n === 1 ? one : many);

  function hash(text) {
    // FNV-1a, 32 bit. Keys depend on the item text, so reordering items never breaks progress.
    let h = 0x811c9dc5;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
  }

  function safeParse(text) {
    try { return text ? JSON.parse(text) : null; } catch (e) { return null; }
  }

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); return true; } catch (e) { return false; } },
    remove(key) { try { localStorage.removeItem(key); } catch (e) { /* storage unavailable */ } }
  };

  function reducedMotion() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  function luminance(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
    if (!m) return 0;
    const n = parseInt(m[1], 16);
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }

  function onColor(hex) {
    // Pick whichever text colour has more contrast on the line colour.
    const L = luminance(hex);
    const white = 1.05 / (L + 0.05);
    const ink = (L + 0.05) / (luminance("#16202E") + 0.05);
    return white >= ink ? "#FFFFFF" : "#16202E";
  }

  function lineAttrs(r) {
    const light = r.color || "#4B5566";
    const dark = r.colorDark || light;
    return 'data-line style="--l-light:' + esc(light) + ";--l-dark:" + esc(dark) +
      ";--on-light:" + onColor(light) + ";--on-dark:" + onColor(dark) + '"';
  }

  /* ---------- model ---------- */

  const topics = RM.topics;
  const lines = RM.roadmaps;
  const lineById = {};
  const topicItems = {};
  const projectItems = {};
  const projectById = {};
  const topicLines = {};
  const warnings = [];

  (RM.dupes || []).forEach((id) => warnings.push('Topic id "' + id + '" is defined twice; the later definition wins.'));

  Object.keys(topics).forEach((id) => {
    const seen = new Set();
    topicItems[id] = (topics[id].subs || []).map((text) => {
      const key = "t:" + id + ":" + hash(text);
      if (seen.has(key)) warnings.push('Topic "' + id + '" lists the same item twice: ' + text);
      seen.add(key);
      return { key, text };
    });
  });

  const flat = (arrays) => [].concat.apply([], arrays);

  lines.forEach((r) => {
    if (lineById[r.id]) warnings.push('Roadmap id "' + r.id + '" is used twice.');
    lineById[r.id] = r;
    r.phases = r.phases || [];
    const usedHere = new Set();
    r.phases.forEach((ph, i) => {
      ph._index = i;
      const keep = (tid) => {
        if (!topics[tid]) {
          warnings.push(r.title + ", phase " + (i + 1) + ': there is no topic with id "' + tid + '".');
          return false;
        }
        if (usedHere.has(tid)) {
          warnings.push(r.title + ': topic "' + tid + '" is listed more than once.');
          return false;
        }
        usedHere.add(tid);
        const on = topicLines[tid] || (topicLines[tid] = []);
        if (on.indexOf(r.id) < 0) on.push(r.id);
        return true;
      };
      ph.topics = (ph.topics || []).filter(keep);
      ph.extra = (ph.extra || []).filter(keep);
      ph.projects = (ph.projects || []).filter((p) => {
        if (projectById[p.id]) {
          warnings.push('Project id "' + p.id + '" is used twice.');
          return false;
        }
        projectById[p.id] = p;
        projectItems[p.id] = (p.done || []).map((text) => ({ key: "p:" + p.id + ":" + hash(text), text }));
        return true;
      });
      // Core path: topics plus projects. Extra topics are optional and never block the next stop.
      ph._keys = flat(ph.topics.map((tid) => topicItems[tid].map((it) => it.key)))
        .concat(flat(ph.projects.map((p) => projectItems[p.id].map((it) => it.key))));
      ph._extraKeys = flat(ph.extra.map((tid) => topicItems[tid].map((it) => it.key)));
    });
    r._keys = Array.from(new Set(flat(r.phases.map((ph) => ph._keys))));
    const core = new Set(r._keys);
    r._extraKeys = Array.from(new Set(flat(r.phases.map((ph) => ph._extraKeys)))).filter((k) => !core.has(k));
  });

  /* ---------- progress state ---------- */

  function emptyState() { return { v: 1, items: {}, notes: {}, settings: {} }; }

  function normalize(src) {
    const out = emptyState();
    if (!src || typeof src !== "object") return out;
    ["items", "notes", "settings"].forEach((part) => {
      const map = src[part];
      if (!map || typeof map !== "object") return;
      Object.keys(map).forEach((k) => {
        const e = map[k];
        if (Array.isArray(e) && typeof e[1] === "number" && isFinite(e[1])) out[part][k] = e;
      });
    });
    return out;
  }

  function mergeMaps(a, b) {
    const out = Object.assign({}, a);
    Object.keys(b).forEach((k) => {
      if (!out[k] || b[k][1] > out[k][1]) out[k] = b[k];
    });
    return out;
  }

  function mergeState(a, b) {
    a = normalize(a);
    b = normalize(b);
    return {
      v: 1,
      items: mergeMaps(a.items, b.items),
      notes: mergeMaps(a.notes, b.notes),
      settings: mergeMaps(a.settings, b.settings)
    };
  }

  function canon(v) {
    if (Array.isArray(v)) return "[" + v.map(canon).join(",") + "]";
    if (v && typeof v === "object") {
      return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + canon(v[k])).join(",") + "}";
    }
    return JSON.stringify(v);
  }

  let state = normalize(safeParse(store.get(K.state)));

  const isDone = (key) => { const e = state.items[key]; return !!(e && e[0] === 1); };
  const isKnown = (key) => { const e = state.items[key]; return !!(e && e[0] === 1 && e[2] === 1); };

  function setItem(key, done, known) {
    state.items[key] = [done ? 1 : 0, Date.now(), done && known ? 1 : 0];
  }

  function getSetting(name, fallback) {
    const e = state.settings[name];
    return e ? e[0] : fallback;
  }

  function setSetting(name, value) { state.settings[name] = [value, Date.now()]; }

  function noteText(id) { const e = state.notes[id]; return e ? String(e[0] || "") : ""; }

  function commit() {
    if (!store.set(K.state, JSON.stringify(state))) {
      toast("This browser would not save your progress. Export a backup from Settings.");
    }
    scheduleSync();
  }

  let ui = Object.assign({ open: {}, hideDone: false, calibrate: false }, safeParse(store.get(K.ui)) || {});
  if (!ui.open || typeof ui.open !== "object") ui.open = {};
  function saveUi() { store.set(K.ui, JSON.stringify(ui)); }

  const focusLine = () => lineById[getSetting("focus", "")] || lines[0];

  function weeklyGoal() {
    const n = parseInt(getSetting("weeklyGoal", 10), 10);
    return n > 0 ? n : 10;
  }

  /* ---------- stats ---------- */

  function progress(keys) {
    let done = 0;
    for (let i = 0; i < keys.length; i++) if (isDone(keys[i])) done++;
    return { done, total: keys.length };
  }

  const pct = (p) => (p.total ? Math.floor((p.done / p.total) * 100) : 0);

  function phaseState(p) {
    if (!p.total || p.done === p.total) return "done";
    return p.done > 0 ? "partial" : "todo";
  }

  function startOfDay(ts) { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); }

  function startOfWeek(ts) {
    const d = new Date(startOfDay(ts));
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // weeks start on Monday
    return d.getTime();
  }

  function dayKey(ts) { const d = new Date(ts); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

  function daysBetween(a, b) { return Math.round((startOfDay(b) - startOfDay(a)) / DAY); }

  // New learning only: items marked as already known never count toward streaks or goals.
  function learnedEntries() {
    const out = [];
    Object.keys(state.items).forEach((k) => {
      const e = state.items[k];
      if (e[0] === 1 && e[2] !== 1) out.push(e[1]);
    });
    return out;
  }

  function activity() {
    const map = {};
    learnedEntries().forEach((ts) => { const k = dayKey(ts); map[k] = (map[k] || 0) + 1; });
    return map;
  }

  function streaks(act) {
    let cur = 0;
    const d = new Date(startOfDay(Date.now()));
    if (!act[dayKey(d.getTime())]) d.setDate(d.getDate() - 1);
    while (act[dayKey(d.getTime())]) { cur++; d.setDate(d.getDate() - 1); }
    let best = 0;
    let run = 0;
    let prev = null;
    Object.keys(act).sort().forEach((k) => {
      const parts = k.split("-").map(Number);
      const t = new Date(parts[0], parts[1] - 1, parts[2]).getTime();
      run = prev !== null && daysBetween(prev, t) === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = t;
    });
    return { cur, best: Math.max(best, cur) };
  }

  function countSince(ts) { return learnedEntries().filter((t) => t >= ts).length; }

  function lastActive() {
    const all = learnedEntries();
    return all.length ? Math.max.apply(null, all) : 0;
  }

  function level(n) {
    if (!n) return 0;
    if (n <= 2) return 1;
    if (n <= 5) return 2;
    if (n <= 9) return 3;
    return 4;
  }

  function paceText(r) {
    const since = Date.now() - PACE_DAYS * DAY;
    let recent = 0;
    let done = 0;
    r._keys.forEach((k) => {
      const e = state.items[k];
      if (e && e[0] === 1) {
        done++;
        if (e[2] !== 1 && e[1] >= since) recent++;
      }
    });
    const remaining = r._keys.length - done;
    if (!remaining) return "Every stop on this line is done.";
    const perWeek = recent / (PACE_DAYS / 7);
    if (!perWeek) return "No new items on this line in the last four weeks, so no finish date yet.";
    const eta = new Date(Date.now() + (remaining / perWeek) * 7 * DAY);
    const rate = perWeek >= 10 ? Math.round(perWeek) : Math.round(perWeek * 10) / 10;
    return "At your recent pace of " + rate + " a week, you reach the end around " +
      eta.toLocaleDateString(undefined, { month: "long", year: "numeric" }) + ".";
  }

  function lineReach(r) {
    // How far along the line, in order: full stops passed plus the share of the next phase.
    const n = r.phases.length;
    if (!n) return 0;
    let k = 0;
    while (k < n && phaseState(progress(r.phases[k]._keys)) === "done") k++;
    if (k >= n) return 1;
    if (n === 1 || k === 0) return 0;
    const p = progress(r.phases[k]._keys);
    return (k - 1 + (p.total ? p.done / p.total : 0)) / (n - 1);
  }

  function nextUp(r) {
    for (const ph of r.phases) {
      for (const tid of ph.topics) {
        const open = topicItems[tid].filter((it) => !isDone(it.key));
        if (open.length) return { kind: "topic", id: tid, phase: ph, items: open.slice(0, 3) };
      }
      for (const p of ph.projects) {
        const open = projectItems[p.id].filter((it) => !isDone(it.key));
        if (open.length) return { kind: "project", id: p.id, project: p, phase: ph, items: open.slice(0, 3) };
      }
    }
    return null;
  }

  /* ---------- rendering: shared pieces ---------- */

  const main = $("#main");
  const nav = $("#lines");

  function itemHTML(it) {
    const done = isDone(it.key);
    return '<li class="item" data-key="' + it.key + '" data-known="' + (isKnown(it.key) ? 1 : 0) + '">' +
      '<label><input type="checkbox" data-key="' + it.key + '"' + (done ? " checked" : "") + ">" +
      '<span class="item-text">' + esc(it.text) + '</span><span class="known-tag">known</span></label></li>';
  }

  function resLink(res) {
    return '<a href="' + esc(res[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(res[0]) + "</a>" +
      (res[2] ? ' <span class="kind">' + esc(res[2]) + "</span>" : "");
  }

  function notesHTML(id, placeholder) {
    const text = noteText(id);
    return '<div class="notes" hidden><label class="notes-label" for="note-' + esc(id) + '">Notes</label>' +
      '<textarea id="note-' + esc(id) + '" rows="3" data-note="' + esc(id) + '" placeholder="' + esc(placeholder) + '">' +
      esc(text) + "</textarea></div>";
  }

  function stateOf(p) { return p.total && p.done === p.total ? "done" : p.done > 0 ? "partial" : "todo"; }

  function sourceKind(url, fallback) {
    if (/youtube\.com\/results\?/.test(url)) return "YouTube search";
    if (/[?&]list=/.test(url)) return "playlist";
    if (/youtube\.com\/watch|youtu\.be\//.test(url)) return "video";
    return fallback || "";
  }

  // One clear pick per topic: the Hindi source when there is a good one, else the best English course.
  function learnHTML(t) {
    const res = t.res || [];
    const hi = Array.isArray(t.hi) && t.hi[1] ? t.hi : null;
    const main = hi || res[0];
    if (!main) return "";
    const next = hi ? res[0] : res[1];
    const rest = res.slice(hi ? 1 : 2);
    const kind = sourceKind(main[1], hi ? "" : main[2]);
    return '<div class="learn">' +
      '<a class="learn-main" href="' + esc(main[1]) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="learn-lang' + (hi ? "" : " is-en") + '">' + (hi ? "Hindi" : "English") + "</span>" +
        '<span class="learn-text"><span class="learn-title">' + esc(main[0]) + "</span>" +
          (hi && hi[2] ? '<span class="learn-note">' + esc(hi[2]) + "</span>" : "") + "</span>" +
        (kind ? '<span class="learn-kind">' + esc(kind) + "</span>" : "") +
      "</a>" +
      (next ? '<p class="learn-next">' + (hi ? "Go deeper in English: " : "Also good: ") + resLink(next) + "</p>" : "") +
      (rest.length ? '<details class="more"><summary>More resources (' + rest.length + ")</summary>" +
        '<ul class="res-more">' + rest.map((x) => "<li>" + resLink(x) + "</li>").join("") + "</ul></details>" : "") +
      "</div>";
  }

  function rowHTML(id, countKey, p, titleHTML) {
    return '<summary class="row"><span class="row-mark" aria-hidden="true"></span>' +
      '<span class="row-title">' + titleHTML + '</span><span class="here-tag">You are here</span>' +
      '<span class="count" data-count="' + countKey + '">' + p.done + "/" + p.total + "</span></summary>";
  }

  function topicHTML(tid, r, hereId, isExtra) {
    const t = topics[tid];
    const items = topicItems[tid];
    const p = progress(items.map((i) => i.key));
    const others = (topicLines[tid] || []).filter((id) => id !== r.id).map((id) => lineById[id]);
    const hasNote = !!noteText(tid).trim();
    const here = tid === hereId;
    const search = (t.title + " " + (t.subs || []).join(" ") + " " + (t.hi ? t.hi[0] : "") + " " +
      (t.res || []).map((x) => x[0]).join(" ")).toLowerCase();
    return '<details class="topic' + (isExtra ? " is-extra" : "") + (p.done === p.total ? " is-done" : "") + (here ? " is-here" : "") +
      '" id="topic-' + tid + '" data-state="' + stateOf(p) + '" data-search="' + esc(search) + '"' + (here ? " open" : "") + ">" +
      rowHTML(tid, "topic:" + tid, p, esc(t.title)) +
      '<div class="block-body">' +
        learnHTML(t) +
        '<ul class="items">' + items.map(itemHTML).join("") + "</ul>" +
        (t.tip ? '<p class="tip">' + esc(t.tip) + "</p>" : "") +
        '<div class="block-actions">' +
          (others.length ? '<span class="interchange">Also on ' + others.map((o) =>
            '<a class="badge badge-sm" ' + lineAttrs(o) + ' href="#/r/' + o.id + "/" + tid + '" title="' + esc(o.title) + '">' + esc(o.code) + "</a>").join("") + "</span>" : "") +
          '<button type="button" class="linkbtn" data-act="known-topic" data-topic="' + tid + '">Mark all as already known</button>' +
          '<button type="button" class="linkbtn" data-act="notes" aria-expanded="false">' + (hasNote ? "Notes (1)" : "Notes") + "</button>" +
        "</div>" +
        notesHTML(tid, "Your notes, repo links, what clicked") +
      "</div></details>";
  }

  function projectHTML(pr, hereId) {
    const items = projectItems[pr.id];
    const p = progress(items.map((i) => i.key));
    const hasNote = !!noteText(pr.id).trim();
    const here = pr.id === hereId;
    const search = (pr.title + " " + (pr.brief || "") + " " + (pr.done || []).join(" ") + " project").toLowerCase();
    return '<details class="project' + (p.done === p.total ? " is-done" : "") + (here ? " is-here" : "") + '" id="project-' + esc(pr.id) +
      '" data-state="' + stateOf(p) + '" data-search="' + esc(search) + '"' + (here ? " open" : "") + ">" +
      rowHTML(pr.id, "project:" + esc(pr.id), p, '<span class="tag">Project</span>' + esc(pr.title)) +
      '<div class="block-body">' +
        (pr.brief ? '<p class="brief">' + esc(pr.brief) + "</p>" : "") +
        '<p class="done-when">Done when</p>' +
        '<ul class="items">' + items.map(itemHTML).join("") + "</ul>" +
        '<div class="block-actions"><button type="button" class="linkbtn" data-act="notes" aria-expanded="false">' + (hasNote ? "Notes (1)" : "Notes") + "</button></div>" +
        notesHTML(pr.id, "Repo link, demo link, write-up link") +
      "</div></details>";
  }

  function calibBannerHTML() {
    return '<div class="calib" role="note"><p><strong>Calibration mode is on.</strong> Ticks are saved as things you already knew: they count toward progress, not toward streaks or the weekly goal.</p>' +
      '<button type="button" class="btn btn-invert" data-act="calibrate-off">Turn it off</button></div>';
  }

  /* ---------- rendering: navigation ---------- */

  function renderNav(rt) {
    const onToday = rt.view === "today";
    let html = '<a class="navlink navlink-today' + (onToday ? " is-current" : "") + '" href="#/"' + (onToday ? ' aria-current="page"' : "") + ">Today</a>";
    lines.forEach((r) => {
      const cur = rt.view === "line" && rt.line.id === r.id;
      html += '<a class="navlink' + (cur ? " is-current" : "") + '" href="#/r/' + r.id + '" title="' + esc(r.title) + '"' +
        (cur ? ' aria-current="page"' : "") + " " + lineAttrs(r) + ">" +
        '<span class="badge">' + esc(r.code) + '</span><span class="navlink-name">' + esc(r.title) + "</span></a>";
    });
    nav.innerHTML = html;
    const current = $(".navlink.is-current", nav);
    if (current && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = Math.max(0, current.offsetLeft - nav.offsetLeft - 16);
  }

  /* ---------- rendering: today ---------- */

  function nextStopHTML(r) {
    const nu = nextUp(r);
    const picker = '<label class="ns-switch">Focus line <select data-act="set-focus">' +
      lines.map((l) => '<option value="' + l.id + '"' + (l.id === r.id ? " selected" : "") + ">" + esc(l.title) + "</option>").join("") +
      "</select></label>";
    if (!nu) {
      return '<section class="nextstop" aria-labelledby="ns-title">' +
        '<p class="ns-context"><span class="badge">' + esc(r.code) + "</span><span>" + esc(r.title) + " line</span></p>" +
        '<h1 class="ns-title" id="ns-title">End of the line</h1>' +
        '<p class="ns-lede">Every stop on this line is ticked. Pick another focus line below.</p>' +
        '<div class="ns-foot">' + picker + "</div></section>";
    }
    const title = nu.kind === "topic" ? topics[nu.id].title : nu.project.title;
    const t = nu.kind === "topic" ? topics[nu.id] : null;
    const hi = t && Array.isArray(t.hi) && t.hi[1] ? t.hi : null;
    const first = t ? (t.res || [])[0] : null;
    const learn = hi
      ? '<p class="ns-res"><span class="learn-lang">Hindi</span> ' + resLink([hi[0], hi[1], sourceKind(hi[1])]) +
        (hi[2] ? '<span class="ns-note">' + esc(hi[2]) + "</span>" : "") + "</p>"
      : first ? '<p class="ns-res">Start with ' + resLink(first) + "</p>"
      : '<p class="ns-res">' + esc((nu.project && nu.project.brief) || "") + "</p>";
    return '<section class="nextstop" aria-labelledby="ns-title">' +
      '<p class="ns-context"><span class="badge">' + esc(r.code) + "</span><span>Next stop on the " + esc(r.title) +
        " line. Phase " + (nu.phase._index + 1) + " of " + r.phases.length + ": " + esc(nu.phase.title) + "</span></p>" +
      '<h1 class="ns-title" id="ns-title">' + (nu.kind === "project" ? '<span class="tag tag-lg">Project</span>' : "") + esc(title) + "</h1>" +
      '<ul class="items ns-items">' + nu.items.map(itemHTML).join("") + "</ul>" +
      learn +
      '<div class="ns-foot"><a class="btn btn-solid" href="#/r/' + r.id + "/" + esc(nu.id) + '">Open this stop</a>' + picker + "</div>" +
      "</section>";
  }

  function onboardingHTML(r) {
    return '<section class="onboard" aria-labelledby="onboard-title"><h2 id="onboard-title">First time here?</h2>' +
      "<p>Do a calibration pass before anything else. Open each line, switch on calibration mode, and tick only what you can explain and implement without notes. " +
      "Those ticks are stored as prior knowledge, so the roadmap starts at your real level and your streak stays honest.</p>" +
      '<button type="button" class="btn" data-act="start-calibration" data-line="' + r.id + '">Calibrate the ' + esc(r.title) + " line</button></section>";
  }

  function nudgeText(last) {
    if (!last) return "Start small: one item from the next stop is a good first day.";
    const days = daysBetween(last, Date.now());
    if (days <= 0) {
      const n = countSince(startOfDay(Date.now()));
      return plural(n, "item", "items") + " today. Stopping here is fine; coming back tomorrow is what counts.";
    }
    if (days === 1) return "Yesterday counted. One item today keeps the chain going.";
    return "It has been " + days + " days. Pick the smallest item on the next stop and do only that.";
  }

  function lastLabel(last) {
    if (!last) return "Not yet";
    const days = daysBetween(last, Date.now());
    if (days <= 0) return "Today";
    if (days === 1) return "Yesterday";
    return days + " days ago";
  }

  function pulseHTML(act) {
    const goal = weeklyGoal();
    const week = countSince(startOfWeek(Date.now()));
    const st = streaks(act);
    const last = lastActive();
    const width = Math.min(100, Math.round((week / goal) * 100));
    return '<section class="pulse" aria-label="Consistency">' +
      '<div class="pulse-item"><h2>This week</h2><p><strong>' + week + "</strong> of " + goal + " items</p>" +
        '<p class="pulse-sub">' + (week >= goal ? "Goal met" : plural(goal - week, "item", "items") + " to go") + "</p>" +
        '<div class="meter" aria-hidden="true"><span style="width:' + width + '%"></span></div></div>' +
      '<div class="pulse-item"><h2>Streak</h2><p><strong>' + st.cur + "</strong> " + (st.cur === 1 ? "day" : "days") + '</p><p class="pulse-sub">Best: ' + plural(st.best, "day", "days") + "</p></div>" +
      '<div class="pulse-item"><h2>Last active</h2><p class="pulse-when">' + lastLabel(last) + "</p></div>" +
      "</section>" +
      '<p class="nudge">' + esc(nudgeText(last)) + "</p>";
  }

  function heatHTML(act) {
    const today = startOfDay(Date.now());
    const first = new Date(startOfWeek(Date.now()));
    first.setDate(first.getDate() - (HEAT_WEEKS - 1) * 7);
    const cells = [];
    const months = [];
    let total = 0;
    let prevMonth = -1;
    const weekStarts = [];
    for (let w = 0; w < HEAT_WEEKS; w++) {
      const ws = new Date(first);
      ws.setDate(first.getDate() + w * 7);
      weekStarts.push(ws);
    }
    let lastLabel = -9;
    for (let w = 0; w < HEAT_WEEKS; w++) {
      const weekStart = weekStarts[w];
      const m = weekStart.getMonth();
      // Label a column where a month begins, only if that month still owns the next two columns
      // and the previous label is far enough away, so short labels never overlap.
      const begins = m !== prevMonth;
      const roomy = w + 2 >= HEAT_WEEKS || weekStarts[w + 2].getMonth() === m;
      const label = begins && roomy && w - lastLabel >= 3;
      if (label) lastLabel = w;
      months.push("<span>" + (label ? esc(weekStart.toLocaleDateString(undefined, { month: "short" })) : "") + "</span>");
      prevMonth = m;
      for (let d = 0; d < 7; d++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + d);
        const t = day.getTime();
        if (t > today) { cells.push('<span class="cell is-future"></span>'); continue; }
        const n = act[dayKey(t)] || 0;
        total += n;
        cells.push('<span class="cell" data-l="' + level(n) + '" title="' +
          esc(plural(n, "item", "items") + ", " + day.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })) + '"></span>');
      }
    }
    return '<section class="heat" aria-labelledby="heat-title">' +
      '<h2 id="heat-title">Last 26 weeks</h2>' +
      '<div class="heat-scroll"><div class="heat-months" aria-hidden="true">' + months.join("") + "</div>" +
      '<div class="heat-grid" role="img" aria-label="' + esc(plural(total, "item", "items") + " learned in the last 26 weeks") + '">' + cells.join("") + "</div></div>" +
      '<p class="heat-legend"><span>Items a day</span>' +
        [["1", 1], ["3", 2], ["6", 3], ["10+", 4]].map((x) => '<span class="legend-step"><span class="cell" data-l="' + x[1] + '"></span>' + x[0] + "</span>").join("") +
      '<span class="heat-note">Items marked as already known are not counted.</span></p>' +
      "</section>";
  }

  function netLineHTML(r) {
    const p = progress(r._keys);
    const n = r.phases.length;
    const stops = r.phases.map((ph, i) => {
      const left = n > 1 ? (i / (n - 1)) * 100 : 0;
      return '<span class="net-stop" data-state="' + phaseState(progress(ph._keys)) + '" style="left:' + left.toFixed(2) + '%" title="' +
        esc("Phase " + (i + 1) + ": " + ph.title) + '"></span>';
    }).join("");
    return '<li class="net-line" ' + lineAttrs(r) + ">" +
      '<a class="net-name" href="#/r/' + r.id + '"><span class="badge">' + esc(r.code) + "</span><span>" + esc(r.title) + "</span></a>" +
      '<div class="net-track" aria-hidden="true"><span class="net-fill" style="width:' + (lineReach(r) * 100).toFixed(2) + '%"></span>' + stops + "</div>" +
      '<p class="net-meta"><strong>' + pct(p) + "%</strong> done, " + p.done + " of " + p.total + " items. " + esc(paceText(r)) + "</p>" +
      "</li>";
  }

  function networkHTML() {
    const shared = Object.keys(topicLines).filter((t) => topicLines[t].length > 1).length;
    return '<section class="network" aria-labelledby="net-title"><h2 id="net-title">All lines</h2>' +
      '<ol class="net-lines">' + lines.map(netLineHTML).join("") + "</ol>" +
      '<p class="net-note">' + shared + " topics are interchanges shared by two or more lines. Tick them once and they count on every line.</p>" +
      "</section>";
  }

  function todayHTML() {
    const focus = focusLine();
    const act = activity();
    const anyTicks = Object.keys(state.items).some((k) => state.items[k][0] === 1);
    return '<div class="today" ' + lineAttrs(focus) + ">" +
      (ui.calibrate ? calibBannerHTML() : "") +
      nextStopHTML(focus) +
      (anyTicks ? "" : onboardingHTML(focus)) +
      pulseHTML(act) +
      heatHTML(act) +
      networkHTML() +
      (token() ? "" : '<p class="aside">Progress is saved in this browser only. <button type="button" class="linkbtn" data-act="open-settings">Connect GitHub</button> to see it on every device.</p>') +
      "</div>";
  }

  /* ---------- rendering: a line ---------- */

  function defaultOpen(r) {
    const i = r.phases.findIndex((ph) => phaseState(progress(ph._keys)) !== "done");
    return [i < 0 ? 0 : i];
  }

  function openList(r) { return Array.isArray(ui.open[r.id]) ? ui.open[r.id] : defaultOpen(r); }

  function phaseHTML(r, ph, i, openSet, hereId) {
    const p = progress(ph._keys);
    const x = progress(ph._extraKeys);
    return '<li class="station" data-state="' + phaseState(p) + '">' +
      "<details" + (openSet.has(i) ? " open" : "") + ' data-line-id="' + r.id + '" data-idx="' + i + '">' +
      '<summary><span class="stop" aria-hidden="true"></span><span class="st-num">Phase ' + (i + 1) + "</span>" +
        '<span class="st-title">' + esc(ph.title) + '</span><span class="st-count" data-count="phase:' + r.id + ":" + i + '">' + p.done + " of " + p.total + "</span></summary>" +
      '<div class="st-body">' + (ph.note ? '<p class="st-note">' + esc(ph.note) + "</p>" : "") +
        ph.topics.map((tid) => topicHTML(tid, r, hereId, false)).join("") +
        ph.projects.map((pr) => projectHTML(pr, hereId)).join("") +
        (ph.extra.length ? '<div class="extras"><p class="extras-label">Extra, when you have time ' +
          '<span class="extras-count" data-count="xphase:' + r.id + ":" + i + '">' + x.done + " of " + x.total + "</span></p>" +
          ph.extra.map((tid) => topicHTML(tid, r, hereId, true)).join("") + "</div>" : "") +
      "</div></details></li>";
  }

  function lineHTML(r) {
    const p = progress(r._keys);
    const x = progress(r._extraKeys);
    const isFocus = focusLine().id === r.id;
    const nu = nextUp(r);
    const hereId = nu ? nu.id : "";
    const openSet = new Set(openList(r));
    if (nu) openSet.add(nu.phase._index);
    return '<div class="line-view' + (ui.hideDone ? " hide-done" : "") + '" ' + lineAttrs(r) + ">" +
      (ui.calibrate ? calibBannerHTML() : "") +
      '<header class="line-head">' +
        '<span class="badge badge-lg">' + esc(r.code) + "</span>" +
        '<div class="line-head-text"><h1>' + esc(r.title) + "</h1>" + (r.summary ? '<p class="line-summary">' + esc(r.summary) + "</p>" : "") + "</div>" +
        '<div class="line-head-progress">' +
          '<p class="line-pct"><strong data-pct="' + r.id + '">' + pct(p) + '%</strong> <span data-count="line:' + r.id + '">' + p.done + " of " + p.total + " items</span></p>" +
          '<div class="meter" aria-hidden="true"><span data-bar="' + r.id + '" style="width:' + pct(p) + '%"></span></div>' +
          '<p class="line-pace" data-pace="' + r.id + '">' + esc(paceText(r)) + "</p>" +
          (x.total ? '<p class="line-extra">Extras, not counted above: <span data-count="xline:' + r.id + '">' + x.done + " of " + x.total + "</span></p>" : "") +
          (isFocus ? '<p class="focus-flag">Your focus line</p>' : '<button type="button" class="btn" data-act="focus" data-line="' + r.id + '">Make this my focus</button>') +
        "</div>" +
      "</header>" +
      '<div class="toolbar">' +
        (nu ? '<button type="button" class="btn btn-solid btn-sm" data-act="go-here">Go to my stop</button>' : "") +
        '<input type="search" class="filter" data-act="filter" placeholder="Filter topics and projects" aria-label="Filter topics and projects">' +
        '<label class="toggle"><input type="checkbox" data-act="hide-done"' + (ui.hideDone ? " checked" : "") + "> Hide finished</label>" +
        '<label class="toggle"><input type="checkbox" data-act="calibrate"' + (ui.calibrate ? " checked" : "") + "> Calibration mode</label>" +
        '<span class="toolbar-btns"><button type="button" class="linkbtn" data-act="expand">Open all phases</button><button type="button" class="linkbtn" data-act="collapse">Close all</button></span>' +
      "</div>" +
      '<p class="filter-empty" hidden>Nothing on this line matches that filter.</p>' +
      '<ol class="stations">' + r.phases.map((ph, i) => phaseHTML(r, ph, i, openSet, hereId)).join("") + "</ol>" +
      "</div>";
  }

  /* ---------- rendering: router ---------- */

  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    if (parts[0] === "r" && lineById[parts[1]]) return { view: "line", line: lineById[parts[1]], target: parts[2] || "" };
    return { view: "today" };
  }

  let lastViewKey = "";

  function render() {
    const rt = route();
    renderNav(rt);
    const viewKey = rt.view === "line" ? "line:" + rt.line.id : "today";
    if (rt.view === "line") {
      main.innerHTML = lineHTML(rt.line);
      document.title = rt.line.title + " | Roadmaps";
      if (rt.target) revealTarget(rt.target);
      else if (viewKey !== lastViewKey) window.scrollTo(0, 0);
    } else {
      main.innerHTML = todayHTML();
      document.title = "Today | Roadmaps";
      const heat = $(".heat-scroll", main);
      if (heat) heat.scrollLeft = heat.scrollWidth;
      if (viewKey !== lastViewKey) window.scrollTo(0, 0);
    }
    lastViewKey = viewKey;
  }

  function revealEl(el) {
    const station = el.closest(".station");
    const phase = station && station.querySelector("details");
    if (phase && !phase.open) phase.open = true;
    if (el.tagName === "DETAILS" && !el.open) el.open = true;
    requestAnimationFrame(() => {
      if (el.scrollIntoView) el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 1800);
    });
  }

  function revealTarget(id) {
    const el = document.getElementById("topic-" + id) || document.getElementById("project-" + id);
    if (el) revealEl(el);
  }

  // Exactly one block on a line page is marked "You are here": the next unticked core stop.
  function markHere() {
    const rt = route();
    if (rt.view !== "line") return null;
    const nu = nextUp(rt.line);
    const id = nu ? (nu.kind === "topic" ? "topic-" : "project-") + nu.id : "";
    $$(".is-here", main).forEach((el) => { if (el.id !== id) el.classList.remove("is-here"); });
    const el = id ? document.getElementById(id) : null;
    if (el) el.classList.add("is-here");
    return el;
  }

  function keysFor(kind, a, b) {
    if (kind === "topic" && topicItems[a]) return topicItems[a].map((i) => i.key);
    if (kind === "project" && projectItems[a]) return projectItems[a].map((i) => i.key);
    const r = lineById[a];
    if (!r) return [];
    if (kind === "phase") return r.phases[+b]._keys;
    if (kind === "xphase") return r.phases[+b]._extraKeys;
    if (kind === "line") return r._keys;
    if (kind === "xline") return r._extraKeys;
    return [];
  }

  function refreshCounts() {
    $$("[data-count]").forEach((el) => {
      const parts = el.getAttribute("data-count").split(":");
      const p = progress(keysFor(parts[0], parts[1], parts[2]));
      if (parts[0] === "topic" || parts[0] === "project") {
        el.textContent = p.done + "/" + p.total;
        const block = el.closest(".topic, .project");
        if (block) {
          block.classList.toggle("is-done", p.done === p.total);
          block.setAttribute("data-state", stateOf(p));
        }
      } else if (parts[0] === "phase") {
        el.textContent = p.done + " of " + p.total;
        const st = el.closest(".station");
        if (st) st.setAttribute("data-state", phaseState(p));
      } else if (parts[0] === "line") {
        el.textContent = p.done + " of " + p.total + " items";
      } else {
        el.textContent = p.done + " of " + p.total;
      }
    });
    $$("[data-pct]").forEach((el) => {
      const r = lineById[el.getAttribute("data-pct")];
      if (r) el.textContent = pct(progress(r._keys)) + "%";
    });
    $$("[data-bar]").forEach((el) => {
      const r = lineById[el.getAttribute("data-bar")];
      if (r) el.style.width = pct(progress(r._keys)) + "%";
    });
    $$("[data-pace]").forEach((el) => {
      const r = lineById[el.getAttribute("data-pace")];
      if (r) el.textContent = paceText(r);
    });
    $$("li.item").forEach((li) => li.setAttribute("data-known", isKnown(li.getAttribute("data-key")) ? "1" : "0"));
    $$("input[data-key]").forEach((input) => { input.checked = isDone(input.getAttribute("data-key")); });
    markHere();
  }

  function refreshNotes() {
    $$("textarea[data-note]").forEach((ta) => {
      if (document.activeElement !== ta) ta.value = noteText(ta.getAttribute("data-note"));
    });
  }

  function applyFilter(query) {
    const view = $(".line-view");
    if (!view) return;
    const q = query.trim().toLowerCase();
    let any = false;
    $$(".station", view).forEach((st) => {
      let hits = 0;
      $$(".topic, .project", st).forEach((block) => {
        const match = !q || block.getAttribute("data-search").indexOf(q) >= 0;
        block.hidden = !match;
        if (match) hits++;
      });
      st.hidden = !!q && !hits;
      if (q && hits) $("details", st).open = true;
      if (hits) any = true;
    });
    const empty = $(".filter-empty", view);
    if (empty) empty.hidden = !q || any;
    if (!q) {
      const r = route().line;
      if (r) {
        const openSet = new Set(openList(r));
        $$("details[data-idx]", view).forEach((d) => { d.open = openSet.has(+d.getAttribute("data-idx")); });
      }
    }
  }

  /* ---------- events ---------- */

  let todayTimer = 0;

  function onItemChange(input) {
    const key = input.getAttribute("data-key");
    const done = input.checked;
    setItem(key, done, ui.calibrate);
    commit();
    if (route().view === "today") {
      const li = input.closest(".item");
      if (li && done) li.classList.add("is-leaving");
      clearTimeout(todayTimer);
      todayTimer = setTimeout(render, done && !reducedMotion() ? 450 : 0);
    } else {
      const before = $(".is-here", main);
      refreshCounts();
      const after = $(".is-here", main);
      if (done && before && after && before !== after && before.classList.contains("is-done")) {
        before.open = false;
        const station = after.closest(".station");
        const phase = station && station.querySelector("details");
        if (phase && !phase.open) phase.open = true;
        after.open = true;
      }
    }
  }

  function markTopicKnown(tid) {
    let n = 0;
    topicItems[tid].forEach((it) => {
      if (!isDone(it.key)) { setItem(it.key, true, true); n++; }
    });
    if (!n) { toast("Everything in this topic is already ticked."); return; }
    commit();
    refreshCounts();
    toast("Marked " + plural(n, "item", "items") + " as already known.");
  }

  const noteTimers = {};
  function onNoteInput(ta) {
    const id = ta.getAttribute("data-note");
    clearTimeout(noteTimers[id]);
    noteTimers[id] = setTimeout(() => {
      state.notes[id] = [ta.value, Date.now()];
      commit();
      const block = ta.closest(".topic, .project");
      const btn = block && $('[data-act="notes"]', block);
      if (btn) btn.textContent = ta.value.trim() ? "Notes (1)" : "Notes";
    }, 600);
  }

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.matches("input[type=checkbox][data-key]")) { onItemChange(t); return; }
    const act = t.getAttribute("data-act");
    if (act === "hide-done") {
      ui.hideDone = t.checked;
      saveUi();
      const view = $(".line-view");
      if (view) view.classList.toggle("hide-done", ui.hideDone);
    } else if (act === "calibrate") {
      ui.calibrate = t.checked;
      saveUi();
      render();
      toast(ui.calibrate ? "Calibration mode on. Ticks now count as prior knowledge." : "Calibration mode off.");
    } else if (act === "set-focus") {
      setSetting("focus", t.value);
      commit();
      render();
    } else if (act === "weekly-goal") {
      const n = parseInt(t.value, 10);
      if (n > 0 && n <= 500) {
        setSetting("weeklyGoal", n);
        commit();
        if (route().view === "today") render();
      } else {
        t.value = weeklyGoal();
      }
    } else if (act === "theme") {
      applyTheme(t.value);
    } else if (act === "import") {
      importFile(t);
    }
  });

  document.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.matches("textarea[data-note]")) onNoteInput(t);
    else if (t.getAttribute("data-act") === "filter") applyFilter(t.value);
  });

  document.addEventListener("click", (e) => {
    const el = e.target instanceof Element ? e.target.closest("[data-act]") : null;
    if (!el || el.matches("input, select")) return;
    const act = el.getAttribute("data-act");
    switch (act) {
      case "open-settings": openSettings(); break;
      case "close-settings": closeSettings(); break;
      case "focus":
        setSetting("focus", el.getAttribute("data-line"));
        commit();
        render();
        toast(lineById[el.getAttribute("data-line")].title + " is now your focus line.");
        break;
      case "known-topic": markTopicKnown(el.getAttribute("data-topic")); break;
      case "go-here": {
        const here = markHere();
        if (here) revealEl(here);
        break;
      }
      case "notes": {
        const block = el.closest(".topic, .project");
        const box = block && $(".notes", block);
        if (!box) break;
        box.hidden = !box.hidden;
        el.setAttribute("aria-expanded", String(!box.hidden));
        if (!box.hidden) $("textarea", box).focus();
        break;
      }
      case "expand":
      case "collapse":
        $$(".line-view details[data-idx]").forEach((d) => { d.open = act === "expand"; });
        break;
      case "calibrate-off":
        ui.calibrate = false;
        saveUi();
        render();
        toast("Calibration mode off.");
        break;
      case "start-calibration":
        ui.calibrate = true;
        saveUi();
        location.hash = "#/r/" + el.getAttribute("data-line");
        break;
      case "connect": {
        const input = $("#gh-token");
        const value = input ? input.value.trim() : "";
        if (!value) { toast("Paste a token first."); break; }
        connect(value);
        break;
      }
      case "sync-now": runSync("manual"); break;
      case "disconnect": disconnect(); break;
      case "export": exportState(); break;
      case "reset": resetAll(); break;
      default: break;
    }
  });

  // <details> toggle events do not bubble, so listen during capture.
  main.addEventListener("toggle", (e) => {
    const d = e.target;
    if (!(d instanceof HTMLElement) || d.tagName !== "DETAILS" || !d.hasAttribute("data-idx")) return;
    const filter = $(".filter");
    if (filter && filter.value.trim()) return;
    const r = lineById[d.getAttribute("data-line-id")];
    if (!r) return;
    const current = openList(r);
    const set = new Set(current);
    const idx = +d.getAttribute("data-idx");
    if (d.open) set.add(idx); else set.delete(idx);
    const next = Array.from(set).sort((a, b) => a - b);
    // Rendering fires toggle events too; only remember choices that differ from what is shown.
    if (next.join(",") === current.slice().sort((a, b) => a - b).join(",")) return;
    ui.open[r.id] = next;
    saveUi();
  }, true);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    const filter = $(".filter");
    if (filter) { e.preventDefault(); filter.focus(); }
  });

  window.addEventListener("hashchange", () => {
    render();
    try { main.focus({ preventScroll: true }); } catch (err) { main.focus(); }
  });

  /* ---------- settings ---------- */

  const dlg = $("#settings");

  function syncDetailHTML() {
    if (!token()) return "Not connected. Progress is saved in this browser only.";
    const login = store.get(K.login);
    const gist = store.get(K.gist);
    let text = "Connected" + (login ? " as " + esc(login) : "") + ". ";
    if (sync.status === "syncing") text += "Syncing now.";
    else if (sync.status === "error") text += "Last sync failed: " + esc(sync.error);
    else if (sync.at) text += "Last synced " + ago(sync.at) + ".";
    else text += "Not synced yet on this visit.";
    if (gist) text += ' <a href="https://gist.github.com/' + esc(gist) + '" target="_blank" rel="noopener noreferrer">View the gist</a>';
    return text;
  }

  function settingsHTML() {
    const connected = !!token();
    const theme = store.get(K.theme) || "";
    return '<div class="settings">' +
      '<header class="settings-head"><h2 id="settings-title">Settings</h2><button type="button" class="btn btn-quiet" data-act="close-settings">Close</button></header>' +

      '<section class="settings-sec"><h3>Sync across devices</h3>' +
        "<p>Progress lives in this browser. To use it on your phone and laptop, connect a GitHub token that has only the gist scope. " +
        "Progress is kept in one secret gist in your account, and each device merges changes item by item.</p>" +
        '<p class="settings-detail" id="sync-detail">' + syncDetailHTML() + "</p>" +
        (connected
          ? '<div class="btn-row"><button type="button" class="btn btn-solid" data-act="sync-now">Sync now</button><button type="button" class="btn" data-act="disconnect">Disconnect this device</button></div>'
          : '<label class="field"><span>GitHub token</span><input type="password" id="gh-token" autocomplete="off" spellcheck="false" placeholder="ghp_..."></label>' +
            '<div class="btn-row"><button type="button" class="btn btn-solid" data-act="connect">Connect and sync</button>' +
            '<a class="btn" href="https://github.com/settings/tokens/new?scopes=gist&amp;description=roadmaps-sync" target="_blank" rel="noopener noreferrer">Create a token</a></div>' +
            '<p class="settings-fine">The token is stored in this browser only and is sent only to api.github.com. Use a token limited to the gist scope.</p>') +
      "</section>" +

      '<section class="settings-sec"><h3>Weekly goal</h3>' +
        '<label class="field field-inline"><span>Items a week</span><input type="number" min="1" max="500" step="1" data-act="weekly-goal" value="' + weeklyGoal() + '"></label>' +
        '<p class="settings-fine">Pick a number you can hit in a bad week. Consistency beats intensity.</p>' +
      "</section>" +

      '<section class="settings-sec"><h3>Appearance</h3>' +
        '<label class="field field-inline"><span>Theme</span><select data-act="theme">' +
          '<option value=""' + (theme === "" ? " selected" : "") + ">Match the system</option>" +
          '<option value="light"' + (theme === "light" ? " selected" : "") + ">Light</option>" +
          '<option value="dark"' + (theme === "dark" ? " selected" : "") + ">Dark</option>" +
        "</select></label>" +
      "</section>" +

      '<section class="settings-sec"><h3>Backup</h3>' +
        '<div class="btn-row"><button type="button" class="btn" data-act="export">Export progress</button>' +
        '<label class="btn file-btn">Import progress<input type="file" accept="application/json,.json" data-act="import"></label></div>' +
        '<p class="settings-fine">Import merges with what is already here; newer entries win.</p>' +
      "</section>" +

      '<section class="settings-sec settings-danger"><h3>Start over</h3>' +
        "<p>Unticks every item, here and on your other devices after they sync. Notes stay.</p>" +
        '<button type="button" class="btn btn-danger" data-act="reset">Untick everything</button>' +
      "</section>" +
      "</div>";
  }

  function openSettings() {
    dlg.innerHTML = settingsHTML();
    if (typeof dlg.showModal === "function") {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
  }

  function closeSettings() {
    if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  }

  function refreshSettings() {
    if (dlg.open || dlg.hasAttribute("open")) dlg.innerHTML = settingsHTML();
  }

  if (dlg) {
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeSettings(); });
  }

  function applyTheme(value) {
    if (value === "light" || value === "dark") {
      document.documentElement.setAttribute("data-theme", value);
      store.set(K.theme, value);
    } else {
      document.documentElement.removeAttribute("data-theme");
      store.remove(K.theme);
    }
  }

  function exportState() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "roadmaps-progress-" + dayKey(Date.now()) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  function importFile(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = safeParse(String(reader.result || ""));
      if (!data || typeof data !== "object" || (!data.items && !data.notes)) {
        toast("That file does not look like a progress export.");
        return;
      }
      state = mergeState(state, data);
      commit();
      render();
      toast("Imported and merged.");
    };
    reader.onerror = () => toast("Could not read that file.");
    reader.readAsText(file);
    input.value = "";
  }

  function resetAll() {
    if (!window.confirm("Untick every item on every line? Notes are kept. This cannot be undone.")) return;
    const now = Date.now();
    Object.keys(state.items).forEach((k) => { if (state.items[k][0] === 1) state.items[k] = [0, now, 0]; });
    commit();
    render();
    toast("Everything is unticked.");
  }

  /* ---------- toast ---------- */

  let toastTimer = 0;
  function toast(message) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-shown"), 3600);
  }

  /* ---------- GitHub Gist sync ---------- */

  const sync = { busy: false, queued: false, timer: 0, status: "local", at: 0, error: "" };

  function token() { return store.get(K.token) || ""; }

  function ago(ts) {
    const s = Math.round((Date.now() - ts) / 1000);
    if (s < 45) return "just now";
    const m = Math.round(s / 60);
    if (m < 60) return m + " min ago";
    const h = Math.round(m / 60);
    if (h < 24) return h + " h ago";
    return Math.round(h / 24) + " d ago";
  }

  function ghMessage(status) {
    if (status === 401) return "GitHub rejected the token. It may be wrong, expired or revoked.";
    if (status === 403) return "GitHub refused the request. The token may lack the gist scope, or the rate limit was hit.";
    if (status === 404) return "GitHub could not find the gist. The token may lack the gist scope.";
    if (status === 422) return "GitHub could not process the request.";
    return "GitHub returned an error (" + status + ").";
  }

  async function gh(path, options) {
    const opts = options || {};
    let res;
    try {
      res = await fetch(API + path, {
        method: opts.method || "GET",
        headers: Object.assign(
          { Accept: "application/vnd.github+json", Authorization: "Bearer " + token() },
          opts.body ? { "Content-Type": "application/json" } : {}
        ),
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        cache: "no-store"
      });
    } catch (err) {
      throw new Error("Could not reach GitHub. Check your connection.");
    }
    if (!res.ok) {
      const error = new Error(ghMessage(res.status));
      error.status = res.status;
      throw error;
    }
    return res.status === 204 ? null : res.json();
  }

  async function findOrCreateGist() {
    for (let page = 1; page <= 10; page++) {
      const list = await gh("/gists?per_page=100&page=" + page);
      const hit = (list || []).find((g) => g.files && g.files[GIST_FILE]);
      if (hit) return hit.id;
      if (!list || list.length < 100) break;
    }
    const files = {};
    files[GIST_FILE] = { content: JSON.stringify(state) };
    const created = await gh("/gists", {
      method: "POST",
      body: { description: "Roadmaps progress, synced by " + location.host + location.pathname, public: false, files }
    });
    return created.id;
  }

  async function readGist(id) {
    const gist = await gh("/gists/" + encodeURIComponent(id));
    const file = gist && gist.files ? gist.files[GIST_FILE] : null;
    if (!file) return { exists: false, remote: emptyState() };
    let text = file.content || "";
    if (file.truncated && file.raw_url) {
      const raw = await fetch(file.raw_url, { cache: "no-store" });
      text = await raw.text();
    }
    return { exists: true, remote: normalize(safeParse(text)) };
  }

  function setSyncStatus(status) {
    sync.status = status;
    const btn = $("#sync-status");
    if (btn) {
      let label = "Saved on this device";
      if (token()) {
        if (status === "pending") label = "Changes waiting to sync";
        else if (status === "syncing") label = "Syncing";
        else if (status === "error") label = "Sync failed";
        else if (status === "synced" && sync.at) label = "Synced " + ago(sync.at);
        else label = "Sync connected";
      }
      btn.setAttribute("data-status", token() ? status : "local");
      $(".sync-text", btn).textContent = label;
      btn.setAttribute("aria-label", label + ". Open settings");
    }
    const detail = $("#sync-detail");
    if (detail) detail.innerHTML = syncDetailHTML();
  }

  function scheduleSync() {
    if (!token()) return;
    clearTimeout(sync.timer);
    setSyncStatus("pending");
    sync.timer = setTimeout(() => runSync("edit"), 2000);
  }

  function onRemoteChange() {
    if (route().view === "line") {
      refreshCounts();
      refreshNotes();
      renderNav(route());
    } else if (!$(".today .is-leaving")) {
      render();
    }
  }

  async function runSync(reason) {
    if (!token()) { setSyncStatus("local"); return; }
    if (sync.busy) { sync.queued = true; return; }
    sync.busy = true;
    clearTimeout(sync.timer);
    setSyncStatus("syncing");
    try {
      let id = store.get(K.gist);
      if (!id) { id = await findOrCreateGist(); store.set(K.gist, id); }
      let read;
      try {
        read = await readGist(id);
      } catch (err) {
        if (err.status !== 404) throw err;
        store.remove(K.gist);
        id = await findOrCreateGist();
        store.set(K.gist, id);
        read = await readGist(id);
      }
      const before = canon(state);
      const merged = mergeState(state, read.remote);
      const mergedCanon = canon(merged);
      if (mergedCanon !== before) {
        state = merged;
        store.set(K.state, JSON.stringify(state));
        onRemoteChange();
      }
      if (!read.exists || mergedCanon !== canon(read.remote)) {
        const files = {};
        files[GIST_FILE] = { content: JSON.stringify(state) };
        await gh("/gists/" + encodeURIComponent(id), { method: "PATCH", body: { files } });
      }
      sync.at = Date.now();
      sync.error = "";
      setSyncStatus("synced");
    } catch (err) {
      sync.error = err && err.message ? err.message : "Sync failed.";
      setSyncStatus("error");
      if (reason === "manual") toast(sync.error);
    } finally {
      sync.busy = false;
      if (sync.queued) { sync.queued = false; runSync("queued"); }
    }
  }

  async function connect(value) {
    const previous = token();
    store.set(K.token, value);
    try {
      const me = await gh("/user");
      store.set(K.login, (me && me.login) || "");
      store.remove(K.gist);
      await runSync("connect");
      toast(sync.status === "error" ? "Connected, but the first sync failed: " + sync.error : "Connected. Progress now syncs to a secret gist.");
    } catch (err) {
      if (previous) store.set(K.token, previous); else store.remove(K.token);
      setSyncStatus(previous ? sync.status : "local");
      toast(err.status === 401 ? "GitHub rejected that token. Check it and try again." : err.message);
    }
    refreshSettings();
    if (route().view === "today") render();
  }

  function disconnect() {
    if (!window.confirm("Disconnect this device? Progress stays in this browser and in your gist.")) return;
    clearTimeout(sync.timer);
    store.remove(K.token);
    store.remove(K.gist);
    store.remove(K.login);
    sync.at = 0;
    sync.error = "";
    setSyncStatus("local");
    refreshSettings();
    if (route().view === "today") render();
    toast("This device is disconnected.");
  }

  document.addEventListener("visibilitychange", () => {
    if (!token()) return;
    if (document.visibilityState === "hidden") {
      if (sync.status === "pending") runSync("hide");
    } else if (Date.now() - sync.at > 15000) {
      runSync("focus");
    }
  });

  window.addEventListener("online", () => { if (token()) runSync("online"); });

  setInterval(() => { if (sync.status === "synced") setSyncStatus("synced"); }, 30000);

  /* ---------- start ---------- */

  function renderWarnings() {
    const box = $("#warnings");
    if (!box || !warnings.length) return;
    box.innerHTML = '<details class="warnings"><summary>' + plural(warnings.length, "problem", "problems") +
      " in the roadmap data</summary><ul>" + warnings.map((w) => "<li>" + esc(w) + "</li>").join("") + "</ul></details>";
  }

  const owner = (RM.site && RM.site.owner) || "";
  const wordmark = $("#wordmark");
  if (wordmark && owner) {
    wordmark.innerHTML = '<span class="wm-owner">' + esc(owner) + '</span><span class="wm-sep">/</span><span class="wm-repo">' +
      esc((RM.site && RM.site.title) || "roadmaps") + "</span>";
  }

  renderWarnings();
  render();
  setSyncStatus(token() ? "idle" : "local");
  if (token()) runSync("load");

  // Small console API for debugging: window.roadmaps.state, window.roadmaps.sync()
  window.roadmaps = {
    get state() { return state; },
    mergeState,
    sync: () => runSync("manual"),
    warnings
  };
})();
