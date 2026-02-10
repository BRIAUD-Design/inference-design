// ========================================
// CAROUSEL RÉALISATIONS (Swiper.js)
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // Vérifier si Swiper est chargé
    if (typeof Swiper !== 'undefined') {
        initRealisationsCarousel();
        initNocCarousels(); // Initialiser aussi les mini-carousels NoC
    } else {
        console.warn('⚠️ Swiper.js non chargé - Carousel désactivé');
    }
});

// ========================================
// CAROUSEL PRINCIPAL RÉALISATIONS
// ========================================

function initRealisationsCarousel() {
    const carouselElement = document.querySelector('.realisations-swiper');

    // Si la section n'existe pas encore, on attend
    if (!carouselElement) {
        console.log('ℹ️ Carousel réalisations - En attente (section non créée)');
        return;
    }

    // Configuration Swiper principal
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

        // Autoplay (désactivé par défaut)
        autoplay: false,

        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 30
            },
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
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    activeSlide.classList.add('slide-active');
                }
            }
        }
    });

    return swiper;
}

// ========================================
// MINI-CAROUSELS AUTOMATIQUES CAS NoC
// ========================================

function initNocCarousels() {
    // Vérifier si les éléments existent
    const tubeCarousel = document.querySelector('.mini-swiper-tube');
    const niveauCarousel = document.querySelector('.mini-swiper-niveau');
    const bullesCarousel = document.querySelector('.mini-swiper-bulles');

    if (!tubeCarousel && !niveauCarousel && !bullesCarousel) {
        console.log('ℹ️ Mini-carousels NoC - En attente (éléments non créés)');
        return;
    }

    // Mini Swiper 1 : Tube Plongeur
    if (tubeCarousel) {
        const swiperTube = new Swiper('.mini-swiper-tube', {
            loop: true,
            autoplay: {
                delay: 2000, // 2 secondes par image
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.mini-swiper-tube .swiper-pagination',
                clickable: true,
            },
            speed: 800,
            on: {
                init: function() {
                    console.log('✅ Mini-carousel Tube initialisé');
                }
            }
        });
    }

    // Mini Swiper 2 : Niveau de Jus
    if (niveauCarousel) {
        const swiperNiveau = new Swiper('.mini-swiper-niveau', {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.mini-swiper-niveau .swiper-pagination',
                clickable: true,
            },
            speed: 800,
            on: {
                init: function() {
                    console.log('✅ Mini-carousel Niveau initialisé');
                }
            }
        });
    }

    // Mini Swiper 3 : Bulles
    if (bullesCarousel) {
        const swiperBulles = new Swiper('.mini-swiper-bulles', {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.mini-swiper-bulles .swiper-pagination',
                clickable: true,
            },
            speed: 800,
            on: {
                init: function() {
                    console.log('✅ Mini-carousel Bulles initialisé');
                }
            }
        });
    }

    // Pause au hover (optionnel)
    document.querySelectorAll('.detection-block-carousel').forEach(block => {
        block.addEventListener('mouseenter', function() {
            const swiperEl = this.querySelector('.swiper');
            if (swiperEl && swiperEl.swiper && swiperEl.swiper.autoplay) {
                swiperEl.swiper.autoplay.stop();
            }
        });

        block.addEventListener('mouseleave', function() {
            const swiperEl = this.querySelector('.swiper');
            if (swiperEl && swiperEl.swiper && swiperEl.swiper.autoplay) {
                swiperEl.swiper.autoplay.start();
            }
        });
    });
}

// ========================================
// FONCTIONS UTILITAIRES CAROUSEL
// ========================================

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

// Mini Swiper Tube Plongeur
const miniSwiperTube = new Swiper('.mini-swiper-tube', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.mini-swiper-tube .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    loop: true,
});

// Mini Swiper Niveau
const miniSwiperNiveau = new Swiper('.mini-swiper-niveau', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.mini-swiper-niveau .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    loop: true,
});

// Mini Swiper Bulles
const miniSwiperBulles = new Swiper('.mini-swiper-bulles', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.mini-swiper-bulles .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    loop: true,
});

// Initialiser lazy loading si souhaité
// lazyLoadCarouselImages();
