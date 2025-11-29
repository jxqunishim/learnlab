/* -------------------------
   Helper Functions
-------------------------- */

function showFeedback(message, correct) {
    const box = document.getElementById("feedbackBox");
    box.style.display = "block";
    box.textContent = message;

    box.style.background = correct ? "#22c55e" : "#ef4444";
    box.style.boxShadow = correct ? "0 0 25px #22c55e" : "0 0 25px #ef4444";

    setTimeout(() => {
        box.style.display = "none";
    }, 1200);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getQuestionCount(grade) {
    if (["JK", "SK", "Grade 1", "Grade 2", "Grade 3"].includes(grade)) return 10;
    if (["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"].includes(grade)) return 20;
    return 30; // grades 9–12
}

/* -------------------------
   QUESTION BANK
-------------------------- */

const questionBank = {
    math: {
        easy: [
            { q: "2 + 3 = ?", a: "5" },
            { q: "7 - 4 = ?", a: "3" },
            { q: "1 + 6 = ?", a: "7" },
            { q: "5 - 2 = ?", a: "3" },
            { q: "10 - 8 = ?", a: "2" }
        ],
        medium: [
            { q: "12 + 15 = ?", a: "27" },
            { q: "9 × 3 = ?", a: "27" },
            { q: "45 ÷ 5 = ?", a: "9" },
            { q: "8 × 7 = ?", a: "56" },
            { q: "63 ÷ 9 = ?", a: "7" }
        ],
        hard: [
            { q: "Solve: 2x + 5 = 17. What is x?", a: "6" },
            { q: "Square root of 144?", a: "12" },
            { q: "5² + 3² = ?", a: "34" },
            { q: "Solve: 3x = 81", a: "27" },
            { q: "What is 15% of 200?", a: "30" }
        ]
    },

    reading: {
        easy: [
            { q: "Finish the sentence: 'The dog ran to the ____.'", a: "park" },
            { q: "What color is the sky on a clear day?", a: "blue" },
            { q: "A cat says ____.", a: "meow" }
        ],
        medium: [
            { q: "In the sentence 'Sam ate a red apple', what color was the apple?", a: "red" },
            { q: "What is the opposite of 'big'?", a: "small" },
            { q: "Which word means the same as 'happy'?", a: "joyful" }
        ],
        hard: [
            { q: "What is the main idea of a text called?", a: "theme" },
            { q: "A story passed down generations is a ____.", a: "myth" },
            { q: "What is a word with a similar meaning called?", a: "synonym" }
        ]
    },

    science: {
        easy: [
            { q: "Plants need sunlight and ____ to grow.", a: "water" },
            { q: "Humans breathe in ____.", a: "oxygen" },
            { q: "The sun is a ____.", a: "star" }
        ],
        medium: [
            { q: "Water freezes at ____°C.", a: "0" },
            { q: "The Earth orbits the ____.", a: "sun" },
            { q: "Humans have ____ senses.", a: "5" }
        ],
        hard: [
            { q: "The powerhouse of the cell is the ____.", a: "mitochondria" },
            { q: "H2O is the chemical formula for ____.", a: "water" },
            { q: "Force that keeps us on the ground?", a: "gravity" }
        ]
    }
};

/* -------------------------
   QUIZ ENGINE
-------------------------- */

let currentQuiz = [];
let currentIndex = 0;
let correctAnswers = 0;

function startQuiz(subject) {
    const grade = document.getElementById("gradeSelect").value;
    if (!grade) {
        showFeedback("Select Grade First!", false);
        return;
    }

    let difficulty = "easy";
    if (["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"].includes(grade)) difficulty = "medium";
    if (["Grade 9", "Grade 10", "Grade 11", "Grade 12"].includes(grade)) difficulty = "hard";

    let questionCount = getQuestionCount(grade);

    currentQuiz = shuffle([...questionBank[subject][difficulty]]).slice(0, questionCount);
    currentIndex = 0;
    correctAnswers = 0;

    loadQuestion();
}

function loadHome() {
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Welcome to LearnLab</h2>
            <p>Select a subject above to begin your quiz!</p>
        </div>
    `;
    document.getElementById("scoreBox").textContent = "Score: 0%";
}

function loadQuestion() {
    if (currentIndex >= currentQuiz.length) {
        endQuiz();
        return;
    }

    const q = currentQuiz[currentIndex];

    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Question ${currentIndex + 1} of ${currentQuiz.length}</h2>
            <p style="font-size:22px; margin-top:10px;">${q.q}</p>
            <input id="answerInput" placeholder="Your answer...">
            <br>
            <button onclick="submitAnswer()">Submit</button>
        </div>
    `;
}

function submitAnswer() {
    let userAns = document.getElementById("answerInput").value.trim().toLowerCase();
    let correctAns = currentQuiz[currentIndex].a.toLowerCase();

    if (userAns === correctAns) {
        correctAnswers++;
        showFeedback("Correct!", true);
    } else {
        showFeedback("Incorrect!", false);
    }

    document.getElementById("scoreBox").textContent =
        `Score: ${Math.round((correctAnswers / currentQuiz.length) * 100)}%`;

    currentIndex++;
    setTimeout(loadQuestion, 500);
}

function endQuiz() {
    let score = Math.round((correctAnswers / currentQuiz.length) * 100);
    let message = score >= 50 ? "You Passed! 🎉" : "You Failed ❌";

    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Quiz Complete</h2>
            <h3>Your Score: ${score}%</h3>
            <h2>${message}</h2>
            <button onclick="loadHome()">Return Home</button>
        </div>
    `;
}

/* Load home on start */
window.onload = loadHome;

