(() => {
    'use strict';

    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    function syncMotionPreference() {
        prefersReducedMotion = reducedMotionQuery.matches;
        root.classList.toggle('prefers-reduced-motion', prefersReducedMotion);

        if (prefersReducedMotion) {
            document.querySelectorAll('.motion-reveal').forEach((element) => {
                element.classList.add('is-revealed');
            });
        }
    }

    function isArchivedOrHidden(element) {
        return Boolean(element.hidden || element.closest('[hidden], [data-archived="true"]'));
    }

    function revealElement(element) {
        element.classList.add('is-revealed');
    }

    function addRevealTargets(selector, delayOffset = 0) {
        return Array.from(document.querySelectorAll(selector))
            .filter((element) => !isArchivedOrHidden(element))
            .map((element, index) => {
                element.classList.add('motion-reveal');
                element.dataset.motionDelay = String(Math.min(delayOffset + (index % 3), 3));
                return element;
            });
    }

    function initMotionSystem() {
        root.classList.add('has-motion');
        syncMotionPreference();

        const heroTargets = [
            document.querySelector('.hero-image'),
            document.querySelector('.hero-text .intro'),
            document.querySelector('.hero-text .description'),
            document.querySelector('.hero-actions'),
            document.querySelector('.hero-text > .social-links'),
        ].filter(Boolean);

        heroTargets.forEach((element, index) => {
            element.classList.add('motion-reveal', index === 0 ? 'motion-reveal--scale' : 'motion-reveal--up');
            element.dataset.motionDelay = String(index);
        });

        const targets = [
            ...heroTargets,
            ...addRevealTargets('.section-header'),
            ...addRevealTargets('.about-content'),
            ...addRevealTargets('.timeline-item'),
            ...addRevealTargets('.job-card, .compact-card'),
            ...addRevealTargets('.skill-category-card'),
            ...addRevealTargets('#projects .project-card'),
            ...addRevealTargets('.certification-card'),
            ...addRevealTargets('#contact .contact-info, #contact .contact-form'),
        ];

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            targets.forEach(revealElement);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                revealElement(entry.target);
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.08,
        });

        targets.forEach((target) => observer.observe(target));
    }

    function initHeader() {
        const header = document.querySelector('.header');
        const progressBar = document.querySelector('.scroll-progress span');
        const sections = Array.from(document.querySelectorAll('main section[id]'));
        const links = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
        if (!header || !sections.length || !links.length) return;

        let frameRequested = false;

        const update = () => {
            frameRequested = false;
            const scrollPosition = window.scrollY;
            header.classList.toggle('scrolled', scrollPosition > 24);
            const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollableDistance > 0 ? Math.min(scrollPosition / scrollableDistance, 1) : 0;
            if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

            let activeSection = '';
            sections.forEach((section) => {
                if (scrollPosition >= section.offsetTop - 144) activeSection = section.id;
            });

            links.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${activeSection}`;
                link.classList.toggle('active', isActive);
                if (isActive) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        };

        const requestUpdate = () => {
            if (frameRequested) return;
            frameRequested = true;
            requestAnimationFrame(update);
        };

        window.addEventListener('scroll', requestUpdate, { passive: true });
        update();
    }

    function initMobileMenu() {
        const menuButton = document.querySelector('.hamburger');
        const menu = document.querySelector('.nav-menu');
        if (!menuButton || !menu) return;

        let previousOverflow = '';

        const closeMenu = ({ restoreFocus = false } = {}) => {
            if (!menu.classList.contains('active')) return;
            menu.classList.remove('active');
            menuButton.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open navigation menu');
            document.body.style.overflow = previousOverflow;
            if (restoreFocus) menuButton.focus();
        };

        const openMenu = () => {
            previousOverflow = document.body.style.overflow;
            menu.classList.add('active');
            menuButton.classList.add('active');
            menuButton.setAttribute('aria-expanded', 'true');
            menuButton.setAttribute('aria-label', 'Close navigation menu');
            document.body.style.overflow = 'hidden';
            menu.querySelector('a')?.focus({ preventScroll: true });
        };

        menuButton.addEventListener('click', () => {
            if (menu.classList.contains('active')) closeMenu({ restoreFocus: true });
            else openMenu();
        });

        menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu({ restoreFocus: true });
        });

        document.addEventListener('pointerdown', (event) => {
            if (!menu.classList.contains('active')) return;
            if (!event.target.closest('.nav')) closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        }, { passive: true });
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const selector = anchor.getAttribute('href');
                if (!selector || selector === '#') return;

                const target = document.querySelector(selector);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start',
                });
            });
        });
    }

    function initExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            const relValues = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
            relValues.add('noopener');
            relValues.add('noreferrer');
            link.setAttribute('rel', Array.from(relValues).join(' '));
        });
    }

    function initCompactCards() {
        const cards = document.querySelectorAll('.job-card, .compact-card');
        if (!cards.length) return;

        cards.forEach((card, index) => {
            const body = card.querySelector('.job-card-body, .compact-body');
            const title = card.querySelector('.job-role, .compact-title')?.textContent.trim() || `Card ${index + 1}`;
            if (!body) return;

            const bodyId = `expandable-card-${index + 1}`;
            body.id = bodyId;
            card.removeAttribute('tabindex');
            card.removeAttribute('aria-expanded');
            card.classList.add('is-enhanced');

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'expand-hint card-expand-toggle';
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', bodyId);
            button.setAttribute('aria-label', `Show details for ${title}`);
            button.innerHTML = '<i class="fas fa-plus" aria-hidden="true"></i>';
            card.querySelector('.expand-hint')?.replaceWith(button);

            const toggle = () => {
                const isOpen = card.classList.toggle('is-open');
                button.setAttribute('aria-expanded', String(isOpen));
                button.setAttribute('aria-label', `${isOpen ? 'Hide' : 'Show'} details for ${title}`);
            };

            button.addEventListener('click', toggle);
        });
    }

    function initCompactFilters() {
        document.querySelectorAll('.compact-filters').forEach((bar) => {
            const grid = bar.parentElement?.querySelector('.compact-grid');
            const buttons = Array.from(bar.querySelectorAll('.compact-chip'));
            const cards = grid ? Array.from(grid.querySelectorAll('.compact-card')) : [];
            if (!buttons.length || !cards.length) return;
            bar.setAttribute('role', 'group');
            if (!bar.hasAttribute('aria-label')) bar.setAttribute('aria-label', 'Filter cards');

            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    const filter = button.dataset.filter;
                    buttons.forEach((item) => {
                        const isActive = item === button;
                        item.classList.toggle('is-active', isActive);
                        item.setAttribute('aria-pressed', String(isActive));
                    });

                    cards.forEach((card) => {
                        const categories = card.dataset.category?.split(/\s+/) ?? [];
                        const isVisible = filter === 'all' || categories.includes(filter);
                        card.hidden = !isVisible;
                        card.toggleAttribute('aria-hidden', !isVisible);
                    });
                });
            });
        });
    }

    function initContactForm() {
        const form = document.querySelector('.contact-form');
        const status = document.getElementById('formStatus');
        const submitButton = form?.querySelector('button[type="submit"]');
        if (!form || !status || !submitButton || form.dataset.enhanced === 'true') return;

        form.dataset.enhanced = 'true';
        const fields = Array.from(form.querySelectorAll('input[required], textarea[required]'));

        const syncFieldValidity = (field) => {
            const error = document.getElementById(`${field.id}-error`);
            const invalid = !field.validity.valid;
            field.setAttribute('aria-invalid', String(invalid));
            if (error) error.hidden = !invalid;
            return !invalid;
        };

        fields.forEach((field) => {
            field.setAttribute('aria-invalid', 'false');
            field.addEventListener('input', () => syncFieldValidity(field));
            field.addEventListener('blur', () => syncFieldValidity(field));
        });

        const showStatus = (message, type = '') => {
            status.hidden = false;
            status.className = `form-status${type ? ` ${type}` : ''}`;
            status.setAttribute('role', type === 'error' ? 'alert' : 'status');
            status.textContent = message;
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const valid = fields.map(syncFieldValidity).every(Boolean);
            if (!valid) {
                showStatus('Please correct the highlighted fields before sending.', 'error');
                fields.find((field) => field.getAttribute('aria-invalid') === 'true')?.focus();
                return;
            }

            const originalLabel = submitButton.innerHTML;
            showStatus('Sending your message…');
            form.setAttribute('aria-busy', 'true');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });

                if (!response.ok) throw new Error('Form submission failed');

                form.reset();
                fields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
                form.querySelectorAll('.field-error').forEach((error) => {
                    error.hidden = true;
                });
                showStatus('Thanks — your message has been sent. I’ll get back to you soon.', 'success');
            } catch {
                showStatus('Your message could not be sent. Please try again or email me directly.', 'error');
            } finally {
                form.removeAttribute('aria-busy');
                submitButton.disabled = false;
                submitButton.innerHTML = originalLabel;
            }
        });
    }

    function initPortfolio() {
        initMotionSystem();
        initHeader();
        initMobileMenu();
        initSmoothScrolling();
        initExternalLinks();
        initCompactCards();
        initCompactFilters();
        initContactForm();
    }

    if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', syncMotionPreference);
    } else {
        reducedMotionQuery.addListener(syncMotionPreference);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolio, { once: true });
    } else {
        initPortfolio();
    }
})();
