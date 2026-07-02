/* ==========================================================================
   MBK PORTFOLIO — SCRIPT
   All content sections (skills, experience, projects, certs, services, notes)
   are driven by JS arrays below. Add a new object to the relevant array to
   add a new card — no HTML editing required.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. CONTENT DATA — edit these arrays to update the site
     ============================================================ */

  // Declared early: renderProjects() below calls observeReveal(), which
  // references this. Must exist before that first call to avoid a
  // temporal-dead-zone ReferenceError.
  let revealObserver;

  const skillGroups = [
    {
      title: 'AI & Agent Development',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="3.4" stroke="currentColor" stroke-width="1.5"/></svg>',
      tags: ['OpenAI API', 'Claude / Claude Code', 'Google Gemini', 'Retell AI', 'ElevenLabs', 'Vapi', 'RAG Pipelines', 'Supabase Vector Store']
    },
    {
      title: 'Automation & Workflows',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/></svg>',
      tags: ['n8n', 'Make', 'Webhooks', 'REST APIs', 'Apify', 'Google OAuth 2.0', 'Gmail API', 'Google Calendar API']
    },
    {
      title: 'Generative Media',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="9" r="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M21 15l-5-5-9 9" stroke="currentColor" stroke-width="1.5"/></svg>',
      tags: ['Kling AI', 'fal.ai', 'HeyGen', 'Suno', 'Notebook LM', 'Genspark', 'Openrouter', 'Hugging Face']
    },
    {
      title: 'Deployment & Dev',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 4 3 12l5 8M16 4l5 8-5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      tags: ['GitHub', 'Vercel', 'Netlify', 'Lovable', 'Bolt', 'Google AI Studio', 'VS Code', 'Replit']
    },
    {
      title: 'Databases & Infrastructure',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" stroke-width="1.5"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" stroke-width="1.5"/></svg>',
      tags: ['SQL Server 2012–2022', 'PostgreSQL', 'T-SQL', 'SSIS / SSRS', 'Azure', 'AWS RDS / EC2', 'VMware', 'Power BI']
    },
    {
      title: 'Engineering Discipline',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2 3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
      tags: ['HA / DR Design', 'Performance Tuning', 'Root-Cause Debugging', 'Documentation', 'Client Consulting', 'Team Mentoring']
    }
  ];

  const timeline = [
    {
      period: 'Oct 2025 — Present',
      role: 'AI Automation Engineer & Independent Consultant',
      org: 'Self-directed, Rajshahi, Bangladesh',
      current: true,
      points: [
        'Building voice agents, n8n pipelines, and RAG chatbots for real client use cases.',
        'Shipped 9+ agents/workflows spanning appointment booking, content automation, and support.'
      ]
    },
    {
      period: 'Dec 2021 — Sep 2025',
      role: 'Senior SQL Server Database Administrator',
      org: 'Help Media Network, Rajshahi, Bangladesh',
      points: [
        'Led HA clustering and mirroring across multi-node platforms — 99.9% uptime on production instances.',
        'Mentored 2–3 junior DBAs across SQL Server 2016/2019/2022, Windows Server, VMware, and Azure.',
        'Implemented TDE with SSL, automated index maintenance, and measurable query performance tuning.'
      ]
    },
    {
      period: 'Dec 2015 — Sep 2021',
      role: 'Senior Manager, Maintenance & Projects',
      org: 'Square Pharmaceuticals Ltd, Dhaka, Bangladesh',
      points: [
        'Supervised process and utility equipment across multiple pharmaceutical manufacturing plants.',
        'Directed validation programs for HVAC, Purified Water, WFI, and Pure Steam systems.'
      ]
    },
    {
      period: 'Feb 2006 — Dec 2015',
      role: 'Manager, Maintenance',
      org: 'Square Pharmaceuticals Ltd, Gazipur, Bangladesh',
      points: [
        'Operated GMP-compliant utility systems: HVAC, compressed air, steam, purified water.',
        'Implemented SAP ERP (PM, MM, PS modules); supervised GAMP-5 / CFR21 Part 11 validation docs.'
      ]
    },
    {
      period: 'Nov 2000 — Aug 2002',
      role: 'Lecturer, Mechanical Engineering',
      org: 'Khulna University of Engineering and Technology, Bangladesh',
      points: [
        'Taught undergraduate mechanical engineering courses.',
        'Supervised undergraduate thesis projects.'
      ]
    }
  ];

  const projects = [
    {
      title: 'Voice Agent for Appointment Booking & Consulting',
      category: 'voice',
      badge: 'Featured',
      status: 'Live',
      desc: 'Conversational voice agent for a stock-consulting use case, deployed on Retell AI with n8n handling scheduling, CRM logging, and escalation routing.',
      stack: ['Retell AI', 'n8n', 'RAG Knowledge Base', 'CRM Webhook'],
      role: 'Designed the knowledge base, conversation architecture, and escalation logic.'
    },
    {
      title: 'YouTube Shorts Automation Pipeline',
      category: 'automation',
      badge: 'Featured',
      status: 'Live',
      desc: 'Form-triggered n8n pipeline that turns a single submission into a finished short video — no manual editing.',
      stack: ['n8n', 'OpenAI Images', 'Kling AI', 'ElevenLabs TTS', 'fal.ai', 'Google Drive'],
      role: 'Built the full async pipeline including polling logic and structured Drive storage.'
    },
    {
      title: 'Web / Telegram RAG Chatbot',
      category: 'rag',
      badge: 'Featured',
      status: 'Live',
      desc: 'Multi-platform knowledge chatbot answering questions across a website widget, Gmail, WhatsApp, and Telegram from one vector store.',
      stack: ['Supabase Vector Store', 'RAG', 'Telegram API', 'Gmail API', 'WhatsApp'],
      role: 'Built the shared retrieval layer and platform-specific integration adapters.'
    },
    {
      title: 'Social Media Content Automation',
      category: 'automation',
      status: 'Live',
      desc: 'Agent that generates and auto-publishes content to Facebook, Instagram, and LinkedIn on a set content calendar.',
      stack: ['n8n', 'Meta Graph API', 'LinkedIn Automation', 'OpenAI'],
      role: 'Built the scheduling logic and multi-platform publishing adapters.'
    },
    {
      title: 'YouTube Video Summarizer',
      category: 'automation',
      status: 'Live',
      desc: 'Takes a video URL and returns a generated title, description, and hashtag set ready to publish.',
      stack: ['OpenAI API', 'n8n', 'YouTube Data API'],
      role: 'Built the summarization prompt chain and output formatting.'
    },
    {
      title: 'WhatsApp Agent for FAQ & Enrollment',
      category: 'chat',
      status: 'Live',
      desc: 'Answers prospective-student questions on WhatsApp and handles enrollment, syncing directly to Google Sheets.',
      stack: ['WhatsApp API', 'Google Sheets', 'n8n'],
      role: 'Built the conversation flow and enrollment sync logic for a coaching center.'
    },
    {
      title: 'Gmail Autoreply with Human-in-the-Loop',
      category: 'chat',
      status: 'Live',
      desc: 'Generates context-aware auto-replies to customer emails and routes anything uncertain to a human for approval first.',
      stack: ['Gmail API', 'n8n', 'OpenAI'],
      role: 'Built the approval gate so nothing sends without sign-off when confidence is low.'
    },
    {
      title: 'Sales Assistant for Online Store',
      category: 'chat',
      status: 'Live',
      desc: 'Storefront chatbot that helps customers choose products and applies relevant discounts during the conversation.',
      stack: ['n8n', 'OpenAI', 'Store Webhooks'],
      role: 'Built the product-matching logic and discount-application flow.'
    },
    {
      title: 'Stock Market Chart Analyzer',
      category: 'automation',
      status: 'Live',
      desc: 'Pulls live chart data through API integration and produces a structured read to support trading decisions.',
      stack: ['REST API', 'n8n', 'Data Analysis'],
      role: 'Built the API integration and the structured output format for decision-making.'
    }
  ];

  const certifications = [
    {
      title: 'Master AI Automation & Build AI Agents',
      org: 'Ostad, Bangladesh',
      year: 'Completion Certificate',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2 3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
    },
    {
      title: 'Microsoft SQL Server Database Administration',
      org: 'DBTech Training Center, USA · CIP 11.0802',
      year: 'Completion Certificate',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" stroke-width="1.5"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" stroke="currentColor" stroke-width="1.5"/></svg>'
    },
    {
      title: 'M.Sc. Mechanical Engineering',
      org: 'KTH Royal Institute of Technology, Stockholm, Sweden',
      year: '2004',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 9l10-5 10 5-10 5-10-5Zm4 2.5v5c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
    },
    {
      title: 'B.Tech Mechanical Engineering',
      org: 'IT-BHU, Varanasi, India',
      year: '1997',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 9l10-5 10 5-10 5-10-5Zm4 2.5v5c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
    },
    {
      title: 'Fellow Member',
      org: 'Institute of Engineers Bangladesh (IEB), Dhaka',
      year: 'Professional Affiliation',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-3.9 3.6-7 8-7s8 3.1 8 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
    }
  ];

  const services = [
    { title: 'AI Voice Agents', desc: 'Retell AI / Vapi voice agents for booking, support, or consulting flows, wired to your CRM and calendar.',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" stroke="#fff" stroke-width="1.5"/><path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M9 22h6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    { title: 'Workflow Automation', desc: 'n8n / Make pipelines that connect the tools you already use, with retry logic and error alerting built in.',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h10M4 18h16" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    { title: 'RAG & Knowledge Chatbots', desc: 'Vector-store-backed chatbots that answer from your actual documentation across web, email, and messaging.',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#fff" stroke-width="1.5"/><path d="M7 9h10M7 13h6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    { title: 'SQL Server & DB Consulting', desc: 'HA/DR design, performance tuning, and migration planning from 20+ years of production DBA work.',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="#fff" stroke-width="1.5"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" stroke="#fff" stroke-width="1.5"/></svg>' }
  ];

  const notes = [
    {
      date: 'Recently',
      title: 'YouTube Shorts pipeline, end to end',
      desc: 'Wired OpenAI image generation into Kling AI video, ElevenLabs narration, and an fal.ai merge step. The async polling between Kling jobs was the part that actually took the time.'
    },
    {
      date: 'Recently',
      title: 'Dental clinic voice agent',
      desc: 'Built a Gemini-based agent ("Denta") that books appointments straight into Google Calendar and follows up by email through Nodemailer. Kept the persona narrow on purpose.'
    },
    {
      date: 'Recently',
      title: 'Email Cleaner SaaS',
      desc: 'Real Gmail API integration with Google OAuth, Express backend, and Postgres — went through a React MVP, then a vanilla JS rebuild, before landing on a clean six-file deploy.'
    }
  ];

  /* ============================================================
     2. RENDER FUNCTIONS
     ============================================================ */

  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = skillGroups.map(g => `
    <div class="skill-card glass-card reveal-on-scroll">
      <div class="skill-card-head">
        <span class="skill-icon">${g.icon}</span>
        <h3>${g.title}</h3>
      </div>
      <div class="skill-tags">${g.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  const timelineList = document.getElementById('timelineList');
  timelineList.innerHTML = timeline.map(t => `
    <div class="timeline-item ${t.current ? 'current' : ''} reveal-on-scroll">
      <span class="timeline-dot"></span>
      <span class="timeline-period">${t.period}${t.current ? ' · CURRENT' : ''}</span>
      <h3 class="timeline-role">${t.role}</h3>
      <p class="timeline-org">${t.org}</p>
      <ul class="timeline-points">${t.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>
  `).join('');

  const projectCategories = ['all', ...new Set(projects.map(p => p.category))];
  const catLabels = { all: 'All', voice: 'Voice Agents', automation: 'Automation', rag: 'RAG', chat: 'Chat & Support' };
  const projectFilters = document.getElementById('projectFilters');
  projectFilters.innerHTML = projectCategories.map((c, i) => `
    <button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${c}">${catLabels[c] || c}</button>
  `).join('');

  const projectsGrid = document.getElementById('projectsGrid');
  function renderProjects() {
    projectsGrid.innerHTML = projects.map(p => `
      <div class="project-card glass-card reveal-on-scroll" data-cat="${p.category}">
        <div class="project-top">
          <span class="project-cat">${catLabels[p.category] || p.category}</span>
          ${p.badge ? `<span class="project-badge">${p.badge}</span>` : ''}
        </div>
        <div>
          <h3>${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
        </div>
        <div class="project-meta">
          <div><strong>My role:</strong> ${p.role}</div>
          <div class="project-status">${p.status}</div>
        </div>
        <div class="project-stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
      </div>
    `).join('');
    observeReveal();
  }
  renderProjects();

  projectFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });

  const certsGrid = document.getElementById('certsGrid');
  certsGrid.innerHTML = certifications.map(c => `
    <div class="cert-card glass-card reveal-on-scroll">
      <span class="cert-icon">${c.icon}</span>
      <div>
        <h4>${c.title}</h4>
        <p>${c.org}</p>
        <span class="cert-year">${c.year}</span>
      </div>
    </div>
  `).join('');

  const servicesGrid = document.getElementById('servicesGrid');
  servicesGrid.innerHTML = services.map(s => `
    <div class="service-card glass-card reveal-on-scroll">
      <span class="service-icon">${s.icon}</span>
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
    </div>
  `).join('');

  const notesGrid = document.getElementById('notesGrid');
  notesGrid.innerHTML = notes.map(n => `
    <div class="note-card glass-card reveal-on-scroll">
      <span class="note-date">${n.date}</span>
      <h4>${n.title}</h4>
      <p>${n.desc}</p>
    </div>
  `).join('');

  /* ============================================================
     3. NAVBAR — scroll state, active link, mobile toggle
     ============================================================ */

  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Scroll progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('scrollProgress').style.width = `${(scrollTop / docHeight) * 100}%`;

    // Scroll-to-top button
    document.getElementById('scrollTop').classList.toggle('visible', scrollTop > 600);

    // Active nav link
    let current = 'home';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinkEls.forEach(link => link.classList.toggle('active', link.dataset.section === current));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ============================================================
     4. TYPING ANIMATION
     ============================================================ */

  const typingWords = ['AI Agents.', 'n8n Pipelines.', 'Voice Agents.', 'RAG Chatbots.', 'Automation Systems.'];
  const typingEl = document.getElementById('typingText');
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const word = typingWords[wordIndex];
    if (!deleting) {
      charIndex++;
      typingEl.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      charIndex--;
      typingEl.textContent = word.slice(0, charIndex);
      if (charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % typingWords.length; }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  }
  typeLoop();

  /* ============================================================
     5. ANIMATED COUNTERS
     ============================================================ */

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

  /* ============================================================
     6. REVEAL ON SCROLL
     ============================================================ */

  function observeReveal() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    document.querySelectorAll('.reveal-on-scroll:not(.visible)').forEach(el => revealObserver.observe(el));
  }
  observeReveal();

  // Safety net: some embedded/preview environments (iframes, unusual scroll
  // containers) don't fire IntersectionObserver reliably. Manually check
  // scroll position as a backup, and force-reveal everything after a short
  // delay so content can never get permanently stuck invisible.
  function manualRevealCheck() {
    document.querySelectorAll('.reveal-on-scroll:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', manualRevealCheck, { passive: true });
  window.addEventListener('resize', manualRevealCheck);
  manualRevealCheck();
  setTimeout(manualRevealCheck, 400);
  setTimeout(() => {
    // Final guarantee: whatever hasn't appeared by now, just show it.
    document.querySelectorAll('.reveal-on-scroll:not(.visible)').forEach(el => el.classList.add('visible'));
  }, 2000);

  /* ============================================================
     7. PARTICLE CANVAS (hero background)
     ============================================================ */

  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = window.innerWidth < 760 ? 32 : 70;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function initParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? '76,127,255' : '155,107,255'
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},0.7)`;
      ctx.fill();
    });
    // connective lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(76,127,255,${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  /* ============================================================
     8. CUSTOM CURSOR (desktop only)
     ============================================================ */

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .glass-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  /* ============================================================
     9. SOCIAL LINK PLACEHOLDERS
     Fill these in once you have live URLs — every [data-social] link
     on the page (hero, contact, footer) updates automatically.
     ============================================================ */

  const socialLinks = {
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-profile',
    youtube: 'https://youtube.com/@your-channel',
    whatsapp: 'https://wa.me/8801720610836',
    calendly: 'https://calendly.com/your-link'
  };
  document.querySelectorAll('[data-social]').forEach(el => {
    const key = el.dataset.social;
    if (socialLinks[key]) el.setAttribute('href', socialLinks[key]);
  });

  /* ============================================================
     10. CONTACT FORM
     Client-side only — no backend wired up yet. Falls back to a
     mailto link so messages are never silently lost. Swap this
     for a real endpoint (Formspree, Netlify Forms, your own API)
     when ready — see README.md.
     ============================================================ */

  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const project = document.getElementById('cf-project').value;
    const message = document.getElementById('cf-message').value;

    const subject = encodeURIComponent(`Automation inquiry: ${project}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${project}\n\n${message}`);
    window.location.href = `mailto:motasim92@gmail.com?subject=${subject}&body=${body}`;

    formNote.textContent = 'Opening your email client — see README.md to wire up a real form backend.';
  });

  /* ============================================================
     11. FOOTER YEAR
     ============================================================ */
  document.getElementById('year').textContent = new Date().getFullYear();

});
