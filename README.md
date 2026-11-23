# Airlock site

The public website, study guide, support pages, and privacy policy for the Airlock iPhone app.

## Local preview

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm test
npm run preview
```

GitHub Actions publishes `dist/` to GitHub Pages after each push to `main`.

## When Airlock ships

When a new version appears on the [US App Store](https://apps.apple.com/us/app/airlock-breathe-focus/id6808816509), compare its release notes and shipped screens with the homepage demo, study guide, support instructions, and privacy policy. Check pricing, iOS requirements, and the default Airtime example. Update any affected copy, media, and matching assertions in `tests/seo.test.mjs`.

After deployment, open the changed public pages and follow their download links. The weekly website review also checks both printable worksheets and their references.
