// DR.WEEE Website - Main JavaScript

// Helper function to get the API base URL for local development
function getApiBaseUrl() {
    const port = window.location.port;
    // If running on Live Server (5500/5501) or file protocol, use localhost:3000
    if (port === '5500' || port === '5501' || window.location.protocol === 'file:') {
        return 'http://localhost:3000';
    }
    // Otherwise use relative paths (production)
    return '';
}

// Single DOMContentLoaded initialization - DO NOT DUPLICATE
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 DOM Content Loaded - Initializing application...');

    // Initialize non-header components first
    initSmoothScrolling();
    initAnimations();
    initCounters();
    initImpactCharts();
    initHeroStoryBar();
    initCarousels();
    initContactForm();
    initLazyLoading();
    initScrollVideos();
    initPageSpecific();

    // Load includes (header/footer) - this will trigger header initialization
    loadIncludes();

    console.log('✅ Application initialization complete');
});

// Header functionality
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    const nav = document.querySelector('.nav');

    // Header scroll effect: transparent at top, solid white on scroll down
    function updateHeaderScroll() {
        if (window.scrollY > 30) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.nav__link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('nav__link--active');
        }
    });
}

// Check authentication status and update header
async function checkAuthStatus() {
    try {
        console.log('🔍 Checking authentication status...');
        const response = await fetch(getApiBaseUrl() + '/api/auth-status', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType || !contentType.includes('application/json')) {
            throw new Error(`Auth check unavailable (${response.status})`);
        }

        const data = await response.json();
        console.log('📋 Auth status response:', data);

        if (data.isLoggedIn && data.phoneNumber) {
            showLoggedInState(data.phoneNumber, data.fullName, data.userData);
            console.log('✅ User is logged in:', data.fullName, '(', data.phoneNumber, ')');
        } else {
            // Fallback: Check localStorage for cross-origin local development
            const storedUser = localStorage.getItem('drweee_user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    console.log('📦 Found user in localStorage (cross-origin fallback):', user.fullName);
                    showLoggedInState(user.phoneNumber, user.fullName, {
                        GUID: user.GUID,
                        availableWeeePoints: user.availableWeeePoints,
                        totalWeeePoints: user.totalWeeePoints,
                        availableCash: user.availableCash,
                        totalRedeemableCash: user.totalRedeemableCash,
                        totalCarbonSaved: user.totalCarbonSaved
                    });
                    console.log('✅ User is logged in (from localStorage):', user.fullName);
                    return;
                } catch (e) {
                    console.error('Error parsing stored user:', e);
                    localStorage.removeItem('drweee_user');
                }
            }
            showLoggedOutState();
            console.log('❌ User is not logged in');
        }
    } catch (error) {
        console.log('ℹ️ Auth API unavailable, using guest state or local cache');
        // Also try localStorage fallback on error
        const storedUser = localStorage.getItem('drweee_user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                console.log('📦 Using localStorage fallback due to API error:', user.fullName);
                showLoggedInState(user.phoneNumber, user.fullName, {
                    GUID: user.GUID,
                    availableWeeePoints: user.availableWeeePoints,
                    totalWeeePoints: user.totalWeeePoints,
                    availableCash: user.availableCash,
                    totalRedeemableCash: user.totalRedeemableCash,
                    totalCarbonSaved: user.totalCarbonSaved
                });
                return;
            } catch (e) {
                localStorage.removeItem('drweee_user');
            }
        }
        showLoggedOutState();
    }
}

// Show logged in state
function showLoggedInState(phoneNumber, fullName = 'DR.WEEE User', userData = {}) {
    console.log('🔄 Updating UI for logged in state with WEEE data:', userData);

    // Desktop elements
    const loginBtn = document.getElementById('login-btn');
    const userDropdown = document.getElementById('user-dropdown');
    const userPhoneDesktop = document.getElementById('user-phone');

    // Mobile elements
    const mobileLoginItem = document.getElementById('mobile-login-item');
    const mobileUserCard = document.getElementById('mobile-user-card');
    const mobileUserPhone = document.getElementById('mobile-user-phone');
    const mobileEnvImpactItem = document.getElementById('mobile-env-impact-item');
    const mobileMyRequestsItem = document.getElementById('mobile-my-requests-item');
    const mobileRedeemItem = document.getElementById('mobile-redeem-item');
    const mobileLogoutBtnEl = document.getElementById('mobile-logout-btn');

    // Desktop updates
    if (loginBtn) {
        loginBtn.style.display = 'none';
        console.log('✓ Hidden login button');
    }
    if (userDropdown) {
        userDropdown.style.display = 'inline-block';
        console.log('✓ Showed user dropdown');
    }
    if (userPhoneDesktop) {
        // Display full name instead of phone number
        userPhoneDesktop.textContent = fullName;
        console.log('✓ Updated desktop name display');
    }

    // Mobile updates
    if (mobileLoginItem) {
        mobileLoginItem.style.display = 'none';
        console.log('✓ Hidden mobile login item');
    }
    if (mobileUserCard) {
        mobileUserCard.style.display = 'block';
        console.log('✓ Showed mobile user card');
    }
    if (mobileUserPhone) {
        // Display full name instead of phone number
        mobileUserPhone.textContent = fullName;
        console.log('✓ Updated mobile name display');
    }
    // Show user menu items
    if (mobileEnvImpactItem) {
        mobileEnvImpactItem.style.display = 'block';
        console.log('✓ Showed mobile env impact item');
    }
    if (mobileMyRequestsItem) {
        mobileMyRequestsItem.style.display = 'block';
        console.log('✓ Showed mobile my requests item');
    }
    if (mobileRedeemItem) {
        mobileRedeemItem.style.display = 'block';
        console.log('✓ Showed mobile redeem item');
    }
    if (mobileLogoutBtnEl) {
        mobileLogoutBtnEl.style.display = 'inline-flex';
        console.log('✓ Showed mobile logout button');
    }

    // Update WEEE data in desktop dropdown
    updateWeeData('desktop', userData);

    // Update WEEE data in mobile view
    updateWeeData('mobile', userData);
}

function updateWeeData(viewType, userData = {}) {
    const prefix = viewType === 'mobile' ? 'mobile-' : '';

    // Helper function to format currency WITHOUT dollar sign
    const formatCurrency = (value) => {
        const num = parseFloat(value) || 0;
        return num.toFixed(2); // Just the number, no $ sign
    };

    // Helper function to format numbers
    const formatNumber = (value) => {
        const num = parseInt(value) || 0;
        return num.toLocaleString();
    };

    // Update available WEEE points
    const availableWeeeEl = document.getElementById(`${prefix}available-weee-points`);
    if (availableWeeeEl) {
        availableWeeeEl.textContent = formatNumber(userData.availableWeeePoints);
    }

    // Update total WEEE points
    const totalWeeeEl = document.getElementById(`${prefix}total-weee-points`);
    if (totalWeeeEl) {
        totalWeeeEl.textContent = formatNumber(userData.totalWeeePoints);
    }

    // Update available cash (NO DOLLAR SIGN)
    const availableCashEl = document.getElementById(`${prefix}available-cash`);
    if (availableCashEl) {
        availableCashEl.textContent = formatCurrency(userData.availableCash);
    }

    // Update total carbon saved
    const carbonSavedEl = document.getElementById(`${prefix}total-carbon-saved`);
    if (carbonSavedEl) {
        const carbonValue = parseFloat(userData.totalCarbonSaved) || 0;
        carbonSavedEl.textContent = viewType === 'mobile' ?
            `${carbonValue.toFixed(1)}kg` :
            carbonValue.toFixed(1);
    }

    console.log(`✅ Updated ${viewType} WEEE data display`);
}

// Show logged out state
function showLoggedOutState() {
    console.log('🔄 Updating UI for logged out state');

    // Desktop elements
    const loginBtn = document.getElementById('login-btn');
    const userDropdown = document.getElementById('user-dropdown');

    // Mobile elements
    const mobileLoginItem = document.getElementById('mobile-login-item');
    const mobileUserCard = document.getElementById('mobile-user-card');
    const mobileEnvImpactItem = document.getElementById('mobile-env-impact-item');
    const mobileMyRequestsItem = document.getElementById('mobile-my-requests-item');
    const mobileRedeemItem = document.getElementById('mobile-redeem-item');
    const mobileLogoutBtnEl = document.getElementById('mobile-logout-btn');

    // Desktop updates
    if (loginBtn) {
        loginBtn.style.display = 'flex';
        console.log('✓ Showed login button');
    }
    if (userDropdown) {
        userDropdown.style.display = 'none';
        console.log('✓ Hidden user dropdown');
    }

    // Mobile updates
    if (mobileLoginItem) {
        mobileLoginItem.style.display = 'block';
        console.log('✓ Showed mobile login item');
    }
    if (mobileUserCard) {
        mobileUserCard.style.display = 'none';
        console.log('✓ Hidden mobile user card');
    }
    // Hide user menu items
    if (mobileEnvImpactItem) {
        mobileEnvImpactItem.style.display = 'none';
    }
    if (mobileMyRequestsItem) {
        mobileMyRequestsItem.style.display = 'none';
    }
    if (mobileRedeemItem) {
        mobileRedeemItem.style.display = 'none';
    }
    if (mobileLogoutBtnEl) {
        mobileLogoutBtnEl.style.display = 'none';
    }
}

// Initialize user dropdown
function initUserDropdown() {
    const dropdownTrigger = document.getElementById('user-dropdown-trigger');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

    if (!dropdownTrigger) return;

    // Toggle dropdown
    dropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownTrigger.getAttribute('aria-expanded') === 'true';
        dropdownTrigger.setAttribute('aria-expanded', !isOpen);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownTrigger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close dropdown on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdownTrigger.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle logout
    const handleLogout = async () => {
        console.log('🚪 Logging out user...');
        try {
            const response = await fetch(getApiBaseUrl() + '/api/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Clear localStorage regardless of API response
            localStorage.removeItem('drweee_user');

            if (response.ok) {
                console.log('✅ Logout successful');

                // Track logout event
                if (window.DrWeeeAnalytics) {
                    window.DrWeeeAnalytics.trackLogout();
                }

                showLoggedOutState();

                // Show success message
                if (typeof showNotification === 'function') {
                    showNotification('Logged out successfully!', 'success');
                }

                // Redirect to home page after a short delay
                setTimeout(() => {
                    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
                        window.location.href = '/index.html';
                    }
                }, 1000);
            } else {
                throw new Error('Logout request failed');
            }
        } catch (error) {
            console.error('🚨 Error during logout:', error);
            if (typeof showNotification === 'function') {
                showNotification('Logout failed. Please try again.', 'error');
            }
        }
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
}
// REPLACE the existing initMobileMenu function in main.js with this improved version

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const body = document.body;

    if (!mobileMenuToggle || !mobileMenu || !mobileMenuClose) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Prevent duplicate event binding if already initialized
    if (mobileMenuToggle.dataset.menuInitialized === 'true') {
        return;
    }
    mobileMenuToggle.dataset.menuInitialized = 'true';

    // Ensure mobileMenu is a direct child of body so it is NEVER trapped in header stacking context
    if (mobileMenu.parentNode !== document.body) {
        document.body.appendChild(mobileMenu);
    }

    // Create backdrop as direct child of body if it doesn't exist
    let backdrop = document.querySelector('.mobile-menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        document.body.appendChild(backdrop);
    } else if (backdrop.parentNode !== document.body) {
        document.body.appendChild(backdrop);
    }

    // Make sure mobileMenu is placed AFTER backdrop in DOM tree (so backdrop is behind it)
    document.body.appendChild(backdrop);
    document.body.appendChild(mobileMenu);

    const openMenu = () => {
        // Ensure menu is in body
        if (mobileMenu.parentNode !== document.body) {
            document.body.appendChild(mobileMenu);
        }

        // Add classes for open state
        mobileMenu.classList.add('is-open');
        backdrop.classList.add('is-visible');
        body.classList.add('mobile-menu-open');

        // Update accessibility & visibility
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileMenuToggle.style.visibility = 'hidden';
        mobileMenuToggle.style.opacity = '0';
        mobileMenuToggle.style.pointerEvents = 'none';

        // Focus management - focus the close button inside menu
        setTimeout(() => {
            mobileMenuClose.focus();
        }, 100);

        console.log('Menu opened'); // Debug log
    };

    const closeMenu = () => {
        // Remove classes for closed state
        mobileMenu.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        body.classList.remove('mobile-menu-open');

        // Update accessibility & visibility
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.style.visibility = '';
        mobileMenuToggle.style.opacity = '';
        mobileMenuToggle.style.pointerEvents = '';

        // Return focus to toggle button
        mobileMenuToggle.focus();

        console.log('Menu closed'); // Debug log
    };

    // Toggle menu on hamburger click
    mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (mobileMenu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu on close button click
    mobileMenuClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });

    // Close menu when clicking on backdrop
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            closeMenu();
        }
    });

    // Close menu when clicking on navigation links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't prevent default for actual navigation
            setTimeout(() => {
                closeMenu();
            }, 150);
        });
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Handle window resize - close menu if viewport becomes larger
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 991 && mobileMenu.classList.contains('is-open')) {
                closeMenu();
            }
        }, 150);
    });

    // Trap focus within menu when open
    const focusableElements = mobileMenu.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && mobileMenu.classList.contains('is-open')) {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
}
// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href === '#!') return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerEl = document.getElementById('header');
                const headerHeight = headerEl ? headerEl.offsetHeight : 74;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });

                // Update URL hash without jump
                if (history.pushState) {
                    history.pushState(null, null, '#' + targetId);
                }
            }
        });
    });
}

