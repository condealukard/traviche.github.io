document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.querySelector("#welcomeScreen");
  const enterButton = document.querySelector("#enterButton");
  const menuToggle = document.querySelector("#menuToggle");
  const mainNav = document.querySelector("#mainNav");
  const backToTop = document.querySelector("#backToTop");

  function enterSite() {
    welcomeScreen.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
  }

  function closeMenu() {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  }

  function toggleMenu() {
    const isOpen = !mainNav.classList.contains("open");
    mainNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  }

  enterButton.addEventListener("click", enterSite);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!welcomeScreen.classList.contains("is-hidden")) enterSite();
      closeMenu();
    }
  });

  menuToggle.addEventListener("click", toggleMenu);

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });

  document.querySelector("#year").textContent = new Date().getFullYear();

  const revealTargets = document.querySelectorAll(
    ".section-heading, .product-card, .story-copy, .visit-details"
  );
  revealTargets.forEach((element) => element.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
