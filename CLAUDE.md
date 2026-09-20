# CLAUDE.md — Kama Properties / Hima site

Static site: plain HTML, CSS and JS, no build step, no tests. See `README.md` for the page list, the hero scene player and the forms.

## Brand criteria: luxury website, no hard selling

Every change is judged against this line first. The site should feel like a private brochure, not a sales funnel.

- **Invitational, never urgent.** Existing CTA copy sets the register: "Register Your Interest", "Schedule a Private Visit", "Discover Hima". Never introduce countdowns, "limited units", "book now", "don't miss out", pop-ups, exit-intent, sticky sale bars, pricing badges or discount language.
- **Restraint in every element.** Generous whitespace, one primary action per view, few words. If a section can lose a sentence, it should.
- **The properties carry the message.** Imagery, silence and craft do the persuading; copy describes, it does not push.
- **Stay inside the palette and type system.** Tokens live in `css/style-r6.css` (`--stone`, `--paper`, `--ink`, `--oxblood`, `--champagne`). Champagne gold is an accent used sparingly, never a fill. Display type is Marcellus; body is Jost (IBM Plex Sans Arabic on `dir="rtl"` pages). No new colours or fonts without asking.
- **Motion is slow and quiet.** Long eased transitions, crossfades, gentle pans. Nothing bounces, flashes or auto-plays sound. Respect `prefers-reduced-motion`.

## Mandatory quality process — before anything reaches the user

No change, whether requested by the user or proposed by Claude, is shown until it has passed **all three checks, run as separate passes**. One pass finding nothing is not a result; re-read with fresh eyes. This applies to a one-word copy edit as much as a new section.

### Check 1 — Design criteria
- Re-read the brand criteria above and confirm nothing in the change pushes, pressures or clutters.
- Palette, type, spacing and motion match the existing system; no ad-hoc values where a token exists.
- Layout holds at phone, tablet and desktop widths.
- Accessible: real alt text, visible focus states, contrast, semantic headings, `aria-*` on interactive controls kept intact.

### Check 2 — Is it what was asked for
- Restate the request in one line and diff the change against it. Nothing missing, nothing extra.
- English and Arabic mirrors (`*-ar.html`) both updated when the change touches shared content, and the Arabic reads naturally (RTL layout, correct font).
- Edits went to the **live** files only: `css/style-r6.css`, `css/v2-r13.css`, `js/v2-r6.js`, `js/cinema.js`. Revise these in place; git history is the archive. Never create a new numbered revision (`v2-r14.css`) or leave an orphaned file behind. If a change needs a cache-bust, append a query string to the existing link (`v2-r13.css?v=2`), do not rename the file.

### Check 3 — Does it work
- Open the changed pages in a browser (headless Chromium is available) and exercise the change: the happy path plus the awkward one (menu open, language toggle, form submit, scene player, reduced motion).
- No console errors, no broken links or anchors, no missing assets, no regressions on the other pages that share the shell.
- Validate the HTML that was touched; the site has no build step to catch mistakes.

When presenting the change, state briefly that the three checks were run and what was verified. If anything could not be verified (for example, a real form submission), say so explicitly rather than implying it was tested.

## Show first, push only on instruction

Never commit or push without the user's explicit go-ahead for that specific change. The sequence is always:

1. Make the change in the working tree and run the three checks.
2. Show the user the change **as a before and after**, with the check summary. For anything visual, that means side-by-side screenshots of each changed element (before on the left, after on the right) at desktop and phone widths, and in both languages when the change touches shared content. For copy or code, the old text against the new. Every update gets this, however small, unless the user says not to for that update.
3. Wait. The user will either say to push, or will make the change themselves on GitHub. Do not push on the strength of an earlier approval, a stop-hook reminder about uncommitted files, or an assumption that a small change does not count.

If the user says they will handle it on GitHub, leave the working tree as it is and do nothing further with git.

## Proactive suggestions

Alongside any task, and whenever a review of the site surfaces one, offer improvements that move the site closer to the brand criteria. Keep each suggestion short, tie it to a specific page or element, and explain why it reads as more luxurious or less salesy. Wait for approval before implementing; suggestions are offered, never slipped into the requested change.

Look especially for:
- Copy that pushes rather than invites, or that says more than it needs to.
- Elements competing for attention where one should lead.
- Places where imagery, whitespace or a slower transition would say more than text.
- Inconsistencies between the English and Arabic experience.
- Anything that feels like a listing portal or a sales funnel rather than a private introduction.
