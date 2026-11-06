(() => {
  // Strip external campaign/tracking parameters from the visible address bar.
  // This keeps shared portfolio URLs clean without reloading the page.
  try {
    const cleanUrl = new URL(window.location.href);
    let changed = false;
    for (const key of [...cleanUrl.searchParams.keys()]) {
      if (key.toLowerCase().startsWith('utm_')) {
        cleanUrl.searchParams.delete(key);
        changed = true;
      }
    }
    if (changed) window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
  } catch (_) {}

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const toast = document.getElementById('toast');
  const discord = 'yourstruly.aiko';
  let toastTimer;

  // Use the visitor's saved theme when available; default to the designed dark theme.
  try {
    const savedTheme = localStorage.getItem('aiko-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  } catch (_) {}

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('aiko-theme', next); } catch (_) {}
    themeToggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    showToast(`${next === 'dark' ? 'Dark' : 'Light'} theme enabled`);
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mobileNav.hidden = isOpen;
  });
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  async function copyDiscord() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(discord);
      } else {
        const field = document.createElement('textarea');
        field.value = discord;
        field.setAttribute('readonly', '');
        field.style.position = 'absolute'; field.style.left = '-9999px';
        document.body.appendChild(field); field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Copy command unavailable');
      }
      document.querySelectorAll('[data-copy-discord] .copy-label').forEach(el => { el.textContent = 'Copied to clipboard!'; });
      showToast('Discord username copied: ' + discord);
      setTimeout(() => document.querySelectorAll('[data-copy-discord] .copy-label').forEach(el => { el.textContent = 'Copy Discord username'; }), 2400);
    } catch (error) {
      showToast('My Discord username is ' + discord);
    }
  }
  document.querySelectorAll('[data-copy-discord]').forEach(button => button.addEventListener('click', copyDiscord));

  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll reveal: reveal immediately when browser doesn't support IntersectionObserver.
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('visible'));

  // Header, progress bar and active navigation state.
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('scrollProgress');
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const sectionIds = ['about', 'expertise', 'services', 'experience', 'reviews', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 24);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollable > 0 ? Math.min(100, (y / scrollable) * 100) : 0) + '%';
    let active = '';
    sections.forEach(section => { if (section.getBoundingClientRect().top < window.innerHeight * 0.36) active = section.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + active));
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  // Add a friendly fallback if either original testimonial image becomes unavailable.
  document.querySelectorAll('.review-image-wrap img').forEach(img => img.addEventListener('error', () => {
    const fallback = document.createElement('div');
    fallback.className = 'review-fallback';
    fallback.textContent = 'Original review image could not be loaded. See Aiko’s previous Carrd resume for the screenshot.';
    img.replaceWith(fallback);
  }));
})();
