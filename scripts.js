// Iniciar AOS (animações)
AOS.init();

// Definir volume de áudio na seção "Edição de Som"
document.querySelectorAll("section").forEach(section => {
  if (section.querySelector("h2")?.textContent.includes("Edição de Som")) {
    section.querySelectorAll("audio").forEach(audio => {
      audio.volume = 0.45;
    });
  }
});

// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Slideshow BMW
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1]?.classList.add("active");
}
