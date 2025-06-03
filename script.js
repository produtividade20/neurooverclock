function updateProgress() {
  const progress = Math.round((currentQuestion / questions.length) * 100);
  const progressBar = document.getElementById("progress-bar");
  
  // Animação suave
  progressBar.style.width = `${progress}%`;
  
  // Efeito de "level up" ao completar
  if (progress === 100) {
    document.querySelector(".progress-container").classList.add("complete");
    setTimeout(() => {
      document.querySelector(".progress-container").classList.remove("complete");
    }, 1000);
    
    // Confetti virtual
    for (let i = 0; i < 50; i++) {
      createConfettiParticle();
    }
  }
  
  // Atualizar texto
  document.getElementById("progress-text").textContent = `${progress}%`;
}

function createConfettiParticle() {
  const confetti = document.createElement("div");
  confetti.style.position = "absolute";
  confetti.style.width = "10px";
  confetti.style.height = "10px";
  confetti.style.background = getRandomColor();
  confetti.style.borderRadius = "50%";
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.top = "-20px";
  confetti.style.opacity = "0.8";
  confetti.style.transform = "rotate(45deg)";
  
  document.querySelector(".progress-container").appendChild(confetti);
  
  // Animação
  const animation = confetti.animate(
    [
      { top: "-20px", opacity: 1 },
      { top: "100%", opacity: 0 }
    ],
    {
      duration: 1000 + Math.random() * 2000,
      easing: "cubic-bezier(0.1, 0.8, 0.9, 1)"
    }
  );
  
  animation.onfinish = () => confetti.remove();
}

function getRandomColor() {
  const colors = ["#ff5e00", "#ffbb00", "#00ff88", "#00a1ff", "#c644fc"];
  return colors[Math.floor(Math.random() * colors.length)];
}
