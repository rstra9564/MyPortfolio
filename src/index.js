import './styles.scss';
import emailjs from '@emailjs/browser';

document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.background =
        window.scrollY > 50
          ? 'rgba(5, 5, 5, 0.97)'
          : 'rgba(5, 5, 5, 0.90)';
    });
  }

  // Smooth scrolling
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

  // Contact form
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {

    const submitButton =
      contactForm.querySelector('.btn-contact');

    contactForm.addEventListener('submit', function (e) {

      e.preventDefault();

      console.log('Form submit detected');

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      emailjs.sendForm(
        'service_2oblj9d',
        'template_o88v3qj',
        this,
        'dnzbIaWyG8WGeMYlo'
      )
      .then(() => {

        console.log('Email sent successfully');

        if (formStatus) {
          formStatus.textContent =
            'Message sent successfully!';

          formStatus.classList.remove('error');
          formStatus.classList.add('success');
        }

        contactForm.reset();

        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

      })
      .catch((error) => {

        console.error('EmailJS Error:', error);

        if (formStatus) {
          formStatus.textContent =
            'Failed to send message. Please try again.';

          formStatus.classList.remove('success');
          formStatus.classList.add('error');
        }

        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });

    });
  }
// =========================
// HERO PARTICLE TEXT
// =========================

const canvas = document.getElementById('hero-particles');

if (canvas) {

  const ctx = canvas.getContext('2d');

  let particles = [];

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  function initCanvas() {

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    generateParticles();
  }

  function generateParticles() {

    particles = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fontSize =
      window.innerWidth < 768 ? 60 : 100;

    ctx.fillStyle = '#ffffff';

    ctx.font = `700 ${fontSize}px Arial`;

    ctx.textAlign = 'center';

    ctx.textBaseline = 'middle';

    ctx.fillText(
      'Hello...',
      canvas.width / 2,
      canvas.height / 2
    );

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < imageData.height; y += 4) {

      for (let x = 0; x < imageData.width; x += 4) {

        const index =
          (y * imageData.width + x) * 4;

        if (imageData.data[index + 3] > 128) {

          particles.push({

            x,
            y,

            baseX: x,
            baseY: y,

            vx: 0,
            vy: 0,

            size: 1.8
          });
        }
      }
    }
  }

  function animate() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach(p => {

      if (mouse.x !== null) {

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;

        const distance =
          Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {

          const force =
            (mouse.radius - distance) /
            mouse.radius;

          const angle =
            Math.atan2(dy, dx);

          p.vx +=
            Math.cos(angle) *
            force *
            1.8;

          p.vy +=
            Math.sin(angle) *
            force *
            1.8;
        }
      }

      p.vx += (p.baseX - p.x) * 0.025;
      p.vy += (p.baseY - p.y) * 0.025;

      p.vx *= 0.90;
      p.vy *= 0.90;

      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = '#32f5b2';

      ctx.shadowColor = '#32f5b2';

      ctx.shadowBlur = 14;

      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', e => {

    const rect =
      canvas.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {

    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', initCanvas);

  initCanvas();

  animate();
}
});
//Cursor Glow Effect//
document.querySelectorAll('.glow-card').forEach(card => {

  card.addEventListener('mousemove', e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

});