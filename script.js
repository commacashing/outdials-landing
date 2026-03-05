// ===============================================
// OUTDIALS LANDING PAGE - UPDATED JAVASCRIPT V6
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // WORKFLOW INTERACTIONS
    // ===============================================
    
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach(step => {
        step.addEventListener('click', () => {
            const isActive = step.classList.contains('active');
            workflowSteps.forEach(s => s.classList.remove('active'));
            if (!isActive) step.classList.add('active');
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
        if (demoInterval) clearInterval(demoInterval);
        const statuses = document.querySelectorAll('.demo-card-status');
        statuses.forEach(status => {
            status.className = 'demo-card-status ringing';
            status.querySelector('.demo-status-text').textContent = 'Ringing...';
        });
    };

    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) startDemo();
            else stopDemo();
        });
    }, { threshold: window.innerWidth <= 768 ? 0.2 : 0.5 });

    const demoSection = document.querySelector('.section-demo');
    if (demoSection) demoObserver.observe(demoSection);

    // ===============================================
    // INSTANT BRIDGE - PHONE ANIMATION
    // ===============================================
    
    const instantBridgePanel = document.querySelector('[data-feature="instant-bridge"]');
    let phoneAnimationPlayed = false;
    let phoneTimeouts = [];

    const resetPhoneAnimation = () => {
        if (!instantBridgePanel) return;
        phoneTimeouts.forEach(t => clearTimeout(t));
        phoneTimeouts = [];
        
        const phoneIncoming = instantBridgePanel.querySelector('.phone-incoming');
        const phoneConnected = instantBridgePanel.querySelector('.phone-connected');
        const acceptBtn = instantBridgePanel.querySelector('.phone-incoming .accept-btn');
        const arrow = instantBridgePanel.querySelector('.bridge-connection');
        const transferText = instantBridgePanel.querySelector('.transfer-text');
        const connectedText = instantBridgePanel.querySelector('.connected-text');

        phoneIncoming.classList.remove('vibrating');
        phoneConnected.classList.remove('vibrating');
        acceptBtn.classList.remove('flashing', 'pressed');
        arrow.classList.remove('visible');
        transferText.style.display = 'block';
        connectedText.style.display = 'none';
        phoneAnimationPlayed = false;
    };

    const runPhoneAnimation = () => {
        if (phoneAnimationPlayed) return;
        phoneAnimationPlayed = true;

        const phoneIncoming = instantBridgePanel.querySelector('.phone-incoming');
        const phoneConnected = instantBridgePanel.querySelector('.phone-connected');
        const acceptBtn = instantBridgePanel.querySelector('.phone-incoming .accept-btn');
        const arrow = instantBridgePanel.querySelector('.bridge-connection');
        const transferText = instantBridgePanel.querySelector('.transfer-text');
        const connectedText = instantBridgePanel.querySelector('.connected-text');

        phoneIncoming.classList.remove('vibrating');
        phoneConnected.classList.remove('vibrating');
        acceptBtn.classList.remove('flashing', 'pressed');
        arrow.classList.remove('visible');
        transferText.style.display = 'block';
        connectedText.style.display = 'none';

        phoneTimeouts.push(setTimeout(() => { phoneIncoming.classList.add('vibrating'); acceptBtn.classList.add('flashing'); }, 500));
        phoneTimeouts.push(setTimeout(() => { phoneIncoming.classList.remove('vibrating'); }, 1500));
        phoneTimeouts.push(setTimeout(() => { phoneIncoming.classList.add('vibrating'); }, 2500));
        phoneTimeouts.push(setTimeout(() => { phoneIncoming.classList.remove('vibrating'); acceptBtn.classList.remove('flashing'); acceptBtn.classList.add('pressed'); }, 3500));
        phoneTimeouts.push(setTimeout(() => { arrow.classList.add('visible'); }, 4000));
        phoneTimeouts.push(setTimeout(() => { phoneConnected.classList.add('vibrating'); }, 4500));
        phoneTimeouts.push(setTimeout(() => { phoneConnected.classList.remove('vibrating'); }, 5500));
        phoneTimeouts.push(setTimeout(() => { transferText.style.display = 'none'; connectedText.style.display = 'block'; }, 6500));
    };

    const phoneObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) runPhoneAnimation();
            else resetPhoneAnimation();
        });
    }, { threshold: 0.5 });

    if (instantBridgePanel) phoneObserver.observe(instantBridgePanel);

    // ===============================================
    // AMD - BALL DROP
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

        let busyTotal = 0, voicemailTotal = 0, humanTotal = 0;
        let amdAnimationPlayed = false;
        let animationTimeouts = [];
        const maxBusy = 7, maxVoicemail = 3, maxHuman = 1;

        const dropBall = (ball, index) => {
            const type = ball.getAttribute('data-type');
            let targetX = '50%';
            let targetY = 380;
            if (type === 'busy') targetX = 'calc(50% - 170px)';
            else if (type === 'voicemail') targetX = '50%';
            else if (type === 'human') targetX = 'calc(50% + 170px)';
            
            const keyframes = `@keyframes ballDrop${index} { 0% { top:40px; left:50%; transform:translateX(-50%); opacity:0; } 10% { opacity:1; } 50% { top:160px; left:50%; transform:translateX(-50%); } 75% { top:${targetY}px; left:${targetX}; transform:translateX(-50%); } 85% { top:${targetY}px; left:${targetX}; transform:translateX(-50%); opacity:1; } 100% { top:${targetY}px; left:${targetX}; transform:translateX(-50%); opacity:0; } }`;
            
            const styleSheet = document.createElement('style');
            styleSheet.id = `ballDropStyle${index}`;
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            ball.style.animation = `ballDrop${index} 2s ease-in`;
            
            setTimeout(() => {
                if (type === 'busy' && busyTotal < maxBusy) { busyTotal++; busyCount.textContent = busyTotal; busyLiquid.style.height = `${(busyTotal/maxBusy)*100}%`; }
                else if (type === 'voicemail' && voicemailTotal < maxVoicemail) { voicemailTotal++; voicemailCount.textContent = voicemailTotal; voicemailLiquid.style.height = `${(voicemailTotal/maxVoicemail)*100}%`; }
                else if (type === 'human' && humanTotal < maxHuman) { humanTotal++; humanCount.textContent = humanTotal; humanLiquid.style.height = '100%'; }
            }, 1000);
            
            setTimeout(() => { ball.style.animation = ''; const s = document.getElementById(`ballDropStyle${index}`); if (s) s.remove(); }, 2000);
        };

        const resetAMD = () => {
            animationTimeouts.forEach(t => clearTimeout(t));
            animationTimeouts = [];
            busyTotal = 0; voicemailTotal = 0; humanTotal = 0;
            busyCount.textContent = '0'; voicemailCount.textContent = '0'; humanCount.textContent = '0';
            busyLiquid.style.height = '0%'; voicemailLiquid.style.height = '0%'; humanLiquid.style.height = '0%';
            balls.forEach((ball, i) => { ball.style.animation = ''; const s = document.getElementById(`ballDropStyle${i}`); if (s) s.remove(); });
            amdAnimationPlayed = false;
        };

        const runAMDAnimation = () => {
            if (amdAnimationPlayed) return;
            amdAnimationPlayed = true;
            balls.forEach((ball, index) => {
                const timeout = setTimeout(() => dropBall(ball, index), index * 300);
                animationTimeouts.push(timeout);
            });
        };

        const amdObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const isAMDActive = amdPanel.classList.contains('active');
                if (entry.isIntersecting && isAMDActive) runAMDAnimation();
                else if (!entry.isIntersecting || !isAMDActive) resetAMD();
            });
        }, { threshold: 0.5 });

        amdObserver.observe(amdPanel);
        amdPanel.addEventListener('amdPanelActive', () => { if (amdPanel.classList.contains('active')) runAMDAnimation(); });
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
            if (i === index) panel.classList.add('active');
            else panel.classList.remove('active');
        });
        progressDots.forEach((dot, i) => {
            if (i === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });
        currentPanelIndex = index;
        
        const amdPanel = document.querySelector('[data-feature="premium-amd"]');
        if (amdPanel && featurePanels[index] === amdPanel && amdPanel.classList.contains('active')) {
            setTimeout(() => { const event = new CustomEvent('amdPanelActive'); amdPanel.dispatchEvent(event); }, 100);
        }
    };

    const handleFeatureScroll = (e) => {
        if (!featuresSection) return;
        const now = Date.now();
        if (now - lastScrollTime < 100) return;
        lastScrollTime = now;

        const sectionRect = featuresSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const isInSection = sectionRect.top <= navHeight && sectionRect.bottom >= viewportHeight;
        const atTop = sectionRect.top >= navHeight && currentPanelIndex === 0;
        const atBottom = sectionRect.bottom <= viewportHeight && currentPanelIndex === featurePanels.length - 1;

        if (isInSection && !isScrollLocked && !atTop && !atBottom) {
            const delta = e.deltaY || e.detail || -e.wheelDelta;
            if (Math.abs(delta) < 10) return;
            if (delta > 0 && currentPanelIndex < featurePanels.length - 1) {
                e.preventDefault();
                isScrollLocked = true;
                updateActivePanel(currentPanelIndex + 1);
                setTimeout(() => { isScrollLocked = false; }, 800);
            } else if (delta < 0 && currentPanelIndex > 0) {
                e.preventDefault();
                isScrollLocked = true;
                updateActivePanel(currentPanelIndex - 1);
                setTimeout(() => { isScrollLocked = false; }, 800);
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

    if (featurePanels.length > 0) updateActivePanel(0);

    if (window.innerWidth <= 768) {
        const container = document.querySelector('.features-scrolljack-container');
        if (container) {
            container.addEventListener('scroll', () => {
                const scrollLeft = container.scrollLeft;
                const panelWidth = container.offsetWidth;
                const currentIndex = Math.round(scrollLeft / panelWidth);
                progressDots.forEach((dot, i) => {
                    if (i === currentIndex) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            });
        }
    }

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) featuresSection.classList.add('in-view');
            else { featuresSection.classList.remove('in-view'); if (entry.boundingClientRect.top > 0) updateActivePanel(0); }
        });
    }, { threshold: 0.1 });

    if (featuresSection) progressObserver.observe(featuresSection);

    // ===============================================
    // BILLING TOGGLE - ANNUAL / MONTHLY
    // ===============================================

    const billingToggle = document.getElementById('billingToggle');

    if (billingToggle) {
        const updatePricing = (isAnnual) => {
            const priceNumbers = document.querySelectorAll('.price-number');
            const annualNotes = document.querySelectorAll('.annual-note');
            const monthlyNotes = document.querySelectorAll('.monthly-note');
            const monthlyLabel = document.getElementById('toggle-label-monthly');
            const annualLabel = document.getElementById('toggle-label-annual');

            priceNumbers.forEach(el => {
                const target = isAnnual ? parseInt(el.dataset.annual) : parseInt(el.dataset.monthly);
                const current = parseInt(el.textContent);
                const duration = 400;
                const start = performance.now();

                const animate = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(current + (target - current) * eased);
                    if (progress < 1) requestAnimationFrame(animate);
                    else el.textContent = target;
                };
                requestAnimationFrame(animate);
            });

            annualNotes.forEach(el => { el.style.display = isAnnual ? 'block' : 'none'; });
            monthlyNotes.forEach(el => { el.style.display = isAnnual ? 'none' : 'block'; });

            if (monthlyLabel) monthlyLabel.style.color = isAnnual ? 'var(--text-secondary)' : 'var(--text-primary)';
            if (annualLabel) annualLabel.style.color = isAnnual ? 'var(--text-primary)' : 'var(--text-secondary)';
        };

        billingToggle.addEventListener('change', () => updatePricing(billingToggle.checked));
        // Init
        updatePricing(true);
    }

    // ===============================================
    // STANDARD SCROLL ANIMATIONS
    // ===============================================
    
    const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
            else entry.target.classList.remove('visible');
        });
    }, observerOptions);

    document.querySelectorAll('.section-demo, .demo-card-wrapper, .section-pricing, .section-contact').forEach(el => observer.observe(el));

    const demoCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) { setTimeout(() => { entry.target.classList.add('visible'); }, index * 150); }
            else entry.target.classList.remove('visible');
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.demo-card-wrapper').forEach(card => demoCardsObserver.observe(card));

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
                window.scrollTo({ top: targetElement.offsetTop - navHeight - 20, behavior: 'smooth' });
            }
        });
    });

    // ===============================================
    // TRUST BAR
    // ===============================================
    
    const ticker = document.querySelector('.trust-ticker');
    if (ticker) {
        ticker.style.animation = 'none';
        ticker.style.transform = 'translateX(0)';
        const origLogos = Array.from(ticker.querySelectorAll('.trust-logo')).slice(0, 6);
        ticker.innerHTML = '';
        const allLogos = [...origLogos, ...origLogos.map(l => l.cloneNode(true))];
        allLogos.forEach(l => ticker.appendChild(l));

        requestAnimationFrame(() => {
            const gap = 80;
            let singleSetW = 0;
            origLogos.forEach(l => { singleSetW += l.offsetWidth + gap; });
            let x = 0, paused = false;
            const speed = window.innerWidth > 768 ? 0.8 : 0.6;
            ticker.addEventListener('mouseenter', () => { paused = true; });
            ticker.addEventListener('mouseleave', () => { paused = false; });
            const tick = () => {
                if (!paused) { x -= speed; if (x <= -singleSetW) x = 0; ticker.style.transform = `translateX(${x}px)`; }
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }

    // ===============================================
    // NAV BACKGROUND
    // ===============================================
    
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        nav.style.background = window.pageYOffset > 50 ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.8)';
    });

    // ===============================================
    // FAQ ACCORDION
    // ===============================================
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ===============================================
    // MOBILE WAVE POSITION
    // ===============================================

    if (window.innerWidth <= 768) {
        const positionWave = () => {
            const waveLine = document.querySelector('.workflow-line');
            const steps = document.querySelectorAll('.workflow-step');
            if (!waveLine || steps.length < 3) return;
            const container = document.querySelector('.workflow-container');
            const step3 = steps[2];
            const containerTop = container.getBoundingClientRect().top;
            const step3Top = step3.getBoundingClientRect().top;
            waveLine.style.top = (step3Top - containerTop - 120) + 'px';
        };
        setTimeout(positionWave, 100);
    }

    console.log('🚀 OutDials Landing Page V6 - Tiered Pricing');
});
