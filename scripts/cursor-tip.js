(function () {
  // Skip on touch/mobile devices that don't support hover
  if (window.matchMedia('(hover: none)').matches) return;

  // Inject tooltip styles
  const s = document.createElement('style');
  s.textContent =
    '.cursor-tip{position:fixed;background:#2d4a32;color:#faf7f2;' +
    'font-family:"DM Mono",monospace;font-size:.58rem;letter-spacing:.1em;' +
    'text-transform:uppercase;padding:.22rem .65rem;border-radius:20px;' +
    'pointer-events:none;opacity:0;white-space:nowrap;z-index:9999;' +
    'transition:opacity .12s,transform .12s;transform:translateY(5px);}' +
    '.cursor-tip.on{opacity:1;transform:translateY(0);}';
  document.head.appendChild(s);

  // Create tooltip element
  const tip = document.createElement('div');
  tip.className = 'cursor-tip';
  document.body.appendChild(tip);

  // Follow cursor
  document.addEventListener('mousemove', function (e) {
    tip.style.left = (e.clientX + 14) + 'px';
    tip.style.top  = (e.clientY - 8)  + 'px';
  });

  // Show/hide with contextual message
  document.addEventListener('mouseover', function (e) {
    const link = e.target.closest('a, button, [role="button"]');
    if (!link) {
      tip.classList.remove('on');
      return;
    }
    const href = link.getAttribute('href') || '';
    if (href.startsWith('mailto:')) {
      tip.textContent = 'send email';
    } else if (link.target === '_blank' || href.startsWith('http')) {
      tip.textContent = 'open link \u2197';
    } else {
      tip.textContent = 'click me';
    }
    tip.classList.add('on');
  });
})();
