import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

document.addEventListener('DOMContentLoaded', () => {
  initNameTyping();
  initAOS();
  animateTechCategories();
  initCharts();
  handleTimelineScroll();
});

// ----------- Funções separadas -----------

function initNameTyping() {
  const animatedName = document.getElementById('animated-name');
  if (!animatedName) return;

  const text = animatedName.dataset.value || '';
  let index = 0;

  const typeEffect = () => {
    if (index <= text.length) {
      animatedName.textContent = text.substring(0, index);
      index++;
      setTimeout(typeEffect, 70);
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
    console.warn('Chart.js ou ChartDataLabels não carregado.');
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
// Registro do plugin
  Chart.register(ChartDataLabels);

  const ctx = document.getElementById('meuGrafico');
  new Chart(ctx, {
    type: 'bar',
    options: {
      plugins: {
        datalabels: {
          color: '#000',
          anchor: 'end',
          align: 'top',
        }
      }
    },
    plugins: [ChartDataLabels]
  });
  const cards = document.querySelectorAll('.project-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  cards.forEach(card => observer.observe(card));
  const certs = document.querySelectorAll('.certification-item');

  const certObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = "0.2s";
        entry.target.classList.add('visible');
        // Reset transform e opacity para animação pelo CSS
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateX(0)';
        certObserver.unobserve(entry.target); // Só anima uma vez
      }
    });
  }, {
    threshold: 0.1
  });

  certs.forEach(cert => certObserver.observe(cert));