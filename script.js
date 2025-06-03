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
