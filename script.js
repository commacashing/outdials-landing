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
    // INFINITE ZOOM - HOW IT WORKS
    // ===============================================
    
    let currentZoomLayer = 1;
    let isZooming = false;
    const totalLayers = 4;

    const zoomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initZoomInteraction();
            }
        });
    }, { threshold: 0.3 });

    const zoomContainer = document.querySelector('.zoom-container');
    if (zoomContainer) {
        zoomObserver.observe(zoomContainer);
    }

    function initZoomInteraction() {
        const zoomSection = document.querySelector('.section-how');
        const layers = document.querySelectorAll('.zoom-layer');
        const progressDots = document.querySelectorAll('.zoom-progress-dot');

        // Auto-play zoom sequence
        let autoZoomInterval = setInterval(() => {
            if (!isZooming && currentZoomLayer < totalLayers) {
                zoomToNextLayer();
            } else if (currentZoomLayer >= totalLayers) {
                clearInterval(autoZoomInterval);
            }
        }, 3000);

        // Manual control with progress dots
        progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoZoomInterval);
                zoomToLayer(index + 1);
            });
        });

        // Scroll-based zoom
        window.addEventListener('wheel', (e) => {
            const rect = zoomSection.getBoundingClientRect();
            const isInZoomSection = rect.top <= 100 && rect.bottom >= window.innerHeight;

            if (isInZoomSection && !isZooming) {
                const scrollingDown = e.deltaY > 0;

                if (scrollingDown && currentZoomLayer < totalLayers) {
                    e.preventDefault();
                    clearInterval(autoZoomInterval);
                    zoomToNextLayer();
                } else if (!scrollingDown && currentZoomLayer > 1) {
                    e.preventDefault();
                    clearInterval(autoZoomInterval);
                    zoomToPreviousLayer();
                }
            }
        }, { passive: false });
    }

    function zoomToLayer(targetLayer) {
        if (isZooming || targetLayer === currentZoomLayer) return;
        
        isZooming = true;
        const layers = document.querySelectorAll('.zoom-layer');
        const progressDots = document.querySelectorAll('.zoom-progress-dot');

        // Update layers
        layers.forEach((layer, index) => {
            const layerNum = index + 1;
            layer.classList.remove('zoom-in', 'zoom-active', 'zoom-out');

            if (layerNum < targetLayer) {
                layer.classList.add('zoom-in');
            } else if (layerNum === targetLayer) {
                layer.classList.add('zoom-active');
            } else {
                layer.classList.add('zoom-out');
            }
        });

        // Update progress dots
        progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === targetLayer);
        });

        currentZoomLayer = targetLayer;

        setTimeout(() => {
            isZooming = false;
        }, 1200);
    }

    function zoomToNextLayer() {
        if (currentZoomLayer < totalLayers) {
            zoomToLayer(currentZoomLayer + 1);
        }
    }

    function zoomToPreviousLayer() {
        if (currentZoomLayer > 1) {
            zoomToLayer(currentZoomLayer - 1);
        }
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
    console.log('✅ Infinite zoom active');
    console.log('✅ Feature scroll-snap enabled');
    console.log('✅ Book demo animation ready');
});
