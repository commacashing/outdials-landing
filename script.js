// ===============================================
// OUTDIALS LANDING PAGE - FINAL JAVASCRIPT V4
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
    // WORKFLOW INTERACTIONS
    // ===============================================
    
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach(step => {
        step.addEventListener('click', () => {
            const isActive = step.classList.contains('active');
            
            workflowSteps.forEach(s => s.classList.remove('active'));
            
            if (!isActive) {
                step.classList.add('active');
            }
        });
    });

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
            statuses.forEach(status => {
                status.className = 'demo-card-status ringing';
                status.querySelector('.demo-status-text').textContent = 'Ringing...';
            });

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
    // INSTANT BRIDGE - PHONE ANIMATION
    // ===============================================
    
    const instantBridgePanel = document.querySelector('[data-feature="instant-bridge"]');
    let phoneAnimationRunning = false;

    const runPhoneAnimation = () => {
        if (phoneAnimationRunning) return;
        phoneAnimationRunning = true;

        const acceptBtn = instantBridgePanel.querySelector('.accept-btn');
        const arrow = instantBridgePanel.querySelector('.bridge-connection');
        const transferText = instantBridgePanel.querySelector('.transfer-text');
        const connectedText = instantBridgePanel.querySelector('.connected-text');

        // Reset
        acceptBtn.classList.add('flashing');
        arrow.style.opacity = '0';
        transferText.style.display = 'block';
        connectedText.style.display = 'none';

        // Step 1: Flash accept button (already flashing)
        setTimeout(() => {
            // Step 2: Show arrow
            arrow.style.opacity = '1';
            
            // Step 3: Show "Transferring..." on right phone
            setTimeout(() => {
                // Step 4: Change to "Connected"
                setTimeout(() => {
                    transferText.style.display = 'none';
                    connectedText.style.display = 'block';
                    acceptBtn.classList.remove('flashing');
                }, 1500);
            }, 500);
        }, 1500);

        // Loop
        setTimeout(() => {
            phoneAnimationRunning = false;
            runPhoneAnimation();
        }, 6000);
    };

    const phoneObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runPhoneAnimation();
            } else {
                phoneAnimationRunning = false;
            }
        });
    }, { threshold: 0.5 });

    if (instantBridgePanel) {
        phoneObserver.observe(instantBridgePanel);
    }

    // ===============================================
    // AMD - SEQUENTIAL BALL DROP ANIMATION
    // ===============================================
    
    const amdPanel = document.querySelector('[data-feature="premium-amd"]');
    
    if (amdPanel) {
        const balls = amdPanel.querySelectorAll('.number-ball');
        const busyJar = amdPanel.querySelector('.busy-jar');
        const voicemailJar = amdPanel.querySelector('.voicemail-jar');
        const humanJar = amdPanel.querySelector('.human-jar');
        
        const busyCount = busyJar.querySelector('.jar-count');
        const voicemailCount = voicemailJar.querySelector('.jar-count');
        const humanCount = humanJar.querySelector('.jar-count');
        
        const busyLiquid = busyJar.querySelector('.jar-liquid');
        const voicemailLiquid = voicemailJar.querySelector('.jar-liquid');
        const humanLiquid = humanJar.querySelector('.jar-liquid');

        let busyTotal = 0;
        let voicemailTotal = 0;
        let humanTotal = 0;
        let animationRunning = false;

        const dropBall = (ball, index) => {
            const type = ball.getAttribute('data-type');
            
            // Create CSS animation
            const keyframes = `
                @keyframes ballDrop${index} {
                    0% {
                        top: 40px;
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    40% {
                        top: 180px;
                    }
                    65% {
                        top: 350px;
                    }
                    80% {
                        top: 350px;
                        opacity: 1;
                    }
                    100% {
                        top: 350px;
                        opacity: 0;
                    }
                }
            `;
            
            // Inject keyframes
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            // Apply animation
            ball.style.animation = `ballDrop${index} 2.5s ease-in-out`;
            
            // Update jar counts when ball reaches bottom (at 80% of animation = 2s)
            setTimeout(() => {
                if (type === 'busy' && busyTotal < 15) {
                    busyTotal++;
                    busyCount.textContent = busyTotal;
                    busyLiquid.style.height = `${(busyTotal / 15) * 100}%`;
                } else if (type === 'voicemail' && voicemailTotal < 5) {
                    voicemailTotal++;
                    voicemailCount.textContent = voicemailTotal;
                    voicemailLiquid.style.height = `${(voicemailTotal / 5) * 100}%`;
                } else if (type === 'human' && humanTotal < 1) {
                    humanTotal++;
                    humanCount.textContent = humanTotal;
                    humanLiquid.style.height = `100%`;
                }
            }, 2000);
            
            // Reset ball after animation
            setTimeout(() => {
                ball.style.animation = '';
                styleSheet.remove();
            }, 2500);
        };

        const runAMDAnimation = () => {
            if (animationRunning) return;
            animationRunning = true;

            // Reset
            busyTotal = 0;
            voicemailTotal = 0;
            humanTotal = 0;
            busyCount.textContent = '0';
            voicemailCount.textContent = '0';
            humanCount.textContent = '0';
            busyLiquid.style.height = '0%';
            voicemailLiquid.style.height = '0%';
            humanLiquid.style.height = '0%';

            // Drop balls sequentially
            balls.forEach((ball, index) => {
                setTimeout(() => {
                    dropBall(ball, index);
                    
                    // If last ball, restart after delay
                    if (index === balls.length - 1) {
                        setTimeout(() => {
                            animationRunning = false;
                            runAMDAnimation();
                        }, 4000);
                    }
                }, index * 400); // 400ms delay between each ball
            });
        };

        const amdObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runAMDAnimation();
                } else {
                    animationRunning = false;
                }
            });
        }, { threshold: 0.5 });

        amdObserver.observe(amdPanel);
    }

    // ===============================================
    // SCROLLJACKING - FEATURES
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
        if (now - lastScrollTime < 50) return;
        lastScrollTime = now;

        const sectionRect = featuresSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const navHeight = document.querySelector('.nav').offsetHeight;

        const isInSection = sectionRect.top <= navHeight && sectionRect.bottom >= viewportHeight;

        if (isInSection && !isScrollLocked) {
            const delta = e.deltaY || e.detail || -e.wheelDelta;
            
            if (Math.abs(delta) < 10) return;

            if (delta > 0 && currentPanelIndex < featurePanels.length - 1) {
                e.preventDefault();
                isScrollLocked = true;
                updateActivePanel(currentPanelIndex + 1);
                
                setTimeout(() => {
                    isScrollLocked = false;
                }, 600);
            } else if (delta < 0 && currentPanelIndex > 0) {
                e.preventDefault();
                isScrollLocked = true;
                updateActivePanel(currentPanelIndex - 1);
                
                setTimeout(() => {
                    isScrollLocked = false;
                }, 600);
            }
        }
    };

    window.addEventListener('wheel', handleFeatureScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', handleFeatureScroll, { passive: false });

    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateActivePanel(index);
            
            const sectionRect = featuresSection.getBoundingClientRect();
            if (sectionRect.top > 0 || sectionRect.bottom < window.innerHeight) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    if (featurePanels.length > 0) {
        updateActivePanel(0);
    }

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                featuresSection.classList.add('in-view');
            } else {
                featuresSection.classList.remove('in-view');
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
    // SMOOTH SCROLLING
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
    // TRUST BAR
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
    // NAV BACKGROUND
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
    // LOTTIE HOLOGRAM ANIMATION
    // ===============================================
    
    const lottieContainer = document.getElementById('lottie-hologram');
    let hologramAnimation = null;
    
    if (lottieContainer) {
        // Wait for Lottie library to load
        const initLottie = () => {
            if (typeof lottie !== 'undefined') {
                console.log('Loading Lottie animation...');
                
                try {
                    hologramAnimation = lottie.loadAnimation({
                        container: lottieContainer,
                        renderer: 'svg',
                        loop: true,
                        autoplay: false,
                        path: 'hologram-animation.json'
                    });

                    hologramAnimation.addEventListener('DOMLoaded', () => {
                        console.log('✅ Lottie animation loaded successfully');
                    });

                    hologramAnimation.addEventListener('data_failed', () => {
                        console.error('❌ Failed to load hologram-animation.json');
                    });

                    const lottieObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                hologramAnimation.play();
                            } else {
                                hologramAnimation.stop();
                            }
                        });
                    }, { threshold: 0.3 });

                    lottieObserver.observe(lottieContainer);
                } catch (error) {
                    console.error('Lottie error:', error);
                }
            } else {
                console.error('Lottie library not loaded');
            }
        };

        // Try to init immediately, or wait for window load
        if (document.readyState === 'complete') {
            initLottie();
        } else {
            window.addEventListener('load', initLottie);
        }
    }

    // ===============================================
    // CONSOLE LOG
    // ===============================================
    
    console.log('🚀 OutDials Landing Page V5 Loaded');
});
