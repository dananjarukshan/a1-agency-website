// Run after `npm run build`: node scripts/verify-phase4.mjs
// Checks content, derived statistics, section order and CSS breakpoint rules.
// Browser rendering and visual overflow still require a browser review.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import postcss from "postcss";

function loadContent(file) {
  const exports = {};
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  vm.runInNewContext(outputText, { exports }, { timeout: 1000 });
  return exports;
}

const { countries, jobCategories, jobs } = loadContent("src/data/index.ts");
const { missionVisionContent } = loadContent("src/config/mission-vision.ts");
const html = fs.readFileSync(".next/server/app/index.html", "utf8");

function section(label) {
  const labelIndex = html.indexOf(label);
  assert.ok(labelIndex >= 0, `Section exists: ${label}`);
  const start = html.lastIndexOf("<section", labelIndex);
  const end = html.indexOf("</section>", start) + "</section>".length;
  return { start, end, html: html.slice(start, end) };
}

const hero = section('aria-labelledby="home-hero-heading"');
const stats = section('aria-label="Website overview"');
const purpose = section('aria-label="Our vision and mission"');
const featured = section('aria-labelledby="featured-jobs-heading"');
assert.ok(hero.end <= stats.start && stats.end <= purpose.start && purpose.end <= featured.start);
assert.equal(html.slice(stats.end, purpose.start).trim(), "", "Mission/Vision immediately follows statistics");
assert.equal(html.slice(purpose.end, featured.start).trim(), "", "Featured Jobs still follows the new section");

const statisticText = [...stats.html.matchAll(/<p\b[^>]*>([^<]*)<\/p>/g)].map((match) => match[1]);
assert.deepEqual(statisticText, [
  String(jobs.filter((job) => job.status === "active").length), "Sample vacancies",
  String(countries.length), "Destinations",
  String(jobCategories.length), "Career categories",
  "10 steps", "Guided journey",
]);
const icons = [...stats.html.matchAll(/<svg\b[^>]*>/g)].map((match) => match[0]);
assert.equal(icons.length, 4);
assert.ok(icons.every((icon) => icon.includes('aria-hidden="true"')));

assert.equal(missionVisionContent.length, 2);
assert.equal(missionVisionContent[0].id, "vision");
assert.equal(missionVisionContent[1].id, "mission");
for (const item of missionVisionContent) {
  assert.ok(purpose.html.includes(`id="home-${item.id}-heading"`));
  assert.ok(purpose.html.includes(`>${item.heading}</h2>`));
  assert.ok(purpose.html.includes(item.description), `${item.heading}: centralized content rendered`);
  assert.ok(purpose.html.includes(`aria-hidden="true">${item.number}</span>`));
}
assert.equal((purpose.html.match(/<h2\b/g) ?? []).length, 2);
assert.ok(!/temporary|placeholder|pending|interim/i.test(purpose.html));
assert.ok(!fs.readFileSync("src/components/home/MissionVision.tsx", "utf8").includes('"use client"'));

const statsCss = postcss.parse(fs.readFileSync("src/components/home/Statistics.module.css", "utf8"));
const purposeCss = postcss.parse(fs.readFileSync("src/components/home/MissionVision.module.css", "utf8"));

function rulesAt(root, selector, width) {
  const result = {};
  root.walkRules(selector, (rule) => {
    for (let parent = rule.parent; parent; parent = parent.parent) {
      if (parent.type === "atrule" && parent.name === "media") {
        const minWidth = parent.params.match(/min-width:\s*(\d+)px/);
        if (minWidth && width < Number(minWidth[1])) return;
      }
    }
    rule.walkDecls((declaration) => { result[declaration.prop] = declaration.value; });
  });
  return result;
}

for (const width of [360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  const statsColumns = width >= 900 ? 4 : 2;
  assert.equal(rulesAt(statsCss, ".grid", width)["grid-template-columns"], `repeat(${statsColumns}, minmax(0, 1fr))`);
  const purposeColumns = width >= 768 ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)";
  assert.equal(rulesAt(purposeCss, ".grid", width)["grid-template-columns"], purposeColumns);
  const divider = rulesAt(purposeCss, ".column + .column", width);
  assert.equal(divider["border-top"], width >= 768 ? "0" : "1px solid rgb(255 255 255 / 0.16)");
  assert.equal(divider["border-left"], width >= 768 ? "1px solid rgb(255 255 255 / 0.16)" : undefined);
}

assert.equal(rulesAt(statsCss, ".section", 1440).background, "#f8f6ee");
assert.equal(rulesAt(statsCss, ".section", 1440).color, "#111111");
assert.equal(rulesAt(statsCss, ".label", 1440).color, "#5c5c5c");
assert.equal(rulesAt(purposeCss, ".heading", 1440).color, "var(--color-brand-white)");

console.log("PASS: data-derived statistics, four decorative icons, section order, and centralized Vision/Mission content.");
console.log("PASS: static server component, semantic headings, and no visitor-facing editorial status.");
console.log("PASS: grid/divider CSS rules at 360, 390, 430, 768, 1024, 1280, 1440, and 1920px.");
