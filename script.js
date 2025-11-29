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
// ------------------ EXPANDED QUESTION POOLS ------------------

// JK to Grade 3 → 10 questions
questionsByGrade["JK"] = [
    { question: "What color is the sun?", options:["Yellow","Blue","Red"], answer:"Yellow" },
    { question: "How many legs does a spider have?", options:["6","8","10"], answer:"8" },
    { question: "Which is a fruit?", options:["Apple","Car","Shoe"], answer:"Apple" },
    { question: "What sound does a dog make?", options:["Meow","Woof","Moo"], answer:"Woof" },
    { question: "Select the circle", options:["Circle","Square","Triangle"], answer:"Circle" },
    { question: "Which is a vegetable?", options:["Carrot","Apple","Cake"], answer:"Carrot" },
    { question: "Which one flies?", options:["Bird","Dog","Cat"], answer:"Bird" },
    { question: "Which is a number?", options:["4","Cat","Red"], answer:"4" },
    { question: "What is 1+1?", options:["1","2","3"], answer:"2" },
    { question: "Which animal has stripes?", options:["Tiger","Elephant","Cow"], answer:"Tiger" }
];

// Grades 4–8 → 20 questions
questionsByGrade["Grade 4"] = [
    { question: "12 ÷ 4 = ?", options:["2","3","4"], answer:"3" },
    { question: "What gas do we breathe in?", options:["Oxygen","Carbon Dioxide","Nitrogen"], answer:"Oxygen" },
    { question: "Which one is a planet?", options:["Earth","Sun","Moon"], answer:"Earth" },
    { question: "Who wrote 'Harry Potter'?", options:["Rowling","Tolkien","Lewis"], answer:"Rowling" },
    { question: "Which is a prime number?", options:["9","11","15"], answer:"11" },
    { question: "Water freezes at?", options:["0°C","100°C","50°C"], answer:"0°C" },
    { question: "What is H2O?", options:["Water","Hydrogen","Oxygen"], answer:"Water" },
    { question: "Which organ pumps blood?", options:["Heart","Lungs","Brain"], answer:"Heart" },
    { question: "Which is a mammal?", options:["Whale","Shark","Crocodile"], answer:"Whale" },
    { question: "7 x 8 = ?", options:["54","56","64"], answer:"56" },
    { question: "Lightning is caused by?", options:["Electricity","Wind","Rain"], answer:"Electricity" },
    { question: "Which is a continent?", options:["Asia","Greenland","Amazon"], answer:"Asia" },
    { question: "Which is renewable energy?", options:["Solar","Coal","Oil"], answer:"Solar" },
    { question: "Which is heavier?", options:["1kg iron","1kg feathers","Same"], answer:"Same" },
    { question: "5 + 6 - 2 = ?", options:["9","10","11"], answer:"9" },
    { question: "Which is acidic?", options:["Lemon","Milk","Sugar"], answer:"Lemon" },
    { question: "Earth revolves around?", options:["Sun","Moon","Mars"], answer:"Sun" },
    { question: "Which one is edible?", options:["Stone","Apple","Plastic"], answer:"Apple" },
    { question: "Which is a verb?", options:["Run","Blue","Tree"], answer:"Run" },
    { question: "Which is liquid?", options:["Water","Ice","Steam"], answer:"Water" }
];

