// Função para alternar entre o modo escuro e claro
function toggleDarkLightMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
  
    // Salvar a escolha do modo no localStorage para persistência
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Verificar e aplicar o tema salvo ao carregar a página
  document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  });
  
  // Adicionando efeito de animação suave no carregamento da página
  window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.company-info, .skills, .impact');
    elements.forEach(function(element) {
      element.classList.add('fade-in');
    });
  });
  
  // Animação para as seções de habilidades e impacto
  const fadeInElements = document.querySelectorAll('.skills, .impact');
  fadeInElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transition = "opacity 1s ease-in-out";
    window.addEventListener('scroll', () => {
      if (isInViewport(element)) {
        element.style.opacity = 1;
      }
    });
  });
  
  // Verifica se um elemento está visível na tela
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }
  
  // Mudar o logo de acordo com o tema
  document.querySelector('.company-logo').addEventListener('load', function() {
    const logo = document.querySelector('.company-logo');
    if (document.body.classList.contains('dark-mode')) {
      logo.src = logo.src.replace('company-logo_200_200', 'company-logo_200_200_dark'); // Exemplo de logo diferente para o tema escuro
    }
  });
  