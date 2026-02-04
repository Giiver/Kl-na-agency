/**
 * Gallery & Lightbox - Kléa Agency
 * Lightbox functionality for portfolio images
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentIndex = 0;
    const images = [];

    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt
            });
            
            // Click event to open lightbox
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });

    // Open lightbox
    const openLightbox = (index) => {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Update lightbox image
    const updateLightboxImage = () => {
        if (images[currentIndex]) {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
        }
    };

    // Navigate to previous image
    const prevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    };

    // Navigate to next image
    const nextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    };

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    };

    // Preload adjacent images for smoother navigation
    const preloadImage = (index) => {
        if (images[index]) {
            const img = new Image();
            img.src = images[index].src;
        }
    };

    // Preload when lightbox opens
    const preloadAdjacent = () => {
        preloadImage((currentIndex + 1) % images.length);
        preloadImage((currentIndex - 1 + images.length) % images.length);
    };

    // Add preload on image change
    const originalUpdateImage = updateLightboxImage;
    const updateLightboxImageWithPreload = () => {
        originalUpdateImage();
        preloadAdjacent();
    };
});
