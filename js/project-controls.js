function projectMatches(categories, searchableText, activeFilter = 'all', query = '') {
    const normalizedCategories = String(categories).toLowerCase().split(/\s+/).filter(Boolean);
    const normalizedQuery = String(query).trim().toLowerCase();
    const matchesFilter = activeFilter === 'all' || normalizedCategories.includes(activeFilter.toLowerCase());
    const matchesQuery = !normalizedQuery || String(searchableText).toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
}

const PROJECT_PREVIEWS = {
    'Trattoria Bella Italia': {
        facts: [['Role', 'Frontend engineering'], ['Scope', 'Menu to checkout'], ['Focus', 'Responsive interaction']],
    },
    'VehicleOS - Vehicle Management Platform': {
        accent: '#4f8cff',
        icon: 'fa-car-side',
        facts: [['Role', 'Full-stack engineering'], ['Architecture', 'React + Spring Boot'], ['Delivery', 'Dockerized services']],
        views: [
            { label: 'Garage', title: 'Vehicle overview', summary: 'A single view of ownership, mileage, and vehicle health.', stats: [['Records', 'Centralized'], ['Health', 'Tracked'], ['History', 'Searchable']] },
            { label: 'Service', title: 'Service history', summary: 'Maintenance records remain searchable and tied to the correct vehicle.', stats: [['Maintenance', 'Logged'], ['Reminders', 'Structured'], ['Costs', 'Recorded']] },
            { label: 'Security', title: 'Account controls', summary: 'JWT authentication and role-aware actions protect vehicle records.', stats: [['Auth', 'JWT'], ['Access', 'Role-based'], ['Inputs', 'Validated']] },
        ],
    },
    'Vitalis - Health & Wellness Tracker': {
        accent: '#53d6a4',
        icon: 'fa-heart-pulse',
        facts: [['Role', 'Android engineering'], ['Architecture', 'MVVM + Room'], ['Privacy', 'Offline-first']],
        views: [
            { label: 'Today', title: 'Daily wellness', summary: 'Meals, mood, hydration, and journal prompts stay together.', stats: [['Meals', 'Planned'], ['Mood', 'Logged'], ['Hydration', 'Tracked']] },
            { label: 'Meals', title: 'Meal planning', summary: 'Plan recipes and turn ingredients into an offline grocery list.', stats: [['Recipes', 'Organized'], ['Schedule', 'Weekly'], ['Groceries', 'Generated']] },
            { label: 'Journal', title: 'Private journal', summary: 'Local-first entries keep personal wellness data on the device.', stats: [['Entries', 'Local'], ['Storage', 'Room DB'], ['Cloud sync', 'Not required']] },
        ],
    },
    'BMW E36 Custom Control Systems': {
        accent: '#f6b73c',
        icon: 'fa-gauge-high',
        facts: [['Role', 'Embedded engineering'], ['Hardware', 'Arduino + Raspberry Pi'], ['Control', 'Sensor-driven']],
        views: [
            { label: 'Telemetry', title: 'Live telemetry', summary: 'Wheel speed and engine signals feed the control loop.', stats: [['Inputs', 'Wheel speed'], ['Signals', 'Engine data'], ['Runtime', 'Raspberry Pi']] },
            { label: 'Cooling', title: 'PWM fan control', summary: 'Fan output responds to temperature instead of a fixed on/off threshold.', stats: [['Control', 'PWM'], ['Input', 'Temperature'], ['Fallback', 'Fail-safe']] },
            { label: 'Traction', title: 'PID traction control', summary: 'Wheel-speed deltas drive measured intervention on real hardware.', stats: [['Algorithm', 'PID'], ['Feedback', 'Wheel delta'], ['Target', 'Traction']] },
        ],
    },
    'BemEstar - Gym Management SaaS': {
        accent: '#52b788',
        icon: 'fa-dumbbell',
        facts: [['Role', 'Full-stack engineering'], ['Architecture', 'Multi-tenant'], ['Release', 'Pilot scope']],
        views: [
            { label: 'Dashboard', title: 'Gym operations', summary: 'Membership, attendance, and revenue signals in one workspace.', stats: [['Members', 'Managed'], ['Attendance', 'Tracked'], ['Billing', 'Integrated']] },
            { label: 'Classes', title: 'Class booking', summary: 'Trainers manage capacity while members reserve available sessions.', stats: [['Schedules', 'Published'], ['Capacity', 'Enforced'], ['Bookings', 'Self-service']] },
            { label: 'Access', title: 'QR check-in', summary: 'Role-aware QR entry connects each visit to the correct tenant.', stats: [['Entry', 'QR codes'], ['Roles', 'Four levels'], ['Tenants', 'Isolated']] },
        ],
    },
    'Insurex - Insurance Asset Protection System': {
        accent: '#29d9c2',
        icon: 'fa-shield-halved',
        facts: [['Role', 'End-to-end delivery'], ['Architecture', 'Three-tier .NET'], ['Context', 'Client project']],
        views: [
            { label: 'Portfolio', title: 'Protected assets', summary: 'Policies, assets, and coverage status are visible by role.', stats: [['Assets', 'Mapped'], ['Coverage', 'Traceable'], ['Access', 'Role-based']] },
            { label: 'Policies', title: 'Policy workflow', summary: 'Insurers and financiers work from dedicated operational views.', stats: [['Policies', 'Managed'], ['Reviews', 'Workflow-based'], ['Search', 'Cross-module']] },
            { label: 'Reports', title: 'Business reporting', summary: 'FusionCharts reporting surfaces portfolio trends without exposing raw records.', stats: [['Charts', 'FusionCharts'], ['Roles', 'Three portals'], ['Data', 'Encrypted']] },
        ],
    },
};

