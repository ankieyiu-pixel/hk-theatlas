/* THE ATLAS 擎海 — interactions */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  /* ---------- Topbar shadow on scroll ---------- */
  var topbar = document.getElementById("topbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 40) topbar.classList.add("scrolled");
    else topbar.classList.remove("scrolled");
  }, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  var isBot = navigator.webdriver || /headless/i.test(navigator.userAgent);
  var reveals = document.querySelectorAll(".reveal");
  if (isBot || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("vis"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("vis");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Lightbox ---------- */
  var modal = document.getElementById("lightboxModal");
  var modalImg = modal.querySelector("img");
  var closeBtn = modal.querySelector(".lb-close");
  document.querySelectorAll(".gal figure img, .club-grid figure img, .spec-imgs figure img, .fp-over a.lightbox img").forEach(function (img) {
    img.addEventListener("click", function () {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target === closeBtn) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();
