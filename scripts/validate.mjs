#!/usr/bin/env node
/*
  Validates the roadmap data exactly the way the site loads it: runs every data file listed in
  index.html, then checks the schema, ids, references and links. Exits 1 on any error.

  Usage: node scripts/validate.mjs
*/
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const KINDS = new Set(["course", "book", "video", "docs", "article", "practice", "repo", "paper", "tool"]);
const errors = [];
const notes = [];

const html = readFileSync(join(root, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script\s+src="(data\/[^"]+\.js)"\s*><\/script>/g)].map((m) => m[1]);

const RM = {
  site: {},
  topics: {},
  roadmaps: [],
  dupes: [],
  addTopics(obj) {
    for (const id of Object.keys(obj)) {
      if (Object.prototype.hasOwnProperty.call(this.topics, id)) this.dupes.push(id);
      this.topics[id] = obj[id];
    }
  },
  addRoadmap(r) { this.roadmaps.push(r); }
};
const context = vm.createContext({ RM, window: { RM }, console });

for (const src of scripts) {
  try {
    vm.runInContext(readFileSync(join(root, src), "utf8"), context, { filename: src });
  } catch (err) {
    errors.push(`${src}: ${err.message}`);
  }
}

// Every data file on disk should be loaded by index.html.
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
for (const file of walk(join(root, "data")).filter((f) => f.endsWith(".js"))) {
  const rel = relative(root, file).split("\\").join("/");
  if (!scripts.includes(rel)) errors.push(`${rel} exists but index.html does not load it.`);
}

const isText = (v) => typeof v === "string" && v.trim().length > 0;

for (const id of RM.dupes) errors.push(`Topic id "${id}" is defined more than once.`);

for (const [id, t] of Object.entries(RM.topics)) {
  const where = `topic "${id}"`;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) errors.push(`${where}: ids use lowercase letters, digits and dashes.`);
  if (!isText(t.title)) errors.push(`${where}: missing title.`);
  if (!Array.isArray(t.subs) || !t.subs.length) errors.push(`${where}: needs at least one item in subs.`);
  const seen = new Set();
  for (const s of t.subs || []) {
    if (!isText(s)) errors.push(`${where}: an item is empty or not a string.`);
    if (seen.has(s)) errors.push(`${where}: duplicate item "${s}".`);
    seen.add(s);
  }
  if (!Array.isArray(t.res) || !t.res.length) errors.push(`${where}: needs at least one resource.`);
  for (const r of t.res || []) {
    if (!Array.isArray(r) || r.length < 2) { errors.push(`${where}: a resource must be [label, url, kind].`); continue; }
    const [label, url, kind] = r;
    if (!isText(label)) errors.push(`${where}: a resource has no label.`);
    if (!/^https?:\/\/[^\s]+$/.test(url || "")) errors.push(`${where}: bad url "${url}".`);
    if (kind && !KINDS.has(kind)) errors.push(`${where}: unknown resource kind "${kind}".`);
  }
  if (t.tip !== undefined && !isText(t.tip)) errors.push(`${where}: tip should be a non-empty string.`);
  if (t.hi !== undefined) {
    if (!Array.isArray(t.hi) || !isText(t.hi[0]) || !/^https:\/\/[^\s]+$/.test(t.hi[1] || "")) {
      errors.push(`${where}: hi must be ["label", "https://...", "optional note"].`);
    }
  }
}

const lineIds = new Set();
const projectIds = new Set();
const used = new Set();
const stats = [];

for (const r of RM.roadmaps) {
  const where = `roadmap "${r.id}"`;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(r.id || "")) errors.push(`${where}: bad id.`);
  if (lineIds.has(r.id)) errors.push(`${where}: id used twice.`);
  lineIds.add(r.id);
  for (const field of ["code", "title", "summary"]) if (!isText(r[field])) errors.push(`${where}: missing ${field}.`);
  for (const field of ["color", "colorDark"]) {
    if (r[field] !== undefined && !/^#[0-9a-fA-F]{6}$/.test(r[field])) errors.push(`${where}: ${field} must look like #12AB9F.`);
  }
  if (!Array.isArray(r.phases) || !r.phases.length) { errors.push(`${where}: needs phases.`); continue; }
  const inLine = new Set();
  let items = 0;
  let projects = 0;
  let extraTopics = 0;
  let extraItems = 0;
  r.phases.forEach((ph, i) => {
    const pw = `${where}, phase ${i + 1}`;
    if (!isText(ph.title)) errors.push(`${pw}: missing title.`);
    if (!(ph.topics || []).length && !(ph.projects || []).length) errors.push(`${pw}: has no core topics or projects.`);
    const listed = [...(ph.topics || []).map((t) => [t, false]), ...(ph.extra || []).map((t) => [t, true])];
    for (const [tid, isExtra] of listed) {
      if (!RM.topics[tid]) { errors.push(`${pw}: unknown topic "${tid}".`); continue; }
      if (inLine.has(tid)) errors.push(`${pw}: topic "${tid}" is listed more than once in this roadmap.`);
      inLine.add(tid);
      used.add(tid);
      if (isExtra) { extraTopics++; extraItems += RM.topics[tid].subs.length; }
      else items += RM.topics[tid].subs.length;
    }
    for (const p of ph.projects || []) {
      const prw = `${pw}, project "${p.id}"`;
      if (!/^[a-z0-9][a-z0-9-]*$/.test(p.id || "")) errors.push(`${prw}: bad id.`);
      if (projectIds.has(p.id)) errors.push(`${prw}: id used twice.`);
      if (RM.topics[p.id]) errors.push(`${prw}: id clashes with a topic id.`);
      projectIds.add(p.id);
      if (!isText(p.title)) errors.push(`${prw}: missing title.`);
      if (!Array.isArray(p.done) || !p.done.length) errors.push(`${prw}: needs "done" criteria.`);
      const seen = new Set();
      for (const d of p.done || []) {
        if (!isText(d)) errors.push(`${prw}: empty criterion.`);
        if (seen.has(d)) errors.push(`${prw}: duplicate criterion "${d}".`);
        seen.add(d);
      }
      items += (p.done || []).length;
      projects++;
    }
  });
  stats.push(`${r.code.padEnd(4)} ${r.title.padEnd(28)} ${String(r.phases.length).padStart(2)} phases  ${String(inLine.size - extraTopics).padStart(3)} core + ${String(extraTopics).padStart(2)} extra topics  ${String(projects).padStart(2)} projects  ${String(items).padStart(4)} core items (+${extraItems} extra)`);
}

const unused = Object.keys(RM.topics).filter((id) => !used.has(id));
if (unused.length) notes.push(`Topics not used by any roadmap yet: ${unused.join(", ")}`);

const urls = new Set();
let hindi = 0;
for (const t of Object.values(RM.topics)) {
  for (const r of t.res || []) urls.add(r[1]);
  if (t.hi) { urls.add(t.hi[1]); hindi++; }
}

console.log(`Loaded ${scripts.length} data files: ${Object.keys(RM.topics).length} topics (${hindi} with a Hindi pick), ${RM.roadmaps.length} roadmaps, ${urls.size} unique links.`);
for (const line of stats) console.log("  " + line);
for (const n of notes) console.log("Note: " + n);

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("\nData is valid.");
