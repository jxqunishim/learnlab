// ------------------ GLOBAL VARIABLES ------------------
let selectedGrade = "";
let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

// Example questions for demonstration (replace/add more later)
const questionsByGrade = {
    "JK": [
        { question: "What color is the sky?", options:["Blue","Red","Green"], answer: "Blue" },
        { question: "How many legs does a cat have?", options:["2","4","6"], answer: "4" },
        { question: "Which one is a fruit?", options:["Apple","Car","Rock"], answer: "Apple" }
    ],
    "Grade 1": [
        { question: "5 + 3 = ?", options:["7","8","9"], answer: "8" },
        { question: "Which animal says 'moo'?", options:["Cow","Dog","Cat"], answer: "Cow" },
        { question: "Select the primary color", options:["Blue","Pink","Gray"], answer: "Blue" }
    ],
    // Add more grades here...
};

// ------------------ LOAD HOME ------------------
function loadHome() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2 style="text-align:center; margin-bottom:30px;">Choose a Subject</h2>
        <div class="subject-grid">
            <div class="subject-card" onclick="startQuiz('Math')">
                <h3>Math</h3>
                <p>Practice skills & challenges</p>
            </div>
            <div class="subject-card" onclick="startQuiz('Reading')">
                <h3>Reading</h3>
                <p>Comprehension & vocabulary</p>
            </div>
            <div class="subject-card" onclick="startQuiz('Science')">
                <h3>Science</h3>
                <p>Learn about the world</p>
            </div>
        </div>
    `;
}

// ------------------ GRADE SELECTION ------------------
function selectGrade() {
    const select = document.getElementById("gradeSelect");
    selectedGrade = select.value;
    if (!selectedGrade) return;
    showFeedback(`Selected Grade: ${selectedGrade}`, true);
}

// ------------------ FEEDBACK POPUP ------------------
function showFeedback(message, success=true) {
    const feedback = document.getElementById("feedbackBox");
    feedback.textContent = message;
    feedback.style.color = success ? "#0ff" : "#ff4d4d";
    feedback.classList.add("show");
    setTimeout(() => {
        feedback.classList.remove("show");
    }, 2000);
}

// ------------------ START QUIZ ------------------
function startQuiz(subject) {
    if (!selectedGrade) {
        showFeedback("Please select a grade first!", false);
        return;
    }

    // Get questions for grade
    currentQuiz = questionsByGrade[selectedGrade] || [];
    if (currentQuiz.length === 0) {
        showFeedback("No questions available for this grade!", false);
        return;
    }

    // Shuffle questions
    currentQuiz = currentQuiz.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

// ------------------ SHOW QUESTION ------------------
function showQuestion() {
    const content = document.getElementById("content");
    const q = currentQuiz[currentQuestionIndex];

    content.innerHTML = `
        <div class="quiz-box">
            <h2>Question ${currentQuestionIndex+1} of ${currentQuiz.length}</h2>
            <p>${q.question}</p>
            ${q.options.map((opt, i) => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join("")}
            <p style="margin-top:15px; color:#1cc8ff; float:right;">Score: ${score}</p>
        </div>
    `;
}

// ------------------ CHECK ANSWER ------------------
function checkAnswer(selected) {
    const correctAnswer = currentQuiz[currentQuestionIndex].answer;
    if (selected === correctAnswer) {
        score++;
        showFeedback("Correct!", true);
    } else {
        showFeedback(`Wrong! Answer: ${correctAnswer}`, false);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

// ------------------ SHOW QUIZ RESULT ------------------
function showQuizResult() {
    const content = document.getElementById("content");
    const percent = Math.round((score / currentQuiz.length) * 100);
    const passed = percent >= 50 ? "Passed ✅" : "Failed ❌";

    content.innerHTML = `
        <div class="quiz-box">
            <h2>Quiz Finished!</h2>
            <p>Your Score: ${score} / ${currentQuiz.length} (${percent}%)</p>
            <h3>${passed}</h3>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
}

// ------------------ PROFILE MODAL ------------------
function openProfile() {
    const modal = document.getElementById("profileModal");
    modal.classList.remove("hidden");
    document.getElementById("profileContent").innerHTML = `
        <h3>Welcome, Student!</h3>
        <p>Select an avatar and track achievements (coming soon!)</p>
    `;
}

function closeProfile() {
    document.getElementById("profileModal").classList.add("hidden");
}

// ------------------ INITIAL LOAD ------------------
window.onload = loadHome;
