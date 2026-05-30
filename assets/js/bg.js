
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const hero = document.querySelector(".hero-center");

class Particle {
  constructor() {
    const side = Math.floor(Math.random() * 4);
    if (side === 0) { this.x = Math.random() * canvas.width; this.y = -50; }
    if (side === 1) { this.x = canvas.width + 50; this.y = Math.random() * canvas.height; }
    if (side === 2) { this.x = Math.random() * canvas.width; this.y = canvas.height + 50; }
    if (side === 3) { this.x = -50; this.y = Math.random() * canvas.height; }

    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 2 + 1;
    this.speed = 0.002 + Math.random() * 0.003;
    this.distance = Math.sqrt((this.x - centerX) ** 2 + (this.y - centerY) ** 2);
    this.exploded = false;
    this.opacity = 1;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    if (!this.exploded) {
      this.angle += this.speed * 6;
      this.distance *= 0.93;
      this.x = centerX + Math.cos(this.angle) * this.distance;
      this.y = centerY + Math.sin(this.angle) * this.distance;
      if (this.distance < 120) { this.speed *= 1.08; }
      if (this.distance < 12) {
        this.exploded = true;
        const force = Math.random() * 18 + 8;
        this.vx = Math.cos(this.angle) * force;
        this.vy = Math.sin(this.angle) * force;
      }
    } else {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.opacity *= 0.94;
    }
  }

  draw() {
    const styles = getComputedStyle(document.documentElement);
    const color = styles.getPropertyValue("--particle-color");
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = color.replace("0.55", Math.min(this.opacity + 0.3, 1));
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < 140; i++) {
  particles.push(new Particle());
}

let calmParticles = [];

function createCalmParticles() {
  for (let i = 0; i < 28; i++) {
    calmParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 1,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15
    });
  }
}

/* skip intro if landing on hash or scrolled down */
const shouldPlayIntro = window.scrollY < 100 && !window.location.hash;
let introDone = !shouldPlayIntro;

if (!shouldPlayIntro) {
  hero.classList.add('reveal');
  createCalmParticles();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!introDone) {
    particles.forEach((p) => { p.update(); p.draw(); });
    particles = particles.filter((p) => p.opacity > 0.03);

    const explodedCount = particles.filter(p => p.exploded).length;
    if (explodedCount > 135) { hero.classList.add("reveal"); }

    if (particles.length === 0) {
      introDone = true;
      createCalmParticles();
    }
  } else {
    const styles = getComputedStyle(document.documentElement);
    const particleColor = styles.getPropertyValue("--particle-color");
    const lineColor = styles.getPropertyValue("--particle-line");

    calmParticles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();

      for (let j = i + 1; j < calmParticles.length; j++) {
        const dx = p.x - calmParticles[j].x;
        const dy = p.y - calmParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(calmParticles[j].x, calmParticles[j].y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});