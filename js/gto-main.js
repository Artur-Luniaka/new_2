// GTO Drift Engine - Lazy Speed JavaScript

// Global variables with drift-themed names
let napBoost = true;
let driftMomentum = 0;
let garageVibes = {};
let streetCred = 0;
let lazyThrottle = false;

// Initialize the drift experience
function initializeDriftExperience() {
  loadHeaderFooter();
  updateCopyrightYear();
  setupBurgerMenu();
  loadPageContent();
  setupFormHandlers();
  enableLazyAnimations();
  initializeCookieBanner();
}

// Load header and footer dynamically
function loadHeaderFooter() {
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  if (headerContainer) {
    fetch("header.html")
      .then((response) => response.text())
      .then((html) => {
        headerContainer.innerHTML = html;
        setupBurgerMenu();
      })
      .catch((error) => {
        console.error("Errore nel caricamento dell'header:", error);
      });
  }

  if (footerContainer) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((html) => {
        footerContainer.innerHTML = html;
        updateCopyrightYear();
      })
      .catch((error) => {
        console.error("Errore nel caricamento del footer:", error);
      });
  }
}

// Update copyright year dynamically
function updateCopyrightYear() {
  const yearElement = document.getElementById("gto-current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Setup burger menu for all screen sizes
function setupBurgerMenu() {
  const burger = document.getElementById("gto-burger");
  const nav = document.getElementById("gto-nav");
  const overlay = document.getElementById("gto-overlay");

  if (burger && nav && overlay) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("gto-nav-active");
      burger.classList.toggle("gto-burger-active");
      overlay.classList.toggle("gto-overlay-active");

      // Animate burger lines
      const lines = burger.querySelectorAll(".gto-burger-line");
      lines.forEach((line, index) => {
        if (burger.classList.contains("gto-burger-active")) {
          if (index === 0) {
            line.style.transform = "rotate(45deg) translateY(7px)";
          } else if (index === 1) {
            line.style.opacity = "0";
          } else if (index === 2) {
            line.style.transform = "rotate(-45deg) translateY(-7px)";
          }
        } else {
          line.style.transform = "none";
          line.style.opacity = "1";
        }
      });
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll(".gto-nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    // Close menu when clicking on overlay
    overlay.addEventListener("click", function () {
      closeMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!burger.contains(event.target) && !nav.contains(event.target)) {
        closeMenu();
      }
    });

    // Function to close menu
    function closeMenu() {
      nav.classList.remove("gto-nav-active");
      burger.classList.remove("gto-burger-active");
      overlay.classList.remove("gto-overlay-active");

      // Reset burger lines
      const lines = burger.querySelectorAll(".gto-burger-line");
      lines.forEach((line, index) => {
        line.style.transform = "none";
        line.style.opacity = "1";
      });
    }
  }
}

// Load page-specific content from JSON
function loadPageContent() {
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case "home":
      loadHomeContent();
      break;
    case "news":
      loadNewsContent();
      break;
    case "contact":
      loadContactContent();
      break;
  }
}

// Get current page identifier
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("gto-news")) return "news";
  if (path.includes("contact-garage")) return "contact";
  return "home";
}

// Load home page content
function loadHomeContent() {
  fetch("data/gto-home.json")
    .then((response) => response.json())
    .then((data) => {
      renderFeatures(data.features);
      renderHowToPlay(data.howto);
      renderFeedback(data.feedback);
      renderMaps(data.maps);
      renderGarage(data.garage);
    })
    .catch((error) => {
      console.error("Errore nel caricamento dei dati della home:", error);
    });
}

// Load news page content
function loadNewsContent() {
  fetch("data/gto-news.json")
    .then((response) => response.json())
    .then((data) => {
      renderUpdates(data.updates);
      renderDiaries(data.diaries);
    })
    .catch((error) => {
      console.error("Errore nel caricamento delle notizie:", error);
    });
}

// Load contact page content
function loadContactContent() {
  fetch("data/gto-contact.json")
    .then((response) => response.json())
    .then((data) => {
      renderContactDetails(data.contact);
    })
    .catch((error) => {
      console.error("Errore nel caricamento dei contatti:", error);
    });
}

