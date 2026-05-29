const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const mouse = { x: null, y: null };

const CONFIG = {
  particleCount: 80,
  maxDistance: 120,
  mouseRadius: 140,
};

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

// track mouse
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.baseX = this.x;
    this.baseY = this.y;

    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;

    this.size = Math.random() * 1.6 + 0.6;
  }

  update() {
    // very slow floating motion (NOT falling)
    this.x += this.vx;
    this.y += this.vy;

    // keep in bounds softly
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // mouse interaction (repulsion)
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.mouseRadius) {
        const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;

        this.x += dx * force * 0.08;
        this.y += dy * force * 0.08;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--particle-color");

    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < CONFIG.particleCount; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = getComputedStyle(document.documentElement)
          .getPropertyValue("--particle-line");

        ctx.lineWidth = 1 - dist / CONFIG.maxDistance;

        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

init();
animate();