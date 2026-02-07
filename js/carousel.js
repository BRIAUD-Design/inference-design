// ========================================
// CAROUSEL RÉALISATIONS (Swiper.js)
// ========================================

// Ce fichier sera utilisé pour la section Réalisations (Étape 7)
// Pour l'instant, on prépare la structure

document.addEventListener('DOMContentLoaded', function() {

    // Vérifier si Swiper est chargé
    if (typeof Swiper !== 'undefined') {
        initRealisationsCarousel();
    } else {
        console.warn('⚠️ Swiper.js non chargé - Carousel désactivé');
    }
});

// === INITIALISATION CAROUSEL RÉALISATIONS ===
function initRealisationsCarousel() {
    const carouselElement = document.querySelector('.realisations-swiper');

    // Si la section n'existe pas encore, on attend
    if (!carouselElement) {
        console.log('ℹ️ Carousel réalisations - En attente (section non créée)');
        return;
    }

    // Configuration Swiper
    const swiper = new Swiper('.realisations-swiper', {
        // Paramètres de base
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 500,
        effect: 'slide',

        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },

        // Keyboard
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // Touch/Swipe
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,

        // Autoplay (désactivé par défaut - contrôle utilisateur)
        autoplay: false,

        // Responsive breakpoints
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // Tablet
            768: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            // Desktop
            1024: {
                slidesPerView: 1,
                spaceBetween: 40
            }
        },

        // Accessibilité
        a11y: {
            enabled: true,
            prevSlideMessage: 'Slide précédent',
            nextSlideMessage: 'Slide suivant',
            firstSlideMessage: 'Premier slide',
            lastSlideMessage: 'Dernier slide',
        },

        // Events
        on: {
            init: function() {
                console.log('✅ Carousel Réalisations initialisé');
            },
            slideChange: function() {
                // Animation au changement de slide
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    activeSlide.classList.add('slide-active');
                }
            }
        }
    });

    // Retourner l'instance pour manipulation ultérieure si besoin
    return swiper;
}

// === FONCTIONS UTILITAIRES CAROUSEL ===

// Pause carousel au hover (si autoplay activé)
function pauseOnHover(swiperInstance) {
    const carousel = document.querySelector('.realisations-swiper');

    if (carousel && swiperInstance.autoplay) {
        carousel.addEventListener('mouseenter', () => {
            swiperInstance.autoplay.stop();
        });

        carousel.addEventListener('mouseleave', () => {
            swiperInstance.autoplay.start();
        });
    }
}

// Lazy loading images carousel
function lazyLoadCarouselImages() {
    const images = document.querySelectorAll('.swiper-slide img[data-src]');

    images.forEach(img => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    observer.unobserve(image);
                }
            });
        });

        observer.observe(img);
    });
}
