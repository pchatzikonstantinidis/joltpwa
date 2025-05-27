<!--
JoltPWA Simple PWA Integration
Simplified Joomla Template with UI Separation Only
Place this in your Joomla template's index.php or include it
-->

<?php
// Simple PWA mode detection
$isPWAMode = isset($_GET['token']) && $_GET['token'] === 'pwa';

// Simple function to add token to URLs for PWA mode
function addPWAToken($url)
{
  global $isPWAMode;
  if (!$isPWAMode) return $url;

  // Skip external URLs and assets
  if (strpos($url, 'http') === 0 && strpos($url, $_SERVER['HTTP_HOST']) === false) {
    return $url;
  }

  // Skip asset files
  if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/i', $url)) {
    return $url;
  }

  // Add token if not present
  if (strpos($url, 'token=') === false) {
    $separator = strpos($url, '?') !== false ? '&' : '?';
    $url .= $separator . 'token=pwa';
  }

  return $url;
}

// Simple menu item generator
function pwaMenuItem($text, $url, $cssClass = '')
{
  $tokenizedURL = addPWAToken($url);
  return "<a href=\"$tokenizedURL\" class=\"$cssClass\">$text</a>";
}
?>

<!DOCTYPE html>
<html lang="el" <?php echo $isPWAMode ? 'class="pwa-mode"' : ''; ?>>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo $this->getTitle(); ?> - JoltPWA</title>

  <!-- Standard Joomla head -->
  <jdoc:include type="head" />

  <?php if ($isPWAMode): ?>
    <!-- PWA Mode Specific Meta -->
    <meta name="theme-color" content="#366809">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="ΚΟΜΒΟΣ PWA">

    <!-- PWA Manifest -->
    <link rel="manifest" href="/pwa/manifest.json">

    <!-- PWA Icons -->
    <link rel="apple-touch-icon" href="/pwa/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/pwa/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/pwa/icons/favicon-16x16.png">

    <!-- PWA Styles -->
    <style>
      .pwa-mode {
        --primary-color: #366809;
        --primary-light: #4a8a0e;
        --text-color: #333;
        --bg-color: #f8f9fa;
      }

      .pwa-mode body {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        background-color: var(--bg-color);
      }

      .pwa-mode header,
      .pwa-mode .navbar {
        background-color: var(--primary-color) !important;
        color: white !important;
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .pwa-mode .navbar a {
        color: white !important;
      }

      .pwa-mode .content-area {
        min-height: calc(100vh - 120px);
      }

      /* PWA Mode Indicator */
      .pwa-mode::before {
        content: "📱 PWA";
        position: fixed;
        top: 10px;
        right: 10px;
        background: var(--primary-color);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        z-index: 9999;
        opacity: 0.7;
      }

      @media (display-mode: standalone) {
        .pwa-mode::before {
          content: "📱 Standalone";
        }
      }
    </style>
  <?php endif; ?>
</head>

<body class="site <?php echo $isPWAMode ? 'pwa-mode' : 'web-mode'; ?>">

  <!-- Header Section -->
  <header class="header">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h1 class="site-title">
            <?php echo pwaMenuItem('JoltPWA', '/', 'logo-link'); ?>
          </h1>
        </div>
        <div class="col-md-6 text-right">
          <?php if ($isPWAMode): ?>
            <span class="pwa-badge">PWA Mode</span>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </header>

  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <?php echo pwaMenuItem('Αρχική', '/', 'nav-link'); ?>
          </li>
          <li class="nav-item">
            <?php echo pwaMenuItem('Προϊόντα', '/products', 'nav-link'); ?>
          </li>
          <li class="nav-item">
            <?php echo pwaMenuItem('Υπηρεσίες', '/services', 'nav-link'); ?>
          </li>
          <li class="nav-item">
            <?php echo pwaMenuItem('Επικοινωνία', '/contact', 'nav-link'); ?>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="content-area">
    <div class="container">
      <?php if ($isPWAMode): ?>
        <div class="pwa-welcome-message">
          <div class="alert alert-success">
            <strong>Καλώς ήρθατε στο JoltPWA PWA!</strong>
            Απολαύστε την εμπειρία εφαρμογής στο κινητό σας.
          </div>
        </div>
      <?php endif; ?>

      <!-- Joomla Content -->
      <jdoc:include type="component" />

      <!-- Joomla Modules -->
      <jdoc:include type="modules" name="content" style="html5" />
    </div>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container text-center">
      <p>&copy; <?php echo date('Y'); ?> JoltPWA. Όλα τα δικαιώματα διατηρούνται.</p>
      <?php if ($isPWAMode): ?>
        <p class="pwa-footer">
          <small>PWA Version | <?php echo pwaMenuItem('Κανονική Έκδοση', '/', 'switch-link'); ?></small>
        </p>
      <?php else: ?>
        <p class="web-footer">
          <small><?php echo pwaMenuItem('PWA Έκδοση', '/?token=pwa', 'switch-link'); ?></small>
        </p>
      <?php endif; ?>
    </div>
  </footer>

  <?php if ($isPWAMode): ?>
    <!-- PWA Scripts -->
    <script src="/pwa/simple-pwa-manager.js"></script>
    <script>
      // Simple PWA initialization
      document.addEventListener('DOMContentLoaded', function() {
        console.log('[Joomla PWA] PWA Mode Active');

        // Add token to any remaining links
        document.querySelectorAll('a[href]').forEach(function(link) {
          if (link.href.startsWith(window.location.origin) &&
            !link.href.includes('token=') &&
            !link.href.match(/\.(css|js|png|jpg|svg|ico|woff)$/i)) {
            const url = new URL(link.href);
            url.searchParams.set('token', 'pwa');
            link.href = url.toString();
          }
        });
      });
    </script>
  <?php endif; ?>

  <!-- Standard Joomla footer scripts -->
  <jdoc:include type="modules" name="debug" style="none" />
</body>

</html>
