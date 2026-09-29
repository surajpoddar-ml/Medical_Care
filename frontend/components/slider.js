export function initSlider() {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.querySelector('#dots');
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');
  if (!slides.length || !dots) return;

  let cur = 0;
  let timer;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.onclick = () => {
      go(i);
      auto();
    };
    dots.append(b);
  });

  function go(n) {
    slides[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    [...document.querySelectorAll('#dots button')].forEach((b, i) => b.classList.toggle('on', i === cur));
  }

  function auto() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 5000);
  }

  if (prevBtn) prevBtn.onclick = () => { go(cur - 1); auto(); };
  if (nextBtn) nextBtn.onclick = () => { go(cur + 1); auto(); };

  go(0);
  auto();
}
