document.addEventListener('DOMContentLoaded', () => {

  // ── Ultra-Smooth Inertial Scrolling (Lenis) ───────────
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor Link Smooth Scrolling with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          }
        }
      });
    });
  }

  // ── Scroll Progress Bar ───────────────────────────────
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
  });

  // ── Custom Cursor ─────────────────────────────────────
  const dot = document.createElement('div');
  dot.className = 'custom-cursor';
  const ring = document.createElement('div');
  ring.className = 'custom-cursor-follower';
  document.body.append(dot, ring);

  let mx = -200, my = -200, rx = -200, ry = -200;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  (function followRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(followRing);
  })();

  function bindHover() {
    document.querySelectorAll('a, button, .portfolio-card, .service-card, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
    });
  }

  // ── Scroll Reveal ─────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Back to Top ───────────────────────────────────────
  const btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  document.body.appendChild(btt);
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 500));
  btt.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ── Header Scroll + Scroll-spy ────────────────────────
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
    let cur = '';
    sections.forEach(s => { if (window.scrollY + 110 >= s.offsetTop) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${cur}`));
  });

  // ── Mobile Drawer ─────────────────────────────────────
  const mBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  mBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const open = drawer.classList.toggle('open');
    mBtn.innerHTML = open ? '✕' : '☰';
  });
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open');
    mBtn.innerHTML = '☰';
  }));
  document.addEventListener('click', e => {
    if (drawer?.classList.contains('open') && !drawer.contains(e.target) && e.target !== mBtn) {
      drawer.classList.remove('open');
      mBtn.innerHTML = '☰';
    }
  });

  // ── Gallery Data — 100% Real JAS Photos ──────────────
  const items = [
    // RHYLEE — PRE-DEBUT
    { id:1, title:'Ethereal Daylight Portrait', category:'rhylee-predebut', tag:'Rhylee Pre-Debut', src:'assets/images/portfolio/rhylee_predebut_1.jpg', desc:'Cinematic daylight portrait capturing radiant poise and youth.' },
    { id:2, title:'Golden Hour Editorial', category:'rhylee-predebut', tag:'Rhylee Pre-Debut', src:'assets/images/portfolio/rhylee_predebut_2.jpg', desc:'Rich warm tones and natural backlighting highlighting delicate expression.' },
    { id:3, title:'Contemporary Character Pose', category:'rhylee-predebut', tag:'Rhylee Pre-Debut', src:'assets/images/portfolio/rhylee_predebut_3.jpg', desc:'Dynamic editorial composition with high-fashion character aesthetics.' },
    { id:4, title:'Soft Twilight Gaze', category:'rhylee-predebut', tag:'Rhylee Pre-Debut', src:'assets/images/portfolio/rhylee_predebut_4.jpg', desc:'Soft evening ambient framing creating an intimate timeless portrait.' },
    { id:5, title:'Atmospheric Garden Editorial', category:'rhylee-predebut', tag:'Rhylee Pre-Debut', src:'assets/images/portfolio/rhylee_predebut_5.jpg', desc:'Natural floral surroundings and balanced directional natural light.' },
    { id:6, title:'Candid Grace & Contemplation', category:'rhylee-predebut', tag:'Rhylee Pre-Debut', src:'assets/images/portfolio/rhylee_predebut_6.jpg', desc:'Spontaneous candid capture emphasizing quiet elegance.' },

    // CHEL — PRE-DEBUT
    { id:7, title:'Classic White Gown Elegance', category:'chel-predebut', tag:'Chel Pre-Debut', src:'assets/images/portfolio/chel_predebut_1.jpg', desc:'Timeless bridal-inspired pre-debut gown portrait with crisp contrast.' },
    { id:8, title:'Cinematic Studio Spotlight', category:'chel-predebut', tag:'Chel Pre-Debut', src:'assets/images/portfolio/chel_predebut_2.jpg', desc:'Controlled studio keylight bringing out intricate wardrobe details.' },
    { id:9, title:'Graceful Movement & Silhouette', category:'chel-predebut', tag:'Chel Pre-Debut', src:'assets/images/portfolio/chel_predebut_3.jpg', desc:'Flowing silhouette framing and refined editorial poise.' },
    { id:10, title:'Close-up Editorial Beauty', category:'chel-predebut', tag:'Chel Pre-Debut', src:'assets/images/portfolio/chel_predebut_4.jpg', desc:'Detailed beauty headshot with soft studio gradation.' },
    { id:11, title:'Regal Formal Composition', category:'chel-predebut', tag:'Chel Pre-Debut', src:'assets/images/portfolio/chel_predebut_5.jpg', desc:'Formal stylized aesthetic celebrating the debutante’s grand milestone.' },
    { id:12, title:'Warm Ambient Glamour', category:'chel-predebut', tag:'Chel Pre-Debut', src:'assets/images/portfolio/chel_predebut_6.jpg', desc:'Warm editorial spotlight framing celebratory sophistication.' },

    // CHEL — DEBUT NIGHT
    { id:13, title:'Before the Grand Entrance', category:'chel-debut', tag:'Chel Debut Night', src:'assets/images/portfolio/chel_debut_1.jpg', desc:'Quiet anticipation and final styling touches before entering the ballroom.' },
    { id:14, title:'The Traditional 18 Roses', category:'chel-debut', tag:'Chel Debut Night', src:'assets/images/portfolio/chel_debut_2.jpg', desc:'Emotional cotillion dance surrounded by loved ones.' },
    { id:15, title:'18 Candles Ceremony', category:'chel-debut', tag:'Chel Debut Night', src:'assets/images/portfolio/chel_debut_3.jpg', desc:'Heartfelt speeches and intimate candlelit wishes.' },
    { id:16, title:'The 18 Blue Bills Milestone', category:'chel-debut', tag:'Chel Debut Night', src:'assets/images/portfolio/chel_debut_4.jpg', desc:'Festive generosity and joyful laughter from family and godparents.' },
    { id:17, title:'18 Festive Celebration Shots', category:'chel-debut', tag:'Chel Debut Night', src:'assets/images/portfolio/chel_debut_5.jpg', desc:'Spontaneous cheering, toasts, and memorable party energy.' },
    { id:18, title:'Blowing of Candles & Grand Finale', category:'chel-debut', tag:'Chel Debut Night', src:'assets/images/portfolio/chel_debut_6.jpg', desc:'The climactic birthday wish and commemorative ballroom group capture.' },

    // GRAND DEBUT MILESTONES
    { id:19, title:'Creative Spotlight Portrait', category:'debut-event', tag:'Debut Moments', src:'assets/images/portfolio/debut_event_1.jpg', desc:'Dramatic artistic lighting accentuating the debutante gown and glamour.' },
    { id:20, title:'Behind the Scenes Preparations', category:'debut-event', tag:'Debut Moments', src:'assets/images/portfolio/debut_event_2.jpg', desc:'Candid documentary coverage of gown fitting and bridal prep.' },
    { id:21, title:'Ballroom Pre-Event Elegance', category:'debut-event', tag:'Debut Moments', src:'assets/images/portfolio/debut_event_3.jpg', desc:'Stunning portrait in the quiet venue moments before guests arrive.' },
    { id:22, title:'Father-Daughter Dance Embrace', category:'debut-event', tag:'Debut Moments', src:'assets/images/portfolio/debut_event_4.jpg', desc:'Deeply poignant emotional connection during the 18 Roses dance.' },
    { id:23, title:'Candlelight Wishes & Tears', category:'debut-event', tag:'Debut Moments', src:'assets/images/portfolio/debut_event_5.jpg', desc:'Warm bokeh and moving testimonials during the 18 Candles ceremony.' },
    { id:24, title:'Grand Toast & Toasting Memories', category:'debut-event', tag:'Debut Moments', src:'assets/images/portfolio/debut_event_6.jpg', desc:'Joyous toast with best friends, cotillion court, and companions.' }
  ];

  // ── Gallery Render ────────────────────────────────────
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderGallery(filter = 'all') {
    if (!grid) return;
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(12px)';
    grid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    setTimeout(() => {
      grid.innerHTML = '';
      const list = filter === 'all' ? items : items.filter(i => i.category === filter);
      list.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.style.animationDelay = `${idx * 0.04}s`;
        card.innerHTML = `
          <img src="${item.src}" alt="${item.title}">
          <div class="portfolio-overlay">
            <span class="portfolio-badge">${item.tag}</span>
            <h4 class="portfolio-title">${item.title}</h4>
            <span class="portfolio-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              View Full
            </span>
          </div>`;
        card.addEventListener('click', () => openLightbox(item, list, idx));
        grid.appendChild(card);
      });
      bindHover();
      grid.style.opacity = '1';
      grid.style.transform = 'none';
    }, 220);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.getAttribute('data-filter') || 'all');
    });
  });

  renderGallery('all');

  // ── Lightbox ──────────────────────────────────────────
  const lb = document.getElementById('lightboxModal');
  const lbImg = document.getElementById('lightboxImg');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbCat = document.getElementById('lightboxCategory');

  let curList = [], curIdx = 0;

  function openLightbox(item, list, idx) {
    curList = list; curIdx = idx;
    updateLightbox();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const item = curList[curIdx];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = item.src;
      lbTitle.textContent = item.title;
      lbCat.textContent = `${item.tag} — ${item.desc}`;
      lbImg.style.transition = 'opacity 0.25s ease';
      lbImg.style.opacity = '1';
    }, 150);
  }

  function closeLightbox() { lb.classList.remove('active'); document.body.style.overflow = ''; }

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev')?.addEventListener('click', () => { curIdx = (curIdx - 1 + curList.length) % curList.length; updateLightbox(); });
  document.getElementById('lightboxNext')?.addEventListener('click', () => { curIdx = (curIdx + 1) % curList.length; updateLightbox(); });
  lb?.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  window.addEventListener('keydown', e => {
    if (!lb?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev')?.click();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext')?.click();
  });

  // ── Hero Slideshow ────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  let cur = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[cur].classList.remove('active');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('active');
    }, 7000);
  }

  // ── Contact Form ──────────────────────────────────────
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toastMsg');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('clientName')?.value;
    const service = document.getElementById('serviceSelect')?.value;
    showToast(`Message sent — thank you, ${name || 'there'}. JAS will reach out shortly about your ${service || 'session'} inquiry.`);
    form.reset();
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  }

  bindHover();
});
