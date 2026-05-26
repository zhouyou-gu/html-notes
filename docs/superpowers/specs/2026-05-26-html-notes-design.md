# HTML Notes Public Repo Design

## Goal

Create a public GitHub repository named `html-notes` for sharing HTML notes through GitHub Pages. The repository should be simple enough for an agent to update directly while making privacy expectations explicit.

## Recommended Approach

Use a static HTML repository with no build step:

- `index.html` lists published notes.
- `notes/*.html` stores individual notes.
- `notes.json` acts as a small machine-readable manifest.
- `assets/styles.css` holds shared styling.
- `README.md` explains human workflow and publication model.
- `AGENTS.md` defines update rules for agents, including privacy checks.

This approach is preferred because any agent can add or edit pages with ordinary file operations and does not need a package manager, static-site generator, or deployment script.

## Privacy Requirements

Because the repository is public, agent instructions must require a privacy pass before every update. Agents must not publish:

- API keys, tokens, credentials, cookies, private keys, or recovery codes.
- Private conversations, emails, calendar details, or unpublished documents unless explicitly requested.
- Personal identifiers such as addresses, phone numbers, government IDs, financial details, or health details.
- Local filesystem paths, internal hostnames, private repo names, or machine-specific configuration unless deliberately relevant and sanitized.
- Client, employer, or third-party confidential material.

If content appears sensitive or ambiguous, the agent should stop and ask before publishing it. The default should be to omit or redact.

## Agent Update Flow

When adding a note, the agent should:

1. Create a focused HTML file under `notes/`.
2. Add or update the note entry in `notes.json`.
3. Link the note from `index.html`.
4. Run a privacy review on changed content.
5. Avoid unrelated formatting churn.

When editing a note, the agent should preserve the note URL where possible and update only the relevant note, manifest entry, and index link.

## Publishing

The repository will be public under `zhouyou-gu/html-notes`. GitHub Pages will serve the site from the default branch, producing a live URL at:

`https://zhouyou-gu.github.io/html-notes/`

## Testing And Verification

Before considering setup complete:

- Confirm the HTML files open locally.
- Confirm links from `index.html` resolve.
- Confirm `notes.json` is valid JSON.
- Confirm the GitHub repo exists and is public.
- Confirm GitHub Pages is enabled.

## Scope

The initial setup includes one sample note, privacy-focused agent guidance, and GitHub Pages publication. It does not include markdown conversion, authentication, comments, search, analytics, or a dynamic backend.
