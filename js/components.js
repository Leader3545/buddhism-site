/* =========================================================================
   Components — ฟังก์ชันสร้าง UI จากข้อมูลใน data.js
   ทุกหน้าเรียกใช้ฟังก์ชันเหล่านี้ผ่าน <script> ท้ายไฟล์ HTML
   ========================================================================= */

function esc(str){
  return (str ?? "").toString();
}

function imgOrPlaceholder(src, label){
  if(src){ return `<img src="${src}" alt="${esc(label)}" loading="lazy">`; }
  return `<span>[รูปภาพ]</span>`;
}

/* ---------------------------------------------------------------- Navbar */
function insertNavbar(activeKey){
  const root = document.getElementById("navbar-root");
  if(!root) return;

  const desktopLinks = siteNav.map(item =>
    `<a href="${item.href}" class="${item.key === activeKey ? "active" : ""}">${item.label}</a>`
  ).join("");

  const mobileLinks = siteNav.map(item =>
    `<a href="${item.href}" class="${item.key === activeKey ? "active" : ""}">${item.label}</a>`
  ).join("");

  root.innerHTML = `
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="index.html" class="nav-logo">
          <span class="mark">卐</span>
          <span>พระพุทธศาสนา</span>
        </a>
        <div class="nav-links">${desktopLinks}</div>
        <button class="nav-toggle" id="navToggle" aria-label="เปิดเมนู" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="nav-mobile" id="navMobile">${mobileLinks}</div>
  `;
}

