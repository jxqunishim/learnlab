let currentGrade = "";
let currentSubject = "";
let currentQuestions = [];
let score = 0;

// Sample questions generator
function generateQuestions(grade) {
    let questions = [];
    let numQuestions = 10;
    if (["5","6","7","8"].includes(grade)) numQuestions = 20;
    if (["9","10","11","12"].includes(grade)) numQuestions = 30;

    for(let i=1; i<=numQuestions; i++) {
        questions.push({
            question: `Sample Question ${i} for Grade ${grade}`,
            answer: `Answer ${i}`
        });
    }
    return shuffleArray(questions);
}

// Shuffle questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Navigation functions
function loadHome() {
    document.getElementById("content").innerHTML = `
        <div class="card">
            <h2>Welcome to LearnLab</h2>
            <p>Select a grade and subject to start learning!</p>
        </div>
    `;
}

function loadAbout() {
    document.getElementById("content").innerHTML = `
        <div class="card">
            <h2>About LearnLab</h2>
            <p>Contact: jxqunishim@gmail.com</p>
            <p>LearnLab is a fun and interactive learning platform for students from JK to Grade 12.</p>
        </div>
    `;
}

function loadProfile() {
    document.getElementById("content").innerHTML = `
        <div class="card">
            <h2>Profile</h2>
            <p>Select an avatar and view achievements here.</p>
        </div>
    `;
}

// Load quiz when both grade and subject are selected
function loadQuizByGrade() {
    currentGrade = document.getElementById("gradeSelect").value;
    currentSubject = document.getElementById("subjectSelect").value;

    if (!currentGrade || !currentSubject) return;

    currentQuestions = generateQuestions(currentGrade);
    score = 0;
    showQuestion(0);
}

// Show question
function showQuestion(index) {
    if (index >= currentQuestions.length) {
        const percent = Math.round((score/currentQuestions.length)*100);
        const resultText = percent>=50 ? `You passed! (${percent}%)` : `You failed. (${percent}%)`;
        document.getElementById("content").innerHTML = `
            <div class="card">
                <h2>Quiz Complete</h2>
                <p>${resultText}</p>
                <button onclick="loadHome()">Return Home</button>
            </div>
        `;
        return;
    }

    const q = currentQuestions[index];
    document.getElementById("content").innerHTML = `
        <div class="card">
            <h2>Question ${index+1}/${currentQuestions.length}</h2>
            <p>${q.question}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="checkAnswer(${index})">Submit</button>
        </div>
    `;
}

// Check answer
function checkAnswer(index) {
    const ans = document.getElementById("answerInput").value.trim();
    const correct = ans.toLowerCase() === currentQuestions[index].answer.toLowerCase();

    if(correct) score++;
    showFeedback(correct ? "Correct!" : `Wrong! Correct: ${currentQuestions[index].answer}`);

    setTimeout(() => showQuestion(index+1), 1500);
}

// Feedback popup
function showFeedback(msg) {
    const fb = document.getElementById("feedback");
    fb.textContent = msg;
    fb.style.display = "block";
    setTimeout(()=> fb.style.display="none", 1500);
}

// Add event listeners
window.onload = function() {
    loadHome();
    document.getElementById("homeBtn").addEventListener("click", loadHome);
    document.getElementById("aboutBtn").addEventListener("click", loadAbout);
    document.getElementById("profileBtn").addEventListener("click", loadProfile);
    document.getElementById("gradeSelect").addEventListener("change", loadQuizByGrade);
    document.getElementById("subjectSelect").addEventListener("change", loadQuizByGrade);
};
