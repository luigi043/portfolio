(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function prefersReducedMotion() {
        return reducedMotionQuery.matches;
    }

    function animateCounter(element) {
        if (element.dataset.counted === 'true') return;
        const original = element.textContent;
        const target = Number.parseInt(original.replace(/[^\d]/g, ''), 10);
        if (!Number.isFinite(target) || prefersReducedMotion()) return;

        const suffix = original.includes('+') ? '+' : original.includes('%') ? '%' : '';
        const duration = 900;
        const start = performance.now();
        element.dataset.counted = 'true';

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            element.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    function revealDetails(aboutContent) {
        aboutContent.querySelectorAll('.stat-number').forEach(animateCounter);

        [
            aboutContent.querySelectorAll('.tech-badge'),
            aboutContent.querySelectorAll('.sidebar-value'),
            aboutContent.querySelectorAll('.meta-item'),
        ].forEach((items) => {
            items.forEach((item, index) => {
                item.style.setProperty('--motion-item-delay', `${prefersReducedMotion() ? 0 : Math.min(index, 8) * 65}ms`);
                item.classList.add('is-in');
            });
        });
    }

    function initAbout() {
        const aboutContent = document.querySelector('.about-content');
        if (!aboutContent) return;

        if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
            revealDetails(aboutContent);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                revealDetails(entry.target);
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

        observer.observe(aboutContent);
    }

    document.addEventListener('DOMContentLoaded', initAbout, { once: true });
})();