// Animation on scroll & rebrand reveal
function initAnimations() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation and reveal classes, plus all content cards sitewide
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .rebrand-reveal, .rebrand-stream-card, .impact-material-card, .impact-flow-card, .impact-pillar-card, .impact-equiv-card, .impact-milestone-card, .dimension-card, .service-card, .contact-card'
    );

    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        // If element is already fully in view at the very top of the window on initial load
        if (rect.top >= 0 && rect.bottom <= window.innerHeight * 0.8) {
            element.classList.add('is-visible');
            element.classList.add('animate-in');
        } else {
            element.classList.add('rebrand-reveal');
            observer.observe(element);
        }
    });

    // Auto-assign staggered delays to card siblings within any grid
    const grids = document.querySelectorAll('.rebrand-streams-grid, .impact-materials-grid, .impact-flow-cards-grid, .impact-equiv-grid, .impact-milestones-grid, .services-grid');
    grids.forEach(grid => {
        const children = grid.children;
        for (let i = 0; i < children.length; i++) {
            if (!children[i].hasAttribute('data-delay')) {
                children[i].setAttribute('data-delay', (i % 4) + 1);
            }
        }
    });
}

// Interactive SVG Impact Charts (Recovery & Circular Distribution) with Upward Surge Animation
function initImpactCharts() {
    let recoveryRunning = false;
    let distRunning = false;

    // --- Section 02: Audited Recovery Trajectory Surge Animation ---
    function animateRecoveryChartSurge() {
        const chartSvg = document.querySelector('.impact-chart-svg');
        if (!chartSvg) return;

        const linePath = chartSvg.querySelector('.chart-line-stroke');
        const co2Path = chartSvg.querySelector('.chart-co2-stroke');
        const areaFill = chartSvg.querySelector('.chart-area-fill');
        const tracer = chartSvg.querySelector('#recovery-chart-tracer');
        const clipRect = chartSvg.querySelector('#recovery-clip-rect');
        const nodes = chartSvg.querySelectorAll('.chart-node');
        const liveVal = document.getElementById('recovery-live-val');

        if (!linePath) return;

        const lineLen = linePath.getTotalLength ? Math.ceil(linePath.getTotalLength()) : 1000;
        const co2Len = (co2Path && co2Path.getTotalLength) ? Math.ceil(co2Path.getTotalLength()) : lineLen;

        // Reset state: reset stroke offsets, hide clip rect, hide tracer & nodes
        linePath.style.transition = 'none';
        linePath.style.strokeDasharray = `${lineLen} ${lineLen}`;
        linePath.style.strokeDashoffset = `${lineLen}`;

        if (co2Path) {
            co2Path.style.transition = 'none';
            co2Path.style.strokeDasharray = `${co2Len} ${co2Len}`;
            co2Path.style.strokeDashoffset = `${co2Len}`;
        }

        if (clipRect) clipRect.setAttribute('width', '110');
        if (areaFill) areaFill.style.opacity = '0.95';

        nodes.forEach(n => {
            n.classList.remove('is-revealed');
            const pt = n.querySelector('.node-point');
            const gl = n.querySelector('.node-glow');
            if (pt) {
                pt.style.opacity = '0';
                pt.setAttribute('r', '0');
            }
            if (gl) {
                gl.style.opacity = '0';
                gl.setAttribute('r', '0');
            }
        });

        if (tracer) {
            const startPt = linePath.getPointAtLength(0);
            tracer.setAttribute('cx', startPt.x);
            tracer.setAttribute('cy', startPt.y);
            tracer.classList.add('is-active');
            tracer.style.opacity = '1';
        }

        const duration = 2200; // ms
        const startTime = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function surgeStep(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutCubic(progress);

            // Animate stroke offsets surging upwards
            linePath.style.strokeDashoffset = `${lineLen * (1 - ease)}`;
            if (co2Path) co2Path.style.strokeDashoffset = `${co2Len * (1 - ease)}`;

            // Move tracer bead along the rising curve
            const currentLen = lineLen * ease;
            const pt = linePath.getPointAtLength(currentLen);

            if (tracer) {
                tracer.setAttribute('cx', pt.x);
                tracer.setAttribute('cy', pt.y);
            }

            // Unroll area fill directly beneath the rising line
            if (clipRect) {
                clipRect.setAttribute('width', Math.max(110, pt.x + 4));
            }

            // Live tonnage counter HUD updating dynamically
            if (liveVal) {
                const currentTons = Math.round(120 + (1450 - 120) * ease);
                liveVal.textContent = `${currentTons.toLocaleString()}t Diverted`;
            }

            // Reveal milestone nodes with spring pop as tracer reaches each coordinate
            nodes.forEach(node => {
                const circle = node.querySelector('.node-point');
                const glow = node.querySelector('.node-glow');
                if (circle) {
                    const cx = parseFloat(circle.getAttribute('cx') || 0);
                    if (pt.x >= cx - 8 && !node.classList.contains('is-revealed')) {
                        node.classList.add('is-revealed');
                        circle.style.opacity = '1';
                        circle.setAttribute('r', cx >= 800 ? '7' : '6');
                        if (glow) {
                            glow.style.opacity = '0.75';
                            glow.setAttribute('r', '14');
                        }
                    }
                }
            });

            if (progress < 1) {
                requestAnimationFrame(surgeStep);
            } else {
                // Final summit state
                linePath.style.strokeDashoffset = '0';
                if (co2Path) co2Path.style.strokeDashoffset = '0';
                if (clipRect) clipRect.setAttribute('width', '900');
                nodes.forEach(n => {
                    n.classList.add('is-revealed');
                    const pt = n.querySelector('.node-point');
                    const gl = n.querySelector('.node-glow');
                    if (pt) {
                        pt.style.opacity = '1';
                        pt.setAttribute('r', n.getAttribute('data-year')?.includes('2026') ? '7' : '6');
                    }
                    if (gl) {
                        gl.style.opacity = '0.75';
                        gl.setAttribute('r', '14');
                    }
                });
                if (tracer) {
                    const endPt = linePath.getPointAtLength(lineLen);
                    tracer.setAttribute('cx', endPt.x);
                    tracer.setAttribute('cy', endPt.y);
                }
                if (liveVal) {
                    liveVal.textContent = '1,450t Diverted (PEAK)';
                }
                recoveryRunning = false;
            }
        }

        recoveryRunning = true;
        requestAnimationFrame(surgeStep);
    }

    // --- Section 03: Circular Distribution Surge Animation ---
    function animateDistChartSurge() {
        const distSvg = document.querySelector('.impact-distribution-svg');
        if (!distSvg) return;

        const paths = distSvg.querySelectorAll('.chart-path');
        const clipRect = distSvg.querySelector('#dist-clip-rect');
        const nodes = distSvg.querySelectorAll('.dist-node');

        paths.forEach(p => {
            const len = p.getTotalLength ? Math.ceil(p.getTotalLength()) : 1000;
            p.style.transition = 'none';
            p.style.strokeDasharray = `${len} ${len}`;
            p.style.strokeDashoffset = `${len}`;
        });
        if (clipRect) clipRect.setAttribute('width', '90');
        nodes.forEach(n => {
            n.classList.remove('is-revealed');
            n.style.opacity = '0';
            n.setAttribute('r', '0');
        });

        const duration = 2200;
        const startTime = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function distStep(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutCubic(progress);

            paths.forEach(p => {
                const len = p.getTotalLength ? Math.ceil(p.getTotalLength()) : 1000;
                p.style.strokeDashoffset = `${len * (1 - ease)}`;
            });

            const currentX = 90 + (870 - 90) * ease;
            if (clipRect) {
                clipRect.setAttribute('width', Math.max(90, currentX + 6));
            }

            nodes.forEach(n => {
                const cx = parseFloat(n.getAttribute('cx') || 0);
                if (currentX >= cx - 8 && !n.classList.contains('is-revealed')) {
                    n.classList.add('is-revealed');
                    n.style.opacity = '1';
                    n.setAttribute('r', n.getAttribute('data-year')?.includes('Target') ? '6.5' : '5');
                }
            });

            if (progress < 1) {
                requestAnimationFrame(distStep);
            } else {
                paths.forEach(p => p.style.strokeDashoffset = '0');
                if (clipRect) clipRect.setAttribute('width', '940');
                nodes.forEach(n => {
                    n.classList.add('is-revealed');
                    n.style.opacity = '1';
                    n.setAttribute('r', n.getAttribute('data-year')?.includes('Target') ? '6.5' : '5');
                });
                distRunning = false;
            }
        }

        distRunning = true;
        requestAnimationFrame(distStep);
    }

    // Scroll Observers: trigger surge when SVG is in viewport
    const recoverySvgWrap = document.querySelector('.impact-chart-svg-wrap') || document.getElementById('recovery-diagram-card');
    if (recoverySvgWrap) {
        const rect = recoverySvgWrap.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
            setTimeout(() => {
                if (!recoveryRunning) animateRecoveryChartSurge();
            }, 350);
        }

        const obs1 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !recoveryRunning) {
                    animateRecoveryChartSurge();
                }
            });
        }, { threshold: 0.2 });
        obs1.observe(recoverySvgWrap);
    }

    const distSvgWrap = document.querySelector('.impact-distribution-chart-wrapper') || document.getElementById('distribution-diagram');
    if (distSvgWrap) {
        const rect = distSvgWrap.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
            setTimeout(() => {
                if (!distRunning) animateDistChartSurge();
            }, 500);
        }

        const obs2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !distRunning) {
                    animateDistChartSurge();
                }
            });
        }, { threshold: 0.2 });
        obs2.observe(distSvgWrap);
    }

    // Replay Buttons
    const replayRecoveryBtn = document.getElementById('replay-recovery-chart');
    if (replayRecoveryBtn) {
        replayRecoveryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            animateRecoveryChartSurge();
        });
    }

    const replayDistBtn = document.getElementById('replay-dist-chart');
    if (replayDistBtn) {
        replayDistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            animateDistChartSurge();
        });
    }

    // 1. Recovery Trajectory Chart Tooltip
    const chartSvg = document.querySelector('.impact-chart-svg');
    const chartTooltip = document.getElementById('chart-tooltip');
    const chartWrapper = document.querySelector('.impact-chart-wrapper') || document.querySelector('.impact-chart-svg-wrap');

    if (chartSvg && chartTooltip && chartWrapper) {
        const nodes = chartSvg.querySelectorAll('.chart-node');

        nodes.forEach(node => {
            const showTooltip = () => {
                const year = node.getAttribute('data-year') || '';
                const waste = node.getAttribute('data-waste') || '';
                const co2 = node.getAttribute('data-co2') || '';
                const cert = node.getAttribute('data-cert') || '';

                const yrEl = chartTooltip.querySelector('.impact-chart-tooltip__year');
                const wasteEl = chartTooltip.querySelector('.impact-chart-tooltip__waste');
                const co2El = chartTooltip.querySelector('.impact-chart-tooltip__co2');
                const certEl = chartTooltip.querySelector('.impact-chart-tooltip__cert');

                if (yrEl) yrEl.textContent = year;
                if (wasteEl) wasteEl.textContent = waste;
                if (co2El) co2El.textContent = co2;
                if (certEl) certEl.textContent = cert;

                const wrapperRect = chartWrapper.getBoundingClientRect();
                const nodeRect = node.getBoundingClientRect();

                const leftPos = (nodeRect.left + nodeRect.width / 2) - wrapperRect.left;
                const topPos = nodeRect.top - wrapperRect.top - 12;

                chartTooltip.style.left = `${leftPos}px`;
                chartTooltip.style.top = `${topPos}px`;
                chartTooltip.classList.add('is-visible');
            };

            const hideTooltip = () => {
                chartTooltip.classList.remove('is-visible');
            };

            node.addEventListener('mouseenter', showTooltip);
            node.addEventListener('focus', showTooltip);
            node.addEventListener('mouseleave', hideTooltip);
            node.addEventListener('blur', hideTooltip);
            node.addEventListener('touchstart', showTooltip, { passive: true });
        });

        chartWrapper.addEventListener('mouseleave', () => {
            chartTooltip.classList.remove('is-visible');
        });
    }

    // 2. Circular Distribution Diagram Tooltip
    const distSvg = document.querySelector('.impact-distribution-svg');
    const distTooltip = document.getElementById('dist-chart-tooltip');
    const distWrapper = document.querySelector('.impact-distribution-chart-wrapper');

    if (distSvg && distTooltip && distWrapper) {
        const distNodes = distSvg.querySelectorAll('.dist-node');

        distNodes.forEach(node => {
            const showDistTooltip = () => {
                const stream = node.getAttribute('data-stream') || '';
                const year = node.getAttribute('data-year') || '';
                const pct = node.getAttribute('data-pct') || '';
                const tons = node.getAttribute('data-tons') || '';

                const yrEl = distTooltip.querySelector('.chart-tooltip__year');
                const streamEl = distTooltip.querySelector('.chart-tooltip__stream');
                const valEl = distTooltip.querySelector('.chart-tooltip__val');
                const auxEl = distTooltip.querySelector('.chart-tooltip__aux');

                if (yrEl) yrEl.textContent = year;
                if (streamEl) streamEl.textContent = stream;
                if (valEl) valEl.textContent = pct;
                if (auxEl) auxEl.textContent = tons;

                const wrapperRect = distWrapper.getBoundingClientRect();
                const nodeRect = node.getBoundingClientRect();

                const leftPos = (nodeRect.left + nodeRect.width / 2) - wrapperRect.left;
                const topPos = nodeRect.top - wrapperRect.top - 12;

                distTooltip.style.left = `${leftPos}px`;
                distTooltip.style.top = `${topPos}px`;
                distTooltip.classList.add('is-active');
            };

            const hideDistTooltip = () => {
                distTooltip.classList.remove('is-active');
            };

            node.addEventListener('mouseenter', showDistTooltip);
            node.addEventListener('focus', showDistTooltip);
            node.addEventListener('mouseleave', hideDistTooltip);
            node.addEventListener('blur', hideDistTooltip);
            node.addEventListener('touchstart', showDistTooltip, { passive: true });
        });

        distWrapper.addEventListener('mouseleave', () => {
            distTooltip.classList.remove('is-active');
        });
    }
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.counter, .stat-counter');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const rawTarget = counter.getAttribute('data-target');
                if (!rawTarget) return;
                const target = parseInt(rawTarget, 10);
                const suffix = counter.getAttribute('data-suffix') || '';
                const format = counter.getAttribute('data-format');
                const duration = 1600;
                const startTime = performance.now();

                function renderVal(val) {
                    let formatted = val;
                    if (format === 'comma') {
                        formatted = val.toLocaleString('en-US');
                    }
                    if (suffix) {
                        return `${formatted}<span>${suffix}</span>`;
                    }
                    return formatted;
                }

                function stepAnim(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutExpo
                    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const currentVal = Math.floor(ease * target);

                    counter.innerHTML = renderVal(currentVal);

                    if (progress < 1) {
                        requestAnimationFrame(stepAnim);
                    } else {
                        counter.innerHTML = renderVal(target);
                    }
                }

                requestAnimationFrame(stepAnim);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.15 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Hero video story animation bar
