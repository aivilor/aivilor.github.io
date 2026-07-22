// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Gentle scroll-reveal for sections (skipped if reduced motion is preferred)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.querySelectorAll('.section').forEach(el => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.section').forEach(el => el.classList.add('is-visible'));
}
