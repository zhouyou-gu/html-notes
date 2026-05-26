# HTML Notes

A public, no-build repository for sharing small HTML notes through GitHub Pages.

> [!IMPORTANT]
> This repository is public. Before adding or updating content, run a privacy pass:
> remove credentials, personal identifiers, private conversations, local paths, and
> confidential third-party material. If anything is sensitive or ambiguous, ask first
> and redact by default.

## What Is Here

- `index.html` lists published notes.
- `notes/*.html` contains individual note pages.
- `notes.json` is the machine-readable manifest for agents.
- `assets/styles.css` provides shared styling.
- `AGENTS.md` defines the required agent update workflow and privacy guardrails.
- `scripts/check-site.mjs` verifies links, manifest shape, and privacy guidance.

## Add Or Update A Note

1. Create or edit a focused HTML file in `notes/`.
2. Add or update the matching entry in `notes.json`.
3. Link the note from `index.html`.
4. Run `node scripts/check-site.mjs`.
5. Review the changed content as public material before publishing.

Preserve existing note URLs when editing whenever possible.

## Privacy Guardrails

Do not publish credentials, tokens, API keys, cookies, private keys, recovery codes,
personal identifiers, private conversations, email, calendar details, unpublished
documents, internal hostnames, private repo names, or confidential client, employer,
or third-party material.

When in doubt, ask before publishing. The default action is to omit or redact.

## Local Verification

```bash
node scripts/check-site.mjs
```

The site has no build step. Open `index.html` directly or serve the directory with any
static file server while editing.

## Published Site

GitHub Pages serves the public site from the `main` branch:

https://zhouyou-gu.github.io/html-notes/
