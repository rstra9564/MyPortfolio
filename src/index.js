import './styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import emailjs from '@emailjs/browser';

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.background =
        window.scrollY > 50
          ? 'rgba(5, 5, 5, 0.97)'
          : 'rgba(5, 5, 5, 0.90)';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();

      const target = document.querySelector(
        anchor.getAttribute('href')
      );

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
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_2oblj9d',
        'template_o88v3qj',
        this,
        'dnzbIaWyG8WGeMYlo'
      )
      .then(
        () => {
          alert('Message sent successfully!');
          contactForm.reset();
        },
        (error) => {
          alert('Failed to send message.');
          console.error(error);
        }
      );
  });
}