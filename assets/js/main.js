// Force scroll to top on load
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
// THEME TOGGLE
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// sync checkbox state on load
const checkbox = document.getElementById('checkbox');
if (checkbox) {
  checkbox.checked = savedTheme === 'dark';

  checkbox.addEventListener('change', () => {
    const next = checkbox.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// TYPING EFFECT
const roles = [
  'I am a Data Analyst.',
  'I am interested in Product Analytics.',
  'I build dashboards & pipelines.',
  'I work with SQL & Python.',
  'I love data storytelling.'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typedText = document.getElementById('typed-text');

if (typedText) {
  function typeEffect() {
    const current = roles[roleIndex];

    if (!deleting) {
      typedText.textContent = current.substring(0, charIndex++);
    } else {
      typedText.textContent = current.substring(0, charIndex--);
    }

    let speed = deleting ? 40 : 85;

    if (!deleting && charIndex === current.length + 1) {
      deleting = true;
      speed = 1500;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

// SCROLL REVEAL
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }else {
      entry.target.classList.remove('visible'); // reset when scrolled out
    }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => observer.observe(el));
});