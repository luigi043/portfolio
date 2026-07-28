(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initGraphicsPage() {
        const menuButton = document.querySelector('.hamburger');
        const navigation = document.querySelector('.nav-menu');
        const scrollTopButton = document.getElementById('scrollTopBtn');
        const year = document.getElementById('current-year');
        const slides = Array.from(document.querySelectorAll('.slide'));
        const dots = Array.from(document.querySelectorAll('.dot'));
        const slider = document.querySelector('.showcase-slider');
        const previousButton = document.querySelector('.slider-btn.prev');
        const nextButton = document.querySelector('.slider-btn.next');
        const header = document.querySelector('.header');
        const pageSections = Array.from(document.querySelectorAll('main section[id]'));
        const sectionLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
        let currentSlide = 0;
        let intervalId;
        let isPaused = false;
        let pauseButton;
        let scrollFrameRequested = false;

        if (year) year.textContent = new Date().getFullYear();

        const updateScrollState = () => {
            scrollFrameRequested = false;
            const scrollPosition = window.scrollY;
            header?.classList.toggle('scrolled', scrollPosition > 24);
            scrollTopButton?.classList.toggle('visible', scrollPosition > 400);

            let activeSection = '';
            pageSections.forEach((section) => {
                if (scrollPosition >= section.offsetTop - 144) activeSection = section.id;
            });

            sectionLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${activeSection}`;
                link.classList.toggle('active', isActive);
                if (isActive) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        };

        const scheduleScrollState = () => {
            if (scrollFrameRequested) return;
            scrollFrameRequested = true;
            requestAnimationFrame(updateScrollState);
        };

        const closeMenu = ({ restoreFocus = false } = {}) => {
            navigation?.classList.remove('active');
            menuButton?.classList.remove('active');
            menuButton?.setAttribute('aria-expanded', 'false');
            menuButton?.setAttribute('aria-label', 'Open navigation menu');
            document.body.style.overflow = '';
            if (restoreFocus) menuButton?.focus();
        };

        const showSlide = (index) => {
            if (!slides.length) return;
            currentSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === currentSlide;
                slide.classList.toggle('active', isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
                slide.toggleAttribute('inert', !isActive);
            });
            dots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === currentSlide;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        };

        const restartAutoplay = () => {
            window.clearInterval(intervalId);
            if (prefersReducedMotion || isPaused || document.hidden || slides.length < 2) return;
            intervalId = window.setInterval(() => showSlide(currentSlide + 1), 5000);
        };

        const setPaused = (paused) => {
            isPaused = paused;
            pauseButton?.setAttribute('aria-pressed', String(paused));
            if (pauseButton) pauseButton.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
            restartAutoplay();
        };

        if (slider && slides.length > 1) {
            slider.setAttribute('role', 'region');
            slider.setAttribute('aria-roledescription', 'carousel');
            slider.setAttribute('aria-label', 'BMW M Series visual project');

            pauseButton = document.createElement('button');
            pauseButton.type = 'button';
            pauseButton.className = 'slider-pause';
            pauseButton.textContent = 'Pause slideshow';
            pauseButton.setAttribute('aria-pressed', 'false');
            pauseButton.addEventListener('click', () => setPaused(!isPaused));
            slider.appendChild(pauseButton);

            slider.addEventListener('mouseenter', () => {
                window.clearInterval(intervalId);
            });
            slider.addEventListener('mouseleave', restartAutoplay);
            slider.addEventListener('focusin', () => {
                window.clearInterval(intervalId);
            });
            slider.addEventListener('focusout', (event) => {
                if (!slider.contains(event.relatedTarget)) restartAutoplay();
            });
            document.addEventListener('visibilitychange', restartAutoplay);
        }

        previousButton?.addEventListener('click', () => { showSlide(currentSlide - 1); restartAutoplay(); });
        nextButton?.addEventListener('click', () => { showSlide(currentSlide + 1); restartAutoplay(); });
        dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); restartAutoplay(); }));

        menuButton?.addEventListener('click', () => {
            const isOpen = navigation?.classList.toggle('active') ?? false;
            menuButton.classList.toggle('active', isOpen);
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            if (isOpen) navigation?.querySelector('a')?.focus({ preventScroll: true });
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
            if (event.key === 'Escape') closeMenu({ restoreFocus: true });
        });
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav')) closeMenu();
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        }, { passive: true });

        window.addEventListener('scroll', scheduleScrollState, { passive: true });

        if (scrollTopButton) {
            scrollTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });
        }

        const revealTargets = document.querySelectorAll('.audio-card, .video-project, .image-project, .project-phase, .showcase-container');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            revealTargets.forEach((card) => observer.observe(card));
        } else {
            revealTargets.forEach((card) => card.classList.add('visible'));
        }

        showSlide(0);
        updateScrollState();
        restartAutoplay();
    }

    document.addEventListener('DOMContentLoaded', initGraphicsPage, { once: true });
})();
