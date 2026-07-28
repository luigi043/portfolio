// Skills Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.skill-nav-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => {
                const isActive = btn === this;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', String(isActive));
            });

            // Filter cards
            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(/\s+/);
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

    skillCards.forEach(card => {
        card.addEventListener('animationend', () => card.classList.remove('filter-reveal'));
    });

    // View More functionality
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.skill-category-card');
            const skillsList = card.querySelector('.skills-progress');
            const skillsTags = card.querySelector('.skills-tags');
            const category = card.querySelector('h3').textContent;

            // Show all skills based on category
            showAllSkills(category, card, skillsList, skillsTags);
            animateProgressBars(card);
            this.hidden = true;
            this.setAttribute('aria-expanded', 'true');
        });
    });

    // Function to show all skills (you can expand this with your actual skills data)
    function showAllSkills(category, card, skillsList, skillsTags) {
        const allSkills = {
            'Frontend Development': [
                { name: 'HTML', level: 'advanced', percentage: 95 },
                { name: 'CSS', level: 'advanced', percentage: 90 },
                { name: 'JavaScript', level: 'advanced', percentage: 92 },
                { name: 'React.js', level: 'advanced', percentage: 88 },
                { name: 'Angular', level: 'intermediate', percentage: 75 },
                { name: 'Vue.js', level: 'intermediate', percentage: 70 },
                { name: 'TypeScript', level: 'intermediate', percentage: 75 },
                { name: 'Bootstrap', level: 'advanced', percentage: 85 },
                { name: 'Sass', level: 'intermediate', percentage: 72 },
                { name: 'jQuery', level: 'intermediate', percentage: 68 }
            ],
            'Backend Development': [
                { name: 'Node.js', level: 'advanced', percentage: 90 },
                { name: 'PHP', level: 'advanced', percentage: 85 },
                { name: 'Laravel', level: 'advanced', percentage: 88 },
                { name: 'C#', level: 'advanced', percentage: 88 },
                { name: 'ASP.NET Core', level: 'advanced', percentage: 82 },
                { name: 'Java / Spring Boot', level: 'advanced', percentage: 82 },
                { name: '.NET Framework', level: 'intermediate', percentage: 78 },
                { name: 'Python', level: 'intermediate', percentage: 70 },
                { name: 'Express.js', level: 'advanced', percentage: 86 },
                { name: 'Docker', level: 'intermediate', percentage: 78 }
            ],
            'Mobile Development': [
                { name: 'Android Development', level: 'advanced', percentage: 85 },
                { name: 'Kotlin', level: 'advanced', percentage: 82 },
                { name: 'Jetpack Compose', level: 'advanced', percentage: 80 },
                { name: 'Java (Android)', level: 'intermediate', percentage: 72 },
                { name: 'Android Studio', level: 'advanced', percentage: 82 },
                { name: 'Room Database', level: 'advanced', percentage: 80 }
            ],
            'Databases': [
                { name: 'MySQL', level: 'advanced', percentage: 88 },
                { name: 'PostgreSQL', level: 'advanced', percentage: 85 },
                { name: 'MongoDB', level: 'intermediate', percentage: 65 },
                { name: 'Firebase', level: 'intermediate', percentage: 70 },
                { name: 'SQLite', level: 'intermediate', percentage: 68 },
                { name: 'Microsoft SQL Server', level: 'intermediate', percentage: 72 }
            ],
            'Tools & DevOps': [
                { name: 'Git', level: 'advanced', percentage: 92 },
                { name: 'GitHub', level: 'advanced', percentage: 90 },
                { name: 'GitLab', level: 'intermediate', percentage: 75 },
                { name: 'Docker', level: 'intermediate', percentage: 78 },
                { name: 'CI/CD Pipelines', level: 'intermediate', percentage: 72 },
                { name: 'GitHub Actions', level: 'intermediate', percentage: 70 },
                { name: 'GitLab CI', level: 'intermediate', percentage: 68 },
                { name: 'Kubernetes', level: 'basic', percentage: 45 },
                { name: 'AWS', level: 'intermediate', percentage: 70 },
                { name: 'Heroku', level: 'intermediate', percentage: 75 },
                { name: 'Visual Studio Code', level: 'advanced', percentage: 95 },
                { name: 'Microsoft Visual Studio', level: 'intermediate', percentage: 80 },
                { name: 'Postman', level: 'intermediate', percentage: 85 },
                { name: 'JIRA', level: 'intermediate', percentage: 78 },
                { name: 'Trello', level: 'intermediate', percentage: 82 }
            ],
            'Design & UX': [
                { name: 'UX Design', level: 'intermediate', percentage: 72 },
                { name: 'Figma', level: 'intermediate', percentage: 75 },
                { name: 'Wireframing', level: 'intermediate', percentage: 70 },
                { name: 'Prototyping', level: 'intermediate', percentage: 68 },
                { name: 'User Research', level: 'intermediate', percentage: 65 },
                { name: 'Usability Testing', level: 'intermediate', percentage: 62 },
                { name: 'Graphic Design', level: 'intermediate', percentage: 70 },
                { name: 'Adobe Photoshop', level: 'intermediate', percentage: 68 },
                { name: 'Adobe Premiere Pro', level: 'intermediate', percentage: 60 },
                { name: 'Video Editing', level: 'intermediate', percentage: 65 },
                { name: 'Sound Editing', level: 'intermediate', percentage: 58 },
                { name: 'Advanced Image Processing', level: 'intermediate', percentage: 72 }
            ],
            'AI & Generative AI': [
                { name: 'Prompt Engineering', level: 'advanced', percentage: 90 },
                { name: 'AI-Assisted Development', level: 'advanced', percentage: 88 },
                { name: 'Generative AI', level: 'advanced', percentage: 85 },
                { name: 'LLM / API Integration', level: 'advanced', percentage: 84 },
                { name: 'Anthropic / OpenAI APIs', level: 'advanced', percentage: 82 },
                { name: 'AI Agents / Agentic Workflows', level: 'intermediate', percentage: 72 }
            ],
            'Programming Languages': [
                { name: 'JavaScript', level: 'advanced', percentage: 92 },
                { name: 'TypeScript', level: 'advanced', percentage: 85 },
                { name: 'PHP', level: 'advanced', percentage: 85 },
                { name: 'C#', level: 'advanced', percentage: 88 },
                { name: 'Java', level: 'intermediate', percentage: 72 },
                { name: 'Python', level: 'intermediate', percentage: 70 },
                { name: 'C', level: 'intermediate', percentage: 68 },
                { name: 'C++', level: 'intermediate', percentage: 65 },
                { name: 'Kotlin', level: 'intermediate', percentage: 70 },
                { name: 'SQL', level: 'intermediate', percentage: 82 }
            ],
            'Professional Skills': [
                { name: 'Problem Solving', level: 'advanced' },
                { name: 'Creative Thinking', level: 'advanced' },
                { name: 'Teamwork', level: 'advanced' },
                { name: 'Communication', level: 'advanced' },
                { name: 'Responsibility', level: 'advanced' },
                { name: 'Resilience', level: 'advanced' },
                { name: 'Organization', level: 'advanced' },
                { name: 'Agile Methodologies', level: 'intermediate' },
                { name: 'Project Management', level: 'intermediate' },
                { name: 'Customer Service', level: 'intermediate' },
                { name: 'Professional Ethics', level: 'intermediate' }
            ]
        };

        const skills = allSkills[category];
        if (!skills) return;

        if (skillsList) {
            skillsList.innerHTML = '';
            skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-progress-item';
                skillItem.setAttribute('data-level', skill.level);

                skillItem.innerHTML = `
                    <div class="skill-info">
                        <span class="skill-name">${skill.name}</span>
                        ${skill.percentage ? `<span class="skill-percentage">${skill.percentage}%</span>` : ''}
                    </div>
                    ${skill.percentage ? `
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${skill.percentage}%"></div>
                    </div>
                    ` : ''}
                `;

                skillsList.appendChild(skillItem);
            });
        }

        if (skillsTags) {
            skillsTags.innerHTML = '';
            skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.setAttribute('data-level', skill.level);
                skillTag.textContent = skill.name;
                skillsTags.appendChild(skillTag);
            });
        }

        // Update skill count
        const skillCount = card.querySelector('.skill-count');
        if (skillCount) {
            skillCount.textContent = `${skills.length} skills`;
        }
    }

    // Animate progress bars on scroll
    const animateProgressBars = (card) => {
        const progressBars = card.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            if (bar.dataset.animated === 'true' || prefersReducedMotion) return;
            const width = bar.style.width;
            if (!width) return;
            bar.dataset.animated = 'true';
            bar.style.width = '0';
            requestAnimationFrame(() => {
                bar.style.width = width;
            });
        });
    };

    if (!('IntersectionObserver' in window)) {
        skillCards.forEach(animateProgressBars);
        return;
    }

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars(entry.target);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => {
        animateOnScroll.observe(card);
    });
});
