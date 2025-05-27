# JoltPWA Logging Standards

JoltPWA uses a standardized logging format for all console output to make debugging and filtering easy.

## Format

```
🔧 JoltPWA | [context]: [details]
```

### Examples

- `🔧 JoltPWA | Service Worker loaded` - Simple status message
- `🔧 JoltPWA | Installer loaded` - Component initialization
- `🔧 JoltPWA | Status: { isPWAMode: true, isStandalone: false }` - Object logging
- `🔧 JoltPWA | Install prompt detected: android` - Context with platform info
- `🔧 JoltPWA | Error: Network connection failed` - Error message

### Usage

```js
console.error("🔧 JoltPWA | [context]: [error details]", errorObject);
```

## Why Standardize?

1. **Easy Filtering** - Logs can be filtered in browser console with "JoltPWA"
2. **Consistency** - All modules/components use the same format
3. **Debugging** - Quickly identify PWA-related logs

When debugging issues with the PWA, filter the browser console with "JoltPWA" to see only relevant logs.
