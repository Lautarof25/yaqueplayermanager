(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const modal = document.querySelector('#player-modal');
  const modalName = document.querySelector('#modal-player-name');
  const modalNumber = document.querySelector('#modal-player-number');
  let lastFocused = null;

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }));
  }

  function openPlayer(card) {
    if (!modal || !card) return;
    lastFocused = document.activeElement;
    modalName.textContent = card.dataset.player || 'Jugador';
    modalNumber.textContent = card.dataset.number || '01';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close')?.focus();
  }

  function closePlayer() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.player-card').forEach(card => {
    card.querySelector('.player-open')?.addEventListener('click', () => openPlayer(card));
  });
  modal?.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closePlayer));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal?.classList.contains('is-open')) closePlayer();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
