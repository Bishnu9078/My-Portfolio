// ===== Enhanced Scroll Animations =====
gsap.registerPlugin(ScrollTrigger);

// Respect reduced motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Enhanced scroll reveal animations
if (!prefersReducedMotion) {
    // Hero section staggered animation
    gsap.timeline()
        .from(".hero-copy .eyebrow", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" })
        .from(".hero-copy h1", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .from(".hero-copy .lead", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .from(".hero-copy .typewriter", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .from(".hero-copy .cta-row", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // Section titles with gradient reveal
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Enhanced card animations with stagger
    gsap.utils.toArray(".about-card").forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            rotationX: -15,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Timeline items with cascade effect
    gsap.utils.toArray(".timeline-item").forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.15,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Projects grid with stagger
    gsap.utils.toArray(".project").forEach((project, index) => {
        gsap.from(project, {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: project,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Technology logos with rotation
    gsap.utils.toArray(".tech-logos img").forEach((logo, index) => {
        gsap.from(logo, {
            opacity: 0,
            scale: 0.5,
            rotation: -180,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: index * 0.05,
            scrollTrigger: {
                trigger: logo,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Contact cards with 3D effect
    gsap.utils.toArray(".contact-card, .contact-form").forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            rotationY: -30,
            duration: 0.9,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Parallax effect for floating chips
    gsap.utils.toArray(".floating-chip").forEach((chip, index) => {
        gsap.to(chip, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // Skill bars with enhanced animation
    gsap.utils.toArray(".bar span").forEach((bar) => {
        const val = bar.getAttribute("data-val");
        ScrollTrigger.create({
            trigger: bar,
            start: "top 90%",
            onEnter: () =>
                gsap.to(bar, {
                    width: val + "%",
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: function() {
                        bar.textContent = Math.round(this.progress() * val) + "%";
                    }
                }),
        });
    });

    // Navbar background fade on scroll
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "scrolled", targets: ".navbar" }
    });

    // Smooth parallax for hero section
    gsap.to(".hero", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Text reveal animation for typewriter
    gsap.from(".typewriter", {
        opacity: 0,
        width: 0,
        duration: 2,
        ease: "power2.out",
        delay: 1
    });

} else {
    // Fallback for reduced motion
    document.querySelectorAll(".card-fade, .scroll-reveal").forEach(el => {
        el.style.opacity = 1;
        el.style.transform = "none";
    });
}

// Enhanced smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        
        gsap.to(window, {
            duration: 1.2,
            scrollTo: {
                y: target,
                offsetY: 80
            },
            ease: "power2.inOut"
        });
    });
});

// Progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--grad-1);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

ScrollTrigger.create({
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
        progressBar.style.width = (self.progress * 100) + '%';
    }
});

// Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-title, .about-card, .project, .timeline-item').forEach(el => {
    observer.observe(el);
});
