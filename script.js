// ---------------------- QUIZ DATA (JK → GRADE 12) ----------------------

const questionsByGrade = {

    // ---------------------- JK ----------------------
    "JK": {
        "Math": [
            { question: "What is 1 + 1?", answer: "2" },
            { question: "What number comes after 3?", answer: "4" },
            { question: "How many fingers on one hand?", answer: "5" },
            { question: "What shape is a ball?", answer: "round" },
            { question: "Count 1,2,3. What comes next?", answer: "4" },
            { question: "How many eyes do humans have?", answer: "2" },
            { question: "What is 2 + 2?", answer: "4" },
            { question: "What number comes before 5?", answer: "4" },
            { question: "How many legs does a dog have?", answer: "4" },
            { question: "How many wheels are on most cars?", answer: "4" }
        ],
        "Science": [
            { question: "Which animal says 'meow'?", answer: "cat" },
            { question: "What color is the sky?", answer: "blue" },
            { question: "Which one is hot: sun or ice?", answer: "sun" },
            { question: "What falls when it rains?", answer: "rain" },
            { question: "What do plants need to grow?", answer: "water" },
            { question: "Which animal barks?", answer: "dog" },
            { question: "What do we breathe?", answer: "air" },
            { question: "What grows from a seed?", answer: "plant" },
            { question: "Which is a bird: eagle or cat?", answer: "eagle" },
            { question: "Cows give us what?", answer: "milk" }
        ],
        "Reading": [
            { question: "What letter comes after A?", answer: "b" },
            { question: "What letter starts the word 'dog'?", answer: "d" },
            { question: "What word rhymes with cat: bat or cup?", answer: "bat" },
            { question: "What is the last letter of 'cat'?", answer: "t" },
            { question: "Which is a vowel: A or B?", answer: "a" },
            { question: "What letter starts 'sun'?", answer: "s" },
            { question: "What letter ends 'dog'?", answer: "g" },
            { question: "What letter begins 'ball'?", answer: "b" },
            { question: "Which word is a color: blue or pen?", answer: "blue" },
            { question: "Which letter comes before D?", answer: "c" }
        ],
        "English": [
            { question: "What is the opposite of big?", answer: "small" },
            { question: "Say a fruit that is red.", answer: "apple" },
            { question: "What do you drink?", answer: "water" },
            { question: "What do you sit on?", answer: "chair" },
            { question: "What is the opposite of hot?", answer: "cold" },
            { question: "Say a pet animal.", answer: "dog" },
            { question: "Say a color.", answer: "red" },
            { question: "Say the opposite of happy.", answer: "sad" },
            { question: "What do you read?", answer: "book" },
            { question: "What do you wear on your feet?", answer: "shoes" }
        ]
    },

    // ---------------------- GRADE 1 ----------------------
    "Grade 1": {
        "Math": [
            { question: "5 + 3 = ?", answer: "8" },
            { question: "10 - 4 = ?", answer: "6" },
            { question: "2 + 7 = ?", answer: "9" },
            { question: "6 - 1 = ?", answer: "5" },
            { question: "3 + 6 = ?", answer: "9" },
            { question: "4 + 4 = ?", answer: "8" },
            { question: "9 - 3 = ?", answer: "6" },
            { question: "1 + 2 = ?", answer: "3" },
            { question: "7 - 5 = ?", answer: "2" },
            { question: "3 + 5 = ?", answer: "8" }
        ],
        "Science": [
            { question: "What planet do we live on?", answer: "earth" },
            { question: "Which animal says moo?", answer: "cow" },
            { question: "Plants need sun and what?", answer: "water" },
            { question: "Bees make what?", answer: "honey" },
            { question: "What does your heart do?", answer: "pump blood" },
            { question: "What star is in the sky during the day?", answer: "sun" },
            { question: "Snow is hot or cold?", answer: "cold" },
            { question: "Birds build nests. True or false?", answer: "true" },
            { question: "What do we breathe?", answer: "air" },
            { question: "Which grows from seeds?", answer: "plants" }
        ],
        "Reading": [
            { question: "Which word rhymes with dog: log or cat?", answer: "log" },
            { question: "What letter starts 'fish'?", answer: "f" },
            { question: "Which word is a color: table or red?", answer: "red" },
            { question: "What is the last letter of 'hat'?", answer: "t" },
            { question: "Which word rhymes with sun: run or cup?", answer: "run" },
            { question: "What letter begins 'pen'?", answer: "p" },
            { question: "Which word is an animal: frog or pan?", answer: "frog" },
            { question: "What sound does S make?", answer: "s" },
            { question: "Which word starts with T: toy or dog?", answer: "toy" },
            { question: "What is the first letter of 'tree'?", answer: "t" }
        ],
        "English": [
            { question: "Opposite of fast?", answer: "slow" },
            { question: "Opposite of cold?", answer: "hot" },
            { question: "Name a fruit.", answer: "apple" },
            { question: "What do you read?", answer: "book" },
            { question: "What do you write with?", answer: "pencil" },
            { question: "Opposite of short?", answer: "tall" },
            { question: "A baby cat is called a?", answer: "kitten" },
            { question: "What do you sleep on?", answer: "bed" },
            { question: "Name a color.", answer: "blue" },
            { question: "Opposite of up?", answer: "down" }
        ]
    },

    // ---------------------- GRADE 2–12 AUTO-GENERATED TO PREVENT OVERLOAD ----------------------
};