/* ---------------------------------------------------------------- Footer */
function insertFooter(){
  const root = document.getElementById("footer-root");
  if(!root) return;

  const cols1 = siteNav.slice(1, 5).map(i => `<a href="${i.href}">${i.label}</a>`).join("");
  const cols2 = siteNav.slice(5).map(i => `<a href="${i.href}">${i.label}</a>`).join("");

  root.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">พระพุทธศาสนา</div>
            <p style="max-width:34ch;color:rgba(248,244,234,.6);font-size:.92rem;">วิชาการสร้างเว็บไซต์ โดย ครูฐิติรัตน์ แก้วใส</p>
          </div>
          <div class="footer-col">
            <h4>สำรวจ</h4>
            ${cols1}
          </div>
          <div class="footer-col">
            <h4>เพิ่มเติม</h4>
            ${cols2}
          </div>
        </div>
        <div class="footer-bottom">
          <span>©2026 พระพุทธศาสนา. สงวนลิขสิทธิ์.</span>
          <span>นายพีรพัฒน์ กระต่ายจันทร์</span>
        </div>
      </div>
    </footer>
  `;
}

/* ------------------------------------------------------------ Page header */
function insertPageHeader(){
  const root = document.getElementById("page-header-root");
  if(!root) return;
  const category = root.dataset.category || "[หมวดหมู่]";
  const title = root.dataset.title || "[ชื่อหน้า]";
  const desc = root.dataset.desc || "[คำอธิบายสั้น]";

  root.innerHTML = `
    <header class="page-header">
      <div class="decorative" aria-hidden="true"></div>
      <div class="container">
        <div class="eyebrow reveal is-visible">${category}</div>
        <h1 class="reveal is-visible">${title}</h1>
        <p class="desc reveal is-visible">${desc}</p>
      </div>
    </header>
  `;
}

/* ---------------------------------------------------------- BuddhaTimeline */
function renderBuddhaTimeline(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = `<div class="buddha-timeline">${data.map((b, i) => `
    <div class="buddha-node reveal">
      <div class="dot">${i + 1}</div>
      <div class="content">
        <div class="thumb">${imgOrPlaceholder(b.image, b.name)}</div>
        <div>
          <span class="period">${esc(b.period)}</span>
          <h3>${esc(b.name)}</h3>
          <p>${esc(b.description)}</p>
        </div>
      </div>
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

/* --------------------------------------------------------- TimelineItem(s) */
function renderTimeline(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = `<div class="timeline">${data.map(item => `
    <div class="timeline-item reveal">
      <span class="year">${esc(item.year)}</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.description)}</p>
      ${item.image !== undefined ? `<div class="media">${imgOrPlaceholder(item.image, item.title)}</div>` : ""}
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

/* -------------------------------------------------------------- DharmaCard */
function renderDharmaCards(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  const cols = data.length >= 4 ? "grid-4" : data.length === 3 ? "grid-3" : "grid-2";
  root.innerHTML = `<div class="grid ${cols}">${data.map(d => `
    <div class="card reveal">
      <div class="card-media">${imgOrPlaceholder(d.image, d.title)}</div>
      <div class="card-body">
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.summary)}</p>
        <p style="font-size:.85rem;">${esc(d.detail)}</p>
      </div>
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

/* ------------------------------------------------------------- ImageCard */
function renderImageCards(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = `<div class="grid grid-4">${data.map(c => `
    <div class="card reveal">
      <div class="card-media">${imgOrPlaceholder(c.image, c.title)}</div>
      <div class="card-body">
        ${c.tag ? `<span class="card-tag">${esc(c.tag)}</span>` : ""}
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.description)}</p>
      </div>
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

/* ------------------------------------------------------------ InfoCards (พุทธกิจ) */
function renderInfoCards(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = `<div class="grid grid-3">${data.map((c, i) => `
    <div class="card reveal">
      <div class="card-body">
        <span class="card-tag">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.description)}</p>
      </div>
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

/* ----------------------------------------------------------- Gallery / Sites */
function renderGallery(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = `<div class="gallery">${data.map((s, i) => `
    <div class="gallery-item reveal" data-index="${i}" onclick="openSiteModal(${i})">
      ${imgOrPlaceholder(s.image, s.name)}
      <div class="label">${esc(s.name)}</div>
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

function renderFeaturedSite(containerId, site){
  const root = document.getElementById(containerId);
  if(!root || !site) return;
  root.innerHTML = `
    <div class="museum-panel reveal">
      <div class="frame">${imgOrPlaceholder(site.image, site.name)}</div>
      <div>
        <span class="eyebrow">สถานที่แนะนำ</span>
        <h3 style="font-size:1.6rem;">${esc(site.name)}</h3>
        <p style="font-size:.9rem;color:var(--gold);margin-bottom:.8rem;">${esc(site.location)}</p>
        <p>${esc(site.description)}</p>
        <p style="font-size:.88rem;">${esc(site.extra)}</p>
      </div>
    </div>
  `;
  observeReveals(root);
}

function renderLocationCards(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = `<div class="grid grid-3">${data.map((s, i) => `
    <div class="card location-card reveal" onclick="openSiteModal(${i})" style="cursor:pointer;">
      <div class="card-media">${imgOrPlaceholder(s.image, s.name)}</div>
      <div class="card-body">
        <span class="card-tag">${esc(s.location)}</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.description)}</p>
        <span class="card-link">ดูรายละเอียด ›</span>
      </div>
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

/* ------------------------------------------------------------------ Modal */
function ensureModalRoot(){
  let modal = document.getElementById("siteModal");
  if(modal) return modal;
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="modal-overlay" id="siteModal">
      <div class="modal-box">
        <button class="modal-close" onclick="closeSiteModal()" aria-label="ปิด">✕</button>
        <div class="modal-media" id="modalMedia"></div>
        <span class="eyebrow" id="modalLocation"></span>
        <h3 id="modalTitle" style="font-size:1.5rem;"></h3>
        <p id="modalDesc"></p>
        <p id="modalExtra" style="font-size:.88rem;"></p>
      </div>
    </div>
  `;
  document.body.appendChild(div.firstElementChild);
  return document.getElementById("siteModal");
}

function openSiteModal(index){
  const data = window.__modalSites || sacredSites;
  const site = data[index];
  if(!site) return;
  const modal = ensureModalRoot();
  document.getElementById("modalMedia").innerHTML = imgOrPlaceholder(site.image, site.name);
  document.getElementById("modalLocation").textContent = site.location || "";
  document.getElementById("modalTitle").textContent = site.name || "";
  document.getElementById("modalDesc").textContent = site.description || "";
  document.getElementById("modalExtra").textContent = site.extra || "";
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeSiteModal(){
  const modal = document.getElementById("siteModal");
  if(!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

/* --------------------------------------------------------------- EventCard */
function renderEventCards(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = `<div class="grid grid-2">${data.map(d => `
    <div class="event-card reveal">
      <div class="date-block">
        <span class="day">${esc(d.date)}</span>
        <span class="month">${esc(d.name)}</span>
      </div>
      <div class="body">
        <h3 style="font-size:1.1rem;">${esc(d.name)}</h3>
        <p>${esc(d.description)}</p>
        <p style="font-size:.85rem;">${esc(d.detail)}</p>
      </div>
    </div>
  `).join("")}</div>`;
  observeReveals(root);
}

/* -------------------------------------------------------------- Accordion */
function renderAccordion(containerId, data){
  const root = document.getElementById(containerId);
  if(!root) return;
  root.innerHTML = data.map((item, i) => `
    <div class="accordion-item ${i === 0 ? "is-open" : ""}">
      <button class="accordion-trigger" onclick="toggleAccordion(this)">
        <span>${esc(item.name)} — ${esc(item.date)}</span>
        <span class="plus">+</span>
      </button>
      <div class="accordion-panel" style="${i === 0 ? "" : "max-height:0;"}">
        <div class="inner">
          <span class="tag">${esc(item.date)}</span>
          <p>${esc(item.description)}</p>
          <p style="font-size:.88rem;">${esc(item.detail)}</p>
        </div>
      </div>
    </div>
  `).join("");

  // set initial open height after render
  root.querySelectorAll(".accordion-item.is-open .accordion-panel").forEach(p => {
    p.style.maxHeight = p.scrollHeight + "px";
  });
}

function toggleAccordion(btn){
  const item = btn.closest(".accordion-item");
  const panel = item.querySelector(".accordion-panel");
  const isOpen = item.classList.contains("is-open");
  if(isOpen){
    panel.style.maxHeight = "0px";
    item.classList.remove("is-open");
  } else {
    item.classList.add("is-open");
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}

/* ------------------------------------------------------------------- Tabs */
function renderSituationTabs(navId, panelId, data){
  const nav = document.getElementById(navId);
  const panelRoot = document.getElementById(panelId);
  if(!nav || !panelRoot) return;

  nav.innerHTML = data.map((d, i) =>
    `<button class="${i === 0 ? "active" : ""}" onclick="switchTab(this,'${panelId}',${i})">${esc(d.situation)}</button>`
  ).join("");

  panelRoot.innerHTML = data.map((d, i) => `
    <div class="tab-panel ${i === 0 ? "active" : ""}" data-index="${i}">
      <div class="situation-card">
        <span class="eyebrow">${esc(d.issue)}</span>
        <h3>${esc(d.situation)}</h3>
        <div class="row"><span class="k">หลักธรรมที่เกี่ยวข้อง</span><span class="v">${esc(d.dharma)}</span></div>
        <div class="row"><span class="k">แนวทางนำไปใช้</span><span class="v">${esc(d.application)}</span></div>
        <p>${esc(d.detail)}</p>
      </div>
    </div>
  `).join("");
}

function switchTab(btn, panelId, index){
  const nav = btn.parentElement;
  nav.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const panelRoot = document.getElementById(panelId);
  panelRoot.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", Number(p.dataset.index) === index));
}

/* ---------------------------------------------------------------- Reveal */
let __revealObserver;
function observeReveals(scope){
  if(!__revealObserver){
    __revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          __revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
  }
  const items = (scope || document).querySelectorAll(".reveal:not(.is-visible)");
  items.forEach(el => __revealObserver.observe(el));
}
