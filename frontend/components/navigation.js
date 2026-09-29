export function initNavigation() {
  const menu = document.querySelector('#menu');
  const burger = document.querySelector('#burger');
  const navbar = document.querySelector('#navbar');
  const toTop = document.querySelector('#toTop');

  if (burger && menu) {
    burger.onclick = () => {
      const o = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', o);
    };

    [...document.querySelectorAll('#menu a')].forEach(a => {
      a.onclick = () => {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
      };
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        burger.focus();
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  if (toTop) {
    toTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const secs = [...document.querySelectorAll('section[id]')];
  if (secs.length) {
    const navObs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          [...document.querySelectorAll('#menu a')].forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => navObs.observe(s));
  }
}
