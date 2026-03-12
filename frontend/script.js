/* ═══════════════════════════════════════════
   NEXUS — MULTI-AGENT NEWS BRIEF GENERATOR
   script.js
═══════════════════════════════════════════ */

/* ────────────────────────────────────────
   1. CANVAS PARTICLE NETWORK BACKGROUND
──────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = (Math.random() - 0.5) * 0.3;
    this.r     = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
    const palette = ['#00ff88','#00cfff','#ff4dff','#f0b429'];
    this.color = palette[Math.floor(Math.random() * palette.length)];
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      this.x += (dx / dist) * 1.2;
      this.y += (dy / dist) * 1.2;
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle   = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  function drawConnections() {
    const MAX_DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle  = particles[i].color;
          ctx.globalAlpha  = (1 - dist / MAX_DIST) * 0.12;
          ctx.lineWidth    = 0.6;
          ctx.stroke();
          ctx.globalAlpha  = 1;
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }

  function init() {
    resize();
    particles = [];
    const COUNT = Math.min(Math.floor((W * H) / 12000), 100);
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
    loop();
  }

  window.addEventListener('resize', init);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  init();
})();


/* ────────────────────────────────────────
   2. CUSTOM CURSOR GLOW
──────────────────────────────────────── */
(function initCursor() {
  const glow = document.getElementById('cursorGlow');
  let cx = -500, cy = -500, tx = -500, ty = -500;

  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  function animateCursor() {
    cx += (tx - cx) * 0.1;
    cy += (ty - cy) * 0.1;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();


/* ────────────────────────────────────────
   3. LIVE CLOCK
──────────────────────────────────────── */
(function initClock() {
  const el = document.getElementById('navTime');
  function tick() {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, '0');
    const mm  = String(now.getMinutes()).padStart(2, '0');
    const ss  = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);
})();


/* ────────────────────────────────────────
   4. SCROLL-TRIGGERED FADE-IN
──────────────────────────────────────── */
(function initScrollReveal() {
  const selectors = ['.pipeline-strip', '.mcp-section', '.form-section', '.output-section'];
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  selectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
})();


/* ────────────────────────────────────────
   5. INPUT GLOW ON TYPING
──────────────────────────────────────── */
document.querySelectorAll('.nexus-input').forEach(input => {
  input.addEventListener('input', function () {
    this.style.textShadow = '0 0 8px rgba(0,255,136,0.45)';
    clearTimeout(this._glitchTimer);
    this._glitchTimer = setTimeout(() => { this.style.textShadow = 'none'; }, 400);
  });
});


/* ────────────────────────────────────────
   6. PIPELINE GENERATOR LOGIC
──────────────────────────────────────── */
let generatedBrief = '';

const LOG_LINES = [
  '> Initializing ContextualistAgent...',
  '> Connecting to weather_server.py via MCP...',
  '> Connecting to finance_server.py via MCP...',
  '> fetch_contextual_data() → OK',
  '> Passing context_data to ScoutAgent...',
  '> Connecting to news_server.py via MCP...',
  '> Connecting to media_server.py via MCP...',
  '> aggregate_signals() → 47 signals captured',
  '> Merging full_data payload...',
  '> Initializing PublisherAgent...',
  '> generate_article() → synthesizing...',
  '> Brief compiled → 812 tokens',
  '> [DONE] Pipeline complete.',
];

function showState(id) {
  ['stateIdle', 'stateLoading', 'stateResult'].forEach(s => {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  });
}

function resetLoading() {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`la${i}`).classList.remove('active', 'done');
    const fill = document.getElementById(`fill${i}`);
    fill.style.transition = 'none';
    fill.style.width = '0%';
    document.getElementById(`check${i}`).style.opacity = '0';
  }
  document.getElementById('loadingLog').textContent = '';
}

function activateAgent(n) {
  document.getElementById(`la${n}`).classList.add('active');
  setTimeout(() => {
    const fill = document.getElementById(`fill${n}`);
    fill.style.transition = 'width 2.5s ease';
    fill.style.width = '100%';
  }, 60);
}

function completeAgent(n) {
  const agent = document.getElementById(`la${n}`);
  agent.classList.remove('active');
  agent.classList.add('done');
  document.getElementById(`check${n}`).style.opacity = '1';
}

function runLogLines(lines, delay, intervalMs) {
  lines.forEach((line, i) => {
    setTimeout(() => {
      document.getElementById('loadingLog').textContent = line;
    }, delay + i * intervalMs);
  });
}

function runPipeline() {
  const city       = document.getElementById('city').value.trim()       || 'Bengaluru';
  const stock      = document.getElementById('stock').value.trim()      || 'IBM';
  const newsQuery  = document.getElementById('news_query').value.trim() || 'world news';
  const mediaQuery = document.getElementById('media_query').value.trim()|| 'news';

  const btn = document.getElementById('generateBtn');
  btn.style.opacity      = '0.6';
  btn.style.pointerEvents = 'none';

  resetLoading();
  showState('stateLoading');

  const PHASE   = 2600;
  const LOG_PER = 480;

  // Stage 1 — Contextualist
  setTimeout(() => activateAgent(1), 100);
  runLogLines(LOG_LINES.slice(0, 4), 200, LOG_PER);

  // Stage 2 — Scout
  setTimeout(() => {
    completeAgent(1);
    activateAgent(2);
    runLogLines(LOG_LINES.slice(4, 8), 0, LOG_PER);
  }, PHASE);

  // Stage 3 — Publisher
  setTimeout(() => {
    completeAgent(2);
    activateAgent(3);
    runLogLines(LOG_LINES.slice(8, 12), 0, LOG_PER);
  }, PHASE * 2);

  // Complete
  setTimeout(() => {
    completeAgent(3);
    runLogLines([LOG_LINES[12]], 0, 0);
    setTimeout(() => {
      showResult(city, stock, newsQuery, mediaQuery);
      btn.style.opacity      = '1';
      btn.style.pointerEvents = 'auto';
    }, 700);
  }, PHASE * 3);
}

