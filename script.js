// Configurações do Quiz
const questions = [
    {
        question: "Qual seu maior desafio para ser produtivo?",
        options: [
            "Foco (me distraio fácil)",
            "Energia (sempre cansado)",
            "Planejamento (não sei priorizar)"
        ],
        points: [10, 15, 20],
        feedback: [
            "🛡️ <strong>Foco</strong> é treinável! Experimente a Técnica Pomodoro 2.0.",
            "⚡ <strong>Energia</strong> começa na alimentação e sono. Você já fez um detox digital?",
            "📅 <strong>Planejamento</strong> é o alicerce. Priorize MITs (Most Important Tasks)."
        ]
    },
    // Adicione as outras perguntas aqui...
];

// Variáveis Globais
let currentQuestion = 0;
let score = 0;
const totalQuestions = questions.length;

// Elementos DOM
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const badgeImage = document.getElementById("badge-image");

// Iniciar Quiz
function startQuiz() {
    showQuestion();
}

// Mostrar Pergunta
function showQuestion() {
    const q = questions[currentQuestion];
    questionElement.innerHTML = `<span class="question-text">${q.question}</span>`;
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index, q.points[index], q.feedback[index]));
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

// Selecionar Resposta
function selectAnswer(optionIndex, points, feedback) {
    score += points;
    
    // Feedback instantâneo (opcional)
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((btn, idx) => {
        if (idx === optionIndex) {
            btn.style.backgroundColor = "#00ff5e";
            btn.style.color = "#000";
            btn.innerHTML += `<br><small>${feedback}</small>`;
        }
        btn.disabled = true;
    });

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500); // Delay para feedback visual
}

// Atualizar Barra de Progresso
function updateProgress() {
    const progress = Math.round((currentQuestion / totalQuestions) * 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    progressBar.style.background = `linear-gradient(90deg, var(--neon-pink) ${progress}%, transparent 0%)`;
}

// Mostrar Resultado Final
function showResult() {
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    resultContainer.style.display = "block";

    if (score >= 40) {
        resultTitle.innerHTML = "🏆 <span class='neon-text'>MODO HARD DESBLOQUEADO!</span>";
        resultText.innerHTML = `Você é um <strong>NeuroOverclocker</strong> nível PRO!<br>Pontuação: ${score}/60`;
        badgeImage.src = "https://exemplo.com/badge-hard.png"; // Substitua pelo link real
    } else {
        resultTitle.innerHTML = "⚡ <span class='neon-text'>BOA JOGADA!</span>";
        resultText.innerHTML = `Você está no caminho!<br>Pontuação: ${score}/60`;
        badgeImage.src = "https://exemplo.com/badge-iniciante.png"; // Substitua pelo link real
    }
}

// Reiniciar Quiz
document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.style.display = "none";
    questionElement.style.display = "block";
    optionsContainer.style.display = "block";
    startQuiz();
});

// Iniciar
startQuiz();
