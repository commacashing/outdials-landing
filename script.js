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

// Trigger counters when hero stats are visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const originalText = stat.textContent;
                const number = parseInt(originalText);
                if (!isNaN(number)) {
                    stat.dataset.suffix = originalText.replace(number, '');
                    animateCounter(stat, number);
                }
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statObserver.observe(heroStats);
}

// ===== CARD FLIP ANIMATION (How It Works) =====

const flipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.how-step');
            cards.forEach(card => {
                card.classList.add('flip-in');
            });
            flipObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const howGrid = document.querySelector('.how-grid');
if (howGrid) {
    flipObserver.observe(howGrid);
}

// ===== FEATURE CARDS - DEAL FROM DECK =====

const dealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach(card => {
                card.classList.add('deal-card');
            });
            dealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const featuresGrid = document.querySelector('.features-grid');
if (featuresGrid) {
    dealObserver.observe(featuresGrid);
}

// ===== PRICING CARD REVEAL =====

const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('price-reveal');
            priceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

const pricingCard = document.querySelector('.pricing-card');
if (pricingCard) {
    priceObserver.observe(pricingCard);
}

// ===== CONTACT CARD REVEAL =====

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('contact-reveal');
            contactObserver.unobserve(entry.target);
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

// Add fade-in to problem cards (already animated via CSS)
const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach(card => observer.observe(card));

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
