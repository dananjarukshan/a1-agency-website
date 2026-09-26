// Run after `npm run build`: node scripts/verify-header.mjs
// Verifies prerendered markup, not browser layout or interactive behavior.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function findHtml(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? findHtml(file) : entry.name.endsWith(".html") ? [file] : [];
  });
}

const files = findHtml(".next/server/app");
const order = ["Home", "For Employers", "Jobs", "Opportunities", "About Us", "How It Works", "FAQ", "Contact"];
let checked = 0;

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const start = html.indexOf("<header");
  if (start < 0) continue;
  const header = html.slice(start, html.indexOf("</header>", start) + 9);
  const normalizedFile = file.replaceAll("\\", "/");
  const employer = normalizedFile.includes("/employers/") || normalizedFile.endsWith("/employers.html");
  const navStart = header.indexOf('aria-label="Main navigation"');
  assert.ok(navStart >= 0, `${file}: main navigation landmark`);
  const nav = header.slice(navStart, header.indexOf("</nav>", navStart));
  let previousIndex = -1;
  for (const label of order) {
    const index = nav.indexOf(`>${label}<`);
    assert.ok(index > previousIndex, `${file}: navigation order for ${label}`);
    previousIndex = index;
  }

  const cta = header.split("<a ").find((part) => part.slice(0, part.indexOf(">")).includes("ctaPanel"));
  assert.ok(cta, `${file}: desktop CTA panel`);
  const panel = cta.slice(0, cta.indexOf("</a>"));
  const ctaHref = employer ? "/employers/request-manpower" : "/jobs";
  const ctaLabel = employer ? "Request Manpower" : "Find Jobs";
  assert.ok(panel.includes(`href="${ctaHref}"`) && panel.includes(ctaLabel), `${file}: contextual CTA`);
  assert.ok(panel.includes(employer ? "Looking for Sri Lankan talent?" : "Looking for an overseas opportunity?"), `${file}: CTA supporting text`);

  for (const network of ["Facebook", "Instagram", "TikTok", "YouTube", "LinkedIn"]) {
    assert.ok(header.includes(`aria-label="A-One on ${network}"`), `${file}: ${network}`);
  }
  assert.ok(header.includes("Kandy") && header.includes("Sri Lanka"), `${file}: location`);
  assert.ok(header.includes('href="mailto:aonefea3785@gmail.com"'), `${file}: email`);
  assert.ok(header.includes('href="tel:+94761550550"'), `${file}: hotline`);
  assert.ok(!header.includes("Monday") && !header.includes("Saturday"), `${file}: no unconfirmed office hours`);
  assert.ok(header.includes('href="/countries"') && header.includes("Browse by Country"), `${file}: country dropdown`);
  assert.ok(header.includes('href="/job-categories"') && header.includes("Browse by Job Category"), `${file}: category dropdown`);
  assert.ok(!header.includes('href="/opportunities"'), `${file}: no combined opportunities route`);
  assert.ok(header.includes('aria-label="Mobile navigation" hidden=""'), `${file}: mobile menu initially closed`);
  for (const id of ["desktop-opportunities", "mobile-navigation", "mobile-opportunities"]) {
    assert.ok(header.includes(`aria-controls="${id}"`) && header.includes(`id="${id}"`), `${file}: ${id} disclosure target`);
  }
  assert.ok(!header.includes('href=""') && !header.includes('href="#"'), `${file}: no empty links`);
  checked++;
}

assert.ok(checked >= 40, "Expected generated site pages to contain the shared header");
const css = fs.readFileSync("src/components/layout/Header.module.css", "utf8");
for (const name of ["Header.tsx", "HeaderSocialLinks.tsx"]) {
  const source = fs.readFileSync(`src/components/layout/${name}`, "utf8");
  for (const [, className] of source.matchAll(/styles\.(\w+)/g)) {
    assert.ok(css.includes(`.${className}`), `Missing CSS class: ${className}`);
  }
}
console.log(`PASS: header structure, navigation, CTAs, social/contact links, and disclosure targets on ${checked} generated pages.`);
console.log("PASS: every referenced header CSS class is defined.");