function initHeroStoryBar() {
    const video = document.getElementById('heroVideo') || document.querySelector('.rebrand-hero__video');
    const storyBar = document.getElementById('heroStoryBar');
    if (!storyBar) return;

    const segments = storyBar.querySelectorAll('.hero-story-bar__segment');
    const fills = storyBar.querySelectorAll('.hero-story-bar__fill');
    const labelEl = document.getElementById('heroStoryLabel');
    const timerEl = document.getElementById('heroStoryTimer');

    const labels = [
        '01 / E-WASTE INFLOW & SORTING',
        '02 / PRECISION RECOVERY & DISASSEMBLY',
        '03 / CLOSED-LOOP MATERIAL RETURN'
    ];

    function updateProgress(currentTime, duration) {
        if (!duration || isNaN(duration) || duration <= 0) duration = 10;
        const totalProgress = Math.min(Math.max(currentTime / duration, 0), 1);
        const count = fills.length || 3;

        fills.forEach((fill, index) => {
            const start = index / count;
            const end = (index + 1) / count;

            if (totalProgress >= end) {
                fill.style.width = '100%';
            } else if (totalProgress <= start) {
                fill.style.width = '0%';
            } else {
                const segP = (totalProgress - start) / (end - start);
                fill.style.width = (segP * 100) + '%';
            }
        });

        const activeIndex = Math.min(Math.floor(totalProgress * count), count - 1);
        segments.forEach((seg, i) => {
            seg.classList.toggle('active', i === activeIndex);
        });

        if (labelEl && labels[activeIndex]) {
            labelEl.textContent = labels[activeIndex];
        }

        if (timerEl) {
            const curS = Math.floor(currentTime % 60).toString().padStart(2, '0');
            const durS = Math.floor(duration % 60).toString().padStart(2, '0');
            timerEl.textContent = `0:${curS} / 0:${durS}`;
        }
    }

    if (video) {
        video.addEventListener('timeupdate', () => {
            updateProgress(video.currentTime, video.duration);
        });

        // Click to jump video to segment
        segments.forEach((seg, idx) => {
            seg.addEventListener('click', () => {
                const duration = video.duration || 10;
                video.currentTime = (idx / (segments.length || 3)) * duration;
                if (video.paused) video.play();
            });
        });

        // Ensure video is playing
        video.play().catch(() => {
            video.muted = true;
            video.play().catch(() => { });
        });
    }

    // Always run fallback animation if video paused or buffering
    let fallbackTick = 0;
    setInterval(() => {
        if (!video || video.paused || video.readyState < 2) {
            fallbackTick = (fallbackTick + 0.1) % 10;
            updateProgress(fallbackTick, 10);
        }
    }, 100);
}

// Carousel functionality
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel__track');
        const slides = carousel.querySelectorAll('.carousel__slide');
        const prevBtn = carousel.querySelector('.carousel__btn--prev');
        const nextBtn = carousel.querySelector('.carousel__btn--next');
        const dots = carousel.querySelectorAll('.carousel__dot');

        if (!track || slides.length === 0) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateCarousel() {
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('carousel__dot--active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                currentSlide = index;
                updateCarousel();
            });
        });

        // Auto-play
        setInterval(nextSlide, 5000);
    });
}

// Contact form handling with Zero-Fail Guarantee and Inquiries Storage
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    // Phone field handling - visible by default for all clients
    const phoneFieldGroup = document.getElementById('phone-field-group');
    const phoneInput = document.getElementById('phone');
    if (phoneFieldGroup) {
        phoneFieldGroup.style.display = 'block';
    }

    // Initialize inquiries inbox counter and modal triggers
    updateInquiriesBadge();
    initInquiriesModal();

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Disable submit button to prevent double submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton ? submitButton.innerHTML : '';
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            // 1. Create client inquiry record
            const inquiryRecord = {
                id: 'CNT-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
                timestamp: new Date().toISOString(),
                formattedDate: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                name: String(data.name).trim(),
                email: String(data.email).trim(),
                phone: (data.phone ? String(data.phone).trim() : '') || 'Not provided',
                subject: String(data.subject || 'General Inquiry').trim(),
                message: String(data.message).trim(),
                language: (window.DrWeeeI18n && window.DrWeeeI18n.getCurrentLanguage) ? window.DrWeeeI18n.getCurrentLanguage() : (document.documentElement.lang || 'en'),
                synced: false
            };

            // 2. ALWAYS save immediately to localStorage so messages are NEVER lost
            try {
                const storedInquiries = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
                storedInquiries.unshift(inquiryRecord);
                localStorage.setItem('drweee_contact_messages', JSON.stringify(storedInquiries));
                updateInquiriesBadge();
                renderInquiriesList();
                console.log('📥 DR.WEEE Inquiries: Message stored safely in browser storage. Total:', storedInquiries.length);
            } catch (storageErr) {
                console.warn('Could not save message to localStorage:', storageErr);
            }

            // 3. Send email via EmailJS to essam.drweee@gmail.com
            try {
                // EmailJS configuration — set your keys after account setup
                const EMAILJS_PUBLIC_KEY = window.DRWEEE_EMAILJS_PUBLIC_KEY || '';
                const EMAILJS_SERVICE_ID = window.DRWEEE_EMAILJS_SERVICE_ID || '';
                const EMAILJS_TEMPLATE_ID = window.DRWEEE_EMAILJS_TEMPLATE_ID || '';

                if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && window.emailjs) {
                    const emailParams = {
                        from_name: inquiryRecord.name,
                        from_email: inquiryRecord.email,
                        phone: inquiryRecord.phone,
                        subject: inquiryRecord.subject,
                        message: inquiryRecord.message,
                        inquiry_id: inquiryRecord.id,
                        submitted_at: inquiryRecord.formattedDate,
                        language: inquiryRecord.language,
                        to_email: 'essam.drweee@gmail.com'
                    };

                    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY);
                    console.log('✅ Email sent successfully via EmailJS');

                    // Mark as synced in localStorage
                    inquiryRecord.synced = true;
                    const stored = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
                    const idx = stored.findIndex(item => item.id === inquiryRecord.id);
                    if (idx !== -1) {
                        stored[idx].synced = true;
                        localStorage.setItem('drweee_contact_messages', JSON.stringify(stored));
                    }
                } else {
                    console.info('EmailJS not configured yet. Message saved locally only. See setup instructions.');
                }
            } catch (emailErr) {
                console.warn('EmailJS delivery failed (message is still saved locally):', emailErr);
            }

            // 4. Track contact form submission in analytics
            if (window.DrWeeeAnalytics) {
                try {
                    window.DrWeeeAnalytics.trackContactFormSubmit({
                        subject: data.subject,
                        phone: data.phone || null
                    });
                } catch (e) { }
            }

            // 5. Always display success modal and reset form
            if (typeof window.showContactSuccessModal === 'function') {
                window.showContactSuccessModal();
            } else {
                showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            }
            contactForm.reset();

            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
}

