import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  ".nojekyll",
  ".github/workflows/pages.yml",
  "notes.json",
  "assets/styles.css",
  "assets/notes-cover.png",
  "README.md",
  "AGENTS.md",
];

const publicTextFiles = [
  "index.html",
  "notes.json",
  "README.md",
  "AGENTS.md",
];

const failures = [];

function fail(message) {
  failures.push(message);
}

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function readText(relativePath) {
  return readFileSync(filePath(relativePath), "utf8");
}

function requireFile(relativePath) {
  if (!existsSync(filePath(relativePath))) {
    fail(`Missing required file: ${relativePath}`);
    return false;
  }
  return true;
}

function isLocalHref(href) {
  return (
    href &&
    !href.startsWith("#") &&
    !href.startsWith("http://") &&
    !href.startsWith("https://") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  );
}

function stripFragment(href) {
  return href.split("#")[0].split("?")[0];
}

function checkLocalLinks(relativePath) {
  if (!existsSync(filePath(relativePath))) {
    return;
  }

  const source = readText(relativePath);
  const hrefPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  const baseDir = path.dirname(relativePath);
  let match;

  while ((match = hrefPattern.exec(source)) !== null) {
    const href = stripFragment(match[1]);
    if (!isLocalHref(href) || href === "") {
      continue;
    }

    const target = path.normalize(path.join(baseDir, href));
    if (target.startsWith("..")) {
      fail(`${relativePath} links outside the repository: ${match[1]}`);
      continue;
    }

    if (!existsSync(filePath(target))) {
      fail(`${relativePath} has a broken local link: ${match[1]}`);
    }
  }
}

function checkPrivacyGuidance(relativePath) {
  if (!existsSync(filePath(relativePath))) {
    return;
  }

  const text = readText(relativePath).toLowerCase();
  const requiredTerms = [
    "public",
    "privacy",
    "credentials",
    "personal identifiers",
    "ask",
    "redact",
  ];

  for (const term of requiredTerms) {
    if (!text.includes(term)) {
      fail(`${relativePath} is missing privacy guidance term: ${term}`);
    }
  }
}

function checkForObviousPrivateMaterial(relativePath) {
  if (!existsSync(filePath(relativePath))) {
    return;
  }

  const text = readText(relativePath);
  const patterns = [
    [/gh[pousr]_[A-Za-z0-9_]{20,}/, "GitHub token-like secret"],
    [/sk-[A-Za-z0-9_-]{20,}/, "API key-like secret"],
    [/-----BEGIN (?:RSA |EC |OPENSSH |)PRIVATE KEY-----/, "private key block"],
    [/\/Users\/[A-Za-z0-9._-]+/, "local macOS home path"],
    [/C:\\Users\\[A-Za-z0-9._-]+/i, "local Windows home path"],
  ];

  for (const [pattern, label] of patterns) {
    if (pattern.test(text)) {
      fail(`${relativePath} contains ${label}`);
    }
  }
}

function checkPagesWorkflow() {
  const relativePath = ".github/workflows/pages.yml";
  if (!existsSync(filePath(relativePath))) {
    return;
  }

  const workflow = readText(relativePath);
  const requiredSnippets = [
    "node scripts/check-site.mjs",
    "actions/upload-pages-artifact",
    "actions/deploy-pages",
  ];

  for (const snippet of requiredSnippets) {
    if (!workflow.includes(snippet)) {
      fail(`${relativePath} is missing required Pages workflow snippet: ${snippet}`);
    }
  }
}

for (const requiredFile of requiredFiles) {
  requireFile(requiredFile);
}

let manifest = null;
if (existsSync(filePath("notes.json"))) {
  try {
    manifest = JSON.parse(readText("notes.json"));
  } catch (error) {
    fail(`notes.json is not valid JSON: ${error.message}`);
  }
}

if (manifest) {
  if (!Array.isArray(manifest.notes)) {
    fail("notes.json must contain a notes array");
  } else if (manifest.notes.length === 0) {
    fail("notes.json must contain at least one note");
  } else {
    for (const [index, note] of manifest.notes.entries()) {
      const label = `notes.json entry ${index}`;
      for (const key of ["title", "date", "path", "summary"]) {
        if (typeof note[key] !== "string" || note[key].trim() === "") {
          fail(`${label} must include a non-empty ${key}`);
        }
      }

      if (typeof note.path === "string") {
        if (!note.path.startsWith("notes/") || !note.path.endsWith(".html")) {
          fail(`${label} path must point to notes/*.html`);
        } else if (!existsSync(filePath(note.path))) {
          fail(`${label} points to a missing note file: ${note.path}`);
        }
      }

      if (note.tags !== undefined && !Array.isArray(note.tags)) {
        fail(`${label} tags must be an array when present`);
      }
    }
  }
}

if (manifest?.notes && existsSync(filePath("index.html"))) {
  const indexHtml = readText("index.html");
  for (const note of manifest.notes) {
    if (typeof note.path === "string" && !indexHtml.includes(note.path)) {
      fail(`index.html does not link to manifest note: ${note.path}`);
    }
  }
}

for (const htmlFile of [
  "index.html",
  ...(manifest?.notes ?? []).map((note) => note.path).filter(Boolean),
]) {
  checkLocalLinks(htmlFile);
}

for (const guidanceFile of ["README.md", "AGENTS.md"]) {
  checkPrivacyGuidance(guidanceFile);
}

for (const relativePath of publicTextFiles) {
  checkForObviousPrivateMaterial(relativePath);
}

for (const relativePath of (manifest?.notes ?? []).map((note) => note.path).filter(Boolean)) {
  checkForObviousPrivateMaterial(relativePath);
}

checkPagesWorkflow();

if (failures.length > 0) {
  console.error("Site verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Site verification passed.");
