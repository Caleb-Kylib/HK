/**
 * premium.js — HakiLine Advocates
 * Handles: navbar scroll effect, trust card animations, smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ===========================
       1.  NAVBAR SCROLL EFFECT
    =========================== */
    const navbar = document.querySelector('.premium-navbar');

    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load
    }

    /* ===========================
       2.  TRUST CARD ANIMATIONS
       (Intersection Observer)
    =========================== */
    const trustCards = document.querySelectorAll('.trust-metric-card');

    if (trustCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    // stagger each card slightly
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, idx * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        trustCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }

    /* ===========================
       3.  TRUST BADGE HOVER PULSE
       (hero section badges)
    =========================== */
    const trustBadges = document.querySelectorAll('.trust-badge');
    trustBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.background = 'rgba(255,255,255,0.25)';
            badge.style.transform = 'scale(1.05)';
            badge.style.transition = 'all 0.3s ease';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.background = 'rgba(255,255,255,0.1)';
            badge.style.transform = 'scale(1)';
        });
    });

    /* ===========================
       4.  SMOOTH SCROLL for
       in-page anchor links
    =========================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - navbarHeight - 10,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ===========================
       5.  HERO CTA — subtle
       entrance animation
    =========================== */
    const heroPretitle = document.querySelector('.hero-pretitle');
    const heroTitle = document.querySelector('.premium-hero .hero-title');
    const heroSubtitle = document.querySelector('.premium-hero .hero-subtitle');
    const heroButtons = document.querySelector('.premium-hero .hero-buttons');
    const heroBadges = document.querySelector('.hero-trust-badges');

    const revealEl = (el, delay = 0) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
        requestAnimationFrame(() => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50);
        });
    };

    revealEl(heroPretitle, 100);
    revealEl(heroTitle, 300);
    revealEl(heroSubtitle, 500);
    revealEl(heroButtons, 700);
    revealEl(heroBadges, 900);

});
