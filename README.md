# GitHub Pages

This folder is ready for GitHub Pages with no build step.

## Local preview

Open [index.html](./index.html) in a browser.

## Publish on GitHub

1. Create a GitHub repository and upload this project folder.
2. Go to `Settings -> Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main` and folder `/docs`.
5. Save and wait for GitHub Pages to publish.

Your site URL will look like:

`https://<your-username>.github.io/<your-repo-name>/`

## Files

- `index.html`: the page shell and CDN dependencies
- `app.jsx`: the interactive literature map
- `.nojekyll`: disables Jekyll processing for safer static hosting
