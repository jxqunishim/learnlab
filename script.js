let selectedGrade = "";
let questions = [];
let currentQ = 0;
let score = 0;

const allQuestions = {
    "JK": [
        { q: "2 + 1 = ?", a: "3" },
        { q: "Color of the sky?", a: "blue" },
        { q: "Number of fingers?", a: "10" }
    ],
    "K": [
        { q: "5 - 2 = ?", a: "3" },
        { q: "Which is a fruit?", a: "apple" },
        { q: "Shape with 3 sides?", a: "triangle" }
    ],
    "1": [
        { q: "7 + 5 = ?", a: "12" },
        { q: "First letter of alphabet?", a: "a" },
        { q: "How many days in a week?", a: "7" }
    ]
    // Add more grades if needed
};

function selectGrade() {
    const dropdown = document.getElementById("gradeDropdown");
    selectedGrade = dropdown.value;
    if (selectedGrade) {
        loadQuiz();
    } else {
        loadHome();
    }
}

function loadHome() {
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center;">Choose your grade</h2>
    `;
    document.getElementById("feedback").style.display = "none";
}

function loadQuiz() {
    if (!allQuestions[selectedGrade]) {
        document.getElementById("content").innerHTML = "<p>No questions for this grade yet.</p>";
        return;
    }

    questions = [...allQuestions[selectedGrade]]; // clone
    shuffleArray(questions);
    currentQ = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQ >= questions.length) {
        document.getElementById("content").innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>Your Score: ${score} / ${questions.length} (${Math.round(score / questions.length * 100)}%)</p>
            <button onclick="loadQuiz()">Retry</button>
        `;
        return;
    }

    const q = questions[currentQ];
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Question ${currentQ + 1} of ${questions.length}</h2>
            <p>${q.q}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br><br>
            <button onclick="submitAnswer()">Submit</button>
        </div>
    `;
    document.getElementById("feedback").style.display = "none";
}

function submitAnswer() {
    const input = document.getElementById("answerInput").value.toLowerCase();
    const correct = input == questions[currentQ].a.toLowerCase();

    if (correct) score++;

    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.style.display = "block";
    feedbackDiv.textContent = correct ? "Correct! ✅" : `Wrong! ❌ Answer: ${questions[currentQ].a}`;
    feedbackDiv.classList.add("pop");

    currentQ++;
    setTimeout(showQuestion, 1000);
}

// Utility: shuffle array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Load home on start
window.onload = loadHome;
