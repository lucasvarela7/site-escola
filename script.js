let currentSlide = 1;
const totalSlides = 7;

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const slideIndicator = document.getElementById("slide-indicator");

// NAVEGAÇÃO ENTRE SLIDES
function updateSlides() {
  document.querySelectorAll(".slide").forEach((slide) => {
    slide.classList.remove("active");
  });

  const activeSlide = document.getElementById(`slide-${currentSlide}`);
  if (activeSlide) {
    activeSlide.classList.add("active");
  }

  slideIndicator.textContent = `Slide ${currentSlide} de ${totalSlides}`;

  prevBtn.disabled = currentSlide === 1;
  if (currentSlide === totalSlides) {
    nextBtn.textContent = "Fim da Apresentação";
  } else {
    nextBtn.textContent = "Próximo →";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlides();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlides();
  }
});

// NAVEGAÇÃO VIA TECLAS DE SETA (ESQUERDA / DIREITA)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && currentSlide < totalSlides) {
    currentSlide++;
    updateSlides();
  } else if (e.key === "ArrowLeft" && currentSlide > 1) {
    currentSlide--;
    updateSlides();
  }
});

// SISTEMA DO CRONÔMETRO DE 5 MINUTOS
let timerInterval = null;
let timeRemaining = 300; // 5 minutos em segundos

const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-timer-btn");
const resetBtn = document.getElementById("reset-timer-btn");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
  if (timerInterval) return;

  startBtn.textContent = "⏸ Pausar";
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerDisplay.textContent = formatTime(timeRemaining);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      timerDisplay.textContent = "00:00";
      alert("Tempo de apresentação finalizado!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  startBtn.textContent = "▶ Iniciar";
}

startBtn.addEventListener("click", () => {
  if (timerInterval) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", () => {
  pauseTimer();
  timeRemaining = 300;
  timerDisplay.textContent = formatTime(timeRemaining);
});

// INICIALIZAR
updateSlides();
