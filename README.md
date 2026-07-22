# Your Name — Academic Site

A single-page academic portfolio built with plain HTML/CSS/JS — no build
step, no framework, works directly on GitHub Pages.

## Structure

```
.
├── index.html      # all content lives here
├── style.css       # all styling / design tokens (colors, fonts, layout)
├── script.js       # footer year + scroll-reveal animation
└── assets/
    ├── photo.jpg   # your headshot (add this file)
    └── CV.pdf      # your résumé (add this file)
```

## 1. Fill in your content

Open `index.html` and replace every `[BRACKETED PLACEHOLDER]` with your real
text: name, role, bio, experience/education entries, and publications.

- To add or remove a job/degree, copy or delete a `<li class="timeline__item">…</li>` block inside `#experience`.
- To add or remove a paper, copy or delete a `<li class="biblio__item">…</li>` block inside `#publications` (the numbers `[1] [2] [3]` are just text — update them if you reorder entries).

## 2. Add your images

Drop these two files into the `assets/` folder:
- `photo.jpg` — a square headshot works best (it's cropped into a circle).
- `CV.pdf` — your résumé, linked from the "Résumé" button in the hero.

If `photo.jpg` is missing, the circle simply stays empty — the page won't break.

## 3. Preview locally (optional)

You can just double-click `index.html` to open it in a browser. For a closer-to-production preview:

```bash
cd site
python3 -m http.server 8000
# then open http://localhost:8000
```

## 4. Publish on GitHub Pages

1. Create a new GitHub repository. If it's named exactly
   `your-username.github.io`, your site will be published at the root
   domain (`https://your-username.github.io`). Any other repo name works
   too, but the site will live at `https://your-username.github.io/repo-name`.
2. Push these files to the repository's default branch (usually `main`):
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, select `main` and folder `/ (root)`, then **Save**.
6. Wait a minute or two — GitHub will show you the live URL at the top of
   that same Pages settings screen.

Every time you push a change to `main`, the site rebuilds automatically
within a minute or so.

## Customizing further

All colors, fonts, and spacing are defined as CSS custom properties at the
top of `style.css` under `:root`. Change a value there (e.g. `--teal`) and
it updates everywhere it's used.
