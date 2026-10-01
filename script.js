// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// Footer year
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));

// Back to top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 400 ? "block" : "none";
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Highlight active nav link on scroll (home page only)
const sections = document.querySelectorAll("section[id]");
if (sections.length) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
}

// Reveal on scroll + counter animation
const animateCounter = (el) => {
  const target = +el.dataset.target;
  let count = 0;
  const step = Math.max(1, Math.ceil(target / 80));
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count + "+";
  }, 20);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains("counter")) animateCounter(entry.target);
      else entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal, .counter").forEach((el) => observer.observe(el));

// Contact form validation
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("formMsg");
    const val = (id) => document.getElementById(id).value.trim();
    const name = val("name");
    const email = val("email");
    const phone = val("phone");
    const message = val("message");

    let error = "";
    if (!name) error = "Please enter your name.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error = "Please enter a valid email.";
    else if (!/^[6-9]\d{9}$/.test(phone)) error = "Please enter a valid 10-digit mobile number.";
    else if (message.length < 10) error = "Message should be at least 10 characters.";

    if (error) {
      msg.textContent = error;
      msg.className = "form-msg error";
      return;
    }

    msg.textContent = `Thank you, ${name}! We have received your message and will contact you soon.`;
    msg.className = "form-msg success";
    form.reset();
  });
}
