// ===============================================
// OUTDIALS LANDING PAGE - FINAL JAVASCRIPT V2
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // HERO STATS - BIDIRECTIONAL COUNTING
    // ===============================================
    
    let isCountingUp = false;
    let isCountingDown = false;

    const countStats = (direction) => {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach((stat, index) => {
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.nextElementSibling;
            const suffixText = suffix ? suffix.textContent : '';
            
            const duration = 1500;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                let current;
                if (direction === 'up') {
                    current = Math.floor(easeOut * target);
                } else {
                    current = Math.floor((1 - easeOut) * target);
                }
                
                stat.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    stat.textContent = direction === 'up' ? target : 0;
                }
            };
            
            setTimeout(() => animate(), index * 200);
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isCountingUp) {
                isCountingUp = true;
                isCountingDown = false;
                entry.target.classList.add('visible');
                countStats('up');
            } else if (!entry.isIntersecting && !isCountingDown) {
                isCountingDown = true;
                isCountingUp = false;
                entry.target.classList.remove('visible');
                countStats('down');
            }
        });
    }, { threshold: 0.3 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ===============================================
    // WORKFLOW DROPDOWN INTERACTIONS
    // ===============================================
    
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach(step => {
        step.addEventListener('click', () => {
            // Toggle active class
            const isActive = step.classList.contains('active');
            
            // Close all dropdowns
            workflowSteps.forEach(s => s.classList.remove('active'));
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                step.classList.add('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.workflow-step')) {
            workflowSteps.forEach(s => s.classList.remove('active'));
        }
    });

    // ===============================================
    // RACE CARD DEMO AUTO-PLAY
    // ===============================================
    
    let demoInterval;
    let isPlaying = false;

    const startDemo = () => {
        if (isPlaying) return;
        isPlaying = true;

        const statuses = document.querySelectorAll('.demo-card-status');

        const playSequence = () => {
            // Reset all cards to ringing
            statuses.forEach(status => {
                status.className = 'demo-card-status ringing';
                status.querySelector('.demo-status-text').textContent = 'Ringing...';
            });

            // After 2 seconds, middle card answers
            setTimeout(() => {
                statuses[1].className = 'demo-card-status answered';
                statuses[1].querySelector('.demo-status-text').textContent = 'Connected';

                statuses[0].className = 'demo-card-status failed';
                statuses[0].querySelector('.demo-status-text').textContent = 'Ended';

                statuses[2].className = 'demo-card-status amd';
                statuses[2].querySelector('.demo-status-text').textContent = 'Voicemail';
            }, 2000);
        };

        playSequence();
        demoInterval = setInterval(playSequence, 5000);
    };

    const stopDemo = () => {
        if (!isPlaying) return;
        isPlaying = false;

        if (demoInterval) {
            clearInterval(demoInterval);
        }

        const statuses = document.querySelectorAll('.demo-card-status');
        statuses.forEach(status => {
            status.className = 'demo-card-status ringing';
            status.querySelector('.demo-status-text').textContent = 'Ringing...';
        });
    };

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
    // SCROLLJACKING - FEATURES SECTION
    // ===============================================
    
    const featuresSection = document.querySelector('.section-features-scrolljack');
    const featurePanels = document.querySelectorAll('.feature-panel');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    let currentPanelIndex = 0;
    let isScrollLocked = false;
    let scrollTimeout;

    const updateActivePanel = (index) => {
        // Update panels
        featurePanels.forEach((panel, i) => {
            if (i === index) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Update progress dots
        progressDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentPanelIndex = index;
    };

    const handleScroll = (e) => {
        if (!featuresSection) return;

        const sectionRect = featuresSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if we're in the features section
        const isInSection = sectionRect.top <= 0 && sectionRect.bottom >= viewportHeight;

        if (isInSection && !isScrollLocked) {
            e.preventDefault();

            isScrollLocked = true;

            // Determine scroll direction
            const delta = e.deltaY || e.detail || e.wheelDelta;
            
            if (delta > 0 && currentPanelIndex < featurePanels.length - 1) {
                // Scroll down - next panel
                updateActivePanel(currentPanelIndex + 1);
            } else if (delta < 0 && currentPanelIndex > 0) {
                // Scroll up - previous panel
                updateActivePanel(currentPanelIndex - 1);
            } else if (delta > 0 && currentPanelIndex === featurePanels.length - 1) {
                // Last panel, allow scroll to next section
                isScrollLocked = false;
                return;
            } else if (delta < 0 && currentPanelIndex === 0) {
                // First panel, allow scroll to previous section
                isScrollLocked = false;
                return;
            }

            // Unlock after delay
            setTimeout(() => {
                isScrollLocked = false;
            }, 800);
        }
    };

    // Add scroll event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', handleScroll, { passive: false });

    // Progress dots click navigation
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateActivePanel(index);
            
            // Scroll to features section if not in view
            const sectionRect = featuresSection.getBoundingClientRect();
            if (sectionRect.top > 0 || sectionRect.bottom < window.innerHeight) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initialize first panel
    if (featurePanels.length > 0) {
        updateActivePanel(0);
    }

    // Reset panel when leaving section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                // Scrolled past features section upwards, reset to first panel
                updateActivePanel(0);
            }
        });
    }, { threshold: 0 });

    if (featuresSection) {
        sectionObserver.observe(featuresSection);
    }

    // ===============================================
    // STANDARD SCROLL ANIMATIONS (BIDIRECTIONAL)
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

    const animatedElements = document.querySelectorAll(
        '.section-demo, .demo-card-wrapper, .section-pricing, .section-contact'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // ===============================================
    // STAGGER DEMO CARDS
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
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // ===============================================
    // PHONE ANIMATION - INSTANT BRIDGE
    // ===============================================
    
    const instantBridgePanel = document.querySelector('[data-feature="instant-bridge"]');
    if (instantBridgePanel) {
        const phoneLeft = instantBridgePanel.querySelector('.phone-left');
        const phoneRight = instantBridgePanel.querySelector('.phone-right');
        const arrow = instantBridgePanel.querySelector('.connection-arrow');

        const panelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation sequence
                    setTimeout(() => {
                        // Phone 1 answers
                        phoneLeft.querySelector('.phone-answer-btn').style.background = 'var(--accent-green)';
                        
                        // Arrow appears
                        setTimeout(() => {
                            arrow.style.opacity = '1';
                            
                            // Phone 2 starts ringing
                            setTimeout(() => {
                                phoneRight.querySelector('.phone-timer').style.display = 'block';
                            }, 500);
                        }, 300);
                    }, 500);
                }
            });
        }, { threshold: 0.5 });

        panelObserver.observe(instantBridgePanel);
    }

    // ===============================================
    // CONSOLE LOG
    // ===============================================
    
    console.log('🚀 OutDials Landing Page V2 Loaded');
    console.log('✅ Bidirectional hero stats');
    console.log('✅ Workflow dropdowns');
    console.log('✅ Scrolljacking features');
    console.log('✅ Race Card demo');
});
