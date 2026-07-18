/* ============================================================
   SCC main.js
   Renders content from content.js into the page, plus small
   interactive behaviours (nav toggle, accordion, hero canvas).
   You should not need to edit this file to update site content —
   edit js/content.js instead.
   ============================================================ */

const C = SCC_CONTENT;

/* ---------- helpers ---------- */
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function upcomingEvents() {
  const today = new Date().toISOString().slice(0, 10);
  return C.events
    .filter((e) => e.date >= today || true) // keep all; content.js is manually curated
    .sort((a, b) => a.date.localeCompare(b.date));
}

/* ---------- Google Calendar link builder ---------- */
function gcalLink(evt) {
  const start = evt.date.replace(/-/g, '') + 'T' + evt.time.replace(':', '') + '00';
  const end = evt.date.replace(/-/g, '') + 'T' + (evt.endTime || evt.time).replace(':', '') + '00';
  const details = [evt.description, evt.meetingUrl ? `Meeting link: ${evt.meetingUrl}` : '']
    .filter(Boolean)
    .join('\n');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: evt.title,
    dates: `${start}/${end}`,
    details,
    location: evt.location || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ---------- shared chrome: header / footer / nav ---------- */
function renderHeader(activePage) {
  const mount = document.getElementById('site-header');
  if (!mount) return;
  const links = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['events.html', 'Events'],
    ['contact.html', 'Contact'],
  ];
  mount.innerHTML = `
    <div class="nav-row">
      <a class="brand" href="index.html">
        <img src="assets/logo.png" alt="${C.club.shortName} logo" />
        <span>${C.club.shortName}</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">≡</button>
      <nav class="primary-nav" id="primaryNav">
        ${links
          .map(
            ([href, label]) =>
              `<a href="${href}" class="${href === activePage ? 'active' : ''}">${label}</a>`
          )
          .join('')}
      </nav>
    </div>
  `;
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function renderFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
    <div class="wrap footer-row">
      <span>© ${year} ${C.club.name}, ${C.club.institution}</span>
      <span>
        <a href="mailto:${C.club.email}">${C.club.email}</a>
        &nbsp;·&nbsp;
        <a href="${C.club.socials.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        &nbsp;·&nbsp;
        <a href="${C.club.socials.x}" target="_blank" rel="noopener">X</a>
      </span>
    </div>
  `;
}

/* ---------- modal (leader stories + mentor profiles) ---------- */
let modalOverlay, modalBox;

function ensureModalRoot() {
  if (modalOverlay) return;
  modalOverlay = el('div', { class: 'modal-overlay', role: 'dialog', 'aria-modal': 'true' });
  modalBox = el('div', { class: 'modal-box' });
  const closeBtn = el('button', { class: 'modal-close', 'aria-label': 'Close' }, '×');
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  modalOverlay.appendChild(closeBtn);
  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);
}

function openModal(nodes) {
  ensureModalRoot();
  modalBox.innerHTML = '';
  // keep the close button (first child of overlay, not modalBox) intact
  (Array.isArray(nodes) ? nodes : [nodes]).forEach((n) => modalBox.appendChild(n));
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function photoNode(className, src, alt) {
  return src
    ? el('div', { class: className }, el('img', { src, alt }))
    : el('div', { class: className }, 'Photo');
}

function openTeamModal(member) {
  const nodes = [
    el('div', { class: 'modal-head' }, [
      photoNode('modal-photo', member.photo, member.name),
      el('div', {}, [
        el('h3', {}, member.name),
        el('span', { class: 'role' }, member.role),
      ]),
    ]),
    el('p', { class: 'modal-section-label' }, 'Their story'),
    el('p', { style: 'color:var(--ink);' }, member.story || member.bio),
  ];
  openModal(nodes);
}

function openMentorModal(mentor) {
  const formId = 'mentorMsgForm';
  const nodes = [
    el('div', { class: 'modal-head' }, [
      photoNode('modal-photo', mentor.photo, mentor.name),
      el('div', {}, [
        el('h3', {}, mentor.name),
        el('span', { class: 'role' }, mentor.role),
      ]),
    ]),
    el('p', { class: 'modal-section-label' }, 'About'),
    el('p', { style: 'color:var(--ink);' }, mentor.bio),
  ];
  if (mentor.qualifications) {
    nodes.push(
      el('p', { class: 'modal-section-label' }, 'Qualifications'),
      el('p', { style: 'color:var(--ink);' }, mentor.qualifications)
    );
  }
  nodes.push(el('p', { class: 'modal-section-label' }, 'Send a message'));
  nodes.push(
    el(
      'p',
      { style: 'font-size:0.82rem;color:var(--ink-faint);margin-bottom:14px;' },
      `This opens your email app with the message below addressed to ${mentor.name} — nothing sends automatically until you hit send in your own inbox.`
    )
  );

  const subjectInput = el('input', { type: 'text', id: `${formId}-subject`, placeholder: 'Subject (e.g. Question about R for beginners)' });
  const messageInput = el('textarea', { id: `${formId}-message`, placeholder: 'Write your message here...' });
  const form = el('form', {}, [
    subjectInput,
    messageInput,
    el('button', { type: 'submit', class: 'btn btn-primary' }, 'Open email to send →'),
  ]);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = subjectInput.value.trim() || `Message from an SCC student`;
    const body = messageInput.value.trim() || '';
    const params = new URLSearchParams({ subject, body });
    window.location.href = `mailto:${mentor.email}?${params.toString()}`;
  });
  nodes.push(form);

  openModal(nodes);
}

/* ---------- accordion (used on home page for rules) ---------- */
function renderAccordion(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  items.forEach((item, i) => {
    const panelId = `acc-panel-${i}`;
    const wrapper = el('div', { class: 'accordion-item' });
    const trigger = el(
      'button',
      { class: 'accordion-trigger', 'aria-expanded': 'false', 'aria-controls': panelId },
      [
        el('span', {}, [
          el('span', { class: 'num' }, String(i + 1).padStart(2, '0')),
          item.title,
        ]),
        el('span', { class: 'plus' }, '+'),
      ]
    );
    const panel = el('div', { class: 'accordion-panel', id: panelId }, [el('p', {}, item.body)]);
    trigger.addEventListener('click', () => {
      const isOpen = wrapper.classList.contains('open');
      // close all
      mount.querySelectorAll('.accordion-item').forEach((it) => {
        it.classList.remove('open');
        it.querySelector('.accordion-panel').style.maxHeight = null;
        it.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        wrapper.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
    wrapper.appendChild(trigger);
    wrapper.appendChild(panel);
    mount.appendChild(wrapper);
  });
}

/* ---------- hero canvas: drifting dots that resolve into a trend line ---------- */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrap = canvas.parentElement;
  let w, h, dots;
  const COLORS = ['#D9A43D', '#3A6EA8', '#F1F0EA'];
  const N = 26;

  function resize() {
    const rect = wrap.getBoundingClientRect();
    w = canvas.width = rect.width * devicePixelRatio;
    h = canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }

  function makeDots() {
    dots = Array.from({ length: N }, (_, i) => {
      // target position roughly along an upward trend line, with scatter
      const t = i / (N - 1);
      const targetX = t * w;
      const targetY = h * 0.82 - t * h * 0.6 + (Math.random() - 0.5) * h * 0.18;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        targetX,
        targetY,
        r: (Math.random() * 2.2 + 1.6) * devicePixelRatio,
        color: COLORS[i % COLORS.length],
        vx: 0,
        vy: 0,
      };
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function step() {
    ctx.clearRect(0, 0, w, h);

    // faint connecting lines between nearby dots
    ctx.lineWidth = 1;
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 90 * devicePixelRatio;
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(243,241,234,${0.09 * (1 - dist / maxDist)})`;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }

    dots.forEach((d) => {
      if (!reduceMotion) {
        d.vx += (d.targetX - d.x) * 0.0018;
        d.vy += (d.targetY - d.y) * 0.0018;
        d.vx *= 0.94;
        d.vy *= 0.94;
        d.x += d.vx;
        d.y += d.vy;
      } else {
        d.x = d.targetX;
        d.y = d.targetY;
      }
      ctx.beginPath();
      ctx.fillStyle = d.color;
      ctx.globalAlpha = 0.9;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    if (!reduceMotion) requestAnimationFrame(step);
  }

  resize();
  makeDots();
  step();
  window.addEventListener('resize', () => {
    resize();
    makeDots();
    if (reduceMotion) step();
  });
}

/* ---------- page-specific renderers ---------- */
function renderHomePage() {
  // hero copy
  const heroTagline = document.getElementById('heroTagline');
  if (heroTagline) heroTagline.textContent = C.club.tagline;
  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroSubtitle) heroSubtitle.textContent = C.club.heroSubtitle;
  const backstory = document.getElementById('backstoryText');
  if (backstory) backstory.textContent = C.club.backstory;

  // rules accordion
  renderAccordion('rulesAccordion', C.rules);

  // stat callout
  const statValue = document.getElementById('statValue');
  const statLabel = document.getElementById('statLabel');
  if (statValue) statValue.textContent = C.club.impactStat.value;
  if (statLabel) statLabel.textContent = C.club.impactStat.label;

  // testimonials
  const tMount = document.getElementById('testimonialGrid');
  if (tMount) {
    C.testimonials.forEach((t) => {
      tMount.appendChild(
        el('div', { class: 'card testimonial-card' }, [
          el('p', { class: 'quote' }, `"${t.quote}"`),
          el('p', { class: 'attr' }, `${t.name} — ${t.cohort}`),
        ])
      );
    });
  }

  // resources: videos
  const vMount = document.getElementById('videoGrid');
  if (vMount) {
    C.resources.videos.forEach((v) => {
      vMount.appendChild(
        el('div', { class: 'card' }, [
          el('div', {
            html: `<iframe width="100%" height="180" style="border:0;border-radius:2px;" src="https://www.youtube.com/embed/${v.id}" title="${v.title}" allowfullscreen loading="lazy"></iframe>`,
          }),
          el('p', { style: 'margin-top:12px;color:var(--ink);font-family:var(--mono);font-size:0.85rem;' }, v.title),
        ])
      );
    });
  }

  // resources: mentors — bigger clickable profile cards
  const mMount = document.getElementById('mentorGrid');
  if (mMount) {
    C.resources.mentors.forEach((m) => {
      const card = el(
        'button',
        { class: 'mentor-card', type: 'button', onclick: () => openMentorModal(m) },
        [
          photoNode('mentor-photo', m.photo, m.name),
          el('div', {}, [
            el('h3', {}, m.name),
            el('span', { class: 'role' }, m.role),
            el('span', { class: 'mentor-email' }, m.email),
            el('span', { class: 'tap-hint' }, 'Tap to view profile & message →'),
          ]),
        ]
      );
      mMount.appendChild(card);
    });
  }

  // upcoming (next 2) preview
  const upMount = document.getElementById('upcomingPreview');
  if (upMount) {
    const events = upcomingEvents().slice(0, 2);
    if (events.length === 0) {
      upMount.appendChild(el('div', { class: 'empty-state' }, 'No meetings scheduled yet — check back soon, or see the Events page.'));
    } else {
      events.forEach((evt) => upMount.appendChild(buildEventCard(evt)));
    }
  }
}

