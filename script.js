let selectedGrade = "";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

/* Question bank */
const questionBank = {
    "JK": [
        { q: "What color is the sky?", a: "blue" },
        { q: "How many fingers on one hand?", a: "5" },
        { q: "What sound does a dog make?", a: "bark" }
    ],

    "Grade 5": [
        { q: "12 × 4 = ?", a: "48" },
        { q: "What planet is known as the Red Planet?", a: "mars" },
        { q: "What is the past tense of 'run'?", a: "ran" }
    ],

    "Grade 9": [
        { q: "Solve: 2x + 6 = 14 (x = ?)", a: "4" },
        { q: "What gas do plants release?", a: "oxygen" },
        { q: "What is the square root of 81?", a: "9" }
    ],

    "Grade 12": [
        { q: "Derivative of 3x²?", a: "6x" },
        { q: "Who wrote 'Macbeth'?", a: "shakespeare" },
        { q: "What is the powerhouse of the cell?", a: "mitochondria" }
    ]
};

/* Determine number of questions */
function getQuestionCount() {
    if (["JK","SK","Grade 1","Grade 2","Grade 3"].includes(selectedGrade)) return 10;
    if (["Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"].includes(selectedGrade)) return 20;
    return 30;
}

/* Shuffle array */
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* Grade selected */
function selectGrade() {
    selectedGrade = document.getElementById("gradeSelect").value;
    if (!selectedGrade) return;

    loadQuiz();
}

/* Load quiz */
function loadQuiz() {
    const total = getQuestionCount();

    let baseQuestions = questionBank[selectedGrade] || questionBank["JK"];
    let multiplied = [];

    while (multiplied.length < total) {
        multiplied.push(...baseQuestions);
    }

    currentQuestions = shuffle(multiplied).slice(0, total);
    currentIndex = 0;
    score = 0;

    document.getElementById("scoreBox")?.remove();

    let scoreBox = document.createElement("div");
    scoreBox.id = "scoreBox";
    scoreBox.innerText = `Score: 0 / ${total}`;
    document.body.appendChild(scoreBox);

    showQuestion();
}

/* Show question */
function showQuestion() {
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Question ${currentIndex + 1}</h2>
            <p>${currentQuestions[currentIndex].q}</p>
            <input id="answerInput" placeholder="Your answer">
            <button onclick="submitAnswer()">Submit</button>
        </div>
    `;
}

/* Feedback popup */
function showFeedback(msg, color) {
    const box = document.getElementById("feedbackBox");
    box.innerText = msg;
    box.style.color = color;
    box.classList.add("show");
    box.classList.remove("hidden");

    setTimeout(() => {
        box.classList.remove("show");
    }, 1200);
}

/* Submit answer */
function submitAnswer() {
    let input = document.getElementById("answerInput").value.toLowerCase().trim();
    let correct = currentQuestions[currentIndex].a.toLowerCase();

    if (input === correct) {
        score++;
        showFeedback("Correct!", "green");
    } else {
        showFeedback("Incorrect!", "red");
    }

    updateScore();
    next();
}

function updateScore() {
    document.getElementById("scoreBox").innerText =
        `Score: ${score} / ${getQuestionCount()}`;
}

function next() {
    currentIndex++;

    if (currentIndex >= currentQuestions.length) {
        finishQuiz();
    } else {
        setTimeout(showQuestion, 800);
    }
}

/* Finish quiz */
function finishQuiz() {
    let total = getQuestionCount();
    let percent = Math.round((score / total) * 100);

    let result = percent >= 50 ? "PASS ✅" : "FAIL ❌";

    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Your Score: ${percent}%</h2>
            <h3>${result}</h3>
            <button onclick="loadHome()">Back Home</button>
        </div>
    `;
}

/* Home screen */
function loadHome() {
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Welcome to LearnLab</h2>
            <p>Select a grade from the top-right menu to begin.</p>
        </div>
    `;
}

window.onload = loadHome;
