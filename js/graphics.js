(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initGraphicsPage() {
        const menuButton = document.querySelector('.mobile-menu-btn');
        const navigation = document.querySelector('.nav-links');
        const slides = Array.from(document.querySelectorAll('.slide'));
        const dots = Array.from(document.querySelectorAll('.dot'));
        const previousButton = document.querySelector('.slider-btn.prev');
        const nextButton = document.querySelector('.slider-btn.next');
        let currentSlide = 0;
        let intervalId;

        const closeMenu = () => {
            navigation?.classList.remove('active');
            menuButton?.setAttribute('aria-expanded', 'false');
            menuButton?.setAttribute('aria-label', 'Open navigation menu');
        };

        const showSlide = (index) => {
            if (!slides.length || !dots.length) return;
            currentSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
            dots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === currentSlide;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        };

        const restartAutoplay = () => {
            if (prefersReducedMotion || slides.length < 2) return;
            window.clearInterval(intervalId);
            intervalId = window.setInterval(() => showSlide(currentSlide + 1), 5000);
        };

        previousButton?.addEventListener('click', () => { showSlide(currentSlide - 1); restartAutoplay(); });
        nextButton?.addEventListener('click', () => { showSlide(currentSlide + 1); restartAutoplay(); });
        dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); restartAutoplay(); }));

        menuButton?.addEventListener('click', () => {
            const isOpen = navigation?.classList.toggle('active') ?? false;
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
                closeMenu();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav-container')) closeMenu();
        });

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            document.querySelectorAll('.audio-card, .video-project, .image-project, .project-phase, .showcase-container').forEach((card) => observer.observe(card));
        }

        showSlide(0);
        restartAutoplay();
    }

    document.addEventListener('DOMContentLoaded', initGraphicsPage, { once: true });
})();
