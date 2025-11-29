// ============================
// Global Variables
// ============================
let currentGrade = "";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let totalQuestions = 0;
let userProfile = {
    name: "Guest",
    avatar: "https://i.pravatar.cc/100",
    achievements: []
};

// Example question bank for demonstration
const questionBank = {
    "JK": [
        { q: "What color is the sky?", a: "blue" },
        { q: "How many legs does a cat have?", a: "4" },
        { q: "Which shape has 3 sides?", a: "triangle" },
        { q: "What sound does a cow make?", a: "moo" },
        { q: "Which is bigger, elephant or mouse?", a: "elephant" },
        { q: "What color is a banana?", a: "yellow" },
        { q: "What comes after 2?", a: "3" },
        { q: "Which animal says 'woof'?", a: "dog" },
        { q: "Is the sun hot or cold?", a: "hot" },
        { q: "Which day comes after Monday?", a: "tuesday" }
    ],
    "1": [
        { q: "5 + 3 = ?", a: "8" },
        { q: "2 x 4 = ?", a: "8" },
        { q: "10 - 7 = ?", a: "3" },
        { q: "Which is a mammal: dog or snake?", a: "dog" },
        { q: "Which color is made by mixing red and white?", a: "pink" },
        { q: "How many days in a week?", a: "7" },
        { q: "Which season is the coldest?", a: "winter" },
        { q: "What do bees make?", a: "honey" },
        { q: "Which animal can fly?", a: "bird" },
        { q: "How many wheels does a bicycle have?", a: "2" }
    ],
    "5": [
        { q: "12 x 12 = ?", a: "144" },
        { q: "What is H2O?", a: "water" },
        { q: "Which planet is closest to the sun?", a: "mercury" },
        { q: "Who wrote 'Romeo and Juliet'?", a: "shakespeare" },
        { q: "What is 50% of 200?", a: "100" },
        { q: "What gas do plants produce?", a: "oxygen" },
        { q: "What is the capital of France?", a: "paris" },
        { q: "Which is a prime number: 9 or 7?", a: "7" },
        { q: "What is the largest ocean?", a: "pacific" },
        { q: "How many continents are there?", a: "7" },
        { q: "Which is harder: diamond or gold?", a: "diamond" },
        { q: "What is 15 + 28?", a: "43" },
        { q: "Which organ pumps blood?", a: "heart" },
        { q: "Water boils at ___°C?", a: "100" },
        { q: "Which animal is known as king of jungle?", a: "lion" },
        { q: "Who invented the lightbulb?", a: "edison" },
        { q: "Which is faster: cheetah or snail?", a: "cheetah" },
        { q: "What is 9 x 9?", a: "81" },
        { q: "Which is a renewable energy source?", a: "solar" },
        { q: "What do plants need to grow?", a: "sun" }
    ],
    "9": [
        { q: "What is the derivative of x^2?", a: "2x" },
        { q: "Who proposed the theory of relativity?", a: "einstein" },
        { q: "H2SO4 is?", a: "acid" },
        { q: "What is 15^2?", a: "225" },
        { q: "What is the square root of 144?", a: "12" },
        { q: "What is the chemical symbol for gold?", a: "au" },
        { q: "What is 2^5?", a: "32" },
        { q: "Who discovered penicillin?", a: "fleming" },
        { q: "What is the capital of Japan?", a: "tokyo" },
        { q: "What is Newton's 2nd law?", a: "f=ma" },
        { q: "Which gas is essential for respiration?", a: "oxygen" },
        { q: "What is the freezing point of water?", a: "0" },
        { q: "What is the formula for area of circle?", a: "pi r^2" },
        { q: "What is 100 ÷ 4?", a: "25" },
        { q: "What is the largest planet?", a: "jupiter" },
        { q: "What is photosynthesis?", a: "process plants make food" },
        { q: "Who wrote '1984'?", a: "orwell" },
        { q: "What is the speed of light?", a: "299792458" },
        { q: "What is the chemical symbol for sodium?", a: "na" },
        { q: "What is the formula for force?", a: "f=ma" },
        { q: "Which element is noble gas?", a: "ne" },
        { q: "Who painted the Mona Lisa?", a: "da vinci" },
        { q: "What is 7 x 13?", a: "91" },
        { q: "Which organelle produces energy?", a: "mitochondria" },
        { q: "What is 9^3?", a: "729" },
        { q: "Which planet is known as red planet?", a: "mars" },
        { q: "What is the Pythagoras theorem?", a: "a^2+b^2=c^2" },
        { q: "Who discovered gravity?", a: "newton" }
    ]
};

