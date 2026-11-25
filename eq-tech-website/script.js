document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 0. FOOTER YEAR
  // ==========================================
  const yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ==========================================
  // 1. HEADER SCROLL EFFECT
  // ==========================================
  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  window.addEventListener("scroll", updateHeader);
  updateHeader();

  // ==========================================
  // 2. MOBILE NAVIGATION
  // ==========================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");
  const navLinks = document.querySelectorAll(".navigation a");

  function closeMenu() {
    if (!menuToggle || !navigation) return;
    menuToggle.classList.remove("active");
    navigation.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // ==========================================
  // 3. TERMS AND CONDITIONS MODAL
  // ==========================================
  const termsModal = document.querySelector("#terms-modal");
  const openTermsButton = document.querySelector("#open-terms");
  const closeTermsButton = document.querySelector("#close-terms");
  const acceptTermsButton = document.querySelector("#accept-terms");
  const termsCheckbox = document.querySelector("#terms-agreement");
  const termsHint = document.querySelector("#terms-hint");

  let termsOpened = false;

  function openTerms() {
    if (!termsModal) return;
    termsModal.classList.add("active");
    termsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    termsOpened = true;
  }

  function closeTerms() {
    if (!termsModal) return;
    termsModal.classList.remove("active");
    termsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  if (openTermsButton) {
    openTermsButton.addEventListener("click", openTerms);
  }

  if (closeTermsButton) {
    closeTermsButton.addEventListener("click", closeTerms);
  }

  if (acceptTermsButton) {
    acceptTermsButton.addEventListener("click", () => {
      if (!termsOpened) return;

      if (termsCheckbox) {
        termsCheckbox.disabled = false;
        termsCheckbox.checked = true;
      }
      if (termsHint) {
        termsHint.textContent = "Terms and Conditions accepted.";
      }

      closeTerms();
    });
  }

  if (termsModal) {
    termsModal.addEventListener("click", (event) => {
      if (event.target === termsModal) {
        closeTerms();
      }
    });
  }

  // ==========================================
  // 4. THANK YOU SCREEN CONTROLLER
  // ==========================================
  const thankYouScreen = document.querySelector("#thankyou-screen");
  const thankYouCountdown = document.querySelector("#thankyou-countdown");
  const thankYouClose = document.querySelector("#thankyou-close");
  const thankYouBar = document.querySelector("#thankyou-progress-bar");

  let redirectTimer = null;
  let countdownInterval = null;

  function hideThankYouAndGoHero() {
    if (!thankYouScreen) return;

    clearTimeout(redirectTimer);
    clearInterval(countdownInterval);

    thankYouScreen.classList.remove("active");
    thankYouScreen.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function showThankYou() {
    if (!thankYouScreen) return;

    clearTimeout(redirectTimer);
    clearInterval(countdownInterval);

    let secondsLeft = 5;
    if (thankYouCountdown) {
      thankYouCountdown.textContent = String(secondsLeft);
    }

    if (thankYouBar) {
      thankYouBar.style.animation = "none";
      void thankYouBar.offsetWidth;
      thankYouBar.style.animation = "";
    }

    thankYouScreen.classList.add("active");
    thankYouScreen.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    countdownInterval = setInterval(() => {
      secondsLeft -= 1;
      if (thankYouCountdown && secondsLeft >= 0) {
        thankYouCountdown.textContent = String(secondsLeft);
      }
    }, 1000);

    redirectTimer = setTimeout(() => {
      hideThankYouAndGoHero();
    }, 5000);
  }

  if (thankYouClose) {
    thankYouClose.addEventListener("click", hideThankYouAndGoHero);
  }

  // ==========================================
  // 5. FORM VALIDATION AND FORMSPREE ROUTING
  // ==========================================
  const contactForm = document.querySelector("#contact-form");
  const recipientSelect = document.querySelector("#recipient");

  const ENDPOINTS = {
    contact_ceo: "https://formspree.io/f/mqpqwvng",
    contact_us: "https://formspree.io/f/xdegyrbl",
  };

  function getSelectedEndpoint() {
    const selectedKey = recipientSelect ? recipientSelect.value : "contact_us";
    return ENDPOINTS[selectedKey] || ENDPOINTS.contact_us;
  }

  if (recipientSelect && contactForm) {
    contactForm.action = getSelectedEndpoint();
    recipientSelect.addEventListener("change", () => {
      contactForm.action = getSelectedEndpoint();
    });
  }

  if (contactForm) {
    contactForm.method = "POST";

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (termsCheckbox && !termsCheckbox.checked) {
        alert("Please read and accept the Terms and Conditions before submitting.");
        return;
      }

      const submitButton = contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
      );
      const originalButtonText = submitButton
        ? submitButton.textContent || submitButton.value
        : "";

      if (submitButton) {
        submitButton.disabled = true;
        if (submitButton.tagName === "INPUT") {
          submitButton.value = "Sending...";
        } else {
          submitButton.textContent = "Sending...";
        }
      }

      const targetEndpoint = getSelectedEndpoint();
      contactForm.action = targetEndpoint;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(targetEndpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.reset();
          contactForm.action = getSelectedEndpoint();
          termsOpened = false;

          if (termsCheckbox) {
            termsCheckbox.checked = false;
            termsCheckbox.disabled = true;
          }
          if (termsHint) {
            termsHint.textContent = "Please read the Terms and Conditions before agreeing.";
          }

          showThankYou();
        } else {
          const result = await response.json().catch(() => ({}));
          const errorMessage = result.errors
            ? result.errors.map((err) => err.message).join("\n")
            : "Please verify your Formspree form endpoint and try again.";

          alert("We could not submit your enquiry.\n" + errorMessage);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert(
          "Something went wrong while submitting your enquiry. Please check your connection and try again."
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.tagName === "INPUT") {
            submitButton.value = originalButtonText;
          } else {
            submitButton.textContent = originalButtonText;
          }
        }
      }
    });
  }

  // ==========================================
  // 6. BACK TO TOP LINKS
  // ==========================================
  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // ==========================================
  // 7. ESCAPE KEY
  // ==========================================
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeTerms();
    }
  });
});