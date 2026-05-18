/* ============================================================
   GINGEMBRE LLN – main.js
   ============================================================ */

/* ---------- NAVBAR SCROLL ------------------------------ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- DIAMOND CAROUSEL 3D ----------------------- */
const positions = ['front', 'right', 'back', 'left'];
let current = 0;
const cardWraps = Array.from(document.querySelectorAll('.card-wrap'));
const dots      = Array.from(document.querySelectorAll('.dot'));

function rotateTo(dir) {
  // dir: +1 = next (clockwise), -1 = prev (counter-clockwise)
  current = (current + dir + cardWraps.length) % cardWraps.length;

  cardWraps.forEach((wrap, i) => {
    const posIndex = (i - current + 4) % 4;
    wrap.setAttribute('data-pos', positions[posIndex]);
  });

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === current % 4);
  });

  triggerBurst();
}

document.getElementById('nextBtn').addEventListener('click', () => rotateTo(+1));
document.getElementById('prevBtn').addEventListener('click', () => rotateTo(-1));

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const diff = i - (current % 4);
    rotateTo(diff);
  });
});

// auto-rotate every 4s
let autoTimer = setInterval(() => rotateTo(+1), 4000);

document.getElementById('carouselScene').addEventListener('mouseenter', () => clearInterval(autoTimer));
document.getElementById('carouselScene').addEventListener('mouseleave', () => {
  autoTimer = setInterval(() => rotateTo(+1), 4000);
});

// touch support
let touchStartX = 0;
const scene = document.getElementById('carouselScene');
scene.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
scene.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) rotateTo(dx < 0 ? +1 : -1);
});

/* ---------- FRUIT BURST ON CAROUSEL ROTATION ---------- */
const burstContainer = document.getElementById('burstContainer');
const burstFruits = ['🍓','🫐','🥭','🍊','🍋','🥥','🍌','🍎','🥝','🍇','🥕','🌿'];

function triggerBurst() {
  const count = 8 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'burst-fruit';
    el.textContent = burstFruits[Math.floor(Math.random() * burstFruits.length)];

    // spawn near center-ish
    const sx = window.innerWidth * (.3 + Math.random() * .4);
    const sy = window.innerHeight * (.2 + Math.random() * .4);
    el.style.left = sx + 'px';
    el.style.top  = sy + 'px';

    const angle = Math.random() * Math.PI * 2;
    const dist  = 80 + Math.random() * 200;
    el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    el.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    el.style.fontSize = (1.2 + Math.random() * 1.2) + 'rem';
    el.style.animationDelay = (Math.random() * .15) + 's';
    el.style.animationDuration = (.9 + Math.random() * .6) + 's';

    burstContainer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ---------- SCROLL-TRIGGERED FRUIT POP ---------------- */
// When scrolling into the smoothies section, pop fruits periodically
const smoothiesSection = document.getElementById('smoothies');
let popInterval = null;

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      popInterval = setInterval(() => popFruit(e.target), 800);
    } else {
      clearInterval(popInterval);
    }
  });
}, { threshold: .2 });

sectionObserver.observe(smoothiesSection);

function popFruit(section) {
  const rect = section.getBoundingClientRect();
  const el = document.createElement('span');
  el.className = 'burst-fruit';
  el.textContent = burstFruits[Math.floor(Math.random() * burstFruits.length)];
  el.style.fontSize = (1 + Math.random()) + 'rem';

  const sx = rect.left + Math.random() * rect.width;
  const sy = rect.top  + Math.random() * rect.height;
  el.style.left = sx + 'px';
  el.style.top  = sy + 'px';
  el.style.setProperty('--tx', (Math.random() * 160 - 80) + 'px');
  el.style.setProperty('--ty', -(40 + Math.random() * 120) + 'px');
  el.style.setProperty('--rot', (Math.random() * 360) + 'deg');
  el.style.animationDuration = (.7 + Math.random() * .6) + 's';
  burstContainer.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

/* ---------- MENU TABS --------------------------------- */
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

/* ---------- SCROLL REVEAL ----------------------------- */
const revealEls = document.querySelectorAll(
  '.menu-item, .info-card, .hours-card, .about-text, .extra-card, .hero-content, .hero-cup'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  revealObserver.observe(el);
});

/* ---------- CLICK ANYWHERE TO POP --------------------- */
document.addEventListener('click', e => {
  if (e.target.closest('a, button, .menu-tab')) return; // skip buttons/links
  miniPop(e.clientX, e.clientY);
});

function miniPop(x, y) {
  const count = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'burst-fruit';
    el.textContent = burstFruits[Math.floor(Math.random() * burstFruits.length)];
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    el.style.fontSize = (.8 + Math.random() * .8) + 'rem';
    const angle = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 90;
    el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    el.style.setProperty('--rot', (Math.random() * 540 - 270) + 'deg');
    el.style.animationDuration = (.6 + Math.random() * .4) + 's';
    el.style.animationDelay = (i * .04) + 's';
    burstContainer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ---------- SMOOTH ACTIVE NAV LINK -------------------- */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });
