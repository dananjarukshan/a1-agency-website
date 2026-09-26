// Run after `npm run build`: node scripts/verify-hero.mjs
// Checks actual search handlers and generated markup, not browser layout.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const fileName = "src/components/home/HeroSection.tsx";
const source = fs.readFileSync(fileName, "utf8");
const parsed = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let searchHandler;
let popularHandler;

function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(parsed) === "handleSearch") {
    searchHandler = node.initializer.getText(parsed);
  }
  if (ts.isJsxAttribute(node) && node.name.getText(parsed) === "onClick") {
    const expression = node.initializer?.expression;
    if (expression?.getText(parsed).includes("encodeURIComponent(term)")) {
      popularHandler = expression.getText(parsed);
    }
  }
  ts.forEachChild(node, visit);
}
visit(parsed);
assert.ok(searchHandler, "Hero search handler exists");
assert.ok(popularHandler, "Popular-search handler exists");

const executable = ts.transpileModule(`const handler = ${searchHandler}; handler(event);`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

for (const [keyword, country, expected] of [
  ["", "", "/jobs"],
  ["   ", "", "/jobs"],
  [" Driver ", "", "/jobs?q=Driver"],
  ["", "qatar", "/jobs?country=qatar"],
  [" electrician ", "united-arab-emirates", "/jobs?q=electrician&country=united-arab-emirates"],
  ["A&B / driver", "oman", "/jobs?q=A%26B+%2F+driver&country=oman"],
]) {
  const pushed = [];
  let prevented = false;
  vm.runInNewContext(executable, {
    keyword, country, URLSearchParams,
    router: { push: (url) => pushed.push(url) },
    event: { preventDefault: () => { prevented = true; } },
  });
  assert.equal(prevented, true);
  assert.deepEqual(pushed, [expected]);
}

for (const term of ["Driver", "Electrician", "Hospitality", "Welder"]) {
  const pushed = [];
  vm.runInNewContext(`(${popularHandler})();`, {
    term, encodeURIComponent, router: { push: (url) => pushed.push(url) },
  });
  assert.deepEqual(pushed, [`/jobs?q=${encodeURIComponent(term)}`]);
}

const html = fs.readFileSync(".next/server/app/index.html", "utf8");
const headingLabel = html.indexOf('aria-labelledby="home-hero-heading"');
assert.ok(headingLabel >= 0, "Named hero section exists");
const heroStart = html.lastIndexOf("<section", headingLabel);
const hero = html.slice(heroStart, html.indexOf("</section>", heroStart) + 10);
const heading = hero.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
assert.ok(heading, "Semantic H1 exists");
assert.equal(heading.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(), "Your next career move can go further.");

const video = hero.match(/<video\b[^>]*>/)?.[0].toLowerCase();
assert.ok(video, "Background video exists");
for (const attribute of ["autoplay", "loop", "muted", "playsinline", 'preload="auto"', 'aria-hidden="true"']) {
  assert.ok(video.includes(attribute), `Video retains ${attribute}`);
}
assert.ok(hero.includes('/videos/homepage-hero-loop.mp4'), "Same video asset");
assert.ok(hero.includes('href="/jobs"') && hero.includes('href="/contact"'), "Both action routes retained");
assert.ok(hero.includes('role="search"') && hero.includes('aria-label="Search overseas jobs"'), "Search landmark");
assert.ok(hero.includes("Job title or keyword") && hero.includes("Destination country"), "Accessible field labels");
assert.ok(hero.includes('type="search"') && hero.includes("<select") && hero.includes('type="submit"'), "All search controls retained");
assert.ok(hero.includes("All destinations"), "Default country choice retained");

let previous = -1;
for (const content of ["Sri Lanka-focused international recruitment", "<h1", "Explore overseas roles", "Explore opportunities", "Talk to our team", "<form", "Popular searches:", "Clear role details. Guided applications. No job or visa guarantees."]) {
  const index = hero.indexOf(content);
  assert.ok(index > previous, `Hero content order: ${content}`);
  previous = index;
}
for (const term of ["Driver", "Electrician", "Hospitality", "Welder"]) assert.ok(hero.includes(term));
assert.ok(html.includes('aria-label="Website overview"'), "Statistics section retained");
assert.ok(html.includes('aria-label="Chat with us on WhatsApp"'), "Global WhatsApp link retained");

const css = fs.readFileSync("src/components/home/HeroSection.module.css", "utf8");
for (const [, name] of source.matchAll(/styles\.(\w+)/g)) assert.ok(css.includes(`.${name}`), `CSS class: ${name}`);
console.log("PASS: 6 search-routing cases and all 4 popular-search actions using the actual hero handlers.");
console.log("PASS: hero hierarchy, H1, video settings, action routes, search labels/controls, statistics and WhatsApp markup.");
console.log("PASS: every referenced hero CSS class is defined.");
