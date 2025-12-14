const canvas = document.getElementById("flor");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let apertura = 0; // 0 cerrado - 1 abierto
const petalos = 16;

// Fondo
function fondo() {
  const grad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 600);
  grad.addColorStop(0, "#3c5055ff");
  grad.addColorStop(1, "#000");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Pétalo realista
function dibujarPetalo(angulo, apertura) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angulo);

  const largo = 180 * apertura + 40;
  const ancho = 45 * apertura + 10;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(ancho, -largo / 2, 0, -largo);
  ctx.quadraticCurveTo(-ancho, -largo / 2, 0, 0);

  const grad = ctx.createLinearGradient(0, 0, 0, -largo);
  grad.addColorStop(0, "#ffffffff");
  grad.addColorStop(0.6, "#f7e3e8ff");
  grad.addColorStop(1, "#ffffffff");

  ctx.fillStyle = grad;
  ctx.shadowColor = "#ff63b1ff";
  ctx.shadowBlur = 20;

  ctx.fill();
  ctx.restore();
}

// Centro de la flor
function centroFlor() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
  ctx.fillStyle = "#f1e88eff";
  ctx.shadowColor = "#e6cf6aff";
  ctx.shadowBlur = 30;
  ctx.fill();
}

// Animación
function animar() {
  fondo();

  for (let i = 0; i < petalos; i++) {
    dibujarPetalo((Math.PI * 2 / petalos) * i, apertura);
  }

  centroFlor();

  if (apertura < 1) apertura += 0.004;

  requestAnimationFrame(animar);
}

animar();
