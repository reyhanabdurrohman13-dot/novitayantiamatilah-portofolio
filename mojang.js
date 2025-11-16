// mojang.js
// Features:
// 1) Scroll reveal for sections/cards
// 2) 3D tilt parallax on elements with [data-tilt]
// 3) Keyboard accessibility: Enter/Space triggers focus hover transform
// 4) Scroll-to-top button

// ==================== SCROLL REVEAL ====================
const revealOnScroll = () => {
  const reveals = document.querySelectorAll('.mini-card, .card-large, .skill-card, .reflection-card, .ethic-card');
  const windowH = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowH - 80) el.classList.add('reveal', 'visible');
    else el.classList.remove('visible');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// ==================== 3D TILT PARALLAX ====================
const tiltElements = document.querySelectorAll('[data-tilt]');
tiltElements.forEach(el => {
  const maxRotate = 12; // degrees

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY ?? (e.touches && e.touches[0].clientY)) - rect.top;
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    const rotY = px * maxRotate;
    const rotX = -py * maxRotate;
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    el.style.transition = 'transform 0.08s linear';
  };

  const onLeave = () => {
    el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = 'transform 0.45s cubic-bezier(.2,.9,.3,1)';
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('touchmove', onMove, {passive:true});
  el.addEventListener('mouseleave', onLeave);
  el.addEventListener('touchend', onLeave);

  // keyboard accessibility: Enter or Space briefly toggle a pop effect
  el.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      el.style.transform = 'scale(0.985) rotateX(0deg) rotateY(0deg)';
      setTimeout(()=> {
        el.style.transform = '';
      }, 180);
    }
  });
});

// ==================== SCROLL TO TOP ====================
const scrollTopBtn = document.getElementById('scrollTop');
if(scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
