// Questions per subject
const questions = {
    math: [
        { q: "7 + 6 = ?", a: "13" },
        { q: "5 x 3 = ?", a: "15" },
        { q: "12 - 4 = ?", a: "8" },
        { q: "9 / 3 = ?", a: "3" },
        { q: "15 - 7 = ?", a: "8" },
        { q: "6 x 6 = ?", a: "36" },
        { q: "10 + 15 = ?", a: "25" },
        { q: "18 ÷ 2 = ?", a: "9" },
        { q: "20 - 5 = ?", a: "15" },
        { q: "8 + 7 = ?", a: "15" }
    ],
    reading: [
        { q: 'Where did the cat sit in: "The cat sat on the warm windowsill."', a: "window" },
        { q: 'What is the color of the cat in: "The black cat ran fast."', a: "black" },
        { q: 'What animal is in: "The dog barked loudly."', a: "dog" },
        { q: 'What object: "The book is on the table."', a: "book" },
        { q: 'What did the boy eat: "The boy ate an apple."', a: "apple" },
        { q: 'What color: "The sky is blue."', a: "blue" },
        { q: 'Who is happy: "Anna is smiling."', a: "anna" },
        { q: 'What did he drink: "He drank water."', a: "water" },
        { q: 'What is red: "The apple is red."', a: "apple" },
        { q: 'Where is the cat: "The cat is under the table."', a: "under" }
    ],
    science: [
        { q: "What do plants need to grow?", a: ["sun","water","light"] },
        { q: "What gas do humans breathe in?", a: "oxygen" },
        { q: "What do humans need to survive?", a: ["food","water"] },
        { q: "What planet do we live on?", a: "earth" },
        { q: "What force keeps us on the ground?", a: "gravity" },
        { q: "What organ pumps blood?", a: "heart" },
        { q: "What gas do plants produce?", a: "oxygen" },
        { q: "What do bees collect?", a: "nectar" },
        { q: "What do fish breathe?", a: "water" },
        { q: "What causes day and night?", a: "rotation" }
    ]
};

let currentSubject = "";
let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

function shuffleArray(arr) {
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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
        scoreDiv.textContent = `Score: ${score} / ${shuffledQuestions.length}`;
        scoreDiv.classList.add("update");
        setTimeout(() => scoreDiv.classList.remove("update"), 300);
    }
}

// Load home
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

    shuffledQuestions = shuffleArray([...questions[subject]]); // shuffle each time

    if (!document.getElementById("score")) {
        const scoreDiv = document.createElement("div");
        scoreDiv.id = "score";
        scoreDiv.textContent = `Score: 0 / ${shuffledQuestions.length}`;
        document.body.appendChild(scoreDiv);
    }

    showQuestion();
}

// Show question
function showQuestion() {
    const q = shuffledQuestions[currentQuestion];
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
    const q = shuffledQuestions[currentQuestion];
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
    if (currentQuestion < shuffledQuestions.length) {
        setTimeout(showQuestion, 1800);
    } else {
        setTimeout(showResult, 1800);
    }
}

// Show final result
function showResult() {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let msg = percentage === 100 ? "🎉 You passed!" : (percentage <= 50 ? "❌ You failed!" : "👍 Good try!");

    document.getElementById("content").innerHTML = `
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentSubject.toUpperCase()} Test Completed</h2>
            <p>Your Score: ${score} / ${shuffledQuestions.length} (${percentage}%)</p>
            <h3>${msg}</h3>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
}
