let selectedGrade = "";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

/* Save & Load Profile */
let student = {
    name: localStorage.getItem("studentName") || "",
    grade: localStorage.getItem("studentGrade") || ""
};

function openProfile() {
    document.getElementById("content").innerHTML = `
        <div class="profile-box">
            <h2>Student Profile</h2>
            <label>Name:</label><br>
            <input id="profileName" value="${student.name}">
            <br><br>

            <label>Grade:</label><br>
            <input id="profileGrade" value="${student.grade}">
            <br><br>

            <button onclick="saveProfile()">Save Profile</button>
        </div>
    `;
}

function saveProfile() {
    student.name = document.getElementById("profileName").value;
    student.grade = document.getElementById("profileGrade").value;

    localStorage.setItem("studentName", student.name);
    localStorage.setItem("studentGrade", student.grade);

    loadHome();
}

/* Question bank */
const questionBank = {
    "JK": [
        { q: "What color is the sky?", a: "blue" },
        { q: "How many wheels does a car have?", a: "4" },
        { q: "What sound does a cat make?", a: "meow" }
    ],

    "Grade 4": [
        { q: "20 ÷ 4 = ?", a: "5" },
        { q: "What gas do plants absorb?", a: "carbon dioxide" },
        { q: "Opposite of 'brave'?", a: "scared" }
    ],

    "Grade 8": [
        { q: "Solve: 3x + 9 = 21", a: "4" },
        { q: "What is the capital of Canada?", a: "ottawa" },
        { q: "What is the chemical symbol for water?", a: "h2o" }
    ],

    "Grade 12": [
        { q: "Derivative of x²?", a: "2x" },
        { q: "Who wrote Hamlet?", a: "shakespeare" },
        { q: "What is the mitochondria?", a: "powerhouse of the cell" }
    ]
};

/* Determine number of questions */
function getQuestionCount() {
    if (["JK","SK","Grade 1","Grade 2","Grade 3"].includes(selectedGrade)) return 10;
    if (["Grade 4","Grade 5","Grade 6","Grade 7","Grade 8"].includes(selectedGrade)) return 20;
    return 30;
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* Grade menu */
function selectGrade() {
    selectedGrade = document.getElementById("gradeSelect").value;
    if (!selectedGrade) return;

    loadQuiz();
}

/* Load quiz */
function loadQuiz() {
    const total = getQuestionCount();
    let base = questionBank[selectedGrade] || questionBank["JK"];

    while (base.length < total) base = base.concat(base);

    currentQuestions = shuffle(base).slice(0, total);

    currentIndex = 0;
    score = 0;

    document.getElementById("scoreBox")?.remove();

    let box = document.createElement("div");
    box.id = "scoreBox";
    box.innerText = `Score: 0 / ${total}`;
    document.body.appendChild(box);

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
    let box = document.getElementById("feedbackBox");
    box.innerText = msg;
    box.style.color = color;

    box.classList.add("show");
    box.classList.remove("hidden");

    setTimeout(() => {
        box.classList.remove("show");
    }, 1000);
}

/* Submit answer */
function submitAnswer() {
    let input = document.getElementById("answerInput").value.toLowerCase().trim();
    let correct = currentQuestions[currentIndex].a.toLowerCase().trim();

    if (input === correct) {
        score++;
        showFeedback("Correct!", "#00FFAA");
    } else {
        showFeedback("Incorrect!", "#FF5555");
    }

    updateScore();

    currentIndex++;

    if (currentIndex >= currentQuestions.length) {
        finishQuiz();
    } else {
        setTimeout(showQuestion, 800);
    }
}

function updateScore() {
    document.getElementById("scoreBox").innerText =
        `Score: ${score} / ${getQuestionCount()}`;
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

/* Home */
function loadHome() {
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Welcome, ${student.name || "Student"}!</h2>
            <p>Select your grade from the top menu to begin a quiz.</p>
        </div>
    `;
}

window.onload = loadHome;
