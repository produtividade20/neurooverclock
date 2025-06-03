// Perguntas do Quiz
const questions = [
    {
        question: "Como você organiza seu dia?",
        options: [
            "Lista de tarefas no papel/celular",
            "Uso um planner ou app específico",
            "Vou fazendo o que lembro"
        ],
        points: [10, 20, 5]
    },
    {
        question: "Qual sua maior dificuldade?",
        options: [
            "Começar tarefas (procrastinação)",
            "Manter o foco (muitas distrações)",
            "Priorizar o que é importante"
        ],
        points: [15, 10, 20]
    },
    {
        question: "Como você lida com prazos?",
        options: [
            "Adianto tudo antes do prazo",
            "Deixo para a última hora",
            "Divido em etapas e sigo um cronograma"
        ],
        points: [20, 5, 15]
    },
    {
        question: "Qual seu objetivo de produtividade?",
        options: [
            "Ter mais tempo livre",
            "Aumentar resultados no trabalho",
            "Reduzir o estresse do dia a dia"
        ],
        points: [10, 20, 15]
    }
];

// Variáveis
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
const badgeElement = document.getElementById("badge");
const ctaButton = document.getElementById("cta-btn");

// Iniciar Quiz
function startQuiz() {
    showQuestion();
}

// Mostrar Pergunta
function showQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(q.points[index]));
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

// Selecionar Resposta
function selectAnswer(points) {
    score += points;
    currentQuestion++;

    if (currentQuestion < totalQuestions) {
        showQuestion();
    } else {
        showResult();
    }
}

// Atualizar Progresso
function updateProgress() {
    const progress = Math.round((currentQuestion / totalQuestions) * 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
}

// Mostrar Resultado
function showResult() {
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    resultContainer.style.display = "block";

    // Definir Resultado com Base na Pontuação
    if (score >= 60) {
        resultTitle.textContent = "🎯 Perfil: Produtivo Estratégico";
        resultText.textContent = "Você já tem ótimos hábitos! Para otimizar ainda mais, recomendamos técnicas avançadas de gestão de tempo.";
        badgeElement.textContent = "⭐";
    } else if (score >= 30) {
        resultTitle.textContent = "🚀 Perfil: Produtivo em Evolução";
        resultText.textContent = "Você está no caminho certo! Foque em eliminar distrações e priorizar tarefas importantes.";
        badgeElement.textContent = "🔋";
    } else {
        resultTitle.textContent = "🌱 Perfil: Produtivo Iniciante";
        resultText.textContent = "Tudo começa com pequenos passos! Comece planejando seu dia e estabelecendo metas claras.";
        badgeElement.textContent = "🌿";
    }
}

// CTA Personalizado
ctaButton.addEventListener("click", () => {
    alert("Ótima escolha! Redirecionando para seu plano personalizado...");
    // Aqui você pode redirecionar para uma página de oferta
});

// Iniciar Quiz
startQuiz();
