// Simple PWA Manager - UI Separation Only
class SimplePWAManager {
    constructor() {
        this.isPWAMode = false;
        this.isStandalone = false;
        this.init();
    }

    async init() {
        this.detectPWAMode();
        this.registerServiceWorker();
        this.setupNavigationInterception();
        this.applyPWAStyles();
    }

    // Detect if we're in PWA mode
    detectPWAMode() {
        // Check URL for token
        const urlParams = new URLSearchParams(window.location.search);
        const hasToken = urlParams.has('token') && urlParams.get('token') === 'pwa';

        // Check if standalone mode
        this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                           window.navigator.standalone === true ||
                           window.matchMedia('(display-mode: fullscreen)').matches;

        this.isPWAMode = hasToken || this.isStandalone;

        console.log('🔧 JoltPWA | Status:', {
            isPWAMode: this.isPWAMode,
            isStandalone: this.isStandalone,
            hasToken: hasToken
        });

        // Store in body class for CSS
        document.body.classList.toggle('pwa-mode', this.isPWAMode);
        document.body.classList.toggle('standalone-mode', this.isStandalone);

        // Update PWA status indicator
        this.updatePWAStatus();
    }

    // Update PWA status display
    updatePWAStatus() {
        const statusElement = document.getElementById('pwa-status');
        if (statusElement) {
            if (this.isPWAMode) {
                statusElement.textContent = this.isStandalone ? '📱 Standalone App' : '📱 PWA Mode';
                statusElement.classList.remove('hidden');
            } else {
                statusElement.classList.add('hidden');
            }
        }
    }

    // Register service worker
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/src/js/service-worker.js');
                console.log('🔧 JoltPWA | Service Worker registered successfully:', registration.scope);

                // Check service worker status using message API
                this.checkServiceWorkerStatus();

            } catch (error) {
                console.error('🔧 JoltPWA | Service Worker error:', error);
            }
        }
    }

    // Check service worker status via messaging
    checkServiceWorkerStatus() {
        if (navigator.serviceWorker.controller) {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                console.log('🔧 JoltPWA | SW status:', event.data);
            };

            navigator.serviceWorker.controller.postMessage({
                type: 'GET_PWA_STATUS'
            }, [messageChannel.port2]);
        }
    }

    // Intercept navigation to maintain token
    setupNavigationInterception() {
        if (!this.isPWAMode) return;

        // Intercept all links
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link && link.href) {
                // Check if this is a web mode switch link (should not get PWA token)
                const isWebModeSwitch = link.textContent &&
                    (link.textContent.includes('Web Mode') ||
                     link.textContent.includes('🌐') ||
                     link.href === window.location.origin + '/' ||
                     link.href === window.location.origin + window.location.pathname ||
                     (link.href.includes('?') === false && link.getAttribute('href') === '?'));

                if (isWebModeSwitch) {
                    // Don't modify web mode switch links
                    return;
                }

                // Only modify internal links
                try {
                    const linkUrl = new URL(link.href);
                    const currentUrl = new URL(window.location.href);

                    if (linkUrl.origin === currentUrl.origin && !linkUrl.searchParams.has('token')) {
                        linkUrl.searchParams.set('token', 'pwa');
                        link.href = linkUrl.toString();
                    }
                } catch (error) {
                    // Handle relative URLs
                    if (!link.href.startsWith('http') && !link.href.includes('token=')) {
                        const separator = link.href.includes('?') ? '&' : '?';
                        link.href = `${link.href}${separator}token=pwa`;
                    }
                }
            }
        });

        // Intercept forms
        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (form && form.method.toLowerCase() === 'get') {
                try {
                    const formUrl = new URL(form.action || window.location.href);
                    if (!formUrl.searchParams.has('token')) {
                        formUrl.searchParams.set('token', 'pwa');
                        form.action = formUrl.toString();
                    }
                } catch (error) {
                    console.warn('[PWA Manager] Could not modify form action:', error);
                }
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            if (!window.location.search.includes('token=pwa')) {
                const url = new URL(window.location.href);
                url.searchParams.set('token', 'pwa');
                window.history.replaceState({}, '', url.toString());
            }
        });
    }

    // Apply PWA-specific styles
    applyPWAStyles() {
        if (!this.isPWAMode) return;

        // Add PWA-specific CSS
        const style = document.createElement('style');
        style.textContent = `
            /* PWA Mode Styles */
            .pwa-mode {
                --pwa-accent: #366809;
                --pwa-background: #f8f9fa;
            }

            .pwa-mode header {
                background-color: var(--pwa-accent) !important;
                color: white !important;
            }

            .pwa-mode .navbar {
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            /* Standalone mode adjustments */
            .standalone-mode {
                padding-top: env(safe-area-inset-top);
                padding-bottom: env(safe-area-inset-bottom);
            }

            .standalone-mode header {
                position: sticky;
                top: 0;
                z-index: 1000;
            }

            /* PWA indicators */
            .pwa-mode::before {
                content: "📱 PWA Mode";
                position: fixed;
                top: 10px;
                right: 10px;
                background: var(--pwa-accent);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 9999;
                opacity: 0.8;
            }

            @media (display-mode: standalone) {
                .pwa-mode::before {
                    content: "📱 PWA Standalone";
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Get PWA status
    getStatus() {
        return {
            isPWAMode: this.isPWAMode,
            isStandalone: this.isStandalone,
            hasToken: new URLSearchParams(window.location.search).has('token')
        };
    }

    // Helper method to create PWA URLs
    createPWAUrl(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            if (!urlObj.searchParams.has('token')) {
                urlObj.searchParams.set('token', 'pwa');
            }
            return urlObj.toString();
        } catch (error) {
            const separator = url.includes('?') ? '&' : '?';
            return url.includes('token=') ? url : `${url}${separator}token=pwa`;
        }
    }

    // Public method to navigate in PWA mode
    navigateTo(url) {
        if (this.isPWAMode) {
            window.location.href = this.createPWAUrl(url);
        } else {
            window.location.href = url;
        }
    }

    // Public method to check if in PWA mode
    isPWA() {
        return this.isPWAMode;
    }
}

// Global instance and initialization
let pwaManager;

// Expose to global scope for easy access
window.PWA = {
    navigateTo: (url) => pwaManager?.navigateTo(url),
    isPWA: () => pwaManager?.isPWA() || false,
    createPWAUrl: (url) => pwaManager?.createPWAUrl(url) || url,
    manager: null
};

// Initialize PWA Manager when DOM is ready
function initializePWA() {
    if (!pwaManager) {
        pwaManager = new SimplePWAManager();
        window.PWA.manager = pwaManager;
        console.log('🔧 JoltPWA | Manager initialized');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePWA);
} else {
    initializePWA();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimplePWAManager;
}
