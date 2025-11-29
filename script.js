// ---------------------- QUIZ DATA ----------------------
const questionsByGrade = {
    "JK": [
        { question: "What color is the sky?", answer: "blue" },
        { question: "How many legs does a dog have?", answer: "4" },
        { question: "What sound does a cat make?", answer: "meow" },
        { question: "What shape is a ball?", answer: "round" },
        { question: "How many fingers do you have?", answer: "10" },
        { question: "What is 1 + 1?", answer: "2" },
        { question: "Name a fruit that is red.", answer: "apple" },
        { question: "Which animal barks?", answer: "dog" },
        { question: "What do you sleep on?", answer: "bed" },
        { question: "What do you drink?", answer: "water" }
    ],
    "Grade 1": [
        { question: "What is 5 + 3?", answer: "8" },
        { question: "What is 10 - 4?", answer: "6" },
        { question: "Which planet do we live on?", answer: "earth" },
        { question: "What is the opposite of hot?", answer: "cold" },
        { question: "How many wheels does a car have?", answer: "4" },
        { question: "What color are bananas?", answer: "yellow" },
        { question: "What do bees make?", answer: "honey" },
        { question: "How many days are in a week?", answer: "7" },
        { question: "What is the first letter of the alphabet?", answer: "a" },
        { question: "What animal says 'moo'?", answer: "cow" }
    ],
    "Grade 2": [
        { question: "What is 7 + 6?", answer: "13" },
        { question: "What is 15 - 7?", answer: "8" },
        { question: "What is 3 x 3?", answer: "9" },
        { question: "Which animal lays eggs?", answer: "chicken" },
        { question: "What do plants need to grow?", answer: "water" },
        { question: "Which day comes after Monday?", answer: "tuesday" },
        { question: "What color are strawberries?", answer: "red" },
        { question: "What shape has 4 equal sides?", answer: "square" },
        { question: "What is 10 divided by 2?", answer: "5" },
        { question: "What sound does a duck make?", answer: "quack" }
    ],
    // Add more grades as needed up to Grade 12
};

// ---------------------- STATE ----------------------
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// ---------------------- PAGE LOAD ----------------------
window.onload = function() {
    loadHome();
};

// ---------------------- HOME PAGE ----------------------
function loadHome() {
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center; margin-top:35px;">Choose a Subject & Grade</h2>
        <div style="text-align:center; margin-bottom:20px;">
            <select id="gradeSelect">
                <option value="">Select Grade</option>
                <option value="JK">JK</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <!-- Add more grades as needed -->
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
}

// ---------------------- START QUIZ ----------------------
function startQuiz() {
    const grade = document.getElementById("gradeSelect").value;
    const subject = document.getElementById("subjectSelect").value;

    if (!grade || !subject) {
        alert("Please select both grade and subject.");
        return;
    }

    // Get questions for grade
    currentQuestions = questionsByGrade[grade] || [];
    currentQuestions = shuffleArray(currentQuestions); // Shuffle questions
    currentQuestionIndex = 0;
    score = 0;

    if (currentQuestions.length === 0) {
        document.getElementById("content").innerHTML = `<p style="text-align:center;">No questions added yet for ${grade} - ${subject}.</p>`;
        return;
    }

    loadQuestion();
}

// ---------------------- LOAD QUESTION ----------------------
function loadQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById("content").innerHTML = `
        <div style="text-align:center; margin-top:40px;">
            <div style="background-color:#222; color:#0af; padding:30px; border-radius:12px; display:inline-block; min-width:300px;">
                <h3>Question ${currentQuestionIndex + 1} / ${currentQuestions.length}</h3>
                <p>${q.question}</p>
                <input type="text" id="answerInput" placeholder="Your answer">
                <br><br>
                <button onclick="submitAnswer()">Submit</button>
            </div>
            <div id="feedback" style="margin-top:20px; font-weight:bold; font-size:18px;"></div>
        </div>
    `;
}

// ---------------------- SUBMIT ANSWER ----------------------
function submitAnswer() {
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    const correctAnswer = currentQuestions[currentQuestionIndex].answer.toLowerCase();
    const feedbackDiv = document.getElementById("feedback");

    if (input === correctAnswer) {
        score++;
        feedbackDiv.textContent = "Correct! ✅";
        feedbackDiv.style.color = "#1cc88a";
    } else {
        feedbackDiv.textContent = `Wrong! ❌ Answer: ${currentQuestions[currentQuestionIndex].answer}`;
        feedbackDiv.style.color = "#e74a3b";
    }

    // Move to next question after 1.5s
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    }, 1500);
}

// ---------------------- FINAL SCORE ----------------------
function showFinalScore() {
    document.getElementById("content").innerHTML = `
        <div style="text-align:center; margin-top:50px;">
            <h2>Quiz Completed!</h2>
            <p style="font-size:20px;">You scored ${score} / ${currentQuestions.length}</p>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
}

// ---------------------- UTILITY ----------------------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
