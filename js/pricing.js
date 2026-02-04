/**
 * Pricing Tabs - Kléa Agency
 * Tab functionality for pricing section
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching
    const switchTab = (tabId) => {
        // Update buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });

        // Update content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
                
                // Re-trigger animations for elements in the new tab
                const animatedElements = content.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
                animatedElements.forEach(el => {
                    el.classList.remove('visible');
                    // Slight delay to allow CSS to reset
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 50);
                });
            }
        });
    };

    // Event listeners
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            if (tabId) {
                switchTab(tabId);
            }
        });
    });

    // Keyboard support for tabs
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('keydown', (e) => {
            let newIndex;
            
            switch (e.key) {
                case 'ArrowRight':
                    newIndex = (index + 1) % tabButtons.length;
                    tabButtons[newIndex].focus();
                    tabButtons[newIndex].click();
                    break;
                case 'ArrowLeft':
                    newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    tabButtons[newIndex].focus();
                    tabButtons[newIndex].click();
                    break;
                case 'Home':
                    tabButtons[0].focus();
                    tabButtons[0].click();
                    break;
                case 'End':
                    tabButtons[tabButtons.length - 1].focus();
                    tabButtons[tabButtons.length - 1].click();
                    break;
            }
        });
    });

    // Initialize first tab animations
    const firstTab = document.querySelector('.tab-content.active');
    if (firstTab) {
        const animatedElements = firstTab.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }

    // URL hash support for direct linking to tabs
    const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        const validTabs = ['social', 'photo', 'charte'];
        
        if (validTabs.includes(hash)) {
            switchTab(hash);
            
            // Scroll to pricing section
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                setTimeout(() => {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check hash on load
    if (window.location.hash) {
        handleHashChange();
    }
});
