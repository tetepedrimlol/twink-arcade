const canvas = document.getElementById("led-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// LED grid
const gridSize = 40;
let cols, rows, leds;

function initLeds() {
  cols = Math.floor(canvas.width / gridSize);
  rows = Math.floor(canvas.height / gridSize);
  leds = [];

  for (let x = 0; x < cols; x++) {
    leds[x] = [];
    for (let y = 0; y < rows; y++) {
      leds[x][y] = {
        on: Math.random() > 0.6,
        hue: Math.random() * 200 + 180, // Hue for color shift
        brightness: Math.random()
      };
    }
  }
}

// Floating particles
let particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: Math.random() * 3 + 1
  });
}

// Sparks
let sparks = [];
for (let i = 0; i < 25; i++) {
  sparks.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 4 + 2,
    alpha: Math.random(),
    fade: Math.random() * 0.02 + 0.01
  });
}

// Draw neon connecting lines
function drawLines() {
  ctx.strokeStyle = "rgba(0,200,255,0.05)";
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (leds[x][y].on) {
        const cx = x * gridSize + gridSize / 2;
        const cy = y * gridSize + gridSize / 2;
        if (x < cols - 1 && leds[x + 1][y].on) {
          const nx = (x + 1) * gridSize + gridSize / 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, cy);
          ctx.stroke();
        }
        if (y < rows - 1 && leds[x][y + 1].on) {
          const ny = (y + 1) * gridSize + gridSize / 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, ny);
          ctx.stroke();
        }
      }
    }
  }
}

function draw() {
  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#000000");
  gradient.addColorStop(1, "#0d0d33");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // LEDs with pulsing color
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let led = leds[x][y];
      if (led.on) {
        const hue = (led.hue + Date.now() * 0.01) % 360; // slowly rotate hue
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${led.brightness})`;
        ctx.beginPath();
        ctx.arc(
          x * gridSize + gridSize / 2,
          y * gridSize + gridSize / 2,
          gridSize / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      led.brightness += (Math.random() - 0.5) * 0.05;
      if (led.brightness < 0) led.brightness = 0;
      if (led.brightness > 1) led.brightness = 1;
    }
  }

  // Lines
  drawLines();

  // Particles
  ctx.fillStyle = "#00cfff";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });

  // Sparks
  sparks.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${Date.now()*0.05 % 360}, 100%, 70%, ${s.alpha})`;
    ctx.fill();
    s.alpha -= s.fade;
    if (s.alpha <= 0) {
      s.x = Math.random() * canvas.width;
      s.y = Math.random() * canvas.height;
      s.alpha = Math.random() * 0.8 + 0.2;
      s.fade = Math.random() * 0.02 + 0.01;
    }
  });

  requestAnimationFrame(draw);
}

initLeds();
draw();
