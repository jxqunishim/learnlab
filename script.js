// ------------------ GLOBAL VARIABLES ------------------
let currentGrade = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;

// Achievements storage
let achievements = [];

// ------------------ GRADE SELECTION ------------------
function selectGrade() {
    const select = document.getElementById("gradeSelect");
    currentGrade = select.value;
    if (!currentGrade) return;

    // Load questions based on grade
    questions = generateQuestions(currentGrade);

    // Determine total questions
    if (['JK','K','1','2','3'].includes(currentGrade)) totalQuestions = 10;
    else if (['4','5','6','7','8'].includes(currentGrade)) totalQuestions = 20;
    else totalQuestions = 30;

    // Shuffle questions
    questions = shuffleArray(questions).slice(0, totalQuestions);
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    loadQuestion();
}

// ------------------ GENERATE QUESTIONS ------------------
function generateQuestions(grade) {
    let q = [];
    if (grade === 'JK' || grade === 'K') {
        q = [
            {question: "What color is the sky?", answer: "blue"},
            {question: "How many legs does a cat have?", answer: "4"},
            {question: "What sound does a cow make?", answer: "moo"},
            {question: "What color is grass?", answer: "green"},
            {question: "How many fingers do you have?", answer: "10"},
            {question: "What shape is a ball?", answer: "circle"},
            {question: "What day comes after Monday?", answer: "tuesday"},
            {question: "How many wheels on a bike?", answer: "2"},
            {question: "What is 1+1?", answer: "2"},
            {question: "Name an animal that barks.", answer: "dog"}
        ];
    } else if (grade >= '1' && grade <= '3') {
        q = [
            {question: "5 + 3 = ?", answer: "8"},
            {question: "What is the opposite of hot?", answer: "cold"},
            {question: "Which planet is closest to the sun?", answer: "mercury"},
            {question: "Spell the word 'cat'", answer: "cat"},
            {question: "10 - 4 = ?", answer: "6"},
            {question: "What color are bananas?", answer: "yellow"},
            {question: "How many days in a week?", answer: "7"},
            {question: "What is 2 x 3?", answer: "6"},
            {question: "Which animal is known as king of the jungle?", answer: "lion"},
            {question: "What sound does a sheep make?", answer: "baa"}
        ];
    } else if (grade >= '4' && grade <= '8') {
        q = [
            {question: "12 x 2 = ?", answer: "24"},
            {question: "Who wrote 'Harry Potter'?", answer: "rowling"},
            {question: "What is H2O commonly called?", answer: "water"},
            {question: "5 x 5 = ?", answer: "25"},
            {question: "What is the capital of France?", answer: "paris"},
            {question: "What gas do plants produce?", answer: "oxygen"},
            {question: "Which is the largest ocean?", answer: "pacific"},
            {question: "9 / 3 = ?", answer: "3"},
            {question: "Name a primary color.", answer: "red"},
            {question: "What is 15 - 7?", answer: "8"},
            {question: "Who discovered gravity?", answer: "newton"},
            {question: "What planet is known as the red planet?", answer: "mars"},
            {question: "Which animal lays eggs?", answer: "chicken"},
            {question: "What is 7 + 6?", answer: "13"},
            {question: "Which element has symbol O?", answer: "oxygen"},
            {question: "What is 8 x 8?", answer: "64"},
            {question: "Who wrote 'Romeo and Juliet'?", answer: "shakespeare"},
            {question: "Which continent is Egypt in?", answer: "africa"},
            {question: "What is 100 / 4?", answer: "25"},
            {question: "What is 14 + 9?", answer: "23"}
        ];
    } else { // Grades 9-12
        q = [
            {question: "Solve: 5x + 3 = 18. x = ?", answer: "3"},
            {question: "Derivative of x^2?", answer: "2x"},
            {question: "H2O is?", answer: "water"},
            {question: "Capital of Germany?", answer: "berlin"},
            {question: "Simplify: 12/4 + 3", answer: "6"},
            {question: "Who wrote '1984'?", answer: "orwell"},
            {question: "What is Pi (approx)?", answer: "3.14"},
            {question: "Chemical symbol for Gold?", answer: "au"},
            {question: "9 x 9 = ?", answer: "81"},
            {question: "What is the largest planet?", answer: "jupiter"},
            {question: "What is 2^5?", answer: "32"},
            {question: "Newton is famous for?", answer: "gravity"},
            {question: "What is 7 x 8?", answer: "56"},
            {question: "Which organ pumps blood?", answer: "heart"},
            {question: "Who painted Mona Lisa?", answer: "da vinci"},
            {question: "Solve: 15-7*2", answer: "1"},
            {question: "Boiling point of water?", answer: "100"},
            {question: "What gas do humans breathe in?", answer: "oxygen"},
            {question: "Which is a mammal?", answer: "whale"},
            {question: "What is 45 / 5?", answer: "9"},
            {question: "Who wrote 'Macbeth'?", answer: "shakespeare"},
            {question: "Speed of light approx (m/s)?", answer: "299792458"},
            {question: "Pythagoras theorem?", answer: "a^2+b^2=c^2"},
            {question: "Who proposed relativity?", answer: "einstein"},
            {question: "Area of circle?", answer: "pi*r^2"},
            {question: "What is 11 x 12?", answer: "132"},
            {question: "Which gas is needed for respiration?", answer: "oxygen"},
            {question: "What is 6^2?", answer: "36"},
            {question: "Which element is Na?", answer: "sodium"}
        ];
    }
    return q;
}

// ------------------ LOAD QUESTION ------------------
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Quiz finished
        showFeedback(`Quiz Finished! Score: ${score}%`, true);
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <p><b>Question ${currentQuestionIndex+1} / ${totalQuestions}</b></p>
            <p>${q.question}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="checkAnswer()">Submit</button>
        </div>
    `;
}

// ------------------ CHECK ANSWER ------------------
function checkAnswer() {
    const input = document.getElementById("answerInput").value.toLowerCase().trim();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    if (input === correctAnswer) {
        score += Math.round(100 / totalQuestions);
        achievements.push(`Question ${currentQuestionIndex+1} Correct!`);
        showFeedback("Correct! ✅", true);
    } else {
        showFeedback(`Wrong! ❌ (Answer: ${correctAnswer})`, false);
    }
    currentQuestionIndex++;
    updateScore();
    setTimeout(loadQuestion, 1000);
}

// ------------------ UPDATE SCOREBOARD ------------------
function updateScore() {
    document.getElementById("scoreBoard").textContent = `Score: ${score}%`;
}

// ------------------ SHUFFLE ARRAY ------------------
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// ------------------ FEEDBACK ------------------
function showFeedback(message, correct) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = message;
    feedbackDiv.style.color = correct ? "#58ffb0" : "#ff5858"; // green or red
    feedbackDiv.classList.add("pop");
    setTimeout(() => { feedbackDiv.classList.remove("pop"); }, 1000);
}

// ------------------ LOAD HOME ------------------
function loadHome() {
    document.getElementById("profileBox").style.display = "none";
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Welcome to LearnLab!</h2>
            <p>Select your grade to start the quiz.</p>
        </div>
    `;
}

// ------------------ PROFILE ------------------
function loadProfile() {
    document.getElementById("profileBox").style.display = "block";
    document.getElementById("content").innerHTML = "";
    displayAchievements();
}

function chooseAvatar(emoji) {
    document.getElementById("selectedAvatar").textContent = emoji;
}

function displayAchievements() {
    const list = document.getElementById("achievementsList");
    list.innerHTML = "";
    achievements.forEach(a => {
        const li = document.createElement("li");
        li.textContent = a;
        list.appendChild(li);
    });
}

// Initialize Home
window.onload = loadHome;
