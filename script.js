
let grade = "";
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const allQuestions = {
    "JK": [
        {q:"What color is the sky?", a:"blue"},
        {q:"How many legs does a cat have?", a:"4"},
        {q:"Which animal barks?", a:"dog"}
    ],
    "K": [
        {q:"2 + 2 = ?", a:"4"},
        {q:"What is the first letter of 'Apple'?", a:"a"},
        {q:"Which day comes after Monday?", a:"tuesday"}
    ],
    "1": [
        {q:"5 - 2 = ?", a:"3"},
        {q:"Which is a fruit: Carrot or Banana?", a:"banana"},
        {q:"How many wheels on a bicycle?", a:"2"}
    ],
    "2": [
        {q:"7 + 3 = ?", a:"10"},
        {q:"What is opposite of hot?", a:"cold"},
        {q:"Which planet do we live on?", a:"earth"}
    ],
    "3": [
        {q:"10 - 4 = ?", a:"6"},
        {q:"Which is a mammal: Shark or Whale?", a:"whale"},
        {q:"Which month comes after March?", a:"april"}
    ],
    "4": [
        {q:"12 x 2 = ?", a:"24"},
        {q:"Which is heavier: 1kg or 100g?", a:"1kg"},
        {q:"Which is a vowel: B or E?", a:"e"}
    ],
    "5": [
        {q:"50 ÷ 5 = ?", a:"10"},
        {q:"Which gas do we breathe in?", a:"oxygen"},
        {q:"How many sides does a hexagon have?", a:"6"}
    ],
    "6": [
        {q:"6 x 6 = ?", a:"36"},
        {q:"Water freezes at ___°C?", a:"0"},
        {q:"Which is a synonym for 'happy'?", a:"joyful"}
    ],
    "7": [
        {q:"15 + 25 = ?", a:"40"},
        {q:"Which organ pumps blood?", a:"heart"},
        {q:"Who wrote 'Romeo and Juliet'?", a:"shakespeare"}
    ],
    "8": [
        {q:"144 ÷ 12 = ?", a:"12"},
        {q:"Which element has symbol O?", a:"oxygen"},
        {q:"Which is a simile: 'as brave as a lion'?", a:"yes"}
    ],
    "9": [
        {q:"Square root of 81?", a:"9"},
        {q:"H2O is ____?", a:"water"},
        {q:"Who discovered gravity?", a:"newton"}
    ],
    "10": [
        {q:"Derivative of x^2?", a:"2x"},
        {q:"What is photosynthesis?", a:"process by which plants make food"},
        {q:"Which planet is closest to sun?", a:"mercury"}
    ],
    "11": [
        {q:"Integrate 2x dx?", a:"x^2 + c"},
        {q:"Who wrote '1984'?", a:"orwell"},
        {q:"What is 1 atm in pascals?", a:"101325"}
    ],
    "12": [
        {q:"Derivative of sin(x)?", a:"cos(x)"},
        {q:"Solve for x: 2x + 3 = 7", a:"2"},
        {q:"Which element has atomic number 6?", a:"carbon"}
    ]
};

function selectGrade(){
    grade = document.getElementById("gradeSelect").value;
    if(!grade) return;
    currentQuestionIndex = 0;
    score = 0;
    questions = shuffleArray(allQuestions[grade].slice()); // copy & shuffle
    loadQuiz();
}

function loadHome(){
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center; margin-top:35px;">Welcome to LearnLab</h2>
        <p style="text-align:center;">Select your grade from the dropdown above to start a quiz.</p>
    `;
}

function loadQuiz(){
    if(currentQuestionIndex >= questions.length){
        showResult();
        return;
    }
    let q = questions[currentQuestionIndex];
    document.getElementById("content").innerHTML = `
        <div id="quizBox">
            <h2>Question ${currentQuestionIndex+1} of ${questions.length}</h2>
            <p>${q.q}</p>
            <input id="answerInput" type="text" placeholder="Your answer"/>
            <br/>
            <button onclick="checkAnswer()">Submit</button>
            <div id="feedback"></div>
        </div>
    `;
}

function checkAnswer(){
    let input = document.getElementById("answerInput").value.trim().toLowerCase();
    let correctAnswer = questions[currentQuestionIndex].a.toLowerCase();
    const feedbackDiv = document.getElementById("feedback");

    if(input === correctAnswer){
        feedbackDiv.textContent = "✅ Correct!";
        feedbackDiv.style.color = "#1cc88a";
        score++;
    } else {
        feedbackDiv.textContent = `❌ Wrong! Correct: ${questions[currentQuestionIndex].a}`;
        feedbackDiv.style.color = "#e74a3b";
    }

    currentQuestionIndex++;
    setTimeout(loadQuiz, 1000);
}

function showResult(){
    let percent = Math.round((score / questions.length) * 100);
    let message = percent >= 50 ? "🎉 Passed!" : "😢 Failed!";
    document.getElementById("content").innerHTML = `
        <div id="quizBox">
            <h2>Quiz Completed</h2>
            <p>Score: ${score} / ${questions.length} (${percent}%)</p>
            <p>${message}</p>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
}

// Shuffle utility
function shuffleArray(arr){
    for(let i=arr.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Load home on page load
window.onload = loadHome;
