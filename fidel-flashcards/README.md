# Fidel Flashcards

A modernized, responsive Ge’ez and Amharic learning app.

## What's included
- Responsive website layout for desktop, tablet and mobile
- Flashcards, quiz, fill-in-the-gap practice and Fidel chart
- Editable decks and browser-local progress
- PWA manifest, app icons and offline service worker
- Capacitor configuration for a future Android/iOS native wrapper

## Publish the website / installable PWA
1. Upload the contents of this folder to a static host such as Netlify, Vercel or GitHub Pages.
2. Make sure the site is served over HTTPS.
3. Open the public URL in Chrome or Safari.
4. On supported browsers use **Install app** or the browser's **Add to Home Screen** option.

The app uses browser local storage for custom cards and progress. That data is stored separately on each browser/device. Use **Edit cards → Copy all cards** to export your cards and move them to another device.

## Run locally
For a quick local preview, use a static server (service workers require localhost or HTTPS):
```bash
npx serve .
```

## Android / iOS native app wrapper
This folder includes a Capacitor starter configuration. To create native projects:
```bash
npm install
npx cap add android
npx cap add ios
npx cap sync
```
Then open the native project:
```bash
npx cap open android
npx cap open ios
```
Android builds require Android Studio and the Android SDK. iOS builds require macOS and Xcode. App Store / Google Play publishing requires developer accounts and store review.

## Important
The PWA can be installed from the published website without building a separate store app. The Capacitor files are a starter wrapper configuration, not compiled APK/IPA binaries.
