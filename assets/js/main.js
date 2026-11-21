document.addEventListener('DOMContentLoaded', () => {

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
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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
    // LANDSCAPES
    { id:1, title:'Venice Canal at Twilight', category:'landscapes', tag:'Cityscape', src:'https://static.wixstatic.com/media/abf144_209161d0f0e448b49ead5e34f1bb9aec~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/IMG_5051_JPG.jpg', desc:'Venice Grand Canal at twilight — glowing canal lamps and water reflections.' },
    { id:2, title:'Luminous Lantern Night', category:'landscapes', tag:'Night Photography', src:'https://static.wixstatic.com/media/abf144_8d64a70088ba4c1995681980be7bfd61~mv2.jpg/v1/fill/w_1200,h_820,al_c,q_85,enc_avif,quality_auto/IMG_6792_JPG.jpg', desc:'Illuminated hot air balloon lanterns floating against a deep night sky.' },
    { id:3, title:'Windmill Under Starlight', category:'landscapes', tag:'Long Exposure', src:'https://static.wixstatic.com/media/abf144_34063d23970149158d8763dcae27aff6~mv2.jpg/v1/fill/w_1200,h_890,al_c,q_85,enc_avif,quality_auto/IMG_5072_JPG.jpg', desc:'Historic windmill silhouette under a clear starry sky.' },
    { id:4, title:'Sunburst Through Canopy', category:'landscapes', tag:'Natural Light', src:'https://static.wixstatic.com/media/abf144_dc9ee7d8fac74018a0d591b955de7c74~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/IMG_0019.jpg', desc:'Dramatic sunburst through forest trees along a country road.' },
    { id:5, title:'Golden Hour Trail', category:'landscapes', tag:'Macro & Flora', src:'https://static.wixstatic.com/media/abf144_c88488ad74224daa8a5f583f3d517851~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/IMG_0068.jpg', desc:'Macro golden hour capture of wild grass blades along a peaceful path.' },
    { id:6, title:'Sunset Vista', category:'landscapes', tag:'Atmospheric', src:'https://static.wixstatic.com/media/abf144_bed9d7669979494dad6a4bf1683850a9~mv2.jpg/v1/fill/w_1200,h_700,al_c,q_85,enc_avif,quality_auto/IMG_0148.jpg', desc:'Serene landscape sunset vista with layered twilight gradients.' },
    // PORTRAITS
    { id:7, title:'Street Bokeh Portrait', category:'portraits', tag:'Editorial', src:'https://static.wixstatic.com/media/abf144_1a3f574ea9114c03a4df52a9f8675df2~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/IMG_6797_JPG.jpg', desc:'Moody golden bokeh evening portrait in side profile.' },
    { id:8, title:'Vintage Balcony', category:'portraits', tag:'Personal Branding', src:'https://static.wixstatic.com/media/abf144_8ed6a895b3e04e3785c1fc39288b0f70~mv2.jpg/v1/fill/w_900,h_1340,al_c,q_85,enc_avif,quality_auto/IMG_1318_JPG.jpg', desc:'Contemplative portrait framed against vintage architectural ironwork.' },
    { id:9, title:'Warm Candid Lifestyle', category:'portraits', tag:'Lifestyle', src:'https://static.wixstatic.com/media/abf144_795f9efbcd4b445ca32895c38168c73a~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/IMG_5056_JPG.jpg', desc:'Warm candid lifestyle smile captured with natural ambient backlight.' },
    { id:10, title:'Editorial Street Fashion', category:'portraits', tag:'Fashion', src:'https://static.wixstatic.com/media/abf144_615fe037785f4865b80ede152a3f3d53~mv2.jpg/v1/fill/w_900,h_1340,al_c,q_85,enc_avif,quality_auto/IMG_5063_JPG.jpg', desc:'Clean street fashion vertical portrait highlighting texture and composure.' },
    { id:11, title:'High Contrast Character', category:'portraits', tag:'Natural Light', src:'https://static.wixstatic.com/media/abf144_d22cd7d9d9314e73bd69d805405c3efe~mv2.jpg/v1/fill/w_900,h_1340,al_c,q_85,enc_avif,quality_auto/IMG_5863_JPG.jpg', desc:'High-contrast directional portrait emphasizing facial contour and tone.' },
    // EVENTS & DEBUTS
    { id:12, title:'Milestone Embrace', category:'events', tag:'Events', src:'https://static.wixstatic.com/media/abf144_57cb11b500b94841acb18201f5f37663~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/IMG_9138.jpg', desc:'Milestone couple embracing warmly on stage with flowers.' },
    { id:13, title:'Ceremony Stage', category:'events', tag:'Events', src:'https://static.wixstatic.com/media/abf144_a672c6a1db3c4cf984fc88b1a913fd12~mv2.jpg/v1/fill/w_900,h_1340,al_c,q_85,enc_avif,quality_auto/IMG_2055.jpg', desc:'Vertical dynamic stage capture during formal celebration.' },
    { id:14, title:'18 Candles Ceremony', category:'events', tag:'Debut', src:'assets/images/18_candles_IMG_5991.JPG', desc:'Intimate heartfelt messages during the 18 Candles debut ceremony.' },
    { id:15, title:'18 Roses Cotillion', category:'events', tag:'Debut', src:'assets/images/18_roses_IMG_6654.JPG', desc:'Emotional father-daughter dance during the traditional 18 Roses.' },
    { id:16, title:'Pre-Event Elegance', category:'events', tag:'Debut Prep', src:'assets/images/before_the_event_IMG_6704.JPG', desc:'Quiet anticipation and styling before the grand debut ball.' },
    { id:17, title:'Debut Creative Portrait', category:'events', tag:'Debut Spotlight', src:'assets/images/creative_shots_IMG_6072.JPG', desc:'Creative spotlight portrait celebrating an 18th milestone.' },
    // PRODUCT PHOTOGRAPHY
    { id:18, title:'Leather Heritage Flatlay', category:'product', tag:'Commercial', src:'https://static.wixstatic.com/media/abf144_b15e1074eb4b4983942512d098870c52~mv2.jpg/v1/fill/w_1000,h_670,al_c,q_85,enc_avif,quality_auto/IMG_5871_edited.jpg', desc:'Leather accessories, eyeglasses, and canvas pouch flatlay.' },
    { id:19, title:'Artisan Beverage', category:'product', tag:'Beverage Styling', src:'https://static.wixstatic.com/media/abf144_de239c1fa6f543059695b899fdcd438b~mv2.jpg/v1/fill/w_900,h_1120,al_c,q_85,enc_avif,quality_auto/JZRF9273_JPG.jpg', desc:'Commercial beverage styling highlighting product clarity and label.' },
    { id:20, title:'Clean Studio Commercial', category:'product', tag:'Catalog', src:'https://static.wixstatic.com/media/abf144_169ac0bf39da4702a97b3c95ffd0d667~mv2.jpg/v1/fill/w_900,h_1120,al_c,q_85,enc_avif,quality_auto/STJN2213_JPG.jpg', desc:'Studio softbox lighting for e-commerce and retail campaigns.' },
    { id:21, title:'Lifestyle Everyday Carry', category:'product', tag:'Brand Lifestyle', src:'https://static.wixstatic.com/media/abf144_a2580cd59c184e48b3a5adbf074423cb~mv2.jpg/v1/fill/w_1200,h_720,al_c,q_85,enc_avif,quality_auto/IMG_5875_JPG.jpg', desc:'Lifestyle product arrangement for modern consumer brands.' }
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
          <img src="${item.src}" alt="${item.title}" loading="lazy">
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
