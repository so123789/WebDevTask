document.addEventListener("DOMContentLoaded", () => {
  /* ─────────────────────────────────────────────
     HAMBURGER / MOBILE NAVIGATION (Accessible)
     - Escape key closes menu + returns focus
     - Click outside closes menu
     - Focus trap keeps Tab inside open menu
  ───────────────────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const navMenu   = document.getElementById("nav-menu");

  /** Collect all keyboard-focusable elements inside the nav */
  function getFocusable() {
    return Array.from(
      navMenu.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openMenu() {
    navMenu.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation menu");
    hamburger.classList.add("open");
    // Move focus to the first nav link
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
  }

  function closeMenu() {
    navMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
    hamburger.classList.remove("open");
    // Return focus to the trigger
    hamburger.focus();
  }

  if (hamburger && navMenu) {
    // Toggle on hamburger click
    hamburger.addEventListener("click", () => {
      navMenu.classList.contains("open") ? closeMenu() : openMenu();
    });

    // Close when any nav link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMenu();
      }
    });

    // Focus trap: keep Tab inside open nav
    navMenu.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || !navMenu.classList.contains("open")) return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    });

    // Close when clicking outside the header
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  const images = document.querySelectorAll(".carousel-images img");
  const thumbs = document.querySelectorAll(".thumb");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  let index = 0;

  function showImage(i) {
    images.forEach((img) => img.classList.remove("active"));
    thumbs.forEach((t) => t.classList.remove("active"));

    images[i].classList.add("active");
    thumbs[i].classList.add("active");

    index = i;
  }

  next.addEventListener("click", () => {
    let i = (index + 1) % images.length;
    showImage(i);
  });

  prev.addEventListener("click", () => {
    let i = (index - 1 + images.length) % images.length;
    showImage(i);
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => showImage(i));
  });

  // ZOOM
  const zoomContainer = document.querySelector(".carousel-images");
  const zoomPreview = document.querySelector(".zoom-preview");

  zoomContainer.addEventListener("mousemove", function (e) {
    const activeImg = document.querySelector(".carousel-images img.active");

    if (!activeImg) return;

    const rect = zoomContainer.getBoundingClientRect();

    let x = (e.clientX - rect.left) / rect.width;
    let y = (e.clientY - rect.top) / rect.height;

    x = Math.max(0, Math.min(x, 1));
    y = Math.max(0, Math.min(y, 1));

    zoomPreview.style.backgroundImage = `url("${activeImg.src}")`;
    zoomPreview.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    zoomPreview.style.backgroundSize = "200%";
  });

  zoomContainer.addEventListener("mouseenter", () => {
    const activeImg = document.querySelector(".carousel-images img.active");
    if (activeImg) {
      zoomPreview.style.backgroundImage = `url("${activeImg.src}")`;
    }
    zoomPreview.style.display = "block";
  });

  zoomContainer.addEventListener("mouseleave", () => {
    zoomPreview.style.display = "none";
  });

  // ── Accordion ──
  const items = document.querySelectorAll(".faq-item");

  // Set initial max-height for the open item on load
  items.forEach((item) => {
    const body = item.querySelector(".faq-body");
    if (item.classList.contains("open")) {
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });

  items.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const body = item.querySelector(".faq-body");
    const icon = item.querySelector(".faq-icon svg");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all items
      items.forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        i.querySelector(".faq-body").style.maxHeight = "0";

        // Reset icon to chevron-down
        const svg = i.querySelector(".faq-icon svg polyline");
        svg.setAttribute("points", "1,1 6,6 11,1");
      });

      // If it was closed, open it
      if (!isOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        body.style.maxHeight = body.scrollHeight + "px";

        // Set icon to chevron-up
        icon.querySelector("polyline").setAttribute("points", "1,6 6,1 11,6");
      }
    });
  });

  // ── Catalogue form ──
  document.getElementById("catalogue-btn").addEventListener("click", () => {
    const email = document.getElementById("catalogue-email").value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(
      "Thank you! Our expert will share the catalogue with " +
        email +
        " shortly.",
    );
    document.getElementById("catalogue-email").value = "";
  });

  //verstailse carousel section
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let currentIndex = 0;

  function getCardStep() {
    const card = track.querySelector(".carousel-card");
    const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
    return card.getBoundingClientRect().width + gap;
  }

  function getTotalCards() {
    return track.querySelectorAll(".carousel-card").length;
  }

  function getMaxIndex() {
    const cardW = track
      .querySelector(".carousel-card")
      .getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
    const padLeft =
      parseFloat(window.getComputedStyle(track).paddingLeft) || 52;
    // how many full cards fit in viewport minus left padding
    const visible = Math.floor((window.innerWidth - padLeft) / (cardW + gap));
    return Math.max(0, getTotalCards() - visible);
  }

  function updateCarousel() {
    const step = getCardStep();
    track.style.transform = `translateX(-${currentIndex * step}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getMaxIndex();
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    updateCarousel();
  });

  updateCarousel();

  //testimonial carousle
  const outer = document.getElementById("t-outer");
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  outer.addEventListener("mousedown", (e) => {
    isDown = true;
    outer.classList.add("is-dragging");
    startX = e.pageX - outer.offsetLeft;
    scrollLeft = outer.scrollLeft;
  });

  outer.addEventListener("mouseleave", () => {
    isDown = false;
    outer.classList.remove("is-dragging");
  });

  outer.addEventListener("mouseup", () => {
    isDown = false;
    outer.classList.remove("is-dragging");
  });

  outer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - outer.offsetLeft;
    const walk = (x - startX) * 1.5;
    outer.scrollLeft = scrollLeft - walk;
  });

  const downloadBtn = document.getElementById("requestQuote");
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("close-modal");

  if (downloadBtn && overlay && closeBtn) {
    downloadBtn.addEventListener("click", () => {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    function closeModal() {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});
