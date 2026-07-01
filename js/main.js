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
    const closeBtn = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        lightboxImg.src = trigger.dataset.lightbox;
        lightboxImg.alt = trigger.dataset.title || "";
        if (lightboxCaption) {
          lightboxCaption.textContent = trigger.dataset.title || "";
        }
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }

    closeBtn?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }
})();
