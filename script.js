// main.js - Consolidated JavaScript for Portfolio Animations
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js plugins
Chart.register(ChartDataLabels);

document.addEventListener('DOMContentLoaded', () => {
    initAllAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initThemeToggle();
});

function initAllAnimations() {
    initNameTyping();
    initAOS();
    animateTechCategories();
    initCharts();
    handleTimelineScroll();
    initAboutAnimations();
    initEducationAnimations();
    initSkillsAnimations();
    initProjectsAnimations();
    initCertificationsAnimations();
    initContactAnimations();
    initScrollAnimations();
    initParallaxEffects();
}
// Enhanced Header Functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    const progressBar = document.querySelector('.progress-bar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Scroll progress and header effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / height) * 100;
        
        // Progress bar
        progressBar.style.width = progress + '%';
        
        // Header background effect
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active section highlighting
        highlightActiveSection();
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Active section highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// ----------- Mobile Menu -----------
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuToggle.innerHTML = navLinks.classList.contains('show') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// ----------- Smooth Scrolling -----------
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ----------- Theme Toggle -----------
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;

    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });

    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });

    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// ----------- Hero Section -----------
function initNameTyping() {
    const animatedName = document.getElementById('animated-name');
    if (!animatedName) return;

    const text = animatedName.dataset.value || animatedName.textContent;
    let index = 0;

    const typeEffect = () => {
        if (index <= text.length) {
            animatedName.textContent = text.substring(0, index);
            index++;
            setTimeout(typeEffect, 70);
        } else {
            // Start cursor blink after typing completes
            animatedName.classList.add('typing-complete');
        }
    };

    animatedName.textContent = '';
    typeEffect();
}

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 1200,
            easing: 'ease-out',
            offset: 250,
        });
    } else {
        // Fallback scroll animations if AOS is not available
        initScrollAnimations();
    }
}

function animateTechCategories() {
    const categories = document.querySelectorAll('.tech-category');
    categories.forEach((cat) => {
        cat.style.opacity = '0';
        cat.style.transform = 'scale(0.5)';
    });

    setTimeout(() => {
        categories.forEach((cat, index) => {
            setTimeout(() => {
                cat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                cat.style.opacity = '1';
                cat.style.transform = 'scale(1)';
            }, index * 200);
        });
    }, 400);
}

function initCharts() {
    if (typeof Chart === 'undefined' || typeof ChartDataLabels === 'undefined') {
        console.warn('Chart.js or ChartDataLabels not loaded.');
        return;
    }

    const chartConfigs = [
        { id: 'jsChart', value: 85, color: '#f7df1e', label: 'JavaScript' },
        { id: 'laravelChart', value: 90, color: '#ff2d20', label: 'Laravel' },
        { id: 'phpChart', value: 80, color: '#777bb4', label: 'PHP' },
        { id: 'pythonChart', value: 70, color: '#3776ab', label: 'Python' },
        { id: 'htmlCssChart', value: 95, color: '#e34f26', label: 'HTML/CSS' },
    ];

    chartConfigs.forEach(({ id, value, color, label }) => {
        createCircularChart(id, value, color, label);
    });
}

function createCircularChart(canvasId, percentage, color, label) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [label, ''],
            datasets: [
                {
                    data: [percentage, 100 - percentage],
                    backgroundColor: [color, '#333'],
                    borderWidth: 3,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false },
                datalabels: {
                    display: true,
                    color: '#121212',
                    font: {
                        size: 20,
                        weight: 'bold',
                    },
                    formatter: (value, ctx) => (ctx.dataIndex === 0 ? `${value}%` : ''),
                    anchor: 'center',
                    align: 'center',
                },
            },
            animation: {
                animateRotate: true,
                duration: 2500,
            },
        },
    });
}

// ----------- Timeline Sections (Experience & Education) -----------
function handleTimelineScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const revealOnScroll = () => {
        timelineItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.85) {
                item.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
}

function initTimelineInteractions() {
    // Add interactive effects to timeline content
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });

    // Add click effect to timeline markers
    document.querySelectorAll('.timeline-marker').forEach(marker => {
        marker.addEventListener('click', function() {
            this.style.transform = 'translateX(-50%) scale(1.5)';
            setTimeout(() => {
                this.style.transform = 'translateX(-50%) scale(1.3)';
            }, 300);
        });
    });
}

