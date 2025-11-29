// ----------------------------
// Page Fade Transition
// ----------------------------
function fadeInContent() {
    const c = document.getElementById("content");
    c.classList.remove("show");
    setTimeout(() => c.classList.add("show"), 50);
}

// ----------------------------
// GLOBAL VARIABLES
// ----------------------------
let selectedGrade = "";
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let maxQuestions = 10;

// ----------------------------
// Grade Selector
// ----------------------------
function selectGrade() {
    selectedGrade = document.getElementById("gradeSelect").value;
    loadHome();
}

// ----------------------------
// HOME PAGE
// ----------------------------
function loadHome() {
    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Welcome to LearnLab</h2>
            <p>Select a grade level above to begin your learning journey!</p>

            <button onclick="startQuiz()">Start Quiz</button>
        </div>
    `;
    fadeInContent();
}

// ----------------------------
// PROFILE PAGE
// ----------------------------
function openProfile() {
    document.getElementById("content").innerHTML = `
        <div class="profile-box">
            <h2>Your Profile</h2>
            <p><b>Grade:</b> ${selectedGrade || "Not selected"}</p>
            <p><b>Total Scores:</b> Coming soon!</p>
            <p><b>Daily progress:</b> Coming soon!</p>
        </div>
    `;
    fadeInContent();
}

// ----------------------------
// FEEDBACK POPUP
// ----------------------------
function showFeedback(message, good) {
    const box = document.getElementById("feedbackBox");
    box.textContent = message;

    box.style.borderColor = good ? "#4FA3FF" : "#FF6363";
    box.style.color = good ? "#DCEBFF" : "#FFB3B3";

    box.classList.remove("hidden");
    setTimeout(() => box.classList.add("show"), 10);

    setTimeout(() => {
        box.classList.remove("show");
        setTimeout(() => box.classList.add("hidden"), 300);
    }, 1200);
}

// ----------------------------
// SCORE BOX
// ----------------------------
function updateScoreBox() {
    if (!document.getElementById("scoreBox")) {
        const box = document.createElement("div");
        box.id = "scoreBox";
        box.innerHTML = `Score: ${score}/${maxQuestions}`;
        document.body.appendChild(box);
    } else {
        document.getElementById("scoreBox").innerHTML = `Score: ${score}/${maxQuestions}`;
    }
}

// ----------------------------
// QUESTION BANK (12 per grade)
// ----------------------------
const questionBank = {
    "JK": [
        { q: "What color is the sky?", a: "blue" },
        { q: "How many legs does a dog have?", a: "4" },
        { q: "What sound does a cat make?", a: "meow" },
        { q: "What shape is a ball?", a: "circle" },
        { q: "What do bees make?", a: "honey" },
        { q: "What color are leaves?", a: "green" },
        { q: "How many eyes do you have?", a: "2" },
        { q: "What do we drink?", a: "water" },
        { q: "What do cows drink?", a: "water" },
        { q: "What planet do we live on?", a: "earth" },
        { q: "What do you eat with?", a: "spoon" },
        { q: "What do you wear on your feet?", a: "shoes" }
    ],

    "SK": [
        { q: "What number comes after 5?", a: "6" },
        { q: "How many days in a week?", a: "7" },
        { q: "What do plants need to grow?", a: "water" },
        { q: "What shape has 3 sides?", a: "triangle" },
        { q: "What color is grass?", a: "green" },
        { q: "What falls from the clouds?", a: "rain" },
        { q: "What is the opposite of big?", a: "small" },
        { q: "What do you sleep on?", a: "bed" },
        { q: "What do birds use to fly?", a: "wings" },
        { q: "How many months in a year?", a: "12" },
        { q: "What color is a banana?", a: "yellow" },
        { q: "What is 2 + 2?", a: "4" }
    ],

    "Grade 1": [
        { q: "What is 5 + 3?", a: "8" },
        { q: "What is the first month of the year?", a: "january" },
        { q: "What animal is known as man's best friend?", a: "dog" },
        { q: "How many hours in a day?", a: "24" },
        { q: "What do fish breathe with?", a: "gills" },
        { q: "What is the opposite of hot?", a: "cold" },
        { q: "What color is the sun?", a: "yellow" },
        { q: "What planet is red?", a: "mars" },
        { q: "What animal says 'moo'?", a: "cow" },
        { q: "What is 10 - 4?", a: "6" },
        { q: "What shape has 4 equal sides?", a: "square" },
        { q: "How many continents are there?", a: "7" }
    ],

    // I will continue Grades 2–12 in PART 2
};

// ----------------------------
// START QUIZ
// ----------------------------
function startQuiz() {
    if (!selectedGrade) {
        showFeedback("Pick a grade first!", false);
        return;
    }

    const bank = questionBank[selectedGrade];

    if (!bank) {
        showFeedback("No questions for this grade!", false);
        return;
    }

    // Determine # of questions
    if (["JK", "SK", "Grade 1", "Grade 2", "Grade 3"].includes(selectedGrade)) {
        maxQuestions = 10;
    } else if (["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"].includes(selectedGrade)) {
        maxQuestions = 20;
    } else {
        maxQuestions = 30;
    }

    // Shuffle questions
    quizQuestions = bank.sort(() => Math.random() - 0.5).slice(0, maxQuestions);

    currentQuestion = 0;
    score = 0;

    updateScoreBox();
    loadQuestion();
}

// ----------------------------
// LOAD QUESTION
// ----------------------------
function loadQuestion() {
    const q = quizQuestions[currentQuestion];

    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Question ${currentQuestion + 1}/${maxQuestions}</h2>
            <p>${q.q}</p>
            <input id="answerInput" type="text" placeholder="Type your answer">
            <button onclick="submitAnswer()">Submit</button>
        </div>
    `;

    fadeInContent();
}
// ----------------------------------------
// CONTINUED QUESTION BANK (Grades 2–12)
// ----------------------------------------

questionBank["Grade 2"] = [
    { q: "What is 12 - 5?", a: "7" },
    { q: "What gas do humans breathe in?", a: "oxygen" },
    { q: "What is the capital of Canada?", a: "ottawa" },
    { q: "What is 6 × 2?", a: "12" },
    { q: "What season is the coldest?", a: "winter" },
    { q: "What’s the largest animal?", a: "blue whale" },
    { q: "How many wheels does a car have?", a: "4" },
    { q: "What shape has 5 sides?", a: "pentagon" },
    { q: "What planet is closest to the sun?", a: "mercury" },
    { q: "What do plants release?", a: "oxygen" },
    { q: "What is 20 ÷ 4?", a: "5" },
    { q: "How many letters in the alphabet?", a: "26" }
];

questionBank["Grade 3"] = [
    { q: "What is 9 × 4?", a: "36" },
    { q: "What part of a plant makes food?", a: "leaf" },
    { q: "What is the capital of Ontario?", a: "toronto" },
    { q: "Which direction does the sun rise?", a: "east" },
    { q: "What is 45 ÷ 5?", a: "9" },
    { q: "What is H2O?", a: "water" },
    { q: "What organ pumps blood?", a: "heart" },
    { q: "What is 100 - 25?", a: "75" },
    { q: "What is freezing point in Celsius?", a: "0" },
    { q: "What is 7 × 3?", a: "21" },
    { q: "Largest continent?", a: "asia" },
    { q: "Shape with 6 sides?", a: "hexagon" }
];

questionBank["Grade 4"] = [
    { q: "What is 36 ÷ 6?", a: "6" },
    { q: "What force pulls things to Earth?", a: "gravity" },
    { q: "What are animals that eat only plants called?", a: "herbivores" },
    { q: "What is 8 × 7?", a: "56" },
    { q: "What system controls breathing?", a: "respiratory" },
    { q: "Who discovered electricity?", a: "benjamin franklin" },
    { q: "What are the three states of matter?", a: "solid liquid gas" },
    { q: "What is 84 ÷ 12?", a: "7" },
    { q: "What are animals with backbones called?", a: "vertebrates" },
    { q: "What is the capital of the USA?", a: "washington" },
    { q: "What is 90 - 44?", a: "46" },
    { q: "What planet has rings?", a: "saturn" }
];

questionBank["Grade 5"] = [
    { q: "What is 144 ÷ 12?", a: "12" },
    { q: "What is the longest river in the world?", a: "nile" },
    { q: "What organ is responsible for thinking?", a: "brain" },
    { q: "What is 15% of 100?", a: "15" },
    { q: "What is photosynthesis?", a: "making food" },
    { q: "What is the powerhouse of the cell?", a: "mitochondria" },
    { q: "What is 8³?", a: "512" },
    { q: "What is the largest ocean?", a: "pacific" },
    { q: "What are meteoroids called once they hit Earth?", a: "meteorites" },
    { q: "What is 72 ÷ 8?", a: "9" },
    { q: "What is 1 km in meters?", a: "1000" },
    { q: "What gas do plants absorb?", a: "carbon dioxide" }
];

questionBank["Grade 6"] = [
    { q: "What is 5²?", a: "25" },
    { q: "What is the chemical symbol for gold?", a: "au" },
    { q: "Who invented the light bulb?", a: "thomas edison" },
    { q: "What is 2/3 + 1/3?", a: "1" },
    { q: "What causes tides?", a: "moon" },
    { q: "What is 180 ÷ 15?", a: "12" },
    { q: "What is 9 × 12?", a: "108" },
    { q: "What gas makes up most of the atmosphere?", a: "nitrogen" },
    { q: "What is the square root of 49?", a: "7" },
    { q: "What is 3.5 × 2?", a: "7" },
    { q: "How many provinces in Canada?", a: "10" },
    { q: "What does DNA stand for?", a: "deoxyribonucleic acid" }
];

questionBank["Grade 7"] = [
    { q: "What is 7²?", a: "49" },
    { q: "What is the formula for area of a triangle?", a: "1/2bh" },
    { q: "What planet is known as the gas giant?", a: "jupiter" },
    { q: "Define atom", a: "smallest unit of matter" },
    { q: "What is 150 ÷ 6?", a: "25" },
    { q: "What is the boiling point of water?", a: "100" },
    { q: "What is the capital of France?", a: "paris" },
    { q: "What is 3/4 as a decimal?", a: "0.75" },
    { q: "What is 11 × 11?", a: "121" },
    { q: "What is inertia?", a: "resistance to change" },
    { q: "What is 90% as a decimal?", a: "0.9" },
    { q: "How many bones are in the human body?", a: "206" }
];

questionBank["Grade 8"] = [
    { q: "What is 9²?", a: "81" },
    { q: "What do we call change of solid to gas?", a: "sublimation" },
    { q: "What is Pythagorean theorem?", a: "a2+b2=c2" },
    { q: "What is 40% of 200?", a: "80" },
    { q: "What organ filters blood?", a: "kidney" },
    { q: "Define velocity", a: "speed with direction" },
    { q: "What is 56 ÷ 7?", a: "8" },
    { q: "What is the chemical symbol for sodium?", a: "na" },
    { q: "What is 12 × 12?", a: "144" },
    { q: "What are tectonic plates?", a: "earth crust pieces" },
    { q: "What is distance ÷ time?", a: "speed" },
    { q: "What biome is Canada mostly?", a: "boreal forest" }
];

questionBank["Grade 9"] =
questionBank["Grade 10"] =
questionBank["Grade 11"] =
questionBank["Grade 12"] = [
    { q: "What is 2x + 5 = 17? Solve for x.", a: "6" },
    { q: "What is the powerhouse of the cell?", a: "mitochondria" },
    { q: "Derivative of x²?", a: "2x" },
    { q: "What molecule is H2SO4?", a: "sulfuric acid" },
    { q: "Who wrote Macbeth?", a: "shakespeare" },
    { q: "What is the capital of Japan?", a: "tokyo" },
    { q: "What is 3 × 14?", a: "42" },
    { q: "What is kinetic energy formula?", a: "1/2mv2" },
    { q: "Square root of 256?", a: "16" },
    { q: "What is 5! ?", a: "120" },
    { q: "What continent is Egypt in?", a: "africa" },
    { q: "Who discovered gravity?", a: "newton" }
];

// ----------------------------------------
// SUBMIT ANSWER
// ----------------------------------------
function submitAnswer() {
    const userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
    const correctAnswer = quizQuestions[currentQuestion].a;

    if (userAnswer === correctAnswer) {
        score++;
        showFeedback("Correct!", true);
    } else {
        showFeedback("Incorrect!", false);
    }

    updateScoreBox();

    currentQuestion++;

    if (currentQuestion >= maxQuestions) {
        finishQuiz();
    } else {
        setTimeout(loadQuestion, 300);
    }
}

// ----------------------------------------
// FINISH QUIZ
// ----------------------------------------
function finishQuiz() {
    const percent = Math.round((score / maxQuestions) * 100);

    document.getElementById("content").innerHTML = `
        <div class="lesson-box">
            <h2>Quiz Complete!</h2>
            <p>Your score: <b>${score}/${maxQuestions}</b></p>
            <p>Percentage: <b>${percent}%</b></p>
            <h3 style="color:${percent >= 50 ? "#4FA3FF" : "#FF6363"};">
                ${percent >= 50 ? "You Passed! 🎉" : "You Failed. Try Again!"}
            </h3>
            <button onclick="startQuiz()">Try Again</button>
            <button onclick="loadHome()">Return Home</button>
        </div>
    `;

    fadeInContent();
}
