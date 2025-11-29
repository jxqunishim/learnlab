// Questions
const questions = {
    math: [
        { q: "7 + 6 = ?", a: "13" },
        { q: "5 x 3 = ?", a: "15" },
        { q: "12 - 4 = ?", a: "8" }
    ],
    reading: [
        { q: 'Where did the cat sit in: "The cat sat on the warm windowsill."', a: "window" },
        { q: 'What is the color of the cat in: "The black cat ran fast."', a: "black" }
    ],
    science: [
        { q: "What do plants need to grow?", a: ["sun","water","light"] },
        { q: "What gas do humans breathe in?", a: "oxygen" }
    ]
};

let currentSubject = "";
let currentQuestion = 0;
let score = 0;
let timerInterval = null;

function showFeedback(message, correct) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = message;
    feedbackDiv.style.backgroundColor = correct ? "#1cc88a" : "#e74a3b";
    feedbackDiv.classList.remove("pop");
    void feedbackDiv.offsetWidth;
    feedbackDiv.classList.add("pop");
    feedbackDiv.style.opacity = "1";
    setTimeout(() => { feedbackDiv.style.opacity = "0"; }, 2000);
}

function updateScore() {
    const scoreDiv = document.getElementById("score");
    if (scoreDiv) {
        scoreDiv.textContent = `Score: ${score} / ${questions[currentSubject].length}`;
        scoreDiv.classList.add("update");
        setTimeout(() => scoreDiv.classList.remove("update"), 300);
    }
}

// Load home page
window.onload = loadHome;

function loadHome() {
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center; margin-top:35px;">Choose a Subject</h2>
        <div class="subject-grid">
            <div class="subject-card" onclick="startTest('math')"><h3>Math</h3><p>Practice skills & challenges</p></div>
            <div class="subject-card" onclick="startTest('reading')"><h3>Reading</h3><p>Comprehension & vocabulary</p></div>
            <div class="subject-card" onclick="startTest('science')"><h3>Science</h3><p>Learn about the world</p></div>
        </div>
    `;
    const scoreDiv = document.getElementById("score");
    if (scoreDiv) scoreDiv.remove();
}

// Start test
function startTest(subject) {
    currentSubject = subject;
    currentQuestion = 0;
    score = 0;

    if (!document.getElementById("score")) {
        const scoreDiv = document.createElement("div");
        scoreDiv.id = "score";
        scoreDiv.textContent = `Score: 0 / ${questions[subject].length}`;
        document.body.appendChild(scoreDiv);
    }
    showQuestion();
}

// Show question
function showQuestion() {
    if (timerInterval) clearInterval(timerInterval);
    const q = questions[currentSubject][currentQuestion];

    document.getElementById("content").innerHTML = `
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentSubject.toUpperCase()} Question ${currentQuestion+1}</h2>
            <p>${q.q}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="checkAnswer()">Submit</button>
        </div>
    `;
}

// Check answer
function checkAnswer() {
    const q = questions[currentSubject][currentQuestion];
    const ans = document.getElementById("answerInput").value.toLowerCase();
    let correct = false;

    if (Array.isArray(q.a)) {
        correct = q.a.some(a => ans.includes(a));
    } else {
        correct = ans.includes(q.a.toLowerCase());
    }

    if (correct) {
        score++;
        showFeedback("Correct! ✅", true);
    } else {
        showFeedback("Try again! ❌", false);
    }

    updateScore();

    currentQuestion++;
    if (currentQuestion < questions[currentSubject].length) {
        setTimeout(showQuestion, 1800);
    } else {
        setTimeout(showResult, 1800);
    }
}

// Show final result
function showResult() {
    const percentage = Math.round((score / questions[currentSubject].length) * 100);
    let msg = percentage === 100 ? "🎉 You passed!" : (percentage <= 50 ? "❌ You failed!" : "👍 Good try!");

    document.getElementById("content").innerHTML = `
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentSubject.toUpperCase()} Test Completed</h2>
            <p>Your Score: ${score} / ${questions[currentSubject].length} (${percentage}%)</p>
            <h3>${msg}</h3>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
}
