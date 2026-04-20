// ── Nav: add .scrolled class on scroll ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ── Intersection Observer: trigger work item animations ──────
// Work items start with opacity:0 via CSS animation, but only
// play when visible so items below the fold aren't wasted.
const items = document.querySelectorAll('.work__item');
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
