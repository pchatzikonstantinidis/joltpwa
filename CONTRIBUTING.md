# Contributing to JoltPWA

Thank you for considering contributing to JoltPWA! This document outlines the process for contributing to the project and how to get started.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be kind and collaborative.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment details (browser, OS, device)

### Suggesting Features

We welcome feature suggestions! To suggest a feature:

1. Check existing issues to see if it's already been suggested
2. Create a new issue with the tag "enhancement"
3. Clearly describe the feature and its benefits
4. Provide examples of how it would work (if possible)

### Pull Requests

We welcome pull requests! To submit a pull request:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a pull request

Please ensure your code follows the existing style and includes appropriate comments.

## Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/joltpwa.git
   cd joltpwa
   ```

2. No build tools required! This project uses vanilla JavaScript, HTML, and CSS.

3. You can use any web server to serve the files:

   ```bash
   # Using PHP's built-in server
   php -S localhost:8000

   # Or using Python
   python -m http.server 8000
   ```

## Project Structure

```
joltpwa/
├── manifest.json           # PWA manifest
├── offline.html            # Offline page
├── src/
│   ├── js/
│   │   ├── pwa-install.js  # Installation logic
│   │   ├── pwa-manager.js  # PWA management
│   │   └── service-worker.js # Caching & offline
│   ├── css/
│   │   └── styles.css      # Styles
│   └── assets/
│       └── icons/          # PWA icons
├── docs/                   # Documentation
└── index.html              # Demo page
```

## Coding Standards

- **HTML**: Use semantic HTML5 elements
- **CSS**: Follow BEM naming convention
- **JavaScript**: Use ES6+ features but maintain compatibility with modern browsers
- **Commits**: Use clear, descriptive commit messages

## Testing

Before submitting, please test your changes:

1. On multiple browsers (Chrome, Firefox, Safari, Edge)
2. On mobile devices (Android and iOS if possible)
3. Test PWA installation on each platform
4. Verify offline functionality

## Documentation

If you add new features, please update the documentation:

1. Add explanations in the appropriate markdown files
2. Update code comments as needed
3. Update the README.md if your changes affect the overall usage

## License

By contributing to JoltPWA, you agree that your contributions will be licensed under the project's MIT License.

Thank you for helping improve JoltPWA! 🚀
