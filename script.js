// ===== SMOOTH SCROLL & NAVIGATION =====

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation background on scroll + morph effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Parallax on hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const scrolled = window.scrollY;
        heroTitle.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroTitle.style.opacity = 1 - (scrolled / 500);
    }
});

// ===== NUMBER COUNTER ANIMATION =====

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Trigger counters when hero stats are visible (Bidirectional)
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Fade in and count up
            entry.target.style.animation = 'fadeInUp 0.8s var(--spring) forwards';
            entry.target.style.opacity = '1';
            
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const originalText = stat.textContent;
                const number = parseInt(originalText);
                if (!isNaN(number) && !stat.dataset.counted) {
                    stat.dataset.suffix = originalText.replace(number, '');
                    stat.dataset.counted = 'true';
                    animateCounter(stat, number);
                }
            });
        } else {
            // Fade out
            entry.target.style.animation = 'fadeOutDown 0.8s var(--spring) forwards';
            entry.target.style.opacity = '0';
        }
    });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statObserver.observe(heroStats);
}

// ===== CARD FLIP ANIMATION (How It Works) - Bidirectional =====

const flipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('flip-in');
            entry.target.classList.remove('flip-out');
        } else {
            entry.target.classList.remove('flip-in');
            entry.target.classList.add('flip-out');
        }
    });
}, { threshold: 0.3 });

const howCards = document.querySelectorAll('.how-step-wrapper');
howCards.forEach(card => {
    flipObserver.observe(card);
});

// ===== FEATURE CARDS - SLIDE FROM TOP-LEFT - Bidirectional =====

const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            entry.target.classList.remove('slide-out');
        } else {
            entry.target.classList.remove('slide-in');
            entry.target.classList.add('slide-out');
        }
    });
}, { threshold: 0.2 });

const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    slideObserver.observe(card);
});

// ===== PRICING CARD REVEAL - Bidirectional =====

const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('price-reveal');
            entry.target.classList.remove('price-hide');
        } else {
            entry.target.classList.remove('price-reveal');
            entry.target.classList.add('price-hide');
        }
    });
}, { threshold: 0.4 });

const pricingCard = document.querySelector('.pricing-card');
if (pricingCard) {
    priceObserver.observe(pricingCard);
}

// ===== CONTACT CARD REVEAL - Bidirectional =====

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('contact-reveal');
            entry.target.classList.remove('contact-hide');
        } else {
            entry.target.classList.remove('contact-reveal');
            entry.target.classList.add('contact-hide');
        }
    });
}, { threshold: 0.4 });

const contactCard = document.querySelector('.contact-card');
if (contactCard) {
    contactObserver.observe(contactCard);
}

// ===== SCROLL-TRIGGERED FADE-IN & BLUR =====

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('blur-in')) {
                entry.target.classList.add('focused');
            }
        }
    });
}, observerOptions);

// ===== PROBLEM CARDS - Bidirectional =====

const problemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate in
            if (entry.target.classList.contains('problem-before')) {
                entry.target.style.animation = 'slideInLeft 0.8s var(--spring) forwards';
            } else if (entry.target.classList.contains('problem-after')) {
                entry.target.style.animation = 'slideInRight 0.8s var(--spring) 0.2s forwards';
            } else if (entry.target.classList.contains('problem-arrow')) {
                entry.target.style.animation = 'pulseFade 0.8s var(--spring) 0.4s forwards';
            }
        } else {
            // Animate out
            if (entry.target.classList.contains('problem-before')) {
                entry.target.style.animation = 'slideOutLeft 0.8s var(--spring) forwards';
            } else if (entry.target.classList.contains('problem-after')) {
                entry.target.style.animation = 'slideOutRight 0.8s var(--spring) forwards';
            } else if (entry.target.classList.contains('problem-arrow')) {
                entry.target.style.animation = 'fadeOut 0.8s var(--spring) forwards';
            }
        }
    });
}, { threshold: 0.3 });

const problemCards = document.querySelectorAll('.problem-card, .problem-arrow');
problemCards.forEach(card => {
    problemObserver.observe(card);
});

// ===== BUTTON RIPPLE EFFECT =====

const buttons = document.querySelectorAll('.btn-primary');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== PERFORMANCE OPTIMIZATION =====

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--spring', 'ease');
    document.documentElement.style.setProperty('--spring-fast', 'ease');
}

// Lazy load any future images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
}

console.log('🚀 OutDials landing page loaded with aggressive animations');
