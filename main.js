// ── Theme toggle ─────────────────────────────────────────────
// Restore saved preference immediately (avoids flash on page load)
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.dataset.theme = 'light';
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var isLight = document.documentElement.dataset.theme === 'light';
    document.documentElement.dataset.theme = isLight ? '' : 'light';
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
  });
});

// ── Nav: add .scrolled class on scroll ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ── Intersection Observer: trigger work item animations ──────
// Work items start with opacity:0 via CSS animation, but only
// play when visible so items below the fold aren't wasted.
const items = document.querySelectorAll('.work__item, .blog-list__item');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => {
    item.style.animationPlayState = 'paused';
    io.observe(item);
  });
}
