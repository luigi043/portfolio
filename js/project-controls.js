(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initScrollToTop() {
        const button = document.getElementById('scrollTopBtn');
        if (!button) return;

        const updateVisibility = () => button.classList.toggle('visible', window.scrollY > 400);
        window.addEventListener('scroll', updateVisibility, { passive: true });
        updateVisibility();
        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    function initFilters(containerSelector, cardSelector) {
        const buttons = Array.from(document.querySelectorAll(`${containerSelector} .filter-btn`));
        const cards = Array.from(document.querySelectorAll(cardSelector));
        if (!buttons.length || !cards.length) return;

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                buttons.forEach((item) => {
                    const isSelected = item === button;
                    item.classList.toggle('active', isSelected);
                    item.setAttribute('aria-pressed', String(isSelected));
                });

                cards.forEach((card) => {
                    const categories = card.dataset.category?.split(/\s+/) ?? [];
                    const isVisible = filter === 'all' || categories.includes(filter);
                    card.hidden = !isVisible;
                    card.toggleAttribute('aria-hidden', !isVisible);
                    if (isVisible && !prefersReducedMotion) card.classList.add('filter-reveal');
                });
            });
        });
    }

    function initProjectControls() {
        const year = document.getElementById('current-year');
        if (year) year.textContent = new Date().getFullYear();
        initScrollToTop();
        initFilters('.projects-filter', '.project-card');
        initFilters('.certifications-filter', '.certification-card');
    }

    document.addEventListener('DOMContentLoaded', initProjectControls, { once: true });
})();