// ----------- About Section -----------
function initAboutAnimations() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const animatedElements = document.querySelectorAll('.about-intro p, .about-highlight, .stat, .tech-stack');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Remove any existing animation classes
                element.classList.remove('fadeInUp', 'fadeInRight');
                
                // Force reflow
                void element.offsetWidth;
                
                // Add appropriate animation class based on element
                if (element.classList.contains('about-highlight')) {
                    element.classList.add('fadeInRight');
                } else {
                    element.classList.add('fadeInUp');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add interactive effect to stats
    document.querySelectorAll('.stat').forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Add parallax effect to floating cards on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const aboutOffset = aboutSection.offsetTop;
        const aboutHeight = aboutSection.offsetHeight;
        
        if (scrolled > aboutOffset - window.innerHeight && scrolled < aboutOffset + aboutHeight) {
            const cards = document.querySelectorAll('.floating-card');
            cards.forEach((card, index) => {
                const speed = 0.05 * (index + 1);
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });
        }
    });
}

// ----------- Education Section -----------
function initEducationAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    initTimelineInteractions();

    // Add hover effect to project buttons
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });
}

// ----------- Skills Section -----------
function initSkillsAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill levels
                const skillLevels = entry.target.querySelectorAll('.skill-level::after');
                skillLevels.forEach(level => {
                    level.style.transition = 'width 1.5s ease-in-out';
                    // Force reflow
                    void level.offsetWidth;
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillCategories.forEach(category => {
        observer.observe(category);
    });

    // Skills filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategoriesAll = document.querySelectorAll('.skill-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            skillCategoriesAll.forEach(category => {
                if (filter === 'all') {
                    category.style.display = 'block';
                } else {
                    if (category.getAttribute('data-category') === filter) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                }
            });
        });
    });

    // Add interactive effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
        
        // Click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
        });
    });
}

// ----------- Projects Section -----------
function initProjectsAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate progress bars
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCardsAll = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCardsAll.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Add interactive effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });

    // Add click effect to project links
    document.querySelectorAll('.project-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });
}

// ----------- Certifications Section -----------
function initCertificationsAnimations() {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    certificationCards.forEach(card => {
        observer.observe(card);
    });

    // Certifications filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificationCardsAll = document.querySelectorAll('.certification-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            certificationCardsAll.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'current') {
                    const hasExpired = card.querySelector('.expired-badge');
                    if (hasExpired) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'block';
                    }
                } else if (filter === 'expired') {
                    const hasExpired = card.querySelector('.expired-badge');
                    if (hasExpired) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Add interactive effects to certification cards
    document.querySelectorAll('.certification-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });

    // Add click effect to certification links
    document.querySelectorAll('.certification-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });
}

// ----------- Contact Section -----------
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-info-item, .contact-form');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    contactItems.forEach(item => {
        observer.observe(item);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formStatus = document.getElementById('formStatus');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or email me directly.';
                formStatus.className = 'form-status error';
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Add interactive effects to form inputs
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add click effect to social links
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });
}

// ----------- Scroll Animations (Fallback) -----------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-delay, [data-aos]');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ----------- Parallax Effects -----------
function initParallaxEffects() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero section parallax
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-card, .tech-badge');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 * (index % 3 + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ----------- Utility Functions -----------
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ----------- Loading States -----------
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
    `;
    document.body.appendChild(loader);
    
    return loader;
}

function hideLoading(loader) {
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }
}

// ----------- Error Handling -----------
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ----------- Export for module usage -----------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAllAnimations,
        initNameTyping,
        initAOS,
        initMobileMenu,
        initSmoothScrolling,
        initThemeToggle,
        initAboutAnimations,
        initEducationAnimations,
        initSkillsAnimations,
        initProjectsAnimations,
        initCertificationsAnimations,
        initContactAnimations,
        debounce
    };
}

// Initialize everything when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

// JavaScript para a seção About
document.addEventListener('DOMContentLoaded', function() {
    // Animação de scroll para a seção About
    const aboutContent = document.querySelector('.about-content');
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar os cards flutuantes
                const floatingCards = entry.target.querySelectorAll('.floating-card');
                floatingCards.forEach((card, index) => {
                    card.style.animationDelay = `${0.2 + (index * 0.2)}s`;
                });
                
                // Animar as estatísticas
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        animateCounter(stat);
                    }, 1000 + (index * 300));
                });
            }
        });
    }, { threshold: 0.3 });

    if (aboutContent) {
        aboutObserver.observe(aboutContent);
    }

    // Função para animar contadores
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace('+', '').replace('%', ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Efeitos hover para os cards flutuantes
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Efeito de digitação para o primeiro parágrafo (opcional)
    const firstParagraph = document.querySelector('.about-intro p:first-child');
    if (firstParagraph) {
        const originalText = firstParagraph.textContent;
        firstParagraph.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                firstParagraph.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        };
        
        // Iniciar efeito de digitação quando a seção for visível
        const typeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    typeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        typeObserver.observe(aboutContent);
    }
});

// Adicione também este CSS adicional para garantir que tudo funcione