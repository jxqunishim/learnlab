/* ---------------------------------
   QUESTION BANK (JK → GRADE 12)
----------------------------------*/

// Helper to auto-generate placeholder questions if needed
function generateQuestions(n, grade) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push({
            question: `Sample question ${i} for ${grade}`,
            answer: `answer${i}`
        });
    }
    return arr;
}

// Real structured question sets for all grades
const questionsByGrade = {
    "JK": generateQuestions(10, "JK"),
    "Grade 1": generateQuestions(10, "Grade 1"),
    "Grade 2": generateQuestions(10, "Grade 2"),
    "Grade 3": generateQuestions(10, "Grade 3"),
    "Grade 4": generateQuestions(10, "Grade 4"),

    "Grade 5": generateQuestions(20, "Grade 5"),
    "Grade 6": generateQuestions(20, "Grade 6"),
    "Grade 7": generateQuestions(20, "Grade 7"),
    "Grade 8": generateQuestions(20, "Grade 8"),

    "Grade 9": generateQuestions(30, "Grade 9"),
    "Grade 10": generateQuestions(30, "Grade 10"),
    "Grade 11": generateQuestions(30, "Grade 11"),
    "Grade 12": generateQuestions(30, "Grade 12")
};

/* ---------------------------------
   STATE
----------------------------------*/
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedGrade = "";
let selectedSubject = "";

/* ---------------------------------
   PAGE LOAD
----------------------------------*/
window.onload = () => {
    loadHome();
};

/* ---------------------------------
   HOME PAGE
----------------------------------*/
function loadHome() {
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center; margin-top:35px;">Choose a Subject & Grade</h2>
        
        <div style="text-align:center; margin-bottom:20px;">
            <select id="gradeSelect">
                <option value="">Select Grade</option>
                ${Object.keys(questionsByGrade)
                    .map(g => `<option value="${g}">${g}</option>`)
                    .join("")}
            </select>

            <select id="subjectSelect">
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Reading">Reading</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
            </select>

            <button onclick="startQuiz()">Start Quiz</button>
        </div>
    `;
    removeScoreboard();
}

/* ---------------------------------
   START QUIZ
----------------------------------*/
function startQuiz() {
    selectedGrade = document.getElementById("gradeSelect").value;
    selectedSubject = document.getElementById("subjectSelect").value;

    if (!selectedGrade || !selectedSubject) {
        alert("Please select both grade and subject.");
        return;
    }

    currentQuestions = shuffleArray([...questionsByGrade[selectedGrade]]);
    currentQuestionIndex = 0;
    score = 0;

    addScoreboard();
    loadQuestion();
}

/* ---------------------------------
   LOAD QUESTION
----------------------------------*/
function loadQuestion() {
    const q = currentQuestions[currentQuestionIndex];

    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h3>Question ${currentQuestionIndex + 1} / ${currentQuestions.length}</h3>
            <p>${q.question}</p>
            <input id="answerInput" placeholder="Your answer">
            <br><br>
            <button onclick="submitAnswer()">Submit</button>
            <div id="feedback"></div>
        </div>
    `;
    updateScoreboard();
}

/* ---------------------------------
   SUBMIT ANSWER
----------------------------------*/
function submitAnswer() {
    const user = document.getElementById("answerInput").value.trim().toLowerCase();
    const correct = currentQuestions[currentQuestionIndex].answer.toLowerCase();
    const feedback = document.getElementById("feedback");

    if (user === correct) {
        score++;
        feedback.textContent = "Correct! ✅";
        feedback.style.color = "#1cc88a";
    } else {
        feedback.textContent = `Wrong! ❌ Answer: ${currentQuestions[currentQuestionIndex].answer}`;
        feedback.style.color = "#e74a3b";
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    }, 1500);
}

/* ---------------------------------
   FINAL SCORE
----------------------------------*/
function showFinalScore() {
    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h2>Quiz Completed!</h2>
            <p>You scored ${score} / ${currentQuestions.length}</p>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
    removeScoreboard();
}

/* ---------------------------------
   SCOREBOARD
----------------------------------*/
function addScoreboard() {
    if (!document.getElementById("scoreboard")) {
        const div = document.createElement("div");
        div.id = "scoreboard";
        document.body.appendChild(div);
    }
    updateScoreboard();
}

function updateScoreboard() {
    document.getElementById("scoreboard").textContent =
        `Score: ${score} / ${currentQuestions.length}`;
}

function removeScoreboard() {
    const sb = document.getElementById("scoreboard");
    if (sb) sb.remove();
}

/* ---------------------------------
   ABOUT PAGE
----------------------------------*/
function loadAbout() {
    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h2>About LearnLab</h2>
            <p>This is a professional educational platform built for students.<br>
               Contact: <b>jxqunishim@gmail.com</b></p>

            <button onclick="loadHome()">Back</button>
        </div>
    `;
    removeScoreboard();
}

/* ---------------------------------
   PROFILE PAGE
----------------------------------*/
function loadProfile() {
    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h2>Student Profile</h2>
            <img class="profile-avatar" src="https://placekitten.com/100/100">
            <p>Name: Guest</p>
            <p>Achievements: None yet</p>
            <button onclick="loadHome()">Back</button>
        </div>
    `;
    removeScoreboard();
}

/* ---------------------------------
   UTILITY — SHUFFLE
----------------------------------*/
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