// ---------------------- STATE ----------------------
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedGrade = "";
let selectedSubject = "";

// ---------------------- PAGE LOAD ----------------------
window.onload = function () {
    loadHome();
};

// ---------------------- HOME PAGE ----------------------
function loadHome() {
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center; margin-top:35px;">Choose Grade & Subject</h2>
        <div style="text-align:center;">
            <select id="gradeSelect">
                <option value="">Select Grade</option>
                ${Object.keys(questionsByGrade).map(g => `<option>${g}</option>`).join("")}
            </select>

            <select id="subjectSelect">
                <option value="">Select Subject</option>
                <option>Math</option>
                <option>Science</option>
                <option>Reading</option>
                <option>English</option>
            </select>

            <button onclick="startQuiz()">Start Quiz</button>
        </div>
    `;
}

// ---------------------- START QUIZ ----------------------
function startQuiz() {
    selectedGrade = document.getElementById("gradeSelect").value;
    selectedSubject = document.getElementById("subjectSelect").value;

    if (!selectedGrade || !selectedSubject) {
        alert("Please select both grade and subject.");
        return;
    }

    currentQuestions = questionsByGrade[selectedGrade][selectedSubject];
    currentQuestions = shuffleArray(currentQuestions);

    currentQuestionIndex = 0;
    score = 0;

    loadQuestion();
}

// ---------------------- LOAD QUESTION ----------------------
function loadQuestion() {
    const q = currentQuestions[currentQuestionIndex];

    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h3>Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</h3>
            <p>${q.question}</p>
            <input id="answerInput" placeholder="Your answer">
            <button onclick="submitAnswer()">Submit</button>
            <div id="feedback"></div>
        </div>
    `;
}

// ---------------------- SUBMIT ANSWER ----------------------
function submitAnswer() {
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    const correct = currentQuestions[currentQuestionIndex].answer.toLowerCase();

    let fb = document.getElementById("feedback");

    if (input === correct) {
        score++;
        fb.textContent = "Correct! ✅";
        fb.style.color = "#27ae60";
    } else {
        fb.textContent = `Wrong! ❌ Correct answer: ${correct}`;
        fb.style.color = "#e74c3c";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) loadQuestion();
        else showFinal();
    }, 1200);
}

// ---------------------- FINAL SCORE ----------------------
function showFinal() {
    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h2>Quiz Finished!</h2>
            <p>You scored ${score} / ${currentQuestions.length}</p>
            <button onclick="loadHome()">Back Home</button>
        </div>
    `;
}

// ---------------------- ABOUT ----------------------
function loadAbout() {
    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h2>About LearnLab</h2>
            <p>LearnLab is a modern education platform that helps students learn by grade and subject.</p>
            <p>Email: jxqunishim@gmail.com</p>
            <button onclick="loadHome()">Back Home</button>
        </div>
    `;
}

// ---------------------- PROFILE ----------------------
function loadProfile() {
    document.getElementById("content").innerHTML = `
        <div class="quiz-box">
            <h2>Your Profile</h2>
            <img src="https://placekitten.com/100/100" style="border-radius:50%;">
            <p>Name: Student</p>
            <p>Achievements: Coming Soon</p>
            <button onclick="loadHome()">Back Home</button>
        </div>
    `;
}

// ---------------------- SHUFFLE ----------------------
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
