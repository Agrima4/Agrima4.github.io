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
'I turn data into decisions.',
'I bridge analytics, strategy, and execution.',
'I build systems that scale.',
'I uncover insights behind user behavior.',
'I transform ambiguity into measurable outcomes.'
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
  const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .fade-up');

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

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}