// ===== GSAP Setup =====
gsap.registerPlugin(ScrollTrigger);

// Respect reduced motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal on enter
if (!prefersReducedMotion) {
  gsap.utils.toArray(".card-fade").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
} else {
  document.querySelectorAll(".card-fade").forEach((el) => {
    el.style.opacity = 1;
    el.style.transform = "none";
  });
}

// Skill bars fill on scroll
gsap.utils.toArray(".bar span").forEach((bar) => {
  const val = bar.getAttribute("data-val");
  ScrollTrigger.create({
    trigger: bar,
    start: "top 90%",
    onEnter: () =>
      gsap.to(bar, {
        width: val + "%",
        duration: prefersReducedMotion ? 0 : 1.1,
        ease: "power2.out",
      }),
  });
});

// Subtle parallax on floating chips
document.addEventListener("mousemove", (e) => {
  const chips = document.querySelectorAll(".floating-chip");
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  chips.forEach((chip, i) => {
    const speed = (i + 1) * 5;
    chip.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Typewriter roles
const roles = [
  "Building full-stack apps",
  "React • Spring Boot • Node",
  "Clean UI + robust APIs",
  "Always learning 🚀",
];
const typer = document.querySelector(".typewriter");
let rIdx = 0, cIdx = 0, deleting = false;
function tick() {
  const txt = roles[rIdx];
  typer.textContent = deleting ? txt.slice(0, cIdx--) : txt.slice(0, cIdx++);
  if (!deleting && cIdx === txt.length) return setTimeout(() => (deleting = true, tick()), 1400);
  if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  setTimeout(tick, deleting ? 45 : 75);
}
tick();

// ===== Navbar: mobile toggle + active link highlight =====
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
});

document.querySelectorAll(".nav-link").forEach((a) => {
  a.addEventListener("click", () => navMenu.classList.remove("show"));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");
function setActive() {
  let current = "";
  const top = window.scrollY + 120; // offset for sticky navbar
  sections.forEach((sec) => {
    if (top >= sec.offsetTop && top < sec.offsetTop + sec.offsetHeight) current = sec.id;
  });
  links.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
  });
}
setActive();
window.addEventListener("scroll", setActive);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form (mock)
const contactForm = document.getElementById("contact-form");
const formNote = document.querySelector(".form-note");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formNote.textContent = "Thanks! I’ll get back to you soon.";
    contactForm.reset();
    setTimeout(() => (formNote.textContent = ""), 3000);
  });
}

// ===== Fancy micro-interactions =====

// Magnetic buttons
document.querySelectorAll(".magnet").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// Subtle 3D tilt on cards/images
function addTilt(el, strength = 12) {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * strength;
    const ry = (x - 0.5) * strength;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotateX(0) rotateY(0)";
  });
}
document.querySelectorAll(".tilt").forEach((el) => addTilt(el, 10));