// Render features section
function renderFeatures(features) {
  const container = document.getElementById("features-container");
  if (!container) return;

  // Create left column with first 2 features
  const leftFeatures = features.slice(0, 2);
  const rightFeature = features[2]; // Third feature for right side

  container.innerHTML = `
    <div class="gto-features-left">
      ${leftFeatures
        .map(
          (feature) => `
        <div class="gto-feature-card">
            <span class="gto-feature-icon">${feature.icon}</span>
            <h3 class="gto-feature-title">${feature.title}</h3>
            <p class="gto-feature-description">${feature.description}</p>
        </div>
    `
        )
        .join("")}
    </div>
    <div class="gto-features-right">
      <div class="gto-feature-card gto-feature-card-large">
        <span class="gto-feature-icon">${rightFeature.icon}</span>
        <h3 class="gto-feature-title">${rightFeature.title}</h3>
        <p class="gto-feature-description">${rightFeature.description}</p>
      </div>
    </div>
  `;
}

// Render how to play section
function renderHowToPlay(howto) {
  const container = document.getElementById("howto-container");
  if (!container) return;

  container.innerHTML = `
        <div class="gto-controls-section">
            <h3>Controlli</h3>
            ${howto.controls
              .map(
                (control) => `
                <div class="gto-control-item">
                    <div class="gto-control-action">${control.action}</div>
                    <div class="gto-control-description">${control.description}</div>
                </div>
            `
              )
              .join("")}
        </div>
        <div class="gto-tips-section">
            <h3>Consigli</h3>
            ${howto.tips
              .map(
                (tip) => `
                <div class="gto-tip-item">
                    <div class="gto-control-description">${tip}</div>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}

// Render feedback section
function renderFeedback(feedback) {
  const container = document.getElementById("feedback-container");
  if (!container) return;

  container.innerHTML = feedback
    .map(
      (item) => `
        <div class="gto-feedback-card">
            <div class="gto-feedback-name">${item.name}</div>
            <div class="gto-feedback-text">${item.text}</div>
        </div>
    `
    )
    .join("");
}

// Render maps section
function renderMaps(maps) {
  const container = document.getElementById("maps-container");
  if (!container) return;

  container.innerHTML = maps
    .map(
      (map) => `
        <div class="gto-map-card">
            <div class="gto-map-name">${map.name}</div>
            <div class="gto-map-description">${map.description}</div>
            <div class="gto-map-difficulty">Difficoltà: ${map.difficulty}</div>
        </div>
    `
    )
    .join("");
}

// Render garage section
function renderGarage(garage) {
  const container = document.getElementById("garage-container");
  if (!container) return;

  container.innerHTML = garage
    .map(
      (category) => `
        <div class="gto-garage-category">
            <h3 class="gto-category-title">${category.category}</h3>
            <ul class="gto-category-items">
                ${category.items
                  .map(
                    (item) => `
                    <li class="gto-category-item">${item}</li>
                `
                  )
                  .join("")}
            </ul>
        </div>
    `
    )
    .join("");
}

// Render updates section
function renderUpdates(updates) {
  const container = document.getElementById("updates-container");
  if (!container) return;

  container.innerHTML = updates
    .map(
      (update) => `
        <div class="gto-update-card">
            <div class="gto-update-title">${update.title}</div>
            <div class="gto-update-date">${formatDate(update.date)}</div>
            <div class="gto-update-description">${update.description}</div>
        </div>
    `
    )
    .join("");
}

// Render diaries section
function renderDiaries(diaries) {
  const container = document.getElementById("diaries-container");
  if (!container) return;

  container.innerHTML = diaries
    .map(
      (diary) => `
        <div class="gto-diary-card">
            <div class="gto-diary-content">
                <div class="gto-diary-header">
                    <div class="gto-diary-title-section">
                        <div class="gto-diary-image">
                            <img src="assets/gto-news.jpg" alt="Street Diary" />
                        </div>
                        <div class="gto-diary-title">${diary.title}</div>
                    </div>
                    <div class="gto-diary-meta">
                        <div class="gto-diary-author">${diary.author}</div>
                        <div class="gto-diary-date">${formatDate(
                          diary.date
                        )}</div>
                    </div>
                </div>
                <div class="gto-diary-story">${diary.story}</div>
                <div class="gto-diary-location">${diary.location}</div>
            </div>
        </div>
    `
    )
    .join("");
}

