/* =========================================================================
   Main — พฤติกรรมร่วมของทุกหน้า (โหลดหลัง components.js และหลัง insertNavbar/Footer)
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if(!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 40);

    /* scroll progress bar */
    const progress = document.getElementById("scrollProgress");
    if(progress){
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      progress.style.width = height > 0 ? `${(scrolled / height) * 100}%` : "0%";
    }

    /* back to top visibility */
    const backToTop = document.getElementById("backToTop");
    if(backToTop){
      backToTop.classList.toggle("is-visible", window.scrollY > 600);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu toggle ---------------- */
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  if(toggle && mobile){
    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobile.classList.remove("is-open");
      toggle.classList.remove("is-open");
      document.body.style.overflow = "";
    }));
  }

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById("backToTop");
  if(backToTop){
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------------- Modal: close on overlay click / Escape ---------------- */
  document.addEventListener("click", (e) => {
    if(e.target.classList && e.target.classList.contains("modal-overlay")){
      if(typeof closeSiteModal === "function") closeSiteModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && typeof closeSiteModal === "function") closeSiteModal();
  });

  /* ---------------- Reveal-on-scroll for static (non-component) markup ---------------- */
  if(typeof observeReveals === "function"){
    observeReveals(document);
  }
});
