# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Habit Tracker is a client-side-only web app built with plain HTML, CSS, and vanilla
JavaScript — no build step, no framework, no package manager, no tests. It is a teaching
starter ("Session 1 - Part B"); a real backend and habit persistence are explicitly
deferred to later sessions (see comments in `js/habits.js`).

## Running

Open `index.html` directly in a browser, or serve the folder statically
(e.g. `python -m http.server` from the repo root) and visit the served page.
There is nothing to build, lint, or test.

## Architecture

Three scripts are loaded in order by `index.html` and communicate through **global
functions on `window`** (no modules, no imports). Load order matters because later
scripts call functions defined in earlier ones:

1. `js/habits.js` — the data layer. Owns the in-memory `habitList` array and `nextId`
   counter. Exposes `addHabit(name, category, frequency)`, `getHabits()`,
   `checkInHabit(id)`, `sortHabits(list, field, dir)`, and the `todayISO()` date helper
   (used by both `habits.js` and `render.js`). All habit state lives here and is lost on
   page reload. `CATEGORIES` is defined here but the `<select>` options in `index.html`
   are hard-coded separately — keep them in sync.
2. `js/render.js` — the view layer. `renderHabitList(list)` clears and rebuilds
   `#habit-list-body` from a habits array, including the per-row "Check in today" button
   (disabled once `completedDates` contains `todayISO()`) and the empty-state row. Pure
   DOM output; holds no state.
3. `js/main.js` — the controller. Wires all event handlers and does the initial render.
   Handlers: `#add-habit-form` submit (add + re-render), `#sort-controls` change,
   delegated click on `#habit-list-body` for `.check-in-btn`, and click on
   `#sort-checkins-header` (cycles to sort-by-checkins / toggles direction). Every
   handler routes through `renderSorted()`, which is the single re-render entry point:
   it reads the two `#sort-*` selects, persists them to `localStorage`, and calls
   `renderHabitList(sortHabits(getHabits(), field, dir))`.

The render cycle is manual and full-redraw: any code that mutates `habitList` must call
`renderSorted()` (not `renderHabitList` directly) so the current sort is reapplied.

### State & persistence

- **Habits** (`habitList`) are in-memory only — lost on reload.
- **Sort preference** (`{ field, dir }`) is the one persisted value, stored under the
  `localStorage` key `habitTracker.sort` (`SORT_KEY` in `main.js`) and restored on load
  via `loadSort()`. All `localStorage` access is wrapped in try/catch to tolerate
  disabled/unavailable storage.

### Habit shape

```js
{ id: number, name: string, category: string, frequency: 'Daily' | 'Weekly', completedDates: string[] }
```

`completedDates` holds `YYYY-MM-DD` strings. Check-in is idempotent per day
(`checkInHabit` no-ops if today is already present). The UI shows the count
("N check-ins") plus a button whose state reflects whether today is checked in.

## Conventions

- `render.js` builds rows via `innerHTML` with template literals — user-supplied
  `habit.name` is interpolated unescaped. If you extend rendering, be aware of this
  existing pattern.
- `sortHabits` special-cases `field === 'checkins'` (numeric, by `completedDates.length`);
  all other fields sort as lowercased strings via `localeCompare`, then reverse for
  `'desc'`.
- Keep each file to its layer: data logic in `habits.js`, DOM building in `render.js`,
  event wiring in `main.js`.
