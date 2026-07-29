/* ========================================
   JOÃO PEDRO R. ALVES ADVOCACIA — script.js
   Carregado com defer — não bloqueia renderização
   ======================================== */

(() => {
    'use strict';

    // ===== SMOOTH SCROLL PARA ÂNCORAS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80; // altura do header fixo
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Foco para acessibilidade
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
                target.removeAttribute('tabindex');
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    const handleHeaderScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(10, 25, 47, 0.99)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 25, 47, 0.98)';
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ===== LAZY LOAD PARA IMAGENS (se houver no futuro) =====
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading suportado
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback com IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== PERFORMANCE: PREFETCH EM HOVER NOS LINKS INTERNOS =====
    const prefetchLinks = new Set();
    
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && !prefetchLinks.has(href) && !href.startsWith('#')) {
                const linkEl = document.createElement('link');
                linkEl.rel = 'prefetch';
                linkEl.href = href;
                document.head.appendChild(linkEl);
                prefetchLinks.add(href);
            }
        }, { passive: true, once: true });
    });

    // ===== ANALYTICS HELPER (GA4) =====
    // Descomente e configure seu GA_MEASUREMENT_ID
    /*
    window.gtag = window.gtag || function() {
        (window.dataLayer = window.dataLayer || []).push(arguments);
    };
    
    function trackEvent(eventName, params = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        }
    }
    
    // Tracking de cliques no WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('whatsapp_click', {
                location: link.closest('header') ? 'header' :
                         link.closest('.hero') ? 'hero' : 'footer'
            });
        });
    });
    */

    // ===== CONSOLE INFO (apenas desenvolvimento) =====
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c🏛️ João Pedro R. Alves Advocacia', 'color: #D4AF37; font-size: 14px; font-weight: bold;');
        console.log('%cSite em conformidade com Provimento 205/2021 OAB', 'color: #9CA3AF; font-size: 12px;');
        console.log('%cCaráter estritamente informativo', 'color: #9CA3AF; font-size: 12px;');
    }
})();