/**
 * Language toggle: switches between "academic" and "plain language" mode.
 * The simple-mode class is placed on <html> so CSS can show/hide .lang-academic
 * and .lang-simple spans without any innerHTML manipulation.
 *
 * Anti-flash: each page's <head> contains an inline script that applies
 * the class before any CSS renders, so there is no flicker on load.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'lang-mode';
  var SIMPLE_CLASS = 'simple-mode';

  function isSimple() {
    return document.documentElement.classList.contains(SIMPLE_CLASS);
  }

  function updateButton(btn) {
    var active = isSimple();
    btn.setAttribute('aria-checked', active ? 'true' : 'false');
  }

  function setup() {
    var btn = document.getElementById('lang-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var nowSimple = document.documentElement.classList.toggle(SIMPLE_CLASS);
      try {
        localStorage.setItem(STORAGE_KEY, nowSimple ? 'simple' : 'academic');
      } catch (e) { /* localStorage unavailable – ignore */ }
      updateButton(btn);
    });

    // Sync button state with class already applied by the anti-flash snippet
    updateButton(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