// Render contact details
function renderContactDetails(contact) {
  const container = document.getElementById("contact-details");
  if (!container) return;

  container.innerHTML = `
        <div class="gto-contact-item">
            <div class="gto-contact-label">Email</div>
            <div class="gto-contact-value">${contact.email}</div>
        </div>
        <div class="gto-contact-item">
            <div class="gto-contact-label">Telefono</div>
            <div class="gto-contact-value">${contact.phone}</div>
        </div>
        <div class="gto-contact-item">
            <div class="gto-contact-label">Indirizzo</div>
            <div class="gto-contact-value">${contact.address}</div>
        </div>
        <div class="gto-contact-item">
            <div class="gto-contact-label">Orari</div>
            <div class="gto-contact-value">${contact.hours}</div>
        </div>
    `;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Setup form handlers
function setupFormHandlers() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }
}

// Handle contact form submission
function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const nameInput = form.querySelector("#gto-name");
  const phoneInput = form.querySelector("#gto-phone");
  const messageInput = form.querySelector("#gto-message");

  // Clear previous error states
  clearFormErrors();

  // Validate fields
  let isValid = true;

  if (!nameInput.value.trim()) {
    showFieldError(nameInput, "Il nome è obbligatorio");
    isValid = false;
  }

  if (!phoneInput.value.trim()) {
    showFieldError(phoneInput, "Il telefono è obbligatorio");
    isValid = false;
  }

  if (!messageInput.value.trim()) {
    showFieldError(messageInput, "Il messaggio è obbligatorio");
    isValid = false;
  }

  if (!isValid) {
    showDriftNotification("Compila tutti i campi obbligatori", "error");
    return;
  }

  // Simulate form submission
  showDriftNotification("Messaggio inviato con successo!", "success");

  // Reset form
  form.reset();

  // Scroll to top of page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Show field error
function showFieldError(field, message) {
  field.style.borderColor = "var(--drift-zone)";
  field.style.boxShadow = "0 0 0 2px var(--error-red-alpha)";

  // Add error message below field
  const errorDiv = document.createElement("div");
  errorDiv.className = "gto-form-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: var(--drift-zone);
    font-size: 0.85rem;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
  `;

  field.parentNode.appendChild(errorDiv);
}

// Clear form errors
function clearFormErrors() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  // Clear error styling
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.style.borderColor = "";
    input.style.boxShadow = "";
  });

  // Remove error messages
  const errorMessages = form.querySelectorAll(".gto-form-error");
  errorMessages.forEach((error) => error.remove());
}

// Show drift-themed notifications
function showDriftNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `gto-notification gto-notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, var(--drift-zone), var(--street-graffiti));
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--drift-radius);
        box-shadow: 0 8px 25px var(--drift-smoke);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Enable lazy animations
function enableLazyAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards for lazy animation
  const cards = document.querySelectorAll(
    ".gto-feature-card, .gto-feedback-card, .gto-map-card, .gto-garage-category, .gto-update-card, .gto-diary-card"
  );
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(card);
  });
}

// Add smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeDriftExperience();
  setupSmoothScrolling();

  // Add some street cred
  streetCred = Math.floor(Math.random() * 100) + 50;
  console.log(`Street cred iniziale: ${streetCred}`);
});

// Add some garage vibes
function addGarageVibes() {
  garageVibes = {
    engineSound: "vroom",
    tireSmoke: true,
    neonLights: false,
    driftMode: "lazy",
  };
}

// Cookie Banner Management
function initializeCookieBanner() {
  const cookieBanner = document.getElementById("gto-cookie-banner");
  const acceptButton = document.getElementById("gto-cookie-accept");

  if (!cookieBanner || !acceptButton) return;

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("gto-cookies-accepted");

  if (!cookiesAccepted) {
    // Show cookie banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add("gto-cookie-show");
    }, 1000);
  }

  // Handle accept button click
  acceptButton.addEventListener("click", function () {
    // Save acceptance to localStorage
    localStorage.setItem("gto-cookies-accepted", "true");

    // Hide banner with animation
    cookieBanner.classList.remove("gto-cookie-show");

    // Remove banner from DOM after animation
    setTimeout(() => {
      cookieBanner.remove();
    }, 300);

    console.log("Cookies accepted - User preferences saved");
  });
}

// Export functions for potential external use
window.gtoDriftEngine = {
  showDriftNotification,
  addGarageVibes,
  initializeCookieBanner,
  getStreetCred: () => streetCred,
};
