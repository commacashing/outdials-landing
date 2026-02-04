// ============================================
// OUTDIALS LANDING PAGE - JAVASCRIPT
// ============================================

// Counter Animation for Hero Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const suffix = element.dataset.suffix || '';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Trigger counters when hero stats are visible (Bidirectional)
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Fade in and count up
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
            // Fade out
            entry.target.classList.remove('stats-fade-in');
            entry.target.classList.add('stats-fade-out');
            
            // Reset counter flag so it counts again next time
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

// ============================================
// DEMO SECTION - AUTO-PLAY ANIMATION
// ============================================

let demoAnimationActive = false;
let demoAnimationInterval;

function startDemoAnimation() {
    const cards = document.querySelectorAll('.demo-card-wrapper');
    const demoCards = document.querySelectorAll('.demo-card');
    
    if (cards.length !== 3) return;
    
    // Reset all cards to ringing state
    function resetCards() {
        demoCards.forEach((card, index) => {
            card.classList.remove('answered', 'ended');
            const status = card.querySelector('.demo-card-status');
            status.className = 'demo-card-status ringing';
            status.innerHTML = '<span class="demo-status-dot"></span><span class="demo-status-text">Ringing...</span>';
        });
    }
    
    // Sequence animation
    function runSequence() {
        resetCards();
        
        // After 2 seconds, middle card (index 1) answers
        setTimeout(() => {
            const middleCard = demoCards[1];
            const middleStatus = middleCard.querySelector('.demo-card-status');
            
            middleCard.classList.add('answered');
            middleStatus.className = 'demo-card-status answered';
            middleStatus.innerHTML = '<span class="demo-status-dot"></span><span class="demo-status-text">Human Answered</span>';
            
            // Other cards end
            [0, 2].forEach(index => {
                const card = demoCards[index];
                const status = card.querySelector('.demo-card-status');
                card.classList.add('ended');
                status.className = 'demo-card-status ended';
                status.innerHTML = '<span class="demo-status-dot"></span><span class="demo-status-text">Call Ended</span>';
            });
        }, 2000);
    }
    
    // Run immediately
    runSequence();
    
    // Loop every 5 seconds
    demoAnimationInterval = setInterval(runSequence, 5000);
}

function stopDemoAnimation() {
    if (demoAnimationInterval) {
        clearInterval(demoAnimationInterval);
        demoAnimationInterval = null;
    }
    
    // Reset cards to initial state
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.classList.remove('answered', 'ended');
        const status = card.querySelector('.demo-card-status');
        status.className = 'demo-card-status ringing';
        status.innerHTML = '<span class="demo-status-dot"></span><span class="demo-status-text">Ringing...</span>';
    });
}

// Demo visibility observer (bidirectional)
const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const wrappers = entry.target.querySelectorAll('.demo-card-wrapper');
        
        if (entry.isIntersecting) {
            wrappers.forEach(wrapper => {
                wrapper.classList.remove('demo-hidden');
                wrapper.classList.add('demo-visible');
            });
            
            if (!demoAnimationActive) {
                demoAnimationActive = true;
                startDemoAnimation();
            }
        } else {
            wrappers.forEach(wrapper => {
                wrapper.classList.remove('demo-visible');
                wrapper.classList.add('demo-hidden');
            });
            
            if (demoAnimationActive) {
                demoAnimationActive = false;
                stopDemoAnimation();
            }
        }
    });
}, { threshold: 0.2 });

const demoSection = document.querySelector('.section-demo');
if (demoSection) {
    demoObserver.observe(demoSection);
}

// ============================================
// HOW IT WORKS - SPINNING CARDS
// ============================================

const flipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('flip-out');
            entry.target.classList.add('flip-in');
        } else {
            entry.target.classList.remove('flip-in');
            entry.target.classList.add('flip-out');
        }
    });
}, { threshold: 0.2 });

const howStepWrappers = document.querySelectorAll('.how-step-wrapper');
howStepWrappers.forEach(wrapper => {
    flipObserver.observe(wrapper);
});

// ============================================
// FEATURE MARQUEE - INTERACTIVE
// ============================================

const featureItems = document.querySelectorAll('.feature-item');
const featureVisuals = document.querySelectorAll('.feature-visual-content');

featureItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Remove active from all items
        featureItems.forEach(i => i.classList.remove('active'));
        featureVisuals.forEach(v => v.classList.remove('active'));
        
        // Add active to hovered item
        item.classList.add('active');
        
        // Show corresponding visual
        const feature = item.dataset.feature;
        const visual = document.querySelector(`[data-visual="${feature}"]`);
        if (visual) {
            visual.classList.add('active');
        }
    });
});

// Feature marquee visibility observer (bidirectional)
const marqueeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const marquee = entry.target.querySelector('.feature-marquee');
        if (marquee) {
            if (entry.isIntersecting) {
                marquee.classList.remove('marquee-hidden');
                marquee.classList.add('marquee-visible');
            } else {
                marquee.classList.remove('marquee-visible');
                marquee.classList.add('marquee-hidden');
            }
        }
    });
}, { threshold: 0.2 });

const featuresSection = document.querySelector('.section-features');
if (featuresSection) {
    marqueeObserver.observe(featuresSection);
}

// ============================================
// PRICING - VISIBILITY ANIMATION
// ============================================

const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const pricingSimple = entry.target.querySelector('.pricing-simple');
        if (pricingSimple) {
            if (entry.isIntersecting) {
                pricingSimple.classList.remove('pricing-hidden');
                pricingSimple.classList.add('pricing-visible');
            } else {
                pricingSimple.classList.remove('pricing-visible');
                pricingSimple.classList.add('pricing-hidden');
            }
        }
    });
}, { threshold: 0.3 });

const pricingSection = document.querySelector('.section-pricing');
if (pricingSection) {
    pricingObserver.observe(pricingSection);
}

// ============================================
// CONTACT - VISIBILITY ANIMATION
// ============================================

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const contactCta = entry.target.querySelector('.contact-cta');
        if (contactCta) {
            if (entry.isIntersecting) {
                contactCta.classList.remove('contact-hidden');
                contactCta.classList.add('contact-visible');
            } else {
                contactCta.classList.remove('contact-visible');
                contactCta.classList.add('contact-hidden');
            }
        }
    });
}, { threshold: 0.3 });

const contactSection = document.querySelector('.section-contact');
if (contactSection) {
    contactObserver.observe(contactSection);
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INITIALIZE ON LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('OutDials landing page loaded');
    
    // Ensure first feature is active on load
    const firstFeature = document.querySelector('.feature-item[data-feature="instant-bridge"]');
    const firstVisual = document.querySelector('.feature-visual-content[data-visual="instant-bridge"]');
    
    if (firstFeature && firstVisual) {
        firstFeature.classList.add('active');
        firstVisual.classList.add('active');
    }
});