function buildEventCard(evt) {
  const posterInner = evt.posterImage
    ? el('img', { src: evt.posterImage, alt: `${evt.title} poster` })
    : document.createTextNode('Poster coming soon');
  const card = el('div', { class: 'event-card' }, [
    el('div', { class: 'event-poster' }, posterInner),
    el('div', { class: 'event-body' }, [
      el('span', { class: 'event-date' }, `${formatDate(evt.date)} · ${evt.time}`),
      el('h3', {}, evt.title),
      el('p', {}, evt.description),
      evt.location ? el('p', { class: 'mono', style: 'font-size:0.8rem;color:var(--ink-faint);' }, evt.location) : null,
      el('div', { class: 'event-actions' }, [
        el('a', { class: 'btn btn-primary', href: gcalLink(evt), target: '_blank', rel: 'noopener' }, '+ Add to Calendar'),
        evt.meetingUrl ? el('a', { class: 'btn', href: evt.meetingUrl, target: '_blank', rel: 'noopener' }, 'Join link') : null,
      ]),
    ]),
  ]);
  return card;
}

function renderEventsPage() {
  const mount = document.getElementById('eventsGallery');
  if (!mount) return;
  const events = upcomingEvents();
  if (events.length === 0) {
    mount.appendChild(
      el('div', { class: 'empty-state' }, [
        'No events posted right now — new meetings and hackathons are added here as soon as they\u2019re scheduled. Check back soon.',
      ])
    );
    return;
  }
  events.forEach((evt) => mount.appendChild(buildEventCard(evt)));
}

function renderAboutPage() {
  const backstory = document.getElementById('clubHistoryText');
  if (backstory) backstory.textContent = C.club.backstory;

  const teamMount = document.getElementById('teamGrid');
  if (teamMount) {
    C.team.forEach((m) => {
      teamMount.appendChild(
        el('button', { class: 'team-card', type: 'button', onclick: () => openTeamModal(m) }, [
          photoNode('team-photo', m.photo, m.name),
          el('span', { class: 'role' }, m.role),
          el('h3', {}, m.name),
          el('p', {}, m.bio),
          el('span', { class: 'tap-hint' }, 'Tap to read their story →'),
        ])
      );
    });
  }

  const stepsMount = document.getElementById('joinSteps');
  if (stepsMount) {
    C.howToJoin.forEach((step) => stepsMount.appendChild(el('li', {}, step)));
  }

  const tableBody = document.getElementById('membershipTableBody');
  if (tableBody) {
    C.membershipTiers.forEach((tier) => {
      tableBody.appendChild(
        el('tr', {}, [
          el('td', { class: 'name' }, tier.name),
          el('td', {}, tier.eligibility),
          el('td', {}, el('span', { class: tier.canVote ? 'tick' : 'cross' }, tier.canVote ? '✓' : '—')),
          el('td', {}, el('span', { class: tier.canStandForOffice ? 'tick' : 'cross' }, tier.canStandForOffice ? '✓' : '—')),
          el('td', {}, tier.notes),
        ])
      );
    });
  }
}

function renderContactPage() {
  const email = document.getElementById('contactEmail');
  if (email) { email.textContent = C.club.email; email.href = `mailto:${C.club.email}`; }

  const wa = document.getElementById('whatsappBtn');
  if (wa) wa.href = `https://wa.me/${C.club.whatsappNumber}`;

  const li = document.getElementById('linkedinLink');
  if (li) li.href = C.club.socials.linkedin;

  const x = document.getElementById('xLink');
  if (x) x.href = C.club.socials.x;
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  renderHeader(document.body.dataset.pageFile);
  renderFooter();
  initHeroCanvas();
  if (page === 'home') renderHomePage();
  if (page === 'events') renderEventsPage();
  if (page === 'about') renderAboutPage();
  if (page === 'contact') renderContactPage();
});
