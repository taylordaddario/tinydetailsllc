(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      navMobile.classList.toggle("open");
    });

    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navMobile.classList.remove("open");
      });
    });
  }

  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        galleryItems.forEach((item) => {
          const category = item.dataset.category;
          const show = filter === "all" || category === filter;
          item.classList.toggle("hidden", !show);
        });
      });
    });
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const lightboxCounter = lightbox.querySelector(".lightbox-counter");
    const slideNav = lightbox.querySelector(".lightbox-slide-nav");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");
    let slides = [];
    let slideIndex = 0;

    function parseSlides(trigger) {
      const title = trigger.getAttribute("data-title") || "";
      const primaryCaption = trigger.getAttribute("data-lightbox-captions") || title;
      const parsed = [];

      const primarySrc = trigger.getAttribute("data-lightbox");
      if (primarySrc) {
        parsed.push({ src: primarySrc.trim(), caption: primaryCaption.trim() || title });
      }

      const gallery = trigger.getAttribute("data-lightbox-gallery");
      if (gallery) {
        gallery.split(",").forEach((entry) => {
          const [src, caption] = entry.split("|").map((part) => part.trim());
          if (src) {
            parsed.push({ src, caption: caption || title });
          }
        });
      }

      return parsed;
    }

    function renderSlideNav() {
      if (!slideNav) return;

      slideNav.innerHTML = "";
      if (slides.length <= 1) {
        slideNav.hidden = true;
        return;
      }

      slideNav.hidden = false;
      slides.forEach((slide, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lightbox-slide-btn";
        btn.textContent = slide.caption;
        btn.setAttribute("aria-current", index === slideIndex ? "true" : "false");
        if (index === slideIndex) btn.classList.add("active");
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          showSlide(index);
        });
        slideNav.appendChild(btn);
      });
    }

    function updateNav() {
      const hasMultiple = slides.length > 1;
      if (prevBtn) prevBtn.hidden = !hasMultiple;
      if (nextBtn) nextBtn.hidden = !hasMultiple;
      if (lightboxCounter) lightboxCounter.hidden = !hasMultiple;
      if (hasMultiple && lightboxCounter) {
        lightboxCounter.textContent = `${slideIndex + 1} / ${slides.length}`;
      }
      renderSlideNav();
    }

    function showSlide(index) {
      if (!slides.length) return;
      slideIndex = (index + slides.length) % slides.length;
      const slide = slides[slideIndex];
      lightboxImg.src = slide.src;
      lightboxImg.alt = slide.caption;
      if (lightboxCaption) {
        lightboxCaption.textContent = slide.caption;
      }
      updateNav();
    }

    function openLightbox(trigger) {
      slides = parseSlides(trigger);
      if (!slides.length) return;
      const startIndex = Number.parseInt(trigger.getAttribute("data-lightbox-start") || "0", 10);
      showSlide(Number.isNaN(startIndex) ? 0 : startIndex);
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      lightboxImg.removeAttribute("src");
      slides = [];
      slideIndex = 0;
      if (slideNav) {
        slideNav.innerHTML = "";
        slideNav.hidden = true;
      }
    }

    document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
      trigger.addEventListener("click", () => openLightbox(trigger));
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(trigger);
        }
      });
    });

    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(slideIndex - 1);
    });

    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(slideIndex + 1);
    });

    closeBtn?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (slides.length > 1 && e.key === "ArrowLeft") showSlide(slideIndex - 1);
      if (slides.length > 1 && e.key === "ArrowRight") showSlide(slideIndex + 1);
    });
  }
})();
