# Contributing to CoreMatch

Thanks for wanting to help! CoreMatch is a student project that helps Pakistani developers, designers and marketers find collaborators. Beginners are very welcome, and no contribution is too small.

## Ways to contribute

- **Report a bug:** open an issue with the Bug report template.
- **Suggest a feature or a design improvement:** open an issue with the Feature request template.
- **Improve the docs:** fix typos, unclear steps or the README.
- **Pick up a `good first issue`:** these are small, well-explained tasks.

## Run the project locally

You only need a browser and Git. There is no build step yet.

```bash
git clone https://github.com/urfaashahid06-coder/CoreMatch.git
cd CoreMatch
```

Open `index.html` in your browser, or serve the folder:

```bash
npx serve .
```

## Project structure

```
index.html     # all screens (hash routing: #home, #discover, ...)
css/style.css  # design tokens, layout, animation
js/app.js      # sample data, match score, filters, chat, agreement flow
assets/        # logo and images
docs/          # screenshots used in the README
```

## How to send a change

1. **Fork** the repo and **clone** your fork.
2. Create a branch with a clear name:
   ```bash
   git checkout -b fix/search-empty-state
   ```
3. Make your change and test it in the browser. Click through the screens you touched and check the browser console (F12) for errors.
4. Commit in small steps with clear messages (see below).
5. Push your branch and open a **pull request** against `main`. Say what changed and why, and add a screenshot for visual changes.
6. Respond to review comments politely. Reviews are about the code, not about you.

## Commit messages

Use a short prefix, then a description:

| Prefix | Use for |
|---|---|
| `feat:` | a new feature |
| `fix:` | a bug fix |
| `docs:` | documentation only |
| `style:` | visual or formatting changes |
| `refactor:` | code cleanup with no behavior change |

Good: `fix: show a message when search finds nothing`
Not good: `update files`

## Code guidelines

- Keep it plain HTML, CSS and JavaScript for now. Please do not add frameworks or build tools without opening an issue first.
- Use the existing design tokens in `css/style.css` (`--mint`, `--amber`, `--bg`, `--card`) instead of new hard-coded colors.
- Keep the page responsive and keyboard accessible: visible focus styles, labels on inputs, and `alt` text on images.
- Respect reduced-motion settings for any new animation.
- Never commit secrets such as API keys or passwords. When a backend is added, secrets go in `.env` files that are ignored by Git.
- The profiles in `js/app.js` are made-up sample data. Please do not add real people's names, photos or contact details.

## Using AI tools

AI tools are fine to use. If you used one, mention it in your pull request, and make sure you understand the change and can explain it.

## Be kind

Be respectful and patient, especially with people who are new to open source. Harassment or discrimination of any kind is not accepted, and such comments may be removed.

## Questions

Open an issue with your question and we will help. By contributing, you agree that your work is released under the [MIT License](LICENSE).
