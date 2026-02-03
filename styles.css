/* ===== FRAMER-INSPIRED DESIGN SYSTEM ===== */

:root {
    /* Colors - Minimalist B&W with subtle accents */
    --bg-primary: #000000;
    --bg-secondary: #0a0a0a;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.6);
    --border-color: rgba(255, 255, 255, 0.1);
    --accent-green: rgba(34, 197, 94, 1);
    --accent-green-soft: rgba(34, 197, 94, 0.15);
    
    /* Typography - Variable sans-serif */
    --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
    --font-body: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
    
    /* Spacing - Generous negative space */
    --space-xs: 8px;
    --space-sm: 16px;
    --space-md: 32px;
    --space-lg: 64px;
    --space-xl: 128px;
    
    /* Spring animations */
    --spring: cubic-bezier(0.16, 1, 0.3, 1);
    --spring-fast: cubic-bezier(0.23, 1, 0.32, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
}

body {
    font-family: var(--font-body);
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

/* ===== NAVIGATION ===== */

.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(0, 0, 0, 0.8);
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s var(--spring);
}

.nav.scrolled {
    background: rgba(0, 0, 0, 0.95);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-display);
}

.broken-o {
    display: inline-block;
    width: 28px;
    height: 32px;
}

.broken-o svg {
    width: 100%;
    height: 100%;
}

.broken-o svg circle {
    stroke: var(--text-primary);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
}

.nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.2s var(--spring-fast);
    position: relative;
}

.nav-links a:hover {
    color: var(--text-primary);
}

.nav-cta {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--border-color);
    padding: 10px 24px;
    border-radius: 8px;
    color: var(--text-primary) !important;
    transition: all 0.2s var(--spring-fast);
}

.nav-cta:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
}

/* ===== HERO SECTION ===== */

.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-xl) var(--space-md);
    position: relative;
    overflow: hidden;
}

.hero-container {
    max-width: 1000px;
    text-align: center;
}

.hero-title {
    font-family: var(--font-display);
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: var(--space-md);
    opacity: 0;
    animation: fadeInUp 0.8s var(--spring) forwards;
}

.hero-subtitle {
    font-size: clamp(18px, 2.5vw, 24px);
    color: var(--text-secondary);
    margin-bottom: var(--space-lg);
    line-height: 1.5;
    opacity: 0;
    animation: fadeInUp 0.8s var(--spring) 0.1s forwards;
}

.hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    opacity: 0;
    animation: fadeInUp 0.8s var(--spring) 0.2s forwards;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 56px;
    font-weight: 700;
    font-family: var(--font-display);
    line-height: 1;
    background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 14px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 8px;
}

.stat-divider {
    width: 1px;
    height: 60px;
    background: var(--border-color);
}

.btn-primary {
    display: inline-block;
    background: var(--text-primary);
    color: var(--bg-primary);
    padding: 18px 48px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s var(--spring-fast);
    opacity: 0;
    animation: fadeInUp 0.8s var(--spring) 0.3s forwards;
}

.btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 40px rgba(255, 255, 255, 0.2);
}

.hero-subtext {
    margin-top: var(--space-md);
    font-size: 14px;
    color: var(--text-secondary);
    opacity: 0;
    animation: fadeInUp 0.8s var(--spring) 0.4s forwards;
}

/* ===== PROBLEM/SOLUTION SECTION ===== */

.section-problem {
    padding: var(--space-xl) var(--space-md);
    border-top: 1px solid var(--border-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.problem-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-lg);
    align-items: center;
}

.problem-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: var(--space-lg);
    text-align: center;
    transition: all 0.3s var(--spring);
}

.problem-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
}

.problem-before {
    opacity: 0.7;
}

.problem-after {
    border-color: var(--accent-green);
    background: var(--accent-green-soft);
}

.problem-icon {
    font-size: 48px;
    margin-bottom: var(--space-sm);
}

.problem-card h3 {
    font-size: 24px;
    font-family: var(--font-display);
    margin-bottom: var(--space-sm);
}

.problem-stat {
    font-size: 72px;
    font-weight: 700;
    font-family: var(--font-display);
    line-height: 1;
    margin: var(--space-md) 0;
}

.problem-list {
    list-style: none;
    text-align: left;
    margin-top: var(--space-md);
}

.problem-list li {
    padding: 8px 0;
    color: var(--text-secondary);
    font-size: 15px;
}

.problem-arrow {
    font-size: 48px;
    color: var(--text-secondary);
}

/* ===== HOW IT WORKS SECTION ===== */

.section-how {
    padding: var(--space-xl) var(--space-md);
    border-top: 1px solid var(--border-color);
}

