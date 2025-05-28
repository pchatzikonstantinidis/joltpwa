# ⚡ JoltPWA - Universal PWA Template

> **What does "Jolt" mean?**
>
> **Jolt** means a sudden burst of energy or a spark. JoltPWA instantly gives your website a "jolt" of modern app-like power-making it faster, installable, and offline-ready. The name is short, memorable, and suggests a quick boost for any site.

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-brightgreen.svg)](https://developers.google.com/web/progressive-web-apps/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-success.svg)](package.json)
[![Joomla 5+ Ready](https://img.shields.io/badge/Joomla-5%2B%20Ready-blue.svg)](https://www.joomla.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **The most universal PWA template for any website or CMS**
> Transform any website into a Progressive Web App in under 10 minutes!

## 🎯 Latest Improvements (May 2025)

- 🎨 **Enhanced UI** - Improved text contrast, consistent hover effects, and better visual hierarchy
- 📱 **User-Friendly iOS Modal** - Simple installation guide perfect for non-technical users
- 💻 **Pro Console Logger** - Distinctive terminal-style design with improved visibility
- ⚡ **Safari Compatibility** - Added vendor prefixes for perfect iOS/Safari support
- 🔍 **Documentation** - Comprehensive guides and improvements documentation

## ✨ Key Features

- 🎯 **Zero Dependencies** – Pure web standards, no build tools or npm required
- ⚡ **Lightning Fast** – Minimal overhead, maximum performance
- 🔧 **Universal Compatibility** – Works with any website, CMS, or framework
- 🌟 **Joomla 5+ Optimized** – Special integration guide for modern Joomla
- 📱 **Cross-Platform** – Install on Android, iOS, and desktop
- 🚀 **Production Ready** – Comprehensive error handling and logging
- 🔄 **Smart Caching** – Intelligent offline support with service workers
- 🎨 **Token-Based Separation** – URL tokens separate PWA from web experience
- 📊 **Built-in Diagnostics** – Self-testing capabilities and status monitoring
- 🎯 **App Store Quality** – Meets all PWA criteria for app stores

---

## 🚀 Quick Start

### 📦 Installation

**Option 1: Download & Extract**

```bash
# Download the latest release
# Extract to your website root directory
```

**Option 2: Clone Repository**

```bash
git clone https://github.com/pchatzikonstantinidis/joltpwa.git
cd joltpwa
```

### 🔧 Basic Setup

1. **Copy Files to Your Website Root**

```
your-website/
├── manifest.json           # PWA manifest
├── offline.html            # Offline page
├── src/
│   ├── js/
│   │   ├── pwa-install.js  # Installation logic
│   │   ├── pwa-manager.js  # PWA management
│   │   └── service-worker.js # Caching & offline
│   ├── css/
│   │   ├── styles.css      # Base styles
│   │   └── pwa-styles.css  # PWA-specific styles
│   └── assets/
│       └── icons/          # All PWA icons (REPLACE THESE!)
└── index.html             # Demo page (optional)
```

2. **Add to Your HTML Template**

```html
<!-- In your <head> section -->
<link rel="manifest" href="/manifest.json" />
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/src/assets/icons/favicon-32x32.png"
/>
<link rel="apple-touch-icon" href="/src/assets/icons/apple-touch-icon.png" />

<!-- Before closing </body> -->
<script src="/src/js/pwa-install.js"></script>
<script src="/src/js/pwa-manager.js"></script>
```

3. **Replace Placeholder Icons**

- Replace all icons in `src/assets/icons/` with your app icons
- See `src/assets/icons/ICON-PLACEHOLDER-README.md` for details

4. **Customize Manifest**

```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "description": "Your app description",
  "start_url": "/index.html?token=pwa",
  "theme_color": "#your-color"
}
```

5. **Test Your PWA**

Visit: `https://yoursite.com/?token=pwa`

---

## 🌟 Special Integrations

### 🟦 Joomla 5+ Integration

```php
// Add to your template's index.php
<?php
// PWA Meta tags
echo '<link rel="manifest" href="' . $this->baseurl . '/manifest.json">';
echo '<link rel="icon" type="image/png" sizes="32x32" href="' . $this->baseurl . '/src/assets/icons/favicon-32x32.png">';
echo '<link rel="apple-touch-icon" href="' . $this->baseurl . '/src/assets/icons/apple-touch-icon.png">';
// PWA Scripts
echo '<script src="' . $this->baseurl . '/src/js/pwa-install.js"></script>';
echo '<script src="' . $this->baseurl . '/src/js/pwa-manager.js"></script>';
?>
```

📖 **[Complete Joomla Guide](docs/JOOMLA-INTEGRATION-GUIDE.md)**

### 🟩 WordPress Integration

```php
// Add to functions.php
function add_pwa_support() {
    echo '<link rel="manifest" href="' . get_site_url() . '/manifest.json">';
    echo '<link rel="icon" type="image/png" sizes="32x32" href="' . get_site_url() . '/src/assets/icons/favicon-32x32.png">';
    wp_enqueue_script('pwa-install', get_site_url() . '/src/js/pwa-install.js', [], '1.0', true);
    wp_enqueue_script('pwa-manager', get_site_url() . '/src/js/pwa-manager.js', [], '1.0', true);
}
add_action('wp_head', 'add_pwa_support');
```

### 🟨 Static Site Integration

For GitHub Pages, Netlify, Vercel, etc. – just copy files and update paths in your HTML.

---

## 📱 How It Works

### 🔗 URL Token System

JoltPWA uses a smart token system to separate PWA mode from regular web browsing:

- **Web Mode:** `https://yoursite.com/` (regular website)
- **PWA Mode:** `https://yoursite.com/?token=pwa` (app-like experience)

```javascript
// Detect PWA mode
const isPWAMode = new URLSearchParams(window.location.search).get('token') === 'pwa';
// Manifest ensures PWA always launches with token
"start_url": "/index.html?token=pwa"
```

### 📱 Installation Process

1. **Android:** Tap "Install" button or browser menu → "Add to Home screen"
2. **iOS:** Safari share button → "Add to Home Screen"
3. **Desktop:** Install icon in address bar or browser prompt

### 🔄 Offline Support

- Service worker caches essential files
- Graceful fallback to offline page
- Smart cache management and updates

---

## 🧪 Testing & Validation

### 🔍 Built-in Diagnostics

Open `index.html` for a comprehensive demo with:

- ✅ PWA status checks and compatibility testing
- 📱 Platform-specific installation guides
- 🧪 Service worker and offline functionality tests
- 📊 Real-time console output and logging analysis
- 🔬 Full PWA diagnostics suite

### 🔧 Manual Testing Checklist

- [ ] Icons display correctly in browser tab
- [ ] Install prompt appears on supported devices
- [ ] App installs successfully on mobile devices
- [ ] Offline page loads when disconnected
- [ ] PWA launches with correct start URL (?token=pwa)
- [ ] Service worker registers without errors

---

## 🎨 Customization

### 🖼️ Icons & Branding

Replace placeholder icons in `src/assets/icons/`:

- `favicon-16x16.png` & `favicon-32x32.png` – Browser favicons
- `android-chrome-192x192.png` & `android-chrome-512x512.png` – Android icons
- `apple-touch-icon.png` – iOS home screen icon
- `maskable-icon.png` – Android adaptive icon

### 🎨 Styling

- `src/css/styles.css` – Base website styles
- `src/css/pwa-styles.css` – PWA-specific UI elements
- Update colors, fonts, and layout to match your brand

### ⚙️ Configuration

Edit `manifest.json`:

```json
{
  "name": "Your Amazing App",
  "short_name": "YourApp",
  "description": "Your app description",
  "theme_color": "#your-brand-color",
  "background_color": "#your-bg-color",
  "start_url": "/your-start-page.html?token=pwa"
}
```

---

## 📊 Logging & Debugging

JoltPWA uses standardized logging format:

```
🔧 JoltPWA | [Component] [Action]: [Details]
```

**Examples:**

```
🔧 JoltPWA | ServiceWorker Install: Cache created successfully
🔧 JoltPWA | Install Button: Android install prompt triggered
🔧 JoltPWA | PWA Manager: Running in PWA mode (token detected)
```

**View Logs:**

- Browser DevTools → Console
- Demo page live console output
- Download logs from demo page

---

## 🚀 Production Deployment

### ✅ Pre-Launch Checklist

- [ ] Replace all placeholder icons with your branding
- [ ] Update `manifest.json` with your app details
- [ ] Test installation on Android and iOS devices
- [ ] Verify offline functionality works
- [ ] Check PWA compliance with Lighthouse
- [ ] Test on your actual domain (HTTPS required)

### 🌐 CDN & Performance

- All files are static – perfect for CDN deployment
- Minimal file sizes for fast loading
- Service worker handles caching automatically
- No external dependencies to slow things down

### 🔒 Security Considerations

- HTTPS required for service workers (automatic on most hosting)
- Service worker only caches your domain assets
- No external scripts or tracking by default

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🐛 Bug Reports

- Use GitHub Issues with detailed reproduction steps
- Include browser/device information
- Provide console error messages

### 💡 Feature Requests

- Check existing issues first
- Describe use case and expected behavior
- Consider backwards compatibility

---

## 📚 Documentation

- **[📋 Complete Documentation](docs/README.md)** – Full technical docs
- **[🌟 Joomla Integration Guide](docs/JOOMLA-INTEGRATION-GUIDE.md)** – Joomla 5+ setup
- **[📊 Logging Standards](docs/LOGGING-STANDARDS.md)** – Debugging guidelines
- **[🔔 Notification Standards](docs/NOTIFICATION-STANDARDS.md)** – User messaging
- **[🤝 Contributing Guide](CONTRIBUTING.md)** – Development guidelines

---

## 🌟 Real-World Examples

### 🏢 Business Websites

Perfect for:

- Company websites needing mobile app presence
- E-commerce sites with offline browsing
- Restaurant menus and contact info
- Professional portfolios

### 📰 Content Sites

Great for:

- News sites with offline reading
- Blogs with app-like navigation
- Documentation sites
- Educational content

### 🛠️ Developer Tools

Ideal for:

- Admin panels and dashboards
- Internal tools and utilities
- Developer documentation
- API testing interfaces

---

## 📈 PWA Benefits

### 👥 For Users

- 📱 **App-like Experience** – Native feel without app store
- ⚡ **Faster Loading** – Cached resources load instantly
- 📴 **Works Offline** – Access content without connection
- 🔕 **No Storage Worry** – Smaller than native apps

### 💼 For Businesses

- 💰 **Cost Effective** – One codebase for all platforms
- 📊 **Better Engagement** – App-like experience increases usage
- 🚀 **Easy Distribution** – Share a simple URL instead of app store
- 📈 **SEO Benefits** – Still indexed by search engines

---

## 🆚 Why Choose JoltPWA?

| Feature         | JoltPWA         | Other PWA Solutions |
| --------------- | --------------- | ------------------- |
| Dependencies    | Zero ⚡         | Usually many 📦     |
| Setup Time      | < 10 minutes ⏱️ | Hours or days 🕐    |
| CMS Integration | Universal 🌐    | Limited 🔒          |
| File Size       | Minimal 🪶      | Often bloated 📊    |
| Customization   | Full control 🎨 | Template-based 🎭   |
| Learning Curve  | Gentle 📈       | Steep 🧗            |

---

## 📄 License

MIT License – see [LICENSE](LICENSE) file for details.

---

<div align="center">

**⚡ Ready to give your website superpowers? ⚡**

[🚀 Get Started](#-quick-start) | [📚 Documentation](docs/) | [🐛 Report Issues](../../issues) | [⭐ Star on GitHub](../../)

Made with ❤️ for the web development community

</div>
