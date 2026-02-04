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

// Navigation background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Hero title parallax
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
    const increment = target / 60;
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

// Stats counter - Bidirectional
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('stats-fade-out');
            entry.target.classList.add('stats-fade-in');
            
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
            entry.target.classList.remove('stats-fade-in');
            entry.target.classList.add('stats-fade-out');
            
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                delete stat.dataset.counted;
            });
        }
    });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statObserver.observe(heroStats);
}

// ===== DEMO CARDS - DEAL IN/OUT ANIMATION (Bidirectional) =====

const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Deal in
            const cards = entry.target.querySelectorAll('.demo-card-wrapper');
            cards.forEach(card => {
                card.classList.remove('deal-out');
                card.classList.add('deal-in');
            });
        } else {
            // Deal out
            const cards = entry.target.querySelectorAll('.demo-card-wrapper');
            cards.forEach(card => {
                card.classList.remove('deal-in');
                card.classList.add('deal-out');
            });
        }
    });
}, { threshold: 0.2 });

const demoContainer = document.querySelector('.demo-race-container');
if (demoContainer) {
    demoObserver.observe(demoContainer);
}

// ===== HOW IT WORKS - 360° SPIN (Bidirectional) =====

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

// ===== BENTO GRID - STAGGERED SLIDE (Bidirectional) =====

const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.bento-card');
            cards.forEach((card, index) => {
                card.classList.remove(`bento-out-${index + 1}`);
                card.classList.add(`bento-in-${index + 1}`);
            });
        } else {
            const cards = entry.target.querySelectorAll('.bento-card');
            cards.forEach((card, index) => {
                card.classList.remove(`bento-in-${index + 1}`);
                card.classList.add(`bento-out-${index + 1}`);
            });
        }
    });
}, { threshold: 0.2 });

const bentoGrid = document.querySelector('.bento-grid');
if (bentoGrid) {
    bentoObserver.observe(bentoGrid);
}

// ===== PRICING CARD - SCALE & FADE (Bidirectional) =====

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

// ===== CALENDLY - GLOW REVEAL (Bidirectional) =====

const calendlyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('calendly-reveal');
            entry.target.classList.remove('calendly-hide');
        } else {
            entry.target.classList.remove('calendly-reveal');
            entry.target.classList.add('calendly-hide');
        }
    });
}, { threshold: 0.3 });

const calendlyWrapper = document.querySelector('.calendly-wrapper');
if (calendlyWrapper) {
    calendlyObserver.observe(calendlyWrapper);
}

// ===== PERFORMANCE OPTIMIZATION =====

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--spring', 'ease');
    document.documentElement.style.setProperty('--spring-fast', 'ease');
}

console.log('🚀 OutDials landing page loaded with bidirectional animations');
