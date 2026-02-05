// ===============================================
// OUTDIALS LANDING PAGE - FINAL JAVASCRIPT
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // SCROLL-TRIGGERED ANIMATIONS (BIDIRECTIONAL)
    // ===============================================
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all animated sections
    const animatedElements = document.querySelectorAll(
        '.hero-stats, .section-demo, .demo-card-wrapper, .how-step-wrapper, .section-features, .section-pricing, .section-contact'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // ===============================================
    // HERO STATS COUNTER (BIDIRECTIONAL)
    // ===============================================
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const statValues = entry.target.querySelectorAll('.stat-value');
            
            if (entry.isIntersecting) {
                // Animate in
                statValues.forEach((stat, index) => {
                    const originalValue = stat.textContent;
                    const endValue = originalValue;
                    
                    // Determine if it's a number or percentage
                    const isPercentage = endValue.includes('%');
                    const isMultiplier = endValue.includes('x');
                    const hasMs = endValue.includes('ms');
                    
                    let numericValue;
                    if (isPercentage) {
                        numericValue = parseInt(endValue);
                    } else if (isMultiplier) {
                        numericValue = parseInt(endValue);
                    } else if (hasMs) {
                        numericValue = parseInt(endValue);
                    } else {
                        numericValue = parseInt(endValue);
                    }
                    
                    const duration = 1500;
                    const startTime = Date.now();
                    
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * numericValue);
                        
                        if (isPercentage) {
                            stat.textContent = current + '%';
                        } else if (isMultiplier) {
                            stat.textContent = current + 'x';
                        } else if (hasMs) {
                            stat.textContent = current + 'ms';
                        } else {
                            stat.textContent = current;
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            stat.textContent = endValue;
                        }
                    };
                    
                    setTimeout(() => animate(), index * 200);
                });
            } else {
                // Reset to 0 when scrolling out
                statValues.forEach(stat => {
                    const originalValue = stat.textContent;
                    if (originalValue.includes('%')) {
                        stat.textContent = '0%';
                    } else if (originalValue.includes('x')) {
                        stat.textContent = '0x';
                    } else if (originalValue.includes('ms')) {
                        stat.textContent = '0ms';
                    } else {
                        stat.textContent = '0';
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ===============================================
    // RACE CARD DEMO AUTO-PLAY
    // ===============================================
    
    let demoInterval;
    let isPlaying = false;

    const startDemo = () => {
        if (isPlaying) return;
        isPlaying = true;

        const cards = document.querySelectorAll('.demo-card');
        const statuses = document.querySelectorAll('.demo-card-status');

        const playSequence = () => {
            // Reset all cards to ringing
            statuses.forEach(status => {
                status.className = 'demo-card-status ringing';
                status.querySelector('.demo-status-text').textContent = 'Ringing...';
            });

            // After 2 seconds, middle card answers
            setTimeout(() => {
                // Middle card (index 1) answers
                statuses[1].className = 'demo-card-status answered';
                statuses[1].querySelector('.demo-status-text').textContent = 'Connected';

                // Other cards fail
                statuses[0].className = 'demo-card-status failed';
                statuses[0].querySelector('.demo-status-text').textContent = 'Ended';

                statuses[2].className = 'demo-card-status amd';
                statuses[2].querySelector('.demo-status-text').textContent = 'Voicemail';
            }, 2000);
        };

        // Play sequence immediately
        playSequence();

        // Loop every 5 seconds
        demoInterval = setInterval(playSequence, 5000);
    };

    const stopDemo = () => {
        if (!isPlaying) return;
        isPlaying = false;

        if (demoInterval) {
            clearInterval(demoInterval);
        }

        // Reset all cards to ringing
        const statuses = document.querySelectorAll('.demo-card-status');
        statuses.forEach(status => {
            status.className = 'demo-card-status ringing';
            status.querySelector('.demo-status-text').textContent = 'Ringing...';
        });
    };

    // Observe demo section to start/stop auto-play
    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startDemo();
            } else {
                stopDemo();
            }
        });
    }, { threshold: 0.5 });

    const demoSection = document.querySelector('.section-demo');
    if (demoSection) {
        demoObserver.observe(demoSection);
    }

    // ===============================================
    // FEATURE MARQUEE INTERACTIVITY
    // ===============================================
    
    const featureItems = document.querySelectorAll('.feature-item');
    const featureVisuals = document.querySelectorAll('.feature-visual-content');

    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all items
            featureItems.forEach(i => i.classList.remove('active'));
            
            // Add active to clicked item
            item.classList.add('active');
            
            // Get the feature type
            const featureType = item.getAttribute('data-feature');
            
            // Hide all visuals
            featureVisuals.forEach(v => v.classList.remove('active'));
            
            // Show corresponding visual
            const targetVisual = document.querySelector(`[data-visual="${featureType}"]`);
            if (targetVisual) {
                targetVisual.classList.add('active');
            }
        });

        // Also trigger on hover for better UX
        item.addEventListener('mouseenter', () => {
            // Remove active from all items
            featureItems.forEach(i => i.classList.remove('active'));
            
            // Add active to hovered item
            item.classList.add('active');
            
            // Get the feature type
            const featureType = item.getAttribute('data-feature');
            
            // Hide all visuals
            featureVisuals.forEach(v => v.classList.remove('active'));
            
            // Show corresponding visual
            const targetVisual = document.querySelector(`[data-visual="${featureType}"]`);
            if (targetVisual) {
                targetVisual.classList.add('active');
            }
        });
    });

    // ===============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================================
    // TRUST BAR - PAUSE ON HOVER
    // ===============================================
    
    const trustTicker = document.querySelector('.trust-ticker');
    if (trustTicker) {
        trustTicker.addEventListener('mouseenter', () => {
            trustTicker.style.animationPlayState = 'paused';
        });
        
        trustTicker.addEventListener('mouseleave', () => {
            trustTicker.style.animationPlayState = 'running';
        });
    }

    // ===============================================
    // NAV BACKGROUND ON SCROLL
    // ===============================================
    
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        lastScroll = currentScroll;
    });

    // ===============================================
    // STAGGER DEMO CARDS VISIBILITY
    // ===============================================
    
    const demoCards = document.querySelectorAll('.demo-card-wrapper');
    const demoCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });

    demoCards.forEach(card => demoCardsObserver.observe(card));

    // ===============================================
    // STAGGER HOW IT WORKS CARDS
    // ===============================================
    
    const howSteps = document.querySelectorAll('.how-step-wrapper');
    const howStepsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });

    howSteps.forEach(step => howStepsObserver.observe(step));

    // ===============================================
    // CONSOLE LOG (OPTIONAL - CAN BE REMOVED)
    // ===============================================
    
    console.log('🚀 OutDials Landing Page Loaded');
    console.log('✅ All animations initialized');
    console.log('✅ Race Card demo ready');
    console.log('✅ Feature marquee active');
});
