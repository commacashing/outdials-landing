// ===============================================
// OUTDIALS LANDING PAGE - UPDATED JAVASCRIPT
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
        '.section-demo, .demo-card-wrapper, .section-features, .section-pricing, .section-contact'
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
                    const target = parseInt(stat.getAttribute('data-target'));
                    
                    // Determine suffix
                    let suffix = '';
                    if (index === 0) suffix = 'x';
                    if (index === 1) suffix = '%';
                    if (index === 2) suffix = 'ms';
                    
                    stat.setAttribute('data-suffix', suffix);
                    
                    const duration = 1500;
                    const startTime = Date.now();
                    
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * target);
                        
                        stat.textContent = current;
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    
                    setTimeout(() => animate(), index * 200);
                });
            } else {
                // Reset to 0 when scrolling out
                statValues.forEach((stat, index) => {
                    stat.textContent = '0';
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
    // FLOW DIAGRAM ANIMATION
    // ===============================================
    
    let flowAnimationPlayed = false;

    const flowDiagramObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !flowAnimationPlayed) {
                flowAnimationPlayed = true;
                animateFlowDiagram();
            }
        });
    }, { threshold: 0.3 });

    const howSection = document.querySelector('.section-how');
    if (howSection) {
        flowDiagramObserver.observe(howSection);
    }

    function animateFlowDiagram() {
        const animatedPath = document.getElementById('flow-path-animated');
        const nodes = document.querySelectorAll('.flow-node');
        
        if (!animatedPath || !nodes.length) return;

        // Animate the line
        animatedPath.style.transition = 'stroke-dasharray 2s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            animatedPath.style.strokeDasharray = '1000 0';
        }, 100);

        // Activate nodes sequentially
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('active');
            }, 500 * index + 300);
        });
    }

    // ===============================================
    // FEATURE SCROLL-SNAP
    // ===============================================
    
    const featureBlocks = document.querySelectorAll('.feature-block');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.4 });

    featureBlocks.forEach(block => {
        featureObserver.observe(block);
    });

    // Scroll snap effect for features section
    const featuresSection = document.querySelector('.section-features');
    if (featuresSection) {
        let isScrolling = false;
        let currentFeatureIndex = 0;

        window.addEventListener('wheel', (e) => {
            const rect = featuresSection.getBoundingClientRect();
            const isInFeatureSection = rect.top <= 100 && rect.bottom >= window.innerHeight;
            
            if (isInFeatureSection && !isScrolling) {
                const scrollingDown = e.deltaY > 0;
                
                if (scrollingDown && currentFeatureIndex < featureBlocks.length - 1) {
                    e.preventDefault();
                    isScrolling = true;
                    currentFeatureIndex++;
                    featureBlocks[currentFeatureIndex].scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                    setTimeout(() => { isScrolling = false; }, 1000);
                } else if (!scrollingDown && currentFeatureIndex > 0) {
                    e.preventDefault();
                    isScrolling = true;
                    currentFeatureIndex--;
                    featureBlocks[currentFeatureIndex].scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                    setTimeout(() => { isScrolling = false; }, 1000);
                }
            }
        }, { passive: false });
    }

    // ===============================================
    // BOOK DEMO ANIMATION
    // ===============================================
    
    let bookDemoAnimationPlayed = false;

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !bookDemoAnimationPlayed) {
                bookDemoAnimationPlayed = true;
                setTimeout(() => {
                    animateBookDemo();
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    const contactSection = document.querySelector('.section-contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    function animateBookDemo() {
        const cursor = document.getElementById('animatedCursor');
        const button = document.getElementById('startDialingBtn');
        const hologram = document.getElementById('hologramContainer');

        if (!cursor || !button || !hologram) return;

        // Start cursor animation
        cursor.classList.add('animating');

        // After cursor reaches button (2s), click it
        setTimeout(() => {
            button.classList.add('clicked');
            
            // Show hologram after button press
            setTimeout(() => {
                hologram.classList.add('visible');
                
                // Hide cursor
                cursor.style.opacity = '0';
            }, 600);
        }, 2000);
    }

    // Make button clickable manually too
    const startDialingBtn = document.getElementById('startDialingBtn');
    const hologramContainer = document.getElementById('hologramContainer');
    
    if (startDialingBtn && hologramContainer) {
        startDialingBtn.addEventListener('click', () => {
            if (!hologramContainer.classList.contains('visible')) {
                startDialingBtn.classList.add('clicked');
                setTimeout(() => {
                    hologramContainer.classList.add('visible');
                }, 300);
            }
        });
    }

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
    // CONSOLE LOG
    // ===============================================
    
    console.log('🚀 OutDials Landing Page Loaded');
    console.log('✅ All animations initialized');
    console.log('✅ Race Card demo ready');
    console.log('✅ Flow diagram active');
    console.log('✅ Feature scroll-snap enabled');
    console.log('✅ Book demo animation ready');
});
