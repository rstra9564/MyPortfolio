import './styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(5, 5, 5, 0.97)'; 
  } else {
    navbar.style.background = 'rgba(5, 5, 5, 0.90)'; 
  }
});

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
