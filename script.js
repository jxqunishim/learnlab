// =========================
// Global Variables
// =========================
let currentGrade = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let userProfile = {
    name: "Guest",
    avatar: "avatar1",
    achievements: []
};
const avatars = ["avatar1", "avatar2", "avatar3", "avatar4"]; // example images

// =========================
// Questions Database
// =========================
const questionsDB = {
    JK: [
        { q: "What color is the sky?", a: "blue" },
        { q: "How many fingers do you have?", a: "10" },
        { q: "What sound does a cat make?", a: "meow" },
        { q: "What shape is a ball?", a: "circle" },
        { q: "What do you eat for breakfast?", a: "cereal" },
        { q: "How many eyes do you have?", a: "2" },
        { q: "Name a fruit that is red.", a: "apple" },
        { q: "What do cows say?", a: "moo" },
        { q: "What do you wear on your feet?", a: "shoes" },
        { q: "What do you use to write?", a: "pencil" }
    ],
    K: [
        { q: "What color is grass?", a: "green" },
        { q: "How many legs does a dog have?", a: "4" },
        { q: "What shape is a square?", a: "square" },
        { q: "Name a fruit that is yellow.", a: "banana" },
        { q: "How many days are in a week?", a: "7" },
        { q: "What do bees make?", a: "honey" },
        { q: "What sound does a duck make?", a: "quack" },
        { q: "What do you wear on your head?", a: "hat" },
        { q: "What do you drink?", a: "water" },
        { q: "What do you use to cut paper?", a: "scissors" }
    ],
    1: generateQuestions(1, 10),
    2: generateQuestions(2, 10),
    3: generateQuestions(3, 10),
    4: generateQuestions(4, 10),
    5: generateQuestions(5, 20),
    6: generateQuestions(6, 20),
    7: generateQuestions(7, 20),
    8: generateQuestions(8, 20),
    9: generateQuestions(9, 30),
    10: generateQuestions(10, 30),
    11: generateQuestions(11, 30),
    12: generateQuestions(12, 30)
};

// Example function to generate placeholder questions
function generateQuestions(grade, count) {
    const arr = [];
    for (let i = 1; i <= count; i++) {
        arr.push({
            q: `Grade ${grade} Question ${i}: What is ${i} + ${i}?`,
            a: `${i + i}`
        });
    }
    return arr;
}

// =========================
// Feedback Popup
// =========================
function showFeedback(message, correct) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = message;
    feedbackDiv.style.display = "block";
    feedbackDiv.style.color = correct ? "#00ffea" : "#ff4d4d";
    feedbackDiv.classList.remove("pop");
    void feedbackDiv.offsetWidth;
    feedbackDiv.classList.add("pop");
    setTimeout(() => {
        feedbackDiv.style.display = "none";
    }, 2000);
}

// =========================
// Load Home
// =========================
function loadHome() {
    document.getElementById("content").innerHTML = `
        <div class="card">
            <h2>Welcome to LearnLab!</h2>
            <p>Select your grade from the dropdown above to start a quiz.</p>
        </div>
    `;
}

// =========================
// Load Profile
// =========================
function loadProfile() {
    let avatarHTML = avatars.map(av => 
        `<img src="avatars/${av}.png" onclick="selectAvatar('${av}')" class="${userProfile.avatar === av ? 'selected' : ''}">`
    ).join('');

    let achievementsHTML = userProfile.achievements.map(a => `<span class="badge">${a}</span>`).join('');

    document.getElementById("content").innerHTML = `
        <div class="profile card">
            <img src="avatars/${userProfile.avatar}.png" class="profile-pic">
            <h2>${userProfile.name}</h2>
            <div class="avatar-options">${avatarHTML}</div>
            <h3>Achievements</h3>
            <div class="achievements">${achievementsHTML || 'No achievements yet.'}</div>
        </div>
    `;
}

function selectAvatar(av) {
    userProfile.avatar = av;
    loadProfile();
}

// =========================
// Load Quiz by Grade
// =========================
function loadQuizByGrade() {
    const grade = document.getElementById("gradeSelect").value;
    if (!grade) return;

    currentGrade = grade;
    currentQuestions = [...questionsDB[grade]];
    shuffleArray(currentQuestions);
    totalQuestions = currentQuestions.length;
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

// =========================
// Shuffle Array
// =========================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// =========================
// Show Question
// =========================
function showQuestion() {
    if (currentQuestionIndex >= totalQuestions) {
        showQuizResult();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    document.getElementById("content").innerHTML = `
        <div class="card">
            <h2>Question ${currentQuestionIndex + 1}/${totalQuestions}</h2>
            <p>${q.q}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="submitAnswer()">Submit</button>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${(score/totalQuestions)*100}%"></div>
            </div>
        </div>
    `;
}

// =========================
// Submit Answer
// =========================
function submitAnswer() {
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    const correctAnswer = currentQuestions[currentQuestionIndex].a.toLowerCase();

    if (input === correctAnswer) {
        score++;
        showFeedback("Correct!", true);
    } else {
        showFeedback(`Wrong! Correct answer: ${currentQuestions[currentQuestionIndex].a}`, false);
    }
    currentQuestionIndex++;
    setTimeout(showQuestion, 500);
}

// =========================
// Show Quiz Result
// =========================
function showQuizResult() {
    const percent = Math.round((score / totalQuestions) * 100);
    let status = percent >= 50 ? "Passed 🎉" : "Failed ❌";
    if (percent === 100) userProfile.achievements.push(`${currentGrade} Quiz Master!`);

    document.getElementById("content").innerHTML = `
        <div class="card">
            <h2>Quiz Complete!</h2>
            <p>Score: ${score}/${totalQuestions} (${percent}%)</p>
            <h3>${status}</h3>
            <button onclick="loadQuizByGrade()">Retry Quiz</button>
        </div>
    `;
}

// =========================
// Load Homepage on Start
// =========================
window.onload = loadHome;
