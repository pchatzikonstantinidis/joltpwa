# JoltPWA Notification System

The notification system in JoltPWA follows a minimal, modern design approach. This document outlines the notification standards and best practices.

## Principles

1. **Minimal UI** - No icons unless necessary, compact and clean
2. **Responsive** - Works on all screen sizes
3. **Stacking** - Multiple notifications stack with subtle offset
4. **Progress Bar** - Subtle, transparent progress bar for auto-dismiss
5. **Standardized Logging** - Use: `🔧 JoltPWA | [context]: [details]`

## Usage Example

```js
this.showNotification("✅ App installed successfully!", "success");
```

## Notification Types

- `info` (default)
- `success`
- `error`

## Customization

- Edit `src/css/pwa-styles.css` for appearance
- Edit `showNotification()` in `src/js/pwa-install.js` for logic
