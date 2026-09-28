// Sticky nav background
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', false);
  document.body.style.overflow = '';
}));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Parallax on quote band
const bandImg = document.querySelector('.band__img');
const band = document.querySelector('.band');
window.addEventListener('scroll', () => {
  const r = band.getBoundingClientRect();
  if (r.bottom > 0 && r.top < innerHeight) {
    bandImg.style.transform = `translateY(${(r.top - innerHeight) * 0.15}px)`;
  }
}, { passive: true });

// Gallery lightbox
const imgs = [...document.querySelectorAll('#gallery img')];
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
let idx = 0;
const show = i => {
  idx = (i + imgs.length) % imgs.length;
  lbImg.src = imgs[idx].src;
  lbImg.alt = imgs[idx].alt;
};
const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', true); };
imgs.forEach((img, i) => img.addEventListener('click', () => {
  show(i);
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', false);
}));
lb.querySelector('.lightbox__close').addEventListener('click', close);
lb.querySelector('.lightbox__prev').addEventListener('click', () => show(idx - 1));
lb.querySelector('.lightbox__next').addEventListener('click', () => show(idx + 1));
lb.addEventListener('click', e => { if (e.target === lb) close(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('is-open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') show(idx - 1);
  if (e.key === 'ArrowRight') show(idx + 1);
});

document.getElementById('year').textContent = new Date().getFullYear();
