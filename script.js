// Perguntas do Quiz (REVISADO)
const questions = [
    {
        question: "Como você organiza seu dia?",
        options: ["Lista de tarefas no papel/celular", "Uso um planner ou app específico", "Vou fazendo o que lembro"],
        points: [10, 20, 5]
    },
    {
        question: "Qual sua maior dificuldade?",
        options: ["Começar tarefas (procrastinação)", "Manter o foco (muitas distrações)", "Priorizar o que é importante"],
        points: [15, 10, 20]
    }
];

// Variáveis
let currentQuestion = 0;
let score = 0;

// Elementos DOM (REVISADO)
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const resultContainer = document.getElementById("result-container");

// Função para mostrar perguntas (CORRIGIDA)
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            score += q.points[index];
            currentQuestion++;
            showQuestion();
        });
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

// Atualizar barra de progresso
function updateProgress() {
    const progress = Math.round((currentQuestion / questions.length) * 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
}

// Mostrar resultado final
function showResult() {
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    resultContainer.style.display = "block";
    document.getElementById("result-title").textContent = `Pontuação: ${score}`;
}

// Iniciar quiz
showQuestion();  // Chama a primeira pergunta

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
