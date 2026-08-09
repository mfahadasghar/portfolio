# Fahad Asghar — Portfolio

Plain HTML/CSS/JS, no build step. Open `index.html` in a browser, or run a
local server (see below), or deploy the folder as-is.

## Add a game

Open `js/data.js`, copy one block inside the `GAMES` array, edit the fields,
save. The site re-renders from this file automatically — no HTML editing.

- Leave `image` empty and the card shows a clean placeholder with the title
  on it, so the site still looks finished before you have screenshots.
- `status: "live"` + `embedUrl` gets a **Play here** button that opens the
  game in a modal on your site. `playUrl` gets an **Open ↗** link that opens
  it in a new tab. You can set either or both.
  - Note: embedding only works if the game's host allows it. Some platforms
    (itch.io game pages, your own hosted build) allow it; some block it with
    `X-Frame-Options`. If embedding doesn't work, just use `playUrl`.
- `status: "prototype"` (unpublished games) skips the play button. Add a
  `youtubeId` for a **Watch preview** button, or an `images` array of
  screenshot paths for a **View photos** button.
- `orientation: "landscape"` or `"portrait"` controls the thumbnail shape —
  mix and match freely, the grid handles both.

## Add a course

Same idea in the `COURSES` array at the bottom of `js/data.js`.

## Add real images

Drop files into `assets/games/` or `assets/profile/`, then reference them
as `"assets/games/your-file.jpg"` in `data.js`.

## Preview locally

Opening `index.html` directly works for everything except the theme
persisting across a fresh reload with `file://` in some browsers. If you
want it fully accurate, run a tiny local server from this folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → pick `main` and `/ (root)`.
3. Your site is live at `https://<username>.github.io/<repo>/`.

## Things to fill in before it's "done"

- `js/data.js` → `PROFILE.email`, `PROFILE.avatar`, the GitHub link URL,
  and your Upwork/LinkedIn URLs are already filled in from your profile.
- Real `playUrl`/`embedUrl` for each live game.
- Screenshots or YouTube IDs for the prototypes.
- The rest of your Udemy courses (only one is filled in as an example).