function projectPreviewForTitle(title) {
    return PROJECT_PREVIEWS[String(title).trim()] || null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectMatches, projectPreviewForTitle };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') (() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initScrollToTop() {
        const button = document.getElementById('scrollTopBtn');
        if (!button) return;

        const updateVisibility = () => button.classList.toggle('visible', window.scrollY > 400);
        let frameRequested = false;
        const scheduleVisibilityUpdate = () => {
            if (frameRequested) return;
            frameRequested = true;
            requestAnimationFrame(() => {
                frameRequested = false;
                updateVisibility();
            });
        };

        window.addEventListener('scroll', scheduleVisibilityUpdate, { passive: true });
        updateVisibility();
        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    function initFilters(containerSelector, cardSelector) {
        const buttons = Array.from(document.querySelectorAll(`${containerSelector} .filter-btn`));
        const cards = Array.from(document.querySelectorAll(cardSelector)).filter(
            (card) => card.dataset.archived !== 'true' && !card.closest('[data-archived="true"]')
        );
        if (!buttons.length || !cards.length) return;

        cards.forEach((card) => {
            card.addEventListener('animationend', () => card.classList.remove('filter-reveal'));
        });

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
                    if (isVisible && !prefersReducedMotion) {
                        card.classList.add('is-revealed');
                        card.classList.remove('filter-reveal');
                        requestAnimationFrame(() => card.classList.add('filter-reveal'));
                    }
                });
            });
        });
    }

    function getPublicProjectCards() {
        return Array.from(document.querySelectorAll('#projects .project-card')).filter(
            (card) => card.dataset.archived !== 'true' && !card.closest('[data-archived="true"]')
        );
    }

    function setProjectDetails(card, expanded) {
        const button = card.querySelector('.project-details-toggle');
        const region = card.querySelector('.project-extra');
        if (!button || !region) return;

        button.setAttribute('aria-expanded', String(expanded));
        button.querySelector('.project-details-label').textContent = expanded ? 'Less details' : 'More details';
        button.setAttribute(
            'aria-label',
            `${expanded ? 'Hide' : 'Show'} more details about ${button.dataset.projectTitle}`
        );
        region.hidden = !expanded;
        card.classList.toggle('is-open', expanded);
    }

    function enhanceProjectCards(cards) {
        cards.forEach((card, index) => {
            const content = card.querySelector('.project-content');
            const title = content?.querySelector('h3')?.textContent.trim() || `Project ${index + 1}`;
            const detailNodes = content
                ? Array.from(content.children).filter((node) => node.matches(
                    '.project-tech, .project-impact, .project-links, .project-links-compact, .project-progress'
                ))
                : [];
            if (!content || !detailNodes.length || content.querySelector('.project-details-toggle')) return;

            const regionId = `project-details-${index + 1}`;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'project-details-toggle';
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', regionId);
            button.setAttribute('aria-label', `Show more details about ${title}`);
            button.dataset.projectTitle = title;
            button.innerHTML = '<span class="project-details-label">More details</span><i class="fas fa-chevron-down" aria-hidden="true"></i>';

            const region = document.createElement('div');
            region.id = regionId;
            region.className = 'project-extra';
            region.hidden = true;
            detailNodes[0].before(button, region);
            detailNodes.forEach((node) => region.appendChild(node));

            button.addEventListener('click', () => {
                setProjectDetails(card, button.getAttribute('aria-expanded') !== 'true');
            });
        });
    }

    function createPreviewDashboard(preview) {
        const dashboard = document.createElement('div');
        dashboard.className = 'project-demo';
        dashboard.style.setProperty('--preview-accent', preview.accent);

        const topbar = document.createElement('div');
        topbar.className = 'project-demo-topbar';
        topbar.innerHTML = '<span class="project-demo-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>Guided feature view</span>';

        const navigation = document.createElement('div');
        navigation.className = 'project-demo-tabs';
        navigation.setAttribute('role', 'tablist');
        navigation.setAttribute('aria-label', 'Preview screens');

        const panel = document.createElement('div');
        panel.className = 'project-demo-panel';
        panel.setAttribute('role', 'tabpanel');
        panel.id = 'project-demo-panel';

        const renderView = (view, selectedButton) => {
            navigation.querySelectorAll('button').forEach((button) => {
                const selected = button === selectedButton;
                button.classList.toggle('active', selected);
                button.setAttribute('aria-selected', String(selected));
                button.tabIndex = selected ? 0 : -1;
            });
            panel.setAttribute('aria-labelledby', selectedButton.id);

            const icon = document.createElement('i');
            icon.className = `fas ${preview.icon}`;
            icon.setAttribute('aria-hidden', 'true');
            const heading = document.createElement('h3');
            heading.textContent = view.title;
            const summary = document.createElement('p');
            summary.textContent = view.summary;
            const stats = document.createElement('div');
            stats.className = 'project-demo-stats';
            view.stats.forEach(([label, value]) => {
                const stat = document.createElement('div');
                const valueElement = document.createElement('strong');
                const labelElement = document.createElement('span');
                valueElement.textContent = value;
                labelElement.textContent = label;
                stat.append(valueElement, labelElement);
                stats.appendChild(stat);
            });
            panel.replaceChildren(icon, heading, summary, stats);
            if (!prefersReducedMotion && typeof panel.animate === 'function') {
                panel.animate(
                    [
                        { opacity: 0.35, transform: 'translate3d(0, 8px, 0)' },
                        { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                    ],
                    { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)' }
                );
            }
        };

        preview.views.forEach((view, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('role', 'tab');
            button.id = `project-demo-tab-${index + 1}`;
            button.setAttribute('aria-controls', panel.id);
            button.textContent = view.label;
            button.addEventListener('click', () => renderView(view, button));
            button.addEventListener('keydown', (event) => {
                const buttons = Array.from(navigation.querySelectorAll('button'));
                let target;
                if (event.key === 'Home') target = buttons[0];
                else if (event.key === 'End') target = buttons.at(-1);
                else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    const direction = event.key === 'ArrowRight' ? 1 : -1;
                    target = buttons[(buttons.indexOf(button) + direction + buttons.length) % buttons.length];
                } else return;
                event.preventDefault();
                target.click();
                target.focus();
            });
            navigation.appendChild(button);
            if (index === 0) renderView(view, button);
        });

        dashboard.append(topbar, navigation, panel);
        return dashboard;
    }

    function initProjectPreviews(cards) {
        const dialog = document.getElementById('project-preview-dialog');
        const closeButton = dialog?.querySelector('.project-preview-close');
        const visual = document.getElementById('project-preview-visual');
        const kind = document.getElementById('project-preview-kind');
        const title = document.getElementById('project-preview-title');
        const date = document.getElementById('project-preview-date');
        const description = document.getElementById('project-preview-description');
        const facts = document.getElementById('project-preview-facts');
        const tech = document.getElementById('project-preview-tech');
        const note = document.getElementById('project-preview-note');
        const links = document.getElementById('project-preview-links');
        if (!dialog || !closeButton || !visual || !kind || !title || !date || !description || !facts || !tech || !note || !links) return;

        let activeTrigger = null;

        const closeDialog = () => {
            if (typeof dialog.close === 'function') dialog.close();
            else dialog.removeAttribute('open');
            document.body.classList.remove('dialog-open');
        };

        closeButton.addEventListener('click', closeDialog);
        dialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeDialog();
                return;
            }

            if (event.key !== 'Tab') return;
            const focusable = Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
                .filter((element) => !element.hidden);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable.at(-1);

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
        dialog.addEventListener('cancel', (event) => {
            event.preventDefault();
            closeDialog();
        });
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) closeDialog();
        });
        dialog.addEventListener('close', () => {
            document.body.classList.remove('dialog-open');
            activeTrigger?.focus();
        });

        cards.forEach((card) => {
            const imageArea = card.querySelector('.project-image');
            const cardTitle = card.querySelector('.project-content h3')?.textContent.trim();
            if (!imageArea || !cardTitle) return;

            const trigger = document.createElement('button');
            trigger.type = 'button';
            trigger.className = 'project-link project-preview-trigger';
            trigger.setAttribute('aria-label', `Open ${cardTitle} preview`);
            trigger.innerHTML = '<i class="fas fa-expand" aria-hidden="true"></i> Preview';
            imageArea.appendChild(trigger);

            trigger.addEventListener('click', () => {
                const screenshot = imageArea.querySelector('img');
                const preview = projectPreviewForTitle(cardTitle);
                const cardContent = card.querySelector('.project-content');
                activeTrigger = trigger;

                title.textContent = cardTitle;
                date.textContent = cardContent?.querySelector('.project-date')?.textContent.trim() || '';
                description.textContent = cardContent?.querySelector(':scope > p')?.textContent.trim() || '';
                facts.replaceChildren();
                (preview?.facts || []).forEach(([label, value]) => {
                    const term = document.createElement('dt');
                    const detail = document.createElement('dd');
                    term.textContent = label;
                    detail.textContent = value;
                    facts.append(term, detail);
                });
                tech.replaceChildren(...Array.from(cardContent?.querySelectorAll('.tech-tag') || []).map((tag) => tag.cloneNode(true)));
                links.replaceChildren();

                const seenLinks = new Set();
                card.querySelectorAll('a[href]').forEach((anchor) => {
                    if (seenLinks.has(anchor.href)) return;
                    seenLinks.add(anchor.href);
                    const link = anchor.cloneNode(true);
                    link.className = 'btn btn-secondary';
                    link.setAttribute('rel', 'noopener noreferrer');
                    links.appendChild(link);
                });

                if (screenshot) {
                    const figure = document.createElement('figure');
                    const image = screenshot.cloneNode(true);
                    const caption = document.createElement('figcaption');
                    image.removeAttribute('loading');
                    caption.textContent = 'Project screenshot';
                    figure.append(image, caption);
                    visual.replaceChildren(figure);
                    kind.textContent = 'Project screenshot';
                    note.textContent = 'Original project screenshot. Open the repository for implementation details.';
                } else if (preview) {
                    visual.replaceChildren(createPreviewDashboard(preview));
                    kind.textContent = 'Feature walkthrough';
                    note.textContent = 'Interactive walkthrough based on implemented capabilities. It is not a live environment and does not display production data.';
                } else {
                    visual.replaceChildren(imageArea.querySelector('.image-placeholder')?.cloneNode(true) || document.createTextNode(cardTitle));
                    kind.textContent = 'Project preview';
                    note.textContent = 'Visual project summary. A live demo is not publicly available.';
                }

                if (!links.children.length) {
                    const unavailable = document.createElement('span');
                    unavailable.className = 'project-link-unavailable';
                    unavailable.textContent = 'Public repository or live demo not available';
                    links.appendChild(unavailable);
                }

                if (typeof dialog.showModal === 'function') dialog.showModal();
                else dialog.setAttribute('open', '');
                document.body.classList.add('dialog-open');
                closeButton.focus();
            });
        });
    }

    function initProjectExplorer() {
        const section = document.getElementById('projects');
        const searchInput = document.getElementById('project-search-input');
        const clearButton = document.getElementById('project-search-clear');
        const resetButton = document.getElementById('project-empty-reset');
        const resultCount = document.getElementById('project-results-count');
        const emptyState = document.getElementById('project-empty-state');
        const filterButtons = Array.from(document.querySelectorAll('.projects-filter .filter-btn'));
        const cards = getPublicProjectCards();
        if (!section || !searchInput || !filterButtons.length || !cards.length) return;

        section.classList.add('projects-enhanced');
        enhanceProjectCards(cards);
        initProjectPreviews(cards);
        let activeFilter = 'all';

        const applyProjectView = () => {
            const query = searchInput.value;
            let visibleCount = 0;

            cards.forEach((card) => {
                const isVisible = projectMatches(
                    card.dataset.category,
                    card.textContent,
                    activeFilter,
                    query
                );
                card.hidden = !isVisible;
                card.toggleAttribute('aria-hidden', !isVisible);
                if (isVisible) visibleCount += 1;
            });

            section.querySelectorAll('.projects-section:not([data-archived="true"])').forEach((projectSection) => {
                const publicCards = Array.from(projectSection.querySelectorAll('.project-card')).filter(
                    (card) => card.dataset.archived !== 'true'
                );
                if (publicCards.length) projectSection.hidden = !publicCards.some((card) => !card.hidden);
            });

            const projectLabel = visibleCount === 1 ? 'project' : 'projects';
            resultCount.textContent = `${visibleCount} ${projectLabel} found`;
            emptyState.hidden = visibleCount !== 0;
            clearButton.hidden = !query;
        };

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                activeFilter = button.dataset.filter || 'all';
                filterButtons.forEach((item) => {
                    const isSelected = item === button;
                    item.classList.toggle('active', isSelected);
                    item.setAttribute('aria-pressed', String(isSelected));
                });
                applyProjectView();
            });
        });

        const resetExplorer = () => {
            searchInput.value = '';
            activeFilter = 'all';
            filterButtons.forEach((button) => {
                const isSelected = button.dataset.filter === 'all';
                button.classList.toggle('active', isSelected);
                button.setAttribute('aria-pressed', String(isSelected));
            });
            applyProjectView();
        };

        searchInput.addEventListener('input', applyProjectView);
        searchInput.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape' || !searchInput.value) return;
            resetExplorer();
        });
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            applyProjectView();
            searchInput.focus();
        });
        resetButton.addEventListener('click', () => {
            resetExplorer();
            searchInput.focus();
        });

        applyProjectView();
    }

    function initProjectControls() {
        const year = document.getElementById('current-year');
        if (year) year.textContent = new Date().getFullYear();
        initScrollToTop();
        initProjectExplorer();
        initFilters('.certifications-filter', '.certification-card');
    }

    document.addEventListener('DOMContentLoaded', initProjectControls, { once: true });
})();
