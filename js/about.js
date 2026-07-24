(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(element) {
        const original = element.textContent;
        const target = Number.parseInt(original.replace(/[^\d]/g, ''), 10);
        if (!Number.isFinite(target) || prefersReducedMotion) return;

        const suffix = original.includes('+') ? '+' : original.includes('%') ? '%' : '';
        const duration = 900;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            element.textContent = `${Math.round(target * progress)}${suffix}`;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    function initAbout() {
        const aboutContent = document.querySelector('.about-content');
        if (!aboutContent || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.3 });

        observer.observe(aboutContent);
    }

    document.addEventListener('DOMContentLoaded', initAbout, { once: true });
})();
