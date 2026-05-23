// ===== Питання на тему «Кіно» =====
const questions = [
    {
        question: "Хто зіграв Джека у фільмі «Титанік» (1997)?",
        answers: ["Бред Пітт", "Леонардо ДіКапріо", "Том Круз", "Метт Деймон"],
        correct: 1
    },
    {
        question: "Який фільм отримав Оскар як «Найкращий фільм» у 2020 році?",
        answers: ["1917", "Джокер", "Паразити", "Одного разу в Голлівуді"],
        correct: 2
    },
    {
        question: "Як називається академія, де навчається Гаррі Поттер?",
        answers: ["Дурмстранг", "Гоґвортс", "Шармбатон", "Ілверморні"],
        correct: 1
    },
    {
        question: "Який актор виконав роль капітана Джека Горобця?",
        answers: ["Бред Пітт", "Орландо Блум", "Джонні Депп", "Том Гарді"],
        correct: 2
    },
    {
        question: "Хто режисер фільму «Початок» (Inception, 2010)?",
        answers: ["Стівен Спілберг", "Крістофер Нолан", "Джеймс Кемерон", "Квентін Тарантіно"],
        correct: 1
    },
    {
        question: "Який актор зіграв Залізну людину у всесвіті Marvel?",
        answers: ["Кріс Еванс", "Кріс Гемсворт", "Роберт Дауні-молодший", "Марк Раффало"],
        correct: 2
    },
    {
        question: "У якому фільмі звучить фраза «Я твій батько»?",
        answers: ["Зоряні війни", "Володар перснів", "Матриця", "Аватар"],
        correct: 0
    },
    {
        question: "Який мультфільм студії Disney розповідає про левеня Сімбу?",
        answers: ["Книга джунглів", "Король Лев", "Тарзан", "Бембі"],
        correct: 1
    },
    {
        question: "Хто зіграв головну роль у фільмі «Джокер» (2019)?",
        answers: ["Хоакін Фенікс", "Хіт Леджер", "Джаред Лето", "Джек Ніколсон"],
        correct: 0
    },
    {
        question: "Який фільм є найкасовішим в історії кіно?",
        answers: ["Месники: Завершення", "Титанік", "Аватар", "Зоряні війни"],
        correct: 2
    }
];

// ===== Отримання елементів =====
const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');
const resultText = document.querySelector('.result-text');
const questionText = document.querySelector('#question-text');
const answersContainer = document.querySelector('#answers-container');
const scoreDisplay = document.querySelector('#score-display');
const timerDisplay = document.querySelector('#timer');

let questionIndex = 0;
let score = 0;
let timer = 15;
let interval;

// ===== Показ запитання =====
function showQuestion(question) {
    clearInterval(interval);
    startTimer();

    answersContainer.innerHTML = '';
    questionText.innerText = question.question;

    for (let i = 0; i < question.answers.length; i++) {
        const button = document.createElement('button');
        button.innerText = question.answers[i];
        button.classList.add('answer-btn');
        button.addEventListener('click', () => checkAnswer(button, i));
        answersContainer.appendChild(button);
    }
}

// ===== Перевірка відповіді =====
function checkAnswer(button, i) {
    clearInterval(interval);

    if (i === questions[questionIndex].correct) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
    }

    scoreDisplay.innerText = `★ ${score}`;

    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
    });

    setTimeout(nextQuestion, 1000);
}

// ===== Перехід до наступного запитання =====
function nextQuestion() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion(questions[questionIndex]);
    } else {
        showResult();
    }
}

// ===== Показ результату =====
function showResult() {
    clearInterval(interval);
    const accuracy = Math.round((score / questions.length) * 100);
    resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
}

// ===== Старт гри =====
function startGame() {
    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    questionIndex = 0;
    score = 0;
    scoreDisplay.innerText = `★ 0`;
    showQuestion(questions[questionIndex]);
}

// ===== Таймер =====
function startTimer() {
    timer = 15;
    timerDisplay.innerText = `⏳ ${timer}`;
    interval = setInterval(() => {
        timer--;
        timerDisplay.innerText = `⏳ ${timer}`;
        if (timer <= 0) {
            clearInterval(interval);
            document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
            setTimeout(nextQuestion, 500);
        }
    }, 1000);
}

// ===== Слухачі подій =====
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