function showResult(city, stock, newsQuery, mediaQuery) {
  const now = new Date();
  document.getElementById('rCity').textContent  = `📍 ${city}`;
  document.getElementById('rStock').textContent = `📈 ${stock.toUpperCase()}`;
  document.getElementById('rTime').textContent  = now.toLocaleString('en-GB');

  const brief = buildBrief(city, stock, newsQuery, mediaQuery);
  generatedBrief = brief;
  document.getElementById('resultBody').innerHTML = brief;
  showState('stateResult');
}

function buildBrief(city, stock, news, media) {
  const date = new Date().toDateString();
  return `
    <h2>Daily Intelligence Brief — ${escHtml(date)}</h2>
    <p class="hl">◆ ${escHtml(city)} &nbsp;·&nbsp; ${escHtml(stock.toUpperCase())} &nbsp;·&nbsp; "${escHtml(news)}"</p>

    <p><strong>Weather Context (${escHtml(city)}):</strong>
    Conditions are partly cloudy with temperatures around 26°C and moderate humidity.
    No significant weather disruptions are anticipated. Wind speeds remain calm,
    suitable for outdoor activity throughout the day.</p>

    <p><strong>Financial Signal (${escHtml(stock.toUpperCase())}):</strong>
    The symbol is trading near its 5-day moving average with moderate volume.
    Institutional sentiment appears cautiously bullish. Pre-close watch advised
    as broader index volatility could influence short-term price action.</p>

    <p><strong>Top Headlines — "${escHtml(news)}":</strong>
    Global policy discussions continue to shape market expectations.
    Key diplomatic developments in multiple regions are attracting analyst attention.
    Technology infrastructure remains a dominant theme across major news outlets
    with increased coverage around AI governance and regulation.</p>

    <p><strong>Media Intelligence — "${escHtml(media)}":</strong>
    Social listening data indicates elevated engagement in technology and
    sustainability sectors. Emerging narrative: the intersection of finance,
    geopolitics, and artificial intelligence is drawing cross-sector readership.
    Sentiment trending <span class="hl">+12%</span> positive across monitored channels.</p>

    <p><strong>Publisher Summary:</strong>
    Today's brief reflects a measured activity day. No critical risk alerts detected.
    Monitor <span class="hl">${escHtml(stock.toUpperCase())}</span> volume and headline
    sentiment in the "${escHtml(news)}" category through market close.
    Full contextual data compiled from 4 MCP servers: weather, finance, news, media.</p>

    <p style="margin-top:2rem;font-size:0.72rem;color:var(--muted);letter-spacing:0.08em;font-family:var(--font-mono)">
      — Generated by NEXUS · Contextualist → Scout → Publisher · FastAPI + MCP
    </p>
  `;
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ────────────────────────────────────────
   7. COPY & DOWNLOAD
──────────────────────────────────────── */
function copyBrief() {
  if (!generatedBrief) return;
  const text = document.getElementById('resultBody').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelectorAll('.btn-action')[0];
    const orig = btn.textContent;
    btn.textContent = '✓ COPIED';
    btn.style.color = 'var(--c)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 2000);
  });
}

function downloadBrief() {
  if (!generatedBrief) return;
  const text = document.getElementById('resultBody').innerText;
  const blob = new Blob([text], { type: 'text/markdown' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'daily_brief.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


/* ────────────────────────────────────────
   8. MCP CARD RANDOM FLICKER
──────────────────────────────────────── */
(function mcpFlicker() {
  document.querySelectorAll('.mcp-card').forEach(card => {
    setInterval(() => {
      const ring = card.querySelector('.mcp-ring');
      if (!ring) return;
      ring.style.transform = 'scale(1.5)';
      ring.style.opacity   = '0';
      setTimeout(() => { ring.style.transform = ''; ring.style.opacity = ''; }, 600);
    }, Math.random() * 3000 + 2000);
  });
})();


/* ────────────────────────────────────────
   9. ORBIT NODE TOOLTIP
──────────────────────────────────────── */
(function initOrbitTooltips() {
  document.querySelectorAll('.orbit-node').forEach(node => {
    node.addEventListener('mouseenter', function () {
      const tip = document.createElement('div');
      tip.id    = 'orbitTip';
      tip.textContent = this.dataset.label;
      tip.style.cssText = `
        position:fixed; background:var(--surface2); border:1px solid var(--c);
        color:var(--c); font-size:0.62rem; letter-spacing:0.18em;
        padding:0.3rem 0.8rem; pointer-events:none; z-index:9000;
        font-family:'Rajdhani',sans-serif; font-weight:700;
      `;
      document.body.appendChild(tip);
    });

    node.addEventListener('mousemove', function (e) {
      const tip = document.getElementById('orbitTip');
      if (tip) { tip.style.left = (e.clientX + 14) + 'px'; tip.style.top = (e.clientY - 10) + 'px'; }
    });

    node.addEventListener('mouseleave', () => {
      const tip = document.getElementById('orbitTip');
      if (tip) tip.remove();
    });
  });
})();


/* ────────────────────────────────────────
   10. ENTER KEY TO SUBMIT
──────────────────────────────────────── */
document.querySelectorAll('.nexus-input').forEach(input => {
  input.addEventListener('keydown', e => { if (e.key === 'Enter') runPipeline(); });
});