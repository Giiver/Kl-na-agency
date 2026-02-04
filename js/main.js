/**
 * Main JavaScript - Kléa Agency
 * Navigation, scroll effects, animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mobile menu toggle
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavLink = () => {
        const scrollPos = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-item');
    animatedElements.forEach(el => observer.observe(el));

    // About values slider
    const aboutValuesEl = document.getElementById('aboutValues');
    const stackedImages = document.querySelectorAll('.stacked-image');

    const setActiveStackedImage = (activeIndex) => {
        if (!stackedImages || stackedImages.length === 0) return;

        const n = stackedImages.length;
        const safeIndex = ((activeIndex % n) + n) % n;
        const pos1 = safeIndex;
        const pos2 = (safeIndex + 1) % n;
        const pos3 = (safeIndex + 2) % n;

        stackedImages.forEach((img) => {
            img.classList.add('transitioning');
        });

        window.setTimeout(() => {
            stackedImages.forEach((img, index) => {
                img.classList.remove('stacked-image--1', 'stacked-image--2', 'stacked-image--3');

                if (index === pos1) img.classList.add('stacked-image--1');
                else if (index === pos2) img.classList.add('stacked-image--2');
                else if (index === pos3) img.classList.add('stacked-image--3');
            });

            window.setTimeout(() => {
                stackedImages.forEach((img) => {
                    img.classList.remove('transitioning');
                });
            }, 800);
        }, 300);
    };

    if (aboutValuesEl) {
        const valueItems = Array.from(aboutValuesEl.querySelectorAll('.value-item'));
        const descriptionEl = document.getElementById('aboutValuesDescription');

        if (valueItems.length > 0 && descriptionEl) {
            let currentIndex = 0;
            let intervalId = null;
            let isPaused = false;

            const setActiveValue = (index) => {
                const safeIndex = ((index % valueItems.length) + valueItems.length) % valueItems.length;
                currentIndex = safeIndex;

                valueItems.forEach((item, i) => {
                    item.classList.toggle('is-active', i === safeIndex);
                    item.setAttribute('tabindex', '0');
                    item.setAttribute('role', 'button');
                    item.setAttribute('aria-pressed', i === safeIndex ? 'true' : 'false');
                });

                const activeItem = valueItems[safeIndex];
                descriptionEl.textContent = activeItem.dataset.description || '';

                setActiveStackedImage(safeIndex);
            };

            const nextValue = () => {
                if (isPaused) return;
                setActiveValue(currentIndex + 1);
            };

            const start = () => {
                if (intervalId) return;
                intervalId = window.setInterval(nextValue, 5000);
            };

            const stop = () => {
                if (!intervalId) return;
                window.clearInterval(intervalId);
                intervalId = null;
            };

            const pause = () => {
                isPaused = true;
                stop();
            };

            const resume = () => {
                isPaused = false;
                start();
            };

            valueItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    setActiveValue(index);

                    stop();
                    start();
                });

                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveValue(index);

                        stop();
                        start();
                    }
                });
            });

            aboutValuesEl.addEventListener('mouseenter', pause);
            aboutValuesEl.addEventListener('mouseleave', resume);
            aboutValuesEl.addEventListener('focusin', pause);
            aboutValuesEl.addEventListener('focusout', resume);

            setActiveValue(0);
            start();
        }
    }

    // Stacked images slider
    if (!aboutValuesEl && stackedImages.length > 0) {
        let currentIndex = 0;

        const rotateImages = () => {
            currentIndex = (currentIndex + 1) % stackedImages.length;
            setActiveStackedImage(currentIndex);
        };

        setActiveStackedImage(0);
        setInterval(rotateImages, 5000);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Prevent scroll when mobile menu is open
    const preventScroll = (e) => {
        if (navList.classList.contains('active')) {
            e.preventDefault();
        }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });

    // Handle pricing tab links (from services and footer)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-pricing-tab]');
        if (!link) return;

        e.preventDefault();
        const tabId = link.dataset.pricingTab;
        
        // Scroll to pricing section
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
            
            // Wait for scroll, then switch tab
            setTimeout(() => {
                const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
                if (tabBtn) {
                    tabBtn.click();
                }
            }, 600);
        }
    });

    console.log('Kléa Agency - Site loaded successfully');
});
