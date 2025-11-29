// ---------- DATA ----------
const subjects = ["Math", "English", "Science"];
const grades = [
    "JK", "K", "Grade 1", "Grade 2", "Grade 3", 
    "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", 
    "Grade 9", "Grade 10", "Grade 11", "Grade 12"
];

// Example questions for demonstration
const questionsDB = {
    "JK": [
        { question: "What is 1 + 1?", answer: "2" },
        { question: "What color is the sky?", answer: "blue" },
        { question: "How many fingers do you have?", answer: "10" },
        { question: "What comes after 2?", answer: "3" },
        { question: "Which animal says 'meow'?", answer: "cat" },
        { question: "What do you drink?", answer: "water" },
        { question: "What shape is a ball?", answer: "circle" },
        { question: "What color is grass?", answer: "green" },
        { question: "Which animal barks?", answer: "dog" },
        { question: "What do we use to write?", answer: "pen" }
    ],
    "Grade 4": [
        { question: "5 x 5 = ?", answer: "25" },
        { question: "Capital of France?", answer: "paris" },
        { question: "Water freezes at what °C?", answer: "0" },
        { question: "Which planet is closest to the sun?", answer: "mercury" },
        { question: "Opposite of hot?", answer: "cold" },
        { question: "What is 12/4?", answer: "3" },
        { question: "Largest continent?", answer: "asia" },
        { question: "Which gas do we breathe in?", answer: "oxygen" },
        { question: "Which animal lays eggs?", answer: "chicken" },
        { question: "What do bees make?", answer: "honey" }
    ]
    // Add more grades with 20/30 questions as needed
};

// ---------- GLOBALS ----------
let currentGrade = "";
let currentSubject = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// ---------- DOM REFERENCES ----------
const content = document.getElementById("content");

// ---------- NAV BUTTONS ----------
document.getElementById("homeBtn").addEventListener("click", loadHome);
document.getElementById("profileBtn").addEventListener("click", loadProfile);
document.getElementById("aboutBtn").addEventListener("click", loadAbout);

// ---------- PAGES ----------
function loadHome() {
    content.innerHTML = `
        <div class="card">
            <h2>Select Grade & Subject</h2>
            <div class="selectors">
                <select id="gradeSelect">
                    <option value="">Select Grade</option>
                    ${grades.map(g => `<option value="${g}">${g}</option>`).join("")}
                </select>
                <select id="subjectSelect">
                    <option value="">Select Subject</option>
                    ${subjects.map(s => `<option value="${s}">${s}</option>`).join("")}
                </select>
            </div>
            <button id="startQuizBtn">Start Quiz</button>
            <div id="feedback"></div>
        </div>
    `;

    document.getElementById("startQuizBtn").addEventListener("click", startQuiz);
}

function loadProfile() {
    content.innerHTML = `
        <div class="card">
            <h2>Student Profile</h2>
            <p>Edit your avatar:</p>
            <div class="avatar-select">
                <button onclick="setAvatar('🐱')">🐱</button>
                <button onclick="setAvatar('🐶')">🐶</button>
                <button onclick="setAvatar('🐍')">🐍</button>
            </div>
            <div id="currentAvatar" style="font-size: 50px; margin-top: 20px;"></div>
        </div>
    `;
}

function loadAbout() {
    content.innerHTML = `
        <div class="card">
            <h2>About LearnLab</h2>
            <p>This is a demo educational platform by jxqunishim@gmail.com</p>
        </div>
    `;
}

// ---------- AVATAR ----------
function setAvatar(icon) {
    document.getElementById("currentAvatar").textContent = icon;
}

// ---------- QUIZ ----------
function startQuiz() {
    const gradeSelect = document.getElementById("gradeSelect").value;
    const subjectSelect = document.getElementById("subjectSelect").value;

    if (!gradeSelect || !subjectSelect) {
        alert("Please select both grade and subject!");
        return;
    }

    currentGrade = gradeSelect;
    currentSubject = subjectSelect;
    currentQuestions = questionsDB[currentGrade] || [];
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    content.innerHTML = `
        <div class="card">
            <h2>Grade: ${currentGrade} | Subject: ${currentSubject}</h2>
            <p>Question ${currentQuestionIndex + 1}/${currentQuestions.length}</p>
            <p><b>${q.question}</b></p>
            <input type="text" id="answerInput" placeholder="Your answer">
            <button id="submitAnswerBtn">Submit</button>
            <div id="feedback"></div>
            <p>Score: ${score}/${currentQuestions.length}</p>
        </div>
    `;

    document.getElementById("submitAnswerBtn").addEventListener("click", checkAnswer);
}

function checkAnswer() {
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    const q = currentQuestions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");

    if (input === q.answer.toLowerCase()) {
        feedback.textContent = "✅ Correct!";
        score++;
    } else {
        feedback.textContent = `❌ Wrong! Correct: ${q.answer}`;
    }

    currentQuestionIndex++;
    setTimeout(showQuestion, 1000);
}

function showResults() {
    content.innerHTML = `
        <div class="card">
            <h2>Quiz Completed!</h2>
            <p>Your Score: ${score} / ${currentQuestions.length}</p>
            <p>${(score / currentQuestions.length * 100) >= 50 ? "🎉 You Passed!" : "⚠️ You Failed!"}</p>
            <button onclick="loadHome()">Return Home</button>
        </div>
    `;
}

// ---------- INITIAL ----------
loadHome();
