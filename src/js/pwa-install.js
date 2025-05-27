// JoltPWA Installation Manager - Universal PWA for Joomla 5+
// Complete platform-specific installation experience

class JoltPWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.platform = this.detectPlatform();
        this.isInstalled = this.checkIfInstalled();
        this.isStandalone = this.checkStandaloneMode();

        // Clean, helpful logging
        console.log('🔧 JoltPWA | Status:', {
            platform: this.platform,
            isInstalled: this.isInstalled,
            isStandalone: this.isStandalone
        });

        this.init();
    }

    detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();

        if (/iphone|ipad|ipod/.test(userAgent)) {
            return 'ios';
        } else if (/android/.test(userAgent)) {
            return 'android';
        } else if (/windows/.test(userAgent)) {
            return 'windows';
        } else if (/macintosh|mac os x/.test(userAgent)) {
            return 'macos';
        } else {
            return 'desktop';
        }
    }

    checkIfInstalled() {
        // Check multiple indicators for installation
        return (
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true ||
            document.referrer.includes('android-app://') ||
            localStorage.getItem('pwa-installed') === 'true'
        );
    }

    checkStandaloneMode() {
        return (
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true
        );
    }

    init() {
        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => this.handleInstallPrompt(e));

        // Listen for successful installation
        window.addEventListener('appinstalled', (e) => this.handleAppInstalled(e));

        // Initialize UI when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeUI());
        } else {
            this.initializeUI();
        }
    }

    handleInstallPrompt(event) {
        console.log('🔧 JoltPWA | Install prompt detected:', this.platform);

        // Prevent the default browser install prompt
        event.preventDefault();

        // Store the event for later use
        this.deferredPrompt = event;

        // Show appropriate install button
        this.showInstallOptions();
    }

    handleAppInstalled(event) {
        console.log('🔧 JoltPWA | Installed successfully');

        // Mark as installed
        localStorage.setItem('pwa-installed', 'true');
        this.isInstalled = true;

        // Hide install buttons
        this.hideInstallButtons();

        // Show success notification
        this.showNotification('✅ App installed successfully!', 'success');

        // Reset prompt
        this.deferredPrompt = null;
    }

    initializeUI() {
        // If already installed, hide install buttons
        if (this.isInstalled || this.isStandalone) {
            this.hideInstallButtons();
            return;
        }

        // Setup platform-specific buttons
        this.setupInstallButtons();

        // Show install buttons without complex platform-specific styling
        this.showInstallButtons();
    }

    setupInstallButtons() {
        const androidBtn = document.getElementById('android-install-button');
        const iosBtn = document.getElementById('ios-install-button');

        if (androidBtn) {
            androidBtn.addEventListener('click', () => this.handleAndroidInstall());
        }

        if (iosBtn) {
            iosBtn.addEventListener('click', () => this.handleIOSInstall());
        }
    }

    showInstallButtons() {
        // Simplified - just show both buttons without complex styling
        const androidBtn = document.getElementById('android-install-button');
        const iosBtn = document.getElementById('ios-install-button');

        if (androidBtn) {
            androidBtn.style.display = 'inline-flex';
        }
        if (iosBtn) {
            iosBtn.style.display = 'inline-flex';
        }
    }

    showInstallOptions() {
        const androidBtn = document.getElementById('android-install-button');
        const iosBtn = document.getElementById('ios-install-button');

        // Show buttons based on platform and availability
        if (this.deferredPrompt && androidBtn) {
            androidBtn.style.display = 'inline-flex';
            androidBtn.classList.add('install-available');
        }

        if (iosBtn) {
            iosBtn.style.display = 'inline-flex';
        }
    }

    async handleAndroidInstall() {
        if (!this.deferredPrompt) {
            console.log('🔧 JoltPWA | Install prompt not available');
            this.showFallbackInstructions('android');
            return;
        }

        try {
            console.log('🔧 JoltPWA | Starting Android installation');

            // Show loading state
            this.setButtonLoading('android-install-button', true);

            // Show the install prompt
            this.deferredPrompt.prompt();

            // Wait for user choice
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`🔧 JoltPWA | User response: ${outcome}`);

            if (outcome === 'accepted') {
                console.log('🔧 JoltPWA | Installation accepted');
                this.showNotification('🎉 Installation in progress...', 'success');
            } else {
                console.log('🔧 JoltPWA | Installation dismissed');
                this.showNotification('ℹ️ Installation was cancelled', 'info');
            }

            // Reset prompt
            this.deferredPrompt = null;

        } catch (error) {
            console.error('🔧 JoltPWA | Installation error:', error);
            this.showNotification('❌ Installation error', 'error');
        } finally {
            this.setButtonLoading('android-install-button', false);
        }
    }

    handleIOSInstall() {
        console.log('🔧 JoltPWA | Showing iOS install instructions');

        // Check if already installed
        if (window.navigator.standalone) {
            this.showNotification('✅ App is already installed!', 'success');
            return;
        }

        this.showIOSInstallModal();
    }

    showIOSInstallModal() {
        // Remove existing modal if present
        const existingModal = document.querySelector('.pwa-ios-modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        // Create user-friendly modal
        const modal = document.createElement('div');
        modal.className = 'pwa-ios-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `
            <div class="pwa-ios-modal">
                <div class="pwa-ios-modal-header">
                    <h3>📱 Add to iPhone</h3>
                    <button class="pwa-ios-modal-close" aria-label="Close">×</button>
                </div>
                <div class="pwa-ios-modal-body">
                    <div class="pwa-ios-steps">
                        <div class="pwa-ios-step">
                            <div class="pwa-ios-step-number">1</div>
                            <div class="pwa-ios-step-content">
                                <h4>Tap the Share Button</h4>
                                <p>Look for the share icon at the bottom of Safari and tap it</p>
                                <div class="pwa-ios-visual">📤</div>
                            </div>
                        </div>
                        <div class="pwa-ios-step">
                            <div class="pwa-ios-step-number">2</div>
                            <div class="pwa-ios-step-content">
                                <h4>Find "Add to Home Screen"</h4>
                                <p>Scroll down in the menu and tap "Add to Home Screen"</p>
                                <div class="pwa-ios-visual">📱 Add to Home Screen</div>
                            </div>
                        </div>
                        <div class="pwa-ios-step">
                            <div class="pwa-ios-step-number">3</div>
                            <div class="pwa-ios-step-content">
                                <h4>Tap "Add"</h4>
                                <p>Confirm by tapping the "Add" button</p>
                                <div class="pwa-ios-visual">✅ Add</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pwa-ios-footer">
                    <p>That's it! You'll find the app on your home screen.</p>
                    <button class="pwa-ios-understand-btn">Perfect! 👍</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add animation class after a brief delay
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Setup close functionality
        const closeBtn = modal.querySelector('.pwa-ios-modal-close');
        const understandBtn = modal.querySelector('.pwa-ios-understand-btn');

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (understandBtn) {
            understandBtn.addEventListener('click', closeModal);
        }

        // Close when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close with escape key
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);
    }

    showFallbackInstructions(platform) {
        // Create detailed instructions based on platform
        const instructions = platform === 'android'
            ? 'To install:\n1. Open your browser menu\n2. Select "Install app" or "Add to Home Screen"'
            : 'To install:\n1. Tap the share button\n2. Select "Add to Home Screen"';

        // Show the instructions in a notification
        this.showNotification(instructions, 'info', 5000);

        // Show helpful success message after a delay
        if (platform === 'ios') {
            setTimeout(() => {
                this.showNotification('The app will appear on your home screen!', 'success', 4000);
            }, 1000);
        }
    }

    setButtonLoading(buttonId, loading) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
            const originalText = button.innerHTML;
            button.dataset.originalText = originalText;
            button.innerHTML = `
                <div class="loading-spinner"></div>
                <span>Installing...</span>
            `;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
            }
        }
    }

    hideInstallButtons() {
        const buttons = document.querySelectorAll('.pwa-install-buttons-wrap, #android-install-button, #ios-install-button');
        buttons.forEach(button => {
            if (button) {
                button.style.display = 'none';
            }
        });
    }

    showNotification(message, type = 'info', duration = 3000) {
        // Find existing notifications to stack
        const existingNotifications = document.querySelectorAll('.pwa-notification');
        let stackOffset = 0;

        // Calculate offset for stacking - use more spacing on larger screens
        const isSmallScreen = window.innerWidth < 768;
        const offsetIncrement = isSmallScreen ? 5 : 10;

        existingNotifications.forEach(existing => {
            if (existing.classList.contains('show')) {
                stackOffset += offsetIncrement;
            }
        });

        // Create simplified notification with clean, minimal design
        const notification = document.createElement('div');
        notification.className = `pwa-notification pwa-notification-${type}`;

        // Simplified HTML structure - no icon container
        notification.innerHTML = `
            <div class="pwa-notification-content">
                <span class="pwa-notification-message">${message}</span>
                <button class="pwa-notification-close" aria-label="Close">×</button>
            </div>
        `;

        // Apply stacking position
        if (stackOffset > 0) {
            notification.style.top = `${20 + stackOffset}px`;
        }

        document.body.appendChild(notification);

        // Show notification with a slight delay to allow for animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto-hide after duration
        const hideTimeout = setTimeout(() => {
            this.hideNotification(notification);
        }, duration);

        // Setup close button
        const closeBtn = notification.querySelector('.pwa-notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            this.hideNotification(notification);
        });

        // Log notification display
        console.log(`🔧 JoltPWA | Notification (${type}):`, message);

        return notification;
    }

    hideNotification(notification) {
        if (!notification) return;

        // Add hide class for smooth exit animation
        notification.classList.add('hide');
        notification.classList.remove('show');

        // Remove from DOM after animation completes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);

                // Reposition remaining notifications for a cleaner stack
                const remainingNotifications = document.querySelectorAll('.pwa-notification.show');
                const isSmallScreen = window.innerWidth < 768;
                const offsetIncrement = isSmallScreen ? 5 : 10;

                remainingNotifications.forEach((note, index) => {
                    const newTop = 20 + (index * offsetIncrement);
                    // Use transform for smoother animation
                    note.style.transition = 'transform 0.3s ease, top 0.3s ease';
                    note.style.top = `${newTop}px`;
                });
            }
        }, 300);
    }

    // Public method to check installation status
    getInstallationStatus() {
        return {
            platform: this.platform,
            isInstalled: this.isInstalled,
            isStandalone: this.isStandalone,
            promptAvailable: !!this.deferredPrompt
        };
    }
}

// Initialize the enhanced PWA installer when the script loads
window.JoltPWAInstaller = new JoltPWAInstaller();

// Expose for debugging
window.PWAInstaller = window.JoltPWAInstaller;

console.log('🔧 JoltPWA | Installer loaded');
