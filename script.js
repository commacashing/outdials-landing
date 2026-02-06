// ===============================================
// OUTDIALS LANDING PAGE - FINAL JAVASCRIPT V3
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
    // WORKFLOW STEP INTERACTIONS
    // ===============================================
    
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach(step => {
        step.addEventListener('click', () => {
            const isActive = step.classList.contains('active');
            
            // Close all
            workflowSteps.forEach(s => s.classList.remove('active'));
            
            // Open clicked if wasn't active
            if (!isActive) {
                step.classList.add('active');
            }
        });
    });

    // Close when clicking outside
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
            // Reset all to ringing
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
    // AMD JAR FILLING ANIMATION
    // ===============================================
    
    const amdPanel = document.querySelector('[data-feature="premium-amd"]');
    
    if (amdPanel) {
        const jars = {
            busy: { element: amdPanel.querySelector('.busy-jar .jar-count'), count: 0, fill: amdPanel.querySelector('.busy-jar .jar-fill') },
            voicemail: { element: amdPanel.querySelector('.voicemail-jar .jar-count'), count: 0, fill: amdPanel.querySelector('.voicemail-jar .jar-fill') },
            human: { element: amdPanel.querySelector('.human-jar .jar-count'), count: 0, fill: amdPanel.querySelector('.human-jar .jar-fill') }
        };

        const balls = amdPanel.querySelectorAll('.number-ball');
        
        balls.forEach((ball, index) => {
            const type = ball.getAttribute('data-type');
            const delay = parseFloat(ball.style.getPropertyValue('--delay').replace('s', '')) * 1000;
            
            // Reset jars when panel becomes active
            const panelObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Reset counts
                        Object.values(jars).forEach(jar => {
                            jar.count = 0;
                            jar.element.textContent = '0';
                            jar.fill.style.height = '0%';
                        });

                        // Start incrementing after each ball drops
                        balls.forEach((b, i) => {
                            const bType = b.getAttribute('data-type');
                            const bDelay = parseFloat(b.style.getPropertyValue('--delay').replace('s', '')) * 1000;
                            
                            // Ball takes 3s to complete animation, increment at 70% (2.1s)
                            setTimeout(() => {
                                if (jars[bType]) {
                                    jars[bType].count++;
                                    jars[bType].element.textContent = jars[bType].count;
                                    
                                    // Update fill height (each ball = ~16.67% for 6 balls max)
                                    const fillPercent = Math.min((jars[bType].count / 6) * 100, 100);
                                    jars[bType].fill.style.height = fillPercent + '%';
                                }
                            }, bDelay + 2100);
                        });

                        // Loop the counts every 3s * 6 balls = 18s
                        setInterval(() => {
                            Object.values(jars).forEach(jar => {
                                jar.count = 0;
                                jar.element.textContent = '0';
                                jar.fill.style.height = '0%';
                            });

                            balls.forEach((b, i) => {
                                const bType = b.getAttribute('data-type');
                                const bDelay = parseFloat(b.style.getPropertyValue('--delay').replace('s', '')) * 1000;
                                
                                setTimeout(() => {
                                    if (jars[bType]) {
                                        jars[bType].count++;
                                        jars[bType].element.textContent = jars[bType].count;
                                        
                                        const fillPercent = Math.min((jars[bType].count / 6) * 100, 100);
                                        jars[bType].fill.style.height = fillPercent + '%';
                                    }
                                }, bDelay + 2100);
                            });
                        }, 18000);
                    }
                });
            }, { threshold: 0.5 });

            panelObserver.observe(amdPanel);
        });
    }

    // ===============================================
    // SCROLLJACKING - FEATURES SECTION (IMPROVED)
    // ===============================================
    
    const featuresSection = document.querySelector('.section-features-scrolljack');
    const featurePanels = document.querySelectorAll('.feature-panel');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    let currentPanelIndex = 0;
    let isScrollLocked = false;
    let lastScrollTime = 0;

    const updateActivePanel = (index) => {
        featurePanels.forEach((panel, i) => {
            if (i === index) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        progressDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentPanelIndex = index;
    };

    const handleFeatureScroll = (e) => {
        if (!featuresSection) return;

        const now = Date.now();
        if (now - lastScrollTime < 50) return; // Debounce
        lastScrollTime = now;

        const sectionRect = featuresSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const navHeight = document.querySelector('.nav').offsetHeight;

        // Check if features section is in view
        const isInSection = sectionRect.top <= navHeight && sectionRect.bottom >= viewportHeight;

        if (isInSection && !isScrollLocked) {
            const delta = e.deltaY || e.detail || -e.wheelDelta;
            
            if (Math.abs(delta) < 10) return; // Ignore tiny scrolls

            if (delta > 0 && currentPanelIndex < featurePanels.length - 1) {
                // Scroll down - next panel
                e.preventDefault();
                isScrollLocked = true;
                updateActivePanel(currentPanelIndex + 1);
                
                setTimeout(() => {
                    isScrollLocked = false;
                }, 600);
            } else if (delta < 0 && currentPanelIndex > 0) {
                // Scroll up - previous panel
                e.preventDefault();
                isScrollLocked = true;
                updateActivePanel(currentPanelIndex - 1);
                
                setTimeout(() => {
                    isScrollLocked = false;
                }, 600);
            }
            // If at first panel and scrolling up, OR at last panel and scrolling down, allow natural scroll
        }
    };

    window.addEventListener('wheel', handleFeatureScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', handleFeatureScroll, { passive: false });

    // Progress dots navigation
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

    // Initialize
    if (featurePanels.length > 0) {
        updateActivePanel(0);
    }

    // Show/hide progress dots based on features section visibility
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                featuresSection.classList.add('in-view');
            } else {
                featuresSection.classList.remove('in-view');
                // Reset to first panel when leaving section
                if (entry.boundingClientRect.top > 0) {
                    updateActivePanel(0);
                }
            }
        });
    }, { threshold: 0.1 });

    if (featuresSection) {
        progressObserver.observe(featuresSection);
    }

    // ===============================================
    // STANDARD SCROLL ANIMATIONS
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

    // Stagger demo cards
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
    // CONSOLE LOG
    // ===============================================
    
    console.log('🚀 OutDials Landing Page V3 Loaded');
    console.log('✅ Hero glow effects');
    console.log('✅ Workflow centered on line');
    console.log('✅ Improved phone mockups');
    console.log('✅ AMD jar filling animation');
    console.log('✅ Smooth scrolljacking');
    console.log('✅ Progress dots only in features');
});
