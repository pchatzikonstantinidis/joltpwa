# JoltPWA Joomla 5+ Integration Guide

This guide explains how to add JoltPWA to your Joomla 5+ website. The same approach works for any CMS or static site.

## 1. Copy Files

Copy the following files and folders to your Joomla template or root directory:

```
templates/your-template/
├── manifest.json
├── service-worker.js
├── src/
│   ├── js/
│   │   ├── pwa-install.js
│   │   ├── pwa-manager.js
│   │   └── service-worker.js
│   ├── css/
│   │   ├── styles.css
│   │   └── pwa-styles.css
│   └── assets/
│       └── icons/ (all icon files)
├── offline.html
```

## 2. Add to Your Template

In your Joomla template's `index.php` (or equivalent), add the following in the `<head>`:

```html
<link rel="manifest" href="/manifest.json" />
<link rel="stylesheet" href="/src/css/styles.css" />
<link rel="stylesheet" href="/src/css/pwa-styles.css" />
<script src="/src/js/pwa-install.js"></script>
<script src="/src/js/pwa-manager.js"></script>
```

## 3. Add Install Buttons

Add the following where you want the install buttons to appear:

```html
<div class="pwa-install-buttons-wrap">
  <button id="android-install-button">Install on Android</button>
  <button id="ios-install-button">Install on iOS</button>
</div>
```

## 4. Test

Visit your site with `?token=pwa` in the URL to activate PWA mode.

## 5. Customize

- Update `manifest.json` with your app details
- Replace icons in `src/assets/icons/`
- Edit `offline.html` for your offline message
- Adjust styles in `src/css/`

JoltPWA is now ready for your Joomla 5+ site!
