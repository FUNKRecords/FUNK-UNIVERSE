/* ==========================================================================
   FUNK UNIVERSE — "Submissions closed" screen
   Covers every page with a full-screen notice while the label is closed.
   Nothing underneath is removed: the pages, forms and links all stay in the
   HTML, just hidden behind this screen.

   TO REOPEN THE SITE: change `CLOSED = true` to `CLOSED = false` below,
   commit, and the normal site is back on every page.

   Loaded without `defer` in each page's <head>, so the page content is
   hidden before it ever paints — visitors never see a flash of the site.
   ========================================================================== */
(function () {
  'use strict';

  var CLOSED = true;

  var HEADING = 'Submissions Currently Closed';

  if (!CLOSED) return;

  var root = document.documentElement;
  root.classList.add('fu-closed');

  var style = document.createElement('style');
  style.textContent = [
    'html.fu-closed, html.fu-closed body { overflow: hidden !important; height: 100%; background: var(--bg, #060606); }',
    /* Hide the page itself (and the cookie banner, which is injected into
       <body> later). visibility also takes it out of the tab order and away
       from screen readers. The custom cursor stays so the screen feels like
       the rest of the site. */
    'html.fu-closed body > :not(.fu-closed-screen):not(.cursor):not(.cursor-ring) { visibility: hidden !important; }',
    '.fu-closed-screen {',
    '  position: fixed; inset: 0; z-index: 9990;',
    '  display: flex; flex-direction: column; align-items: center; justify-content: center;',
    '  text-align: center; padding: 2rem 1.5rem;',
    '  background: var(--bg, #060606); color: var(--white, #f0ede8);',
    '  overflow: hidden;',
    '}',
    /* Same scanlines and soft glow as the hero and 404 page. */
    '.fu-closed-screen::before {',
    '  content: ""; position: absolute; inset: 0; pointer-events: none;',
    '  background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.035) 3px, rgba(0,0,0,0.035) 4px);',
    '}',
    '.fu-closed-screen::after {',
    '  content: ""; position: absolute; inset: 0; pointer-events: none;',
    '  background: radial-gradient(ellipse at center, rgba(200,200,200,0.045) 0%, transparent 65%);',
    '}',
    '.fu-closed-eyebrow {',
    '  position: relative; z-index: 1;',
    '  font-family: var(--font-h, "Barlow Condensed", "Arial Narrow", sans-serif);',
    '  font-weight: 300; font-size: .68rem; letter-spacing: .42em;',
    '  text-transform: uppercase; color: var(--muted, #7a7a7a);',
    '  margin-bottom: 1.6rem;',
    '}',
    '.fu-closed-screen h1 {',
    '  position: relative; z-index: 1;',
    '  font-family: var(--font-h, "Barlow Condensed", "Arial Narrow", sans-serif);',
    '  font-weight: 700; font-size: clamp(2.2rem, 7vw, 5rem);',
    '  line-height: 1; letter-spacing: .04em; text-transform: uppercase;',
    '  max-width: 14ch;',
    '  animation: fuClosedIn 1.4s cubic-bezier(.16,1,.3,1) both;',
    '}',
    '@keyframes fuClosedIn {',
    '  from { opacity: 0; transform: translateY(24px); }',
    '  to   { opacity: 1; transform: translateY(0); }',
    '}',
    '@media (prefers-reduced-motion: reduce) { .fu-closed-screen h1 { animation: none; } }'
  ].join('\n');
  document.head.appendChild(style);

  function show() {
    var screen = document.createElement('div');
    screen.className = 'fu-closed-screen';
    screen.setAttribute('role', 'main');
    screen.innerHTML =
      '<p class="fu-closed-eyebrow">Funk Universe</p>' +
      '<h1></h1>';
    screen.querySelector('h1').textContent = HEADING;
    document.body.appendChild(screen);
  }

  if (document.body) show();
  else document.addEventListener('DOMContentLoaded', show);
})();
