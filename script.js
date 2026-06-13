// ─── Navbar ───────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Hamburger ────────────────────────────────────────
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'))
);

// ─── AOS scroll observer ──────────────────────────────
const aosObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); aosObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));

// ─── Counter animation ────────────────────────────────
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      const dur = 1800;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        e.target.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(tick);
        else e.target.textContent = target;
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

// ─── Blue particle canvas ─────────────────────────────
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  // Subtle blue/cyan particles
  const COLORS = [
    'rgba(78,184,255,',
    'rgba(125,211,252,',
    'rgba(186,230,253,',
  ];

  class Pt {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : (Math.random() < 0.5 ? 0 : H);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.4 + 0.3;
      this.a = Math.random() * 0.18 + 0.04;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) pts.push(new Pt());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(78,184,255,${0.06 * (1 - d / 100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

// ─── Typed text ───────────────────────────────────────
const roles = [
  'B.Tech CSE (AI/ML) · DRDO Project Intern · National Award Winner',
  'Python · FastAPI · React.js · Machine Learning',
  'NLP · Data Analysis · Encrypted Systems · Prompt Engineering',
];
let rIdx = 0, cIdx = 0, del = false;
const typedEl = document.getElementById('typedText');
if (typedEl) {
  function type() {
    const cur = roles[rIdx];
    typedEl.textContent = del ? cur.slice(0, cIdx - 1) : cur.slice(0, cIdx + 1);
    del ? cIdx-- : cIdx++;
    if (!del && cIdx === cur.length) { del = true; setTimeout(type, 2400); return; }
    if (del && cIdx === 0) { del = false; rIdx = (rIdx + 1) % roles.length; }
    setTimeout(type, del ? 22 : 48);
  }
  setTimeout(type, 1000);
}

// ─── Award row highlight ──────────────────────────────
document.querySelectorAll('.award-row').forEach(row => {
  row.addEventListener('click', () => {
    document.querySelectorAll('.award-row').forEach(r => r.classList.remove('active-row'));
    row.classList.add('active-row');
  });
});

// ─── Trophy ghost bubbles ─────────────────────────────
(function() {
  const msgs = ['1st Place! 🏆','ISTE National Convention 🎓','EcoBins won it all! 🌿','Leadership Award 🥇','Click again 😄'];
  let idx = 0, timer = null;
  const wrap = document.getElementById('trophyGhostWrap');
  const bub  = document.getElementById('trophyBubble');
  if (!wrap || !bub) return;
  wrap.addEventListener('click', () => {
    bub.textContent = msgs[idx % msgs.length];
    idx++;
    bub.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => bub.classList.remove('show'), 2600);
  });
})();

// ─── Hero Ghost bubbles ───────────────────────────────
(function() {
  const wrap = document.getElementById('heroGhostWrap');
  const bub  = document.getElementById('heroGhostBubble');
  if (!wrap || !bub) return;
  const msgs = ['Hi there! 👋','DRDO Intern 🛡️','AI/ML Engineer 🤖','National Award Winner 🏆','Let\'s build something 🚀'];
  let idx = 0, timer = null;
  wrap.addEventListener('click', () => {
    bub.textContent = msgs[idx % msgs.length];
    idx++;
    bub.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => bub.classList.remove('show'), 2600);
  });
})();

// ─── Certification coverflow ──────────────────────────
(function() {
  const cards = Array.from(document.querySelectorAll('.cert-cf-card'));
  if (!cards.length) return;
  const dotsWrap = document.getElementById('certDots');
  const total = cards.length;
  let active = Math.floor(total / 2);

  // Build dots
  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'cert-cf-dot' + (i === active ? ' active' : '');
    d.addEventListener('click', () => { active = i; render(); });
    dotsWrap.appendChild(d);
  });

  function render() {
    const SPACING = 260; // wider spacing prevents overlap
    cards.forEach((card, i) => {
      const offset = i - active;
      const absOff = Math.abs(offset);
      // Push non-active cards back on Z axis more aggressively
      const rotY   = Math.max(-55, Math.min(55, offset * 42));
      const tx     = offset * SPACING * 0.65;
      const tz     = absOff === 0 ? 0 : absOff === 1 ? -140 : absOff === 2 ? -260 : -350;
      const scale  = absOff === 0 ? 1 : absOff === 1 ? 0.74 : absOff === 2 ? 0.54 : 0.4;
      const opacity= absOff > 2 ? 0 : absOff === 0 ? 1 : absOff === 1 ? 0.65 : 0.35;
      // z-index — active always on top; must be set as integer
      card.style.zIndex     = String(100 - absOff * 10);
      card.style.transform  = `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`;
      card.style.opacity    = opacity;
      card.classList.toggle('cf-active', i === active);
    });
    document.querySelectorAll('.cert-cf-dot').forEach((d, i) =>
      d.classList.toggle('active', i === active));
  }
  render();

  document.getElementById('certPrev').addEventListener('click', () => { active = Math.max(0, active - 1); render(); });
  document.getElementById('certNext').addEventListener('click', () => { active = Math.min(total - 1, active + 1); render(); });
  cards.forEach((c, i) => c.addEventListener('click', () => { active = i; render(); }));

  // Auto-advance on scroll — advances one step each time section enters viewport
  let lastScrollY = window.scrollY;
  let autoTimer = null;
  const stage = document.getElementById('certStage');

  // Auto-rotate
  let autoPlay = setInterval(() => {
    active = (active + 1) % total;
    render();
  }, 3200);
  stage.addEventListener('mouseenter', () => clearInterval(autoPlay));
  stage.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => { active = (active + 1) % total; render(); }, 3200);
  });

  // Scroll-driven advance
  const scrollObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        window.addEventListener('scroll', onScrollAdvance, { passive: true });
      } else {
        window.removeEventListener('scroll', onScrollAdvance);
      }
    });
  }, { threshold: 0.4 });
  if (stage) scrollObs.observe(stage);

  let lastDir = 0;
  function onScrollAdvance() {
    const dy = window.scrollY - lastScrollY;
    if (Math.abs(dy) > 60) {
      const dir = dy > 0 ? 1 : -1;
      if (dir !== lastDir) {
        active = Math.max(0, Math.min(total - 1, active + dir));
        render();
        lastDir = dir;
      }
      lastScrollY = window.scrollY;
    }
  }
})();

// ─── Project card mouse glow ──────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(78,184,255,0.05) 0%, rgba(78,184,255,0.02) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ─── Console easter egg ───────────────────────────────
console.log('%cPiyush Maurya', 'font-size:28px;font-weight:bold;color:#4eb8ff;');
console.log('%cAI/ML Engineer · DRDO Intern · National Award Winner', 'color:#3d5470;font-size:13px;');
console.log('%cPiyushmaurya6074@gmail.com', 'color:#3d5470;font-size:12px;');