// ============================
// Helper Functions
// ============================

// Shuffle array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Show feedback popup
function showFeedback(message) {
    const fb = document.getElementById("feedback");
    fb.textContent = message;
    fb.style.display = "block";
    fb.classList.remove("pop");
    void fb.offsetWidth;
    fb.classList.add("pop");
    setTimeout(() => { fb.style.display = "none"; }, 1500);
}

// ============================
// Navigation & Loading
// ============================
function loadHome() {
    const main = document.getElementById("content");
    main.innerHTML = `
        <div class="card">
            <h2>Welcome to LearnLab Pro!</h2>
            <p>Select a grade from the top dropdown to start your quiz.</p>
            <p>Click Profile to view your achievements and avatar.</p>
        </div>
    `;
}

function loadProfile() {
    const main = document.getElementById("content");
    main.innerHTML = `
        <div class="profile">
            <img src="${userProfile.avatar}" alt="avatar">
            <h3>${userProfile.name}</h3>
            <div>
                ${userProfile.achievements.map(a => `<span class="badge">${a}</span>`).join('')}
            </div>
        </div>
    `;
}

// ============================
// Grade & Quiz Logic
// ============================
function changeGrade() {
    const select = document.getElementById("gradeSelect");
    currentGrade = select.value;
    if (!currentGrade) return;

    // Set number of questions based on grade
    let numQuestions = 10;
    if (["JK","K","1","2","3","4"].includes(currentGrade)) numQuestions = 10;
    else if (["5","6","7","8"].includes(currentGrade)) numQuestions = 20;
    else numQuestions = 30;

    currentQuestions = shuffle(questionBank[currentGrade]).slice(0,numQuestions);
    currentIndex = 0;
    score = 0;
    totalQuestions = currentQuestions.length;

    loadNextQuestion();
}

function loadNextQuestion() {
    if (currentIndex >= currentQuestions.length) {
        const main = document.getElementById("content");
        const percent = Math.round((score/totalQuestions)*100);
        main.innerHTML = `
            <div class="card">
                <h2>Quiz Complete!</h2>
                <p>Score: ${score}/${totalQuestions} (${percent}%)</p>
                <p>${percent >= 50 ? "You Passed! 🎉" : "You Failed! 😢"}</p>
                <button onclick="loadHome()">Go Home</button>
            </div>
        `;
        if(percent>=50) userProfile.achievements.push(`Passed Grade ${currentGrade}`);
        return;
    }

    const question = currentQuestions[currentIndex];
    const main = document.getElementById("content");
    main.innerHTML = `
        <div class="card">
            <h2>Question ${currentIndex+1}/${totalQuestions}</h2>
            <p>${question.q}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="submitAnswer()">Submit</button>
            <div class="progress-container">
                <div class="progress-bar" id="progressBar" style="width:${(score/totalQuestions)*100}%"></div>
            </div>
        </div>
    `;
}

function submitAnswer() {
    const input = document.getElementById("answerInput");
    const answer = input.value.trim().toLowerCase();
    const correctAnswer = currentQuestions[currentIndex].a.toLowerCase();

    if(answer === correctAnswer){
        score++;
        showFeedback("Correct! ✅");
    } else {
        showFeedback(`Wrong! ❌ Answer: ${currentQuestions[currentIndex].a}`);
    }

    currentIndex++;
    loadNextQuestion();
}

// ============================
// Initialize Home
// ============================
window.onload = function(){
    loadHome();
}
