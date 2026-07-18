# Statistical Computing Club — Website

A free, static website for SCC (Makerere University), built to run on
GitHub Pages at no cost. No build tools, no frameworks — just HTML,
CSS, and vanilla JS, so it's easy for any future club member to edit.

## What's in here

```
index.html      → Home page
about.html      → About page (history, leadership, membership tiers)
events.html     → Events page (poster gallery + calendar links)
contact.html    → Contact page
css/style.css   → All styling
js/content.js   → ALL editable content lives here (see below)
js/main.js      → Page logic — you shouldn't need to touch this
assets/         → Logo, favicon, and (eventually) event posters/photos
sitemap.xml     → For Google indexing
robots.txt      → For Google indexing
```

## Updating content (no coding needed)

Almost everything on the site — meeting dates, mentor names, team bios,
testimonials, contact links — lives in **`js/content.js`**. Open that
file, find the section you want (they're numbered and commented), edit
the text between the quotes, and save. Refresh the page to see the change.

Things currently marked `// TODO` or `[Placeholder]` need real info:
- Real email address and WhatsApp number
- Real LinkedIn/X links
- Actual officer names, photos, and bios
- Real testimonial quotes (get permission first)
- Real mentor contacts
- Event posters (drop image files into `assets/events/` and point
  `posterImage` at them)

## Adding a new event

In `js/content.js`, find the `events` array and copy an existing block:

```js
{
  id: "evt-2026-09",
  title: "Your event title",
  date: "2026-09-05",
  time: "16:00",
  endTime: "18:00",
  location: "Room / building",
  description: "One or two sentences.",
  meetingUrl: "",       // Zoom/Meet link, or leave blank
  posterImage: "",      // e.g. "assets/events/sept-hackathon.jpg"
},
```

It'll automatically show up on both the Home page (if it's one of the
next two) and the Events page, with a working "Add to Calendar" button.

## Hosting it on GitHub Pages (free)

You said your repo is already set up and empty — here's the rest:

1. **Clone your empty repo locally** (or use GitHub's web upload):
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   ```
2. **Copy every file from this project into that repo folder**, keeping
   the same folder structure (`css/`, `js/`, `assets/` etc. all at the
   root, alongside `index.html`).
3. **Commit and push:**
   ```bash
   cd YOUR-REPO-NAME
   git add .
   git commit -m "Initial SCC website"
   git push origin main
   ```
4. **Turn on GitHub Pages:**
   - Go to your repo on GitHub → **Settings** → **Pages** (left sidebar)
   - Under "Build and deployment", set **Source** to `Deploy from a branch`
   - Set **Branch** to `main` and folder to `/ (root)` → **Save**
   - GitHub will give you a live URL after a minute or two, in the form:
     - `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` (most repos), or
     - `https://YOUR-USERNAME.github.io/` (only if your repo is literally
       named `YOUR-USERNAME.github.io`)
5. **Update the placeholder URLs** in `sitemap.xml` and `robots.txt` —
   replace `REPLACE_WITH_YOUR_USERNAME` and `REPLACE_WITH_REPO_NAME`
   with your real GitHub username and repo name, then commit again.
6. **(Optional) Submit to Google Search Console** with your new URL and
   `sitemap.xml` so the site gets indexed faster.

Every time you edit a file and push (`git add . && git commit -m "..."
&& git push`), GitHub Pages redeploys automatically within a minute or two.

## Design notes

Dark "data console" theme built around the club's circular S-O-C logo:
navy-black background, gold and blue accents pulled from the logo,
monospace type for data-style labels (section numbers, dates, axis
ticks), Space Grotesk for headings. The hero animation is a canvas of
drifting dots that settle into an upward trend line — a nod to both
the logo's circles and the club's subject matter.