.section-title {
    font-family: var(--font-display);
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 700;
    text-align: center;
    margin-bottom: var(--space-sm);
    letter-spacing: -0.02em;
}

.section-subtitle {
    text-align: center;
    font-size: 20px;
    color: var(--text-secondary);
    margin-bottom: var(--space-lg);
}

.how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
}

.how-step-wrapper {
    perspective: 1000px;
    height: 280px;
}

.how-step-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s var(--spring);
}

/* Hover triggers one clean 360° spin */
.how-step-wrapper:hover .how-step-inner {
    animation: spin360 0.8s var(--spring) forwards;
}

@keyframes spin360 {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(360deg);
    }
}

.how-step-front,
.how-step-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 16px;
}

.how-step-back {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
}

.how-step-back .broken-o {
    width: 64px;
    height: 72px;
    opacity: 0.3;
}

.how-step-back .broken-o svg {
    width: 100%;
    height: 100%;
}

.how-step {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: var(--space-md);
    transition: all 0.3s var(--spring);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.how-step:hover {
    border-color: rgba(255, 255, 255, 0.2);
}

.step-number {
    width: 48px;
    height: 48px;
    background: var(--text-primary);
    color: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: var(--space-sm);
}

.how-step h3 {
    font-size: 20px;
    margin-bottom: var(--space-xs);
    font-family: var(--font-display);
}

.how-step p {
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.6;
}

.demo-placeholder {
    margin-top: var(--space-xl);
}

.demo-box {
    background: var(--bg-secondary);
    border: 2px dashed var(--border-color);
    border-radius: 16px;
    padding: var(--space-xl);
    text-align: center;
}

.demo-box p {
    font-size: 24px;
    margin-bottom: var(--space-xs);
}

.demo-box span {
    color: var(--text-secondary);
    font-size: 14px;
}

/* ===== FEATURES SECTION ===== */

.section-features {
    padding: var(--space-xl) var(--space-md);
    border-top: 1px solid var(--border-color);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-lg);
}

.feature-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: var(--space-md);
    transition: all 0.3s var(--spring);
}

.feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.feature-icon {
    font-size: 40px;
    margin-bottom: var(--space-sm);
}

.feature-card h3 {
    font-size: 20px;
    margin-bottom: var(--space-xs);
    font-family: var(--font-display);
}

.feature-card p {
    color: var(--text-secondary);
    font-size: 15px;
    line-height: 1.6;
}

/* ===== PRICING SECTION ===== */

.section-pricing {
    padding: var(--space-xl) var(--space-md);
    border-top: 1px solid var(--border-color);
}

.pricing-card {
    max-width: 700px;
    margin: var(--space-lg) auto;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 24px;
    padding: var(--space-lg);
}

.pricing-header {
    text-align: center;
    margin-bottom: var(--space-md);
}

.pricing-header h3 {
    font-size: 20px;
    color: var(--text-secondary);
    margin-bottom: var(--space-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.pricing-amount {
    font-size: 72px;
    font-weight: 700;
    font-family: var(--font-display);
    line-height: 1;
}

.pricing-header p {
    color: var(--text-secondary);
    font-size: 16px;
    margin-top: var(--space-xs);
}

.pricing-includes {
    margin: var(--space-md) 0;
}

.pricing-includes h4 {
    font-size: 16px;
    margin-bottom: var(--space-sm);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.pricing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
}

.pricing-includes ul {
    list-style: none;
}

.pricing-includes li {
    padding: 10px 0;
    color: var(--text-primary);
    font-size: 15px;
}

.pricing-divider {
    height: 1px;
    background: var(--border-color);
    margin: var(--space-md) 0;
}

.pricing-royalty {
    text-align: center;
    margin: var(--space-md) 0;
}

.pricing-royalty h4 {
    font-size: 16px;
    margin-bottom: var(--space-sm);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.royalty-amount {
    font-size: 56px;
    font-weight: 700;
    font-family: var(--font-display);
    color: var(--accent-green);
    line-height: 1;
    margin: var(--space-sm) 0;
}

.royalty-note {
    display: block;
    color: var(--text-secondary);
    font-size: 13px;
    margin-top: var(--space-sm);
}

.pricing-cta {
    text-align: center;
    margin-top: var(--space-md);
}

.pricing-subtext {
    margin-top: var(--space-sm);
    font-size: 14px;
    color: var(--text-secondary);
}

.pricing-example {
    max-width: 700px;
    margin: var(--space-lg) auto 0;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: var(--space-md);
}

.pricing-example h4 {
    text-align: center;
    margin-bottom: var(--space-md);
    font-size: 18px;
}

.example-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-sm);
}

.example-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.example-label {
    font-size: 13px;
    color: var(--text-secondary);
}

.example-value {
    font-size: 18px;
    font-weight: 600;
}

/* ===== CONTACT SECTION ===== */

.section-contact {
    padding: var(--space-xl) var(--space-md);
    border-top: 1px solid var(--border-color);
}

.contact-card {
    max-width: 900px;
    margin: var(--space-lg) auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: var(--space-lg);
}

.contact-info h3 {
    font-size: 20px;
    margin-bottom: var(--space-md);
    font-family: var(--font-display);
}

.contact-info ul {
    list-style: none;
}

.contact-info li {
    padding: 10px 0;
    color: var(--text-secondary);
    font-size: 15px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: var(--space-sm);
}

.form-notice {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: var(--space-sm);
    font-size: 14px;
    color: var(--text-secondary);
}

.form-subtext {
    font-size: 14px;
    color: var(--text-secondary);
}

.form-subtext a {
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--text-primary);
}

