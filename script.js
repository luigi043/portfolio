import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

document.addEventListener("DOMContentLoaded", function () {
  
  const animatedName = document.getElementById("animated-name");

  if (animatedName) {
      const text = animatedName.getAttribute("data-value");
      let index = 0;

      function typeEffect() {
          if (index < text.length) {
              animatedName.innerHTML = text.substring(0, index + 1);
              index++;
              setTimeout(typeEffect, 70);  // Velocidade mais rápida e suave
          }
      }

      animatedName.innerHTML = ""; // Resetar texto antes de iniciar a animação
      typeEffect();
  }

  // Inicialização do AOS.js
  AOS.init({
      once: true,
      duration: 1200,
      easing: 'ease-out',
      offset: 250
  });

  // Animação de entrada das categorias tecnológicas
  const categories = document.querySelectorAll(".tech-category");

  categories.forEach(category => {
      category.style.opacity = "0";
      category.style.transform = "scale(0.5)";
  });

  setTimeout(() => {
      categories.forEach((category, index) => {
          setTimeout(() => {
              category.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              category.style.opacity = "1";
              category.style.transform = "scale(1)";
          }, index * 200);
      });
  }, 400);

  // Verificar se Chart.js e ChartDataLabels estão carregados antes de criar os gráficos
  if (typeof Chart !== "undefined" && typeof ChartDataLabels !== "undefined") {
      Chart.register(ChartDataLabels);

      const createCircularChart = (canvasId, percentage, color, label) => {
          const canvas = document.getElementById(canvasId);
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          new Chart(ctx, {
              type: 'doughnut',
              data: {
                  labels: [label, ''],
                  datasets: [{
                      data: [percentage, 100 - percentage],
                      backgroundColor: [color, '#333'],
                      borderWidth: 3
                  }]
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
                              weight: 'bold'
                          },
                          formatter: (value, context) => {
                              return context.dataIndex === 0 ? `${value}%` : "";
                          },
                          anchor: 'center',
                          align: 'center'
                      }
                  },
                  animation: {
                      animateRotate: true,
                      duration: 2500,
                  }
              }
          });
      }

      // Criar gráficos com as porcentagens corretas
      createCircularChart("jsChart", 85, "#f7df1e", "JavaScript");
      createCircularChart("laravelChart", 90, "#ff2d20", "Laravel");
      createCircularChart("phpChart", 80, "#777bb4", "PHP");
      createCircularChart("pythonChart", 70, "#3776ab", "Python");
      createCircularChart("htmlCssChart", 95, "#e34f26", "HTML/CSS");
  } else {
      console.warn("Chart.js ou ChartDataLabels não carregado.");
  }
});

// Show timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const revealOnScroll = () => {
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      item.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

