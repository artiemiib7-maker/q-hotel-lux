// ===== Шапка после скролла =====
const header = document.getElementById('header');
addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 40);
}, { passive: true });

// ===== Появление блоков =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Анимация по скроллу: видео привязано к прокрутке =====
const walk = document.querySelector('.walk');
const walkVideo = document.getElementById('walkVideo');
if (walk && walkVideo) {
  walkVideo.pause();
  let target = 0;
  // целевая позиция — из скролла
  const calcTarget = () => {
    if (!walkVideo.duration) return;
    const r = walk.getBoundingClientRect();
    const total = r.height - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / total));
    target = p * (walkVideo.duration - 0.1);
  };
  addEventListener('scroll', calcTarget, { passive: true });
  walkVideo.addEventListener('loadedmetadata', calcTarget);
  // плавно догоняем цель: seek'и дешёвые (каждый кадр — ключевой)
  const loop = () => {
    const diff = target - walkVideo.currentTime;
    if (Math.abs(diff) > 0.02) {
      walkVideo.currentTime = walkVideo.currentTime + diff * 0.25;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  // если файла видео нет — прячем <video>, остаётся тёмный фон
  walkVideo.addEventListener('error', () => { walkVideo.style.display = 'none'; });
}

// ===== Сердечки на карточках =====
document.querySelectorAll('.fav').forEach(f =>
  f.addEventListener('click', () => {
    f.classList.toggle('on');
    f.textContent = f.classList.contains('on') ? '♥' : '♡';
  })
);