/* ===== FOOTER ===== */

.footer {
    border-top: 1px solid var(--border-color);
    padding: var(--space-xl) var(--space-md) var(--space-md);
}

.footer-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-lg);
    margin-bottom: var(--space-lg);
}

.footer-brand p {
    margin-top: var(--space-sm);
    color: var(--text-secondary);
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
}

.footer-column h4 {
    font-size: 14px;
    margin-bottom: var(--space-sm);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.footer-column a {
    display: block;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 15px;
    padding: 6px 0;
    transition: color 0.2s var(--spring-fast);
}

.footer-column a:hover {
    color: var(--text-primary);
}

.footer-bottom {
    text-align: center;
    padding-top: var(--space-md);
    border-top: 1px solid var(--border-color);
}

.footer-bottom p {
    color: var(--text-secondary);
    font-size: 14px;
}

/* ===== ANIMATIONS ===== */

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOutDown {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(30px);
    }
}

/* Hero parallax effect */
.hero-title {
    will-change: transform;
}

/* Number counter animation */
@keyframes countUp {
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.stat-value {
    animation: countUp 0.6s var(--spring) forwards;
}

.stat-item:nth-child(1) .stat-value {
    animation-delay: 0.2s;
}

.stat-item:nth-child(3) .stat-value {
    animation-delay: 0.4s;
}

.stat-item:nth-child(5) .stat-value {
    animation-delay: 0.6s;
}

/* Card Battle - Manual vs OutDials (Bidirectional) */
.problem-before {
    opacity: 0;
}

.problem-after {
    opacity: 0;
}

.problem-arrow {
    opacity: 0;
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-60px) scale(0.95);
    }
    to {
        opacity: 0.7;
        transform: translateX(0) scale(1);
    }
}

@keyframes slideOutLeft {
    from {
        opacity: 0.7;
        transform: translateX(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateX(-60px) scale(0.95);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(60px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateX(60px) scale(0.95);
    }
}

@keyframes pulseFade {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.8);
    }
}

/* Card Flip Animation - How It Works (360° Spin on Scroll) */
.how-step-wrapper {
    opacity: 0;
}

.how-step-wrapper.flip-in {
    animation: spin360In 1s var(--spring) forwards;
}

.how-step-wrapper.flip-out {
    animation: spin360Out 0.6s var(--spring) forwards;
}

.how-step-wrapper:nth-child(1).flip-in {
    animation-delay: 0s;
}

.how-step-wrapper:nth-child(2).flip-in {
    animation-delay: 0.15s;
}

.how-step-wrapper:nth-child(3).flip-in {
    animation-delay: 0.3s;
}

.how-step-wrapper:nth-child(4).flip-in {
    animation-delay: 0.45s;
}

@keyframes spin360In {
    0% {
        opacity: 0;
        transform: translateY(20px) rotateY(0deg);
    }
    30% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        transform: translateY(0) rotateY(360deg);
    }
}

@keyframes spin360Out {
    0% {
        opacity: 1;
        transform: translateY(0) rotateY(0deg);
    }
    100% {
        opacity: 0;
        transform: translateY(20px) rotateY(-180deg);
    }
}

/* Feature Cards - Slide from top-left (Bidirectional) */
.features-grid {
    position: relative;
    perspective: 1500px;
}

.feature-card {
    opacity: 0;
    position: relative;
    will-change: transform, opacity;
    transform: translateX(-60px) translateY(-60px) scale(0.8);
}

.feature-card.slide-in {
    animation: slideInFromTopLeft 0.7s var(--spring) forwards;
}