// Grades 9–12 → 30 questions
questionsByGrade["Grade 9"] = [
    { question: "Solve: 5x + 3 = 18", options:["3","2","5"], answer:"3" },
    { question: "Which element is O?", options:["Oxygen","Gold","Hydrogen"], answer:"Oxygen" },
    { question: "Who discovered gravity?", options:["Newton","Einstein","Tesla"], answer:"Newton" },
    { question: "What is the capital of France?", options:["Paris","Berlin","London"], answer:"Paris" },
    { question: "H2 + O = ?", options:["Water","Hydrogen","Oxygen"], answer:"Water" },
    { question: "Which is a quadrilateral?", options:["Square","Triangle","Circle"], answer:"Square" },
    { question: "Speed = ?", options:["Distance/Time","Time/Distance","Distance+Time"], answer:"Distance/Time" },
    { question: "pH 7 is?", options:["Neutral","Acidic","Basic"], answer:"Neutral" },
    { question: "Light travels fastest in?", options:["Vacuum","Water","Air"], answer:"Vacuum" },
    { question: "Which is a renewable resource?", options:["Solar","Coal","Oil"], answer:"Solar" },
    { question: "Who painted Mona Lisa?", options:["Da Vinci","Van Gogh","Picasso"], answer:"Da Vinci" },
    { question: "Which is NOT a planet?", options:["Sun","Mars","Jupiter"], answer:"Sun" },
    { question: "Force = ?", options:["Mass x Acceleration","Mass/Acceleration","Mass+Acceleration"], answer:"Mass x Acceleration" },
    { question: "DNA stands for?", options:["Deoxyribonucleic Acid","Ribonucleic Acid","Acid"], answer:"Deoxyribonucleic Acid" },
    { question: "Which gas is essential for life?", options:["Oxygen","Carbon Dioxide","Nitrogen"], answer:"Oxygen" },
    { question: "Which is a compound?", options:["H2O","O2","N2"], answer:"H2O" },
    { question: "Which is an adjective?", options:["Beautiful","Run","Sky"], answer:"Beautiful" },
    { question: "Which is a mammal?", options:["Dolphin","Shark","Crocodile"], answer:"Dolphin" },
    { question: "E = mc^2 belongs to?", options:["Einstein","Newton","Tesla"], answer:"Einstein" },
    { question: "Which one is acidic?", options:["Lemon","Water","Sugar"], answer:"Lemon" },
    { question: "2x^2 + 3x = ?", options:["Algebra","Calculus","Geometry"], answer:"Algebra" },
    { question: "Who wrote 'Romeo & Juliet'?", options:["Shakespeare","Tolstoy","Hemingway"], answer:"Shakespeare" },
    { question: "Which is the largest planet?", options:["Jupiter","Earth","Mars"], answer:"Jupiter" },
    { question: "What is the freezing point of water?", options:["0°C","100°C","50°C"], answer:"0°C" },
    { question: "Which is a prime number?", options:["17","18","21"], answer:"17" },
    { question: "Speed of sound depends on?", options:["Medium","Color","Shape"], answer:"Medium" },
    { question: "Which organ pumps blood?", options:["Heart","Lungs","Brain"], answer:"Heart" },
    { question: "Which is an even number?", options:["22","13","7"], answer:"22" },
    { question: "Photosynthesis occurs in?", options:["Leaves","Roots","Stems"], answer:"Leaves" }
];

// ------------------ QUIZ LENGTH BASED ON GRADE ------------------
function getQuizLength() {
    if (selectedGrade === "JK" || selectedGrade === "Grade 1" || selectedGrade === "Grade 2" || selectedGrade === "Grade 3") return 10;
    if (selectedGrade === "Grade 4" || selectedGrade === "Grade 5" || selectedGrade === "Grade 6" || selectedGrade === "Grade 7" || selectedGrade === "Grade 8") return 20;
    return 30; // Grades 9–12
}

// ------------------ AVATARS ------------------
const avatars = ["🐱","🐶","🦊","🐼","🐸"];

function selectAvatar(index) {
    const avatarDisplay = document.getElementById("selectedAvatar");
    avatarDisplay.textContent = avatars[index];
    showFeedback(`Avatar Selected: ${avatars[index]}`, true);
}

// ------------------ ACHIEVEMENTS ------------------
let achievements = [];

function addAchievement(title) {
    if (!achievements.includes(title)) {
        achievements.push(title);
        updateAchievementsUI();
    }
}

function updateAchievementsUI() {
    const achList = document.getElementById("achievementsList");
    achList.innerHTML = achievements.map(a => `<li>${a}</li>`).join("");
}