// DR.WEEE Inquiries Manager Functions
function updateInquiriesBadge() {
    try {
        const inquiries = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
        const badge = document.getElementById('inquiries-badge-count');
        const modalBadge = document.getElementById('modal-inquiries-count');
        if (badge) badge.textContent = inquiries.length;
        if (modalBadge) modalBadge.textContent = `${inquiries.length} ${inquiries.length === 1 ? 'message' : 'messages'}`;
    } catch (e) { }
}

function renderInquiriesList() {
    const container = document.getElementById('inquiries-list-container');
    if (!container) return;

    let inquiries = [];
    try {
        inquiries = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
    } catch (e) {
        inquiries = [];
    }

    if (inquiries.length === 0) {
        container.innerHTML = `
            <div class="inquiries-empty-state">
                <i class="fas fa-inbox"></i>
                <h4>No Messages Received Yet</h4>
                <p>When clients submit the contact form, their inquiries will appear here instantly with full contact details.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = inquiries.map(inq => {
        const safePhone = inq.phone && inq.phone !== 'Not provided' ? inq.phone : '';
        const cleanPhoneNum = safePhone.replace(/[^0-9]/g, '');
        const waLink = cleanPhoneNum ? `https://wa.me/${cleanPhoneNum}?text=${encodeURIComponent('Hello ' + inq.name + ', thank you for contacting DR.WEEE.')}` : null;
        const mailtoLink = `mailto:${encodeURIComponent(inq.email)}?subject=${encodeURIComponent('Re: ' + inq.subject + ' - DR.WEEE')}`;

        return `
            <div class="inquiry-item" data-id="${inq.id}">
                <div class="inquiry-item__header">
                    <div class="inquiry-item__meta">
                        <strong class="inquiry-item__name">${escapeHtml(inq.name)}</strong>
                        <span class="inquiry-item__email"><i class="fas fa-envelope"></i> <a href="${mailtoLink}">${escapeHtml(inq.email)}</a></span>
                        ${safePhone ? `<span class="inquiry-item__phone"><i class="fas fa-phone"></i> <a href="tel:${safePhone}">${escapeHtml(safePhone)}</a></span>` : ''}
                    </div>
                    <div class="inquiry-item__badge-wrap">
                        <span class="inquiry-status-badge ${inq.synced ? 'inquiry-status--synced' : 'inquiry-status--local'}">
                            ${inq.synced ? '<i class="fas fa-check-circle"></i> Synced' : '<i class="fas fa-hdd"></i> Saved Locally'}
                        </span>
                        <time class="inquiry-item__time">${escapeHtml(inq.formattedDate || inq.timestamp)}</time>
                    </div>
                </div>

                <div class="inquiry-item__subject">
                    <span class="inquiry-label">Subject:</span> <strong>${escapeHtml(inq.subject)}</strong>
                </div>

                <div class="inquiry-item__body">
                    ${escapeHtml(inq.message).replace(/\n/g, '<br>')}
                </div>

                <div class="inquiry-item__actions">
                    <a href="${mailtoLink}" class="inquiry-action-btn inquiry-action-btn--email" title="Reply via Email">
                        <i class="fas fa-reply"></i> Reply via Email
                    </a>
                    ${waLink ? `
                        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="inquiry-action-btn inquiry-action-btn--wa" title="Chat on WhatsApp">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    ` : ''}
                    <button type="button" class="inquiry-action-btn inquiry-action-btn--copy" onclick="copyInquiryDetails('${inq.id}')" title="Copy to clipboard">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <button type="button" class="inquiry-action-btn inquiry-action-btn--delete" onclick="deleteInquiryRecord('${inq.id}')" title="Delete message">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.copyInquiryDetails = function (id) {
    const inquiries = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
    const inq = inquiries.find(item => item.id === id);
    if (!inq) return;

    const summary = `DR.WEEE CLIENT INQUIRY
================================
Date: ${inq.formattedDate || inq.timestamp}
Name: ${inq.name}
Email: ${inq.email}
Phone: ${inq.phone}
Subject: ${inq.subject}
Message:
${inq.message}
================================`;

    navigator.clipboard.writeText(summary).then(() => {
        showNotification('Inquiry details copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy. Please copy manually.', 'warning');
    });
};

window.deleteInquiryRecord = function (id) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    const inquiries = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
    const filtered = inquiries.filter(item => item.id !== id);
    localStorage.setItem('drweee_contact_messages', JSON.stringify(filtered));
    updateInquiriesBadge();
    renderInquiriesList();
    showNotification('Message deleted.', 'info');
};

function initInquiriesModal() {
    const openBtn = document.getElementById('view-inquiries-btn');
    const modal = document.getElementById('inquiries-admin-modal');
    const closeBtn = document.getElementById('close-inquiries-modal');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const clearAllBtn = document.getElementById('clear-all-inquiries-btn');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            renderInquiriesList();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            window.downloadContactMessages();
        });
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            window.clearContactMessages();
        });
    }

    // Keyboard shortcut: Ctrl + Shift + I (or Alt + I) opens inquiries modal
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || (e.altKey && e.key.toLowerCase() === 'i')) {
            if (modal) {
                e.preventDefault();
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                } else {
                    renderInquiriesList();
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }
        }
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Global browser helpers for developers & administrators
window.getContactMessages = function () {
    const inquiries = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
    console.log(`📋 DR.WEEE Contact Inquiries (${inquiries.length} messages):`);
    if (inquiries.length > 0) {
        console.table(inquiries.map(i => ({
            Date: i.formattedDate || i.timestamp,
            Name: i.name,
            Email: i.email,
            Phone: i.phone,
            Subject: i.subject,
            Message: i.message.length > 60 ? i.message.substring(0, 57) + '...' : i.message,
            Synced: i.synced ? 'Yes' : 'Local Only'
        })));
    } else {
        console.log('No inquiries stored yet.');
    }
    return inquiries;
};

window.downloadContactMessages = function () {
    const inquiries = JSON.parse(localStorage.getItem('drweee_contact_messages') || '[]');
    if (inquiries.length === 0) {
        alert('No inquiries found to export.');
        return;
    }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Language', 'Synced'];
    const csvRows = [
        headers.join(','),
        ...inquiries.map(item => [
            JSON.stringify(item.id || ''),
            JSON.stringify(item.formattedDate || item.timestamp || ''),
            JSON.stringify(item.name || ''),
            JSON.stringify(item.email || ''),
            JSON.stringify(item.phone || ''),
            JSON.stringify(item.subject || ''),
            JSON.stringify((item.message || '').replace(/\r?\n/g, ' ')),
            JSON.stringify(item.language || ''),
            JSON.stringify(item.synced ? 'Yes' : 'Local Only')
        ].join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `drweee_contact_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.clearContactMessages = function () {
    if (confirm('Are you sure you want to clear all stored inquiries?')) {
        localStorage.removeItem('drweee_contact_messages');
        updateInquiriesBadge();
        renderInquiriesList();
        console.log('All contact inquiries cleared.');
    }
};

// Load header and footer includes
function loadIncludes() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        console.log('📥 Loading header from includes...');
        fetch('includes/header.html?v=' + Date.now())
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
                console.log('✅ Header HTML loaded, initializing components...');

                // Show test environment indicator
                fetch(getApiBaseUrl() + '/api/health')
                    .then(r => {
                        if (r.ok && r.headers.get('content-type')?.includes('application/json')) {
                            return r.json();
                        }
                        return null;
                    })
                    .then(data => {
                        if (data && data.environment === 'test' && !document.getElementById('test-env-banner')) {
                            const banner = document.createElement('div');
                            banner.id = 'test-env-banner';
                            banner.textContent = 'TEST ENVIRONMENT';
                            banner.style.cssText = 'background:#ff9800;color:#fff;text-align:center;padding:4px 0;font-size:12px;font-weight:700;letter-spacing:1px;position:sticky;top:0;z-index:9999;';
                            document.getElementById('header').after(banner);
                        }
                    })
                    .catch(() => { });

                // Initialize header components in correct order
                initHeader();
                initMobileMenu();
                initUserDropdown();

                // Check auth status after all components are ready
                setTimeout(() => {
                    checkAuthStatus();
                    console.log('✅ Header initialization complete');

                    // Initialize i18n after header is loaded (for language switcher)
                    if (window.DrWeeeI18n) {
                        window.DrWeeeI18n.refresh();
                    }
                }, 100);
            })
            .catch(error => {
                console.error('🚨 Error loading header:', error);
                // Fallback: check if header exists in DOM already
                if (document.getElementById('header')) {
                    initHeader();
                    initMobileMenu();
                    initUserDropdown();
                    checkAuthStatus();
                }
            });
    } else if (document.getElementById('header')) {
        // Header is directly in HTML (not using includes)
        console.log('📄 Header found directly in DOM');
        initHeader();
        initMobileMenu();
        initUserDropdown();
        checkAuthStatus();
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('includes/footer.html?v=' + Date.now())
            .then(response => response.text())
            .then(html => {
                footerPlaceholder.innerHTML = html;

                // Refresh i18n after footer is loaded
                if (window.DrWeeeI18n) {
                    window.DrWeeeI18n.refresh();
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// NOTE: Lazy loading is initialized in main DOMContentLoaded listener at top of file

// Auto play/pause videos based on scroll visibility.
// User must click the video once to enable audio (browser autoplay policy).
// Position is preserved when scrolling away and back.
function initScrollVideos() {
    const videos = document.querySelectorAll('video[data-autoplay-onscroll]');
    if (videos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const v = entry.target;
            if (entry.isIntersecting) {
                if (v.dataset.userPaused === '1') return;
                if (v.dataset.userSeeking === '1') return;
                v.play().catch(() => { /* autoplay blocked - silently ignore */ });
            } else if (!v.paused) {
                v.dataset.scrollPaused = '1';
                v.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(v => {
        // First user interaction with the video -> unmute permanently.
        // Use 'click' because it's a real user gesture and won't fire on scroll-pause.
        v.addEventListener('click', () => { if (v.muted) v.muted = false; }, { once: true });

        // Track scrub (timeline drag) so the observer doesn't fight it.
        v.addEventListener('seeking', () => { v.dataset.userSeeking = '1'; });
        v.addEventListener('seeked', () => { delete v.dataset.userSeeking; });

        v.addEventListener('pause', () => {
            // Ignore pauses caused by our observer or by seeking
            if (v.dataset.scrollPaused === '1') { delete v.dataset.scrollPaused; return; }
            if (v.dataset.userSeeking === '1') return;
            if (!v.ended) v.dataset.userPaused = '1';
        });
        v.addEventListener('play', () => { delete v.dataset.userPaused; });

        observer.observe(v);
    });
}

// Page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
            initHomePage();
            break;
        case 'about.html':
            initAboutPage();
            break;
        case 'services.html':
            initServicesPage();
            break;
        case 'ventures.html':
            initVenturesPage();
            break;
        case 'impact.html':
            initImpactPage();
            break;
        case 'recognition.html':
            initRecognitionPage();
            break;
        case 'news.html':
            initNewsPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
    }
}

// Page-specific initialization functions
function initHomePage() {
    // Home page specific functionality
    console.log('Home page initialized');
}

function initAboutPage() {
    // About page specific functionality
    console.log('About page initialized');
}

function initServicesPage() {
    // Services page specific functionality
    console.log('Services page initialized');
}

function initVenturesPage() {
    // Ventures page specific functionality
    console.log('Ventures page initialized');
}

function initImpactPage() {
    // Impact page specific functionality
    console.log('Impact page initialized');
}

function initRecognitionPage() {
    // Recognition page specific functionality
    console.log('Recognition page initialized');
}

function initNewsPage() {
    // News page specific functionality
    console.log('News page initialized');
}

function initContactPage() {
    // Contact page specific functionality
    console.log('Contact page initialized');
}



// --- INNOVATIVE HERO SCRIPT (HOME & ABOUT) ---
// NOTE: Main DOMContentLoaded listener is at the top of this file - DO NOT DUPLICATE

/**
 * Creates a subtle, interactive particle animation in the hero background.
 */
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.floor(canvas.width / 30);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = 'rgba(77, 182, 172, 0.5)';
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            this.x += this.speedX;
            this.y += this.speedY;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

/**
 * Animates the letters of the hero title to reveal them on page load.
 */
function initTextReveal() {
    const title = document.querySelector('[data-animate-reveal]');
    if (!title) return;

    const mainTitle = title.querySelector('.hero__title-main');
    const subTitle = title.querySelector('.hero__title-sub');

    const wrapLetters = (element) => {
        element.innerHTML = element.textContent.replace(/\\S/g, "<span class='letter'>$&</span>");
        return element.querySelectorAll('span');
    };

    const mainLetters = wrapLetters(mainTitle);
    const subLetters = wrapLetters(subTitle);

    let delay = 0;
    mainLetters.forEach(letter => {
        letter.style.animationDelay = `${delay}s`;
        delay += 0.04;
    });
    subLetters.forEach(letter => {
        letter.style.animationDelay = `${delay}s`;
        delay += 0.02;
    });
}


/**
 * Makes buttons move towards the cursor for a magnetic effect.
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translate(0,0)';
        });
    });
}

/**
 * Creates a parallax effect on the hero content as the user scrolls.
 */
function handleHeroParallax() {
    // This selector now targets the content inside ANY element with the .hero class
    const heroContent = document.querySelector('.hero .hero__content');
    if (heroContent) {
        const scrollY = window.scrollY;
        heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Only run chart logic on the DR.WEEE Impact page
    if (!document.body.classList.contains('impact-drweee-page')) {
        return;
    }

    const chartFontColor = '#FFFFFF';
    const gridLineColor = 'rgba(255, 255, 255, 0.1)';
    const primaryColor = '#4DB6AC';
    const secondaryColor = '#A5D6A7';

    // E-Waste Processed Chart
    const ewasteCtx = document.getElementById('ewasteChart');
    if (ewasteCtx) {
        new Chart(ewasteCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Tons Processed',
                    data: [150, 300, 550, 800, 1000],
                    borderColor: primaryColor,
                    backgroundColor: 'rgba(77, 182, 172, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // <-- ADD THIS LINE
                plugins: { legend: { labels: { color: chartFontColor } } },
                scales: {
                    y: { ticks: { color: chartFontColor }, grid: { color: gridLineColor } },
                    x: { ticks: { color: chartFontColor }, grid: { color: gridLineColor } }
                }
            }
        });
    }
    // Periodically check auth status to handle session expiration
    setInterval(() => {
        // Only check if we think we're logged in and elements exist
        const userDropdown = document.getElementById('user-dropdown');
        if (userDropdown && userDropdown.style.display !== 'none') {
            checkAuthStatus();
        }
    }, 5 * 60 * 1000); // Check every 5 minutes

    // Export functions for global access
    window.checkAuthStatus = checkAuthStatus;
    window.showLoggedInState = showLoggedInState;
    window.showLoggedOutState = showLoggedOutState;
    // Economic Contribution Chart
    const economicCtx = document.getElementById('economicChart');
    if (economicCtx) {
        new Chart(economicCtx, {
            type: 'doughnut',
            data: {
                labels: ['Job Creation', 'Local Manufacturing', 'Market Revenue'],
                datasets: [{
                    data: [35, 25, 40],
                    backgroundColor: [primaryColor, secondaryColor, '#00897B'],
                    borderColor: '#f9fbfb'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // <-- ADD THIS LINE
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#5F6368' }
                    }
                }
            }
        });
    }
});