.feature-card.slide-out {
    animation: slideOutToTopLeft 0.7s var(--spring) forwards;
}

.feature-card:nth-child(1).slide-in {
    animation-delay: 0s;
}

.feature-card:nth-child(2).slide-in {
    animation-delay: 0.1s;
}

.feature-card:nth-child(3).slide-in {
    animation-delay: 0.2s;
}

.feature-card:nth-child(4).slide-in {
    animation-delay: 0.3s;
}

.feature-card:nth-child(5).slide-in {
    animation-delay: 0.4s;
}

.feature-card:nth-child(6).slide-in {
    animation-delay: 0.5s;
}

@keyframes slideInFromTopLeft {
    0% {
        opacity: 0;
        transform: translateX(-60px) translateY(-60px) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translateX(0) translateY(0) scale(1);
    }
}

@keyframes slideOutToTopLeft {
    0% {
        opacity: 1;
        transform: translateX(0) translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateX(-60px) translateY(-60px) scale(0.8);
    }
}

/* Feature card hover - 3D tilt */
.feature-card {
    transform-style: preserve-3d;
    transition: all 0.3s var(--spring);
}

.feature-card:hover {
    transform: translateY(-8px) rotateX(5deg) rotateY(2deg) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    z-index: 10;
}

/* Problem card hover - enhanced */
.problem-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

/* Pricing card entrance */
.pricing-card {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
}

.pricing-card.price-reveal {
    animation: priceReveal 0.8s var(--spring) forwards;
}

.pricing-card.price-hide {
    animation: priceHide 0.8s var(--spring) forwards;
}

@keyframes priceReveal {
    0% {
        opacity: 0;
        transform: scale(0.9) translateY(30px);
    }
    60% {
        transform: scale(1.05) translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes priceHide {
    0% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    100% {
        opacity: 0;
        transform: scale(0.9) translateY(30px);
    }
}

/* Pricing amount glow pulse */
.pricing-amount {
    position: relative;
    animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
    0%, 100% {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    }
    50% {
        text-shadow: 0 0 40px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.2);
    }
}

.royalty-amount {
    animation: greenGlow 2s ease-in-out infinite;
}

@keyframes greenGlow {
    0%, 100% {
        text-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
    }
    50% {
        text-shadow: 0 0 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3);
    }
}

/* Contact card entrance */
.contact-card {
    opacity: 0;
    transform: translateY(40px);
}

.contact-card.contact-reveal {
    animation: contactReveal 0.8s var(--spring) forwards;
}

.contact-card.contact-hide {
    animation: contactHide 0.8s var(--spring) forwards;
}

@keyframes contactReveal {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes contactHide {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(40px);
    }
}

/* Button ripple effect */
.btn-primary {
    position: relative;
    overflow: hidden;
}

.btn-primary::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn-primary:active::after {
    width: 300px;
    height: 300px;
}

/* Icon pulse on hover */
.feature-icon svg,
.problem-icon svg {
    transition: all 0.3s var(--spring);
}

.feature-card:hover .feature-icon svg,
.problem-card:hover .problem-icon svg {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
}

/* Scroll-triggered fade-in (applied via JS) */
.fade-in {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s var(--spring);
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Blur to focus effect */
.blur-in {
    filter: blur(8px);
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.8s var(--spring);
}

.blur-in.focused {
    filter: blur(0);
    opacity: 1;
    transform: scale(1);
}

/* Nav morph on scroll */
.nav {
    transition: all 0.3s var(--spring);
}

.nav.scrolled {
    padding: 12px 0;
}

.nav.scrolled .nav-logo {
    font-size: 20px;
}

.nav.scrolled .broken-o {
    width: 24px;
    height: 28px;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 768px) {
    .nav-container {
        padding: 16px 20px;
    }
    
    .nav-links {
        gap: 16px;
        font-size: 14px;
    }
    
    .nav-cta {
        padding: 8px 16px;
    }
    
    .hero {
        padding: var(--space-lg) var(--space-sm);
    }
    
    .hero-stats {
        flex-direction: column;
        gap: var(--space-md);
    }
    
    .stat-divider {
        width: 60px;
        height: 1px;
    }
    
    .problem-grid {
        grid-template-columns: 1fr;
    }
    
    .problem-arrow {
        transform: rotate(90deg);
    }
    
    .how-grid {
        grid-template-columns: 1fr;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .contact-card {
        grid-template-columns: 1fr;
    }
    
    .pricing-grid {
        grid-template-columns: 1fr;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
    }
    
    .footer-links {
        grid-template-columns: 1fr;
    }
}
