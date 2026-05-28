const toggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

toggle.addEventListener('click', () => {
  const current =
    document.documentElement.getAttribute('data-theme');

  const next =
    current === 'light' ? 'dark' : 'light';

  applyTheme(next);

  localStorage.setItem('theme', next);
});

// TYPING EFFECT
const roles = [
  'I am a Data Analyst',
  'I am interested in Product Analytics',
  'I build dashboards & pipelines',
  'I work with SQL & Python',
  'I love data storytelling'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typedText = document.getElementById('typed-text');

if(typedText){

  function typeEffect(){

    const current = roles[roleIndex];

    if(!deleting){
      typedText.textContent = current.substring(0, charIndex++);
    }

    else {
      typedText.textContent = current.substring(0, charIndex--);
    }

    let speed = deleting ? 40 : 85;

    if(!deleting && charIndex === current.length + 1){
      deleting = true;
      speed = 1500;
    }

    if(deleting && charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}