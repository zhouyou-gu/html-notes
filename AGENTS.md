# Agent Instructions

This repository is public. Preserve privacy before every update.

## Required Privacy Gate

Before creating, editing, committing, or publishing any page, review all changed content
as public material.

Do not publish:

- Credentials, API keys, tokens, cookies, private keys, recovery codes, or passwords.
- Private conversations, emails, calendar details, unpublished documents, or raw chat logs
  unless the user explicitly asks for that exact public release.
- Personal identifiers, including addresses, phone numbers, government IDs, financial
  details, health details, or account numbers.
- Local filesystem paths, internal hostnames, private repo names, machine-specific
  configuration, or access instructions unless deliberately relevant and sanitized.
- Client, employer, or third-party confidential material.

If content is sensitive, ambiguous, or not clearly intended for public release, stop and
ask the user. The default action is to omit or redact.

## Update Workflow

1. Keep notes as standalone HTML files under `notes/`.
2. Update `notes.json` whenever a note is added, renamed, removed, or materially changed.
3. Update `index.html` so every published note is reachable from the homepage.
4. Keep existing note URLs stable unless the user asks for a rename.
5. Run `node scripts/check-site.mjs` before committing or publishing.
6. Avoid unrelated formatting churn.

## Content Rules

- Prefer concise notes with clear headings and dates.
- Keep shared styling in `assets/styles.css`.
- Do not add a build system unless the user explicitly asks for one.
- Do not add analytics, trackers, comments, forms, or remote scripts without explicit
  user approval.
- Do not scrape private sources into this public repository.
