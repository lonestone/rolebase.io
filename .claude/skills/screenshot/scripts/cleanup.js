/**
 * Browser-side DOM cleanup: removes cookie banners, chat widgets,
 * and small fixed-position corner elements.
 * Intended to be passed to page.evaluate().
 */
module.exports = function cleanup() {
  // Remove cookie banners
  const cookieSelectors = [
    '[class*="cookie"]', '[id*="cookie"]',
    '[class*="consent"]', '[id*="consent"]',
    '[class*="gdpr"]', '[id*="gdpr"]',
    '[class*="CookieBanner"]',
    '.cc-banner', '#onetrust-banner-sdk',
    '[aria-label*="cookie"]', '[aria-label*="consent"]',
    '#CybotCookiebotDialog', '[id*="Cookiebot"]',
    '#cc--main',
  ];
  cookieSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  });

  // Remove chat widgets
  const chatSelectors = [
    '[class*="crisp"]', '#crisp-chatbox',
    '[class*="intercom"]', '#intercom-container',
    '[class*="drift"]', '#drift-widget',
    '[class*="hubspot-messages"]',
    '[class*="tawk"]', '#tawk-to-chat',
    '[class*="zendesk"]', '#launcher',
    '[class*="chatwoot"]',
    'iframe[title*="chat"]', 'iframe[title*="Chat"]',
    'iframe[src*="crisp"]', 'iframe[src*="intercom"]',
  ];
  chatSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  });

  // Remove small fixed-position widgets in bottom corners (chat bubbles, etc.)
  document.querySelectorAll('*').forEach((el) => {
    const s = getComputedStyle(el);
    if (s.position === 'fixed' && el.offsetWidth < 120 && el.offsetHeight < 120) {
      const bottom = parseInt(s.bottom);
      const right = parseInt(s.right);
      const left = parseInt(s.left);
      if ((bottom < 60 && right < 60) || (bottom < 60 && left < 60)) {
        el.remove();
      }
    }
  });
};
