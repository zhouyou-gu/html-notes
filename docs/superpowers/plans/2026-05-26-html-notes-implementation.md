# HTML Notes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a public static HTML notes repository that agents can update while preserving privacy.

**Architecture:** The site is plain static HTML served by GitHub Pages from the `main` branch. Notes live in `notes/`, `notes.json` is the machine-readable manifest, and `index.html` is the human-facing listing. `AGENTS.md` and `README.md` define update workflow and privacy rules.

**Tech Stack:** HTML, CSS, JSON, Node.js built-in modules for validation, GitHub CLI for repo creation and Pages setup.

---

## File Structure

- Create `scripts/check-site.mjs`: validates required files, JSON manifest shape, linked note files, local links, and privacy-rule presence.
- Create `.nojekyll`: disables Jekyll processing for branch-source GitHub Pages.
- Create `index.html`: public landing page listing notes.
- Create `notes/welcome.html`: sample note page.
- Create `notes.json`: manifest consumed by agents and humans.
- Create `assets/styles.css`: shared styling for index and note pages.
- Create `README.md`: human-facing project overview and update workflow.
- Create `AGENTS.md`: required agent operating rules with privacy guardrails.
- Modify git remote: create and push to `zhouyou-gu/html-notes`.

### Task 1: Verification Script

**Files:**
- Create: `scripts/check-site.mjs`

- [ ] **Step 1: Write the failing site verification script**

Create `scripts/check-site.mjs` with checks for the required static-site files, valid JSON, note links, local links, and privacy guidance.

- [ ] **Step 2: Run the script to verify it fails**

Run: `node scripts/check-site.mjs`

Expected: FAIL because `index.html`, `notes.json`, `assets/styles.css`, `README.md`, `AGENTS.md`, and note files do not exist yet.

- [ ] **Step 3: Commit the plan and failing verification script**

Run:

```bash
git add docs/superpowers/plans/2026-05-26-html-notes-implementation.md scripts/check-site.mjs
git commit -m "Add HTML notes implementation plan"
```

### Task 2: Static Site Scaffold

**Files:**
- Create: `index.html`
- Create: `notes/welcome.html`
- Create: `notes.json`
- Create: `assets/styles.css`
- Create: `README.md`
- Create: `AGENTS.md`

- [ ] **Step 1: Add the static site files**

Create the required files with a simple no-build GitHub Pages site, one sample note, and privacy-forward agent documentation.

- [ ] **Step 2: Run verification**

Run: `node scripts/check-site.mjs`

Expected: PASS with all required files, valid manifest entries, resolvable links, and privacy guidance present.

- [ ] **Step 3: Commit the site scaffold**

Run:

```bash
git add AGENTS.md README.md assets/styles.css index.html notes.json notes/welcome.html scripts/check-site.mjs
git commit -m "Scaffold public HTML notes site"
```

### Task 3: Publish To GitHub Pages

**Files:**
- Modify: git remote configuration

- [ ] **Step 1: Create the public GitHub repo**

Run:

```bash
gh repo create html-notes --public --source=. --remote=origin --description "Public HTML notes shared through GitHub Pages" --push
```

- [ ] **Step 2: Enable GitHub Pages**

Run:

```bash
gh api --method POST repos/zhouyou-gu/html-notes/pages -f source.branch=main -f source.path=/
```

If Pages already exists, verify rather than treating that as failure.

- [ ] **Step 3: Verify remote state**

Run:

```bash
gh repo view zhouyou-gu/html-notes --json name,visibility,url,homepageUrl
gh api repos/zhouyou-gu/html-notes/pages
```

Expected: repository visibility is `PUBLIC` and Pages source is `main` `/`.
