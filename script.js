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
    avatar: "cat",
    achievements: []
};

// Available avatars
const avatars = {
    cat: "https://i.pravatar.cc/100?img=5",
    dog: "https://i.pravatar.cc/100?img=12",
    snake: "https://i.pravatar.cc/100?img=15",
    rabbit: "https://i.pravatar.cc/100?img=20",
    fox: "https://i.pravatar.cc/100?img=25"
};

// Question bank
const questionBank = {
    "JK": [/* 10 questions */],
    "K": [/* 10 questions */],
    "1": [/* 10 questions */],
    "2": [/* 10 questions */],
    "3": [/* 10 questions */],
    "4": [/* 10 questions */],
    "5": [/* 20 questions */],
    "6": [/* 20 questions */],
    "7": [/* 20 questions */],
    "8": [/* 20 questions */],
    "9": [/* 30 questions */],
    "10": [/* 30 questions */],
    "11": [/* 30 questions */],
    "12": [/* 30 questions */]
};

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
// Navigation & Profile
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
    const avatarOptions = Object.keys(avatars).map(a => 
        `<img src="${avatars[a]}" class="avatar-option ${userProfile.avatar===a?'selected':''}" onclick="changeAvatar('${a}')">`
    ).join("");

    main.innerHTML = `
        <div class="profile">
            <h2>${userProfile.name}</h2>
            <img src="${avatars[userProfile.avatar]}" class="profile-pic">
            <div class="avatar-options">${avatarOptions}</div>
            <h3>Achievements</h3>
            <div class="achievements">
                ${userProfile.achievements.map(a=>`<span class="badge">${a}</span>`).join('')}
            </div>
            <button onclick="loadHome()">Go Home</button>
        </div>
    `;
}

function changeAvatar(name){
    userProfile.avatar = name;
    loadProfile();
}

// ============================
// Grade & Quiz Logic
// ============================
function changeGrade() {
    const select = document.getElementById("gradeSelect");
    currentGrade = select.value;
    if(!currentGrade) return;

    let numQuestions = 10;
    if(["JK","K","1","2","3","4"].includes(currentGrade)) numQuestions = 10;
    else if(["5","6","7","8"].includes(currentGrade)) numQuestions = 20;
    else numQuestions = 30;

    currentQuestions = shuffle(questionBank[currentGrade]).slice(0,numQuestions);
    currentIndex = 0;
    score = 0;
    totalQuestions = currentQuestions.length;

    loadNextQuestion();
}

function loadNextQuestion() {
    if(currentIndex>=currentQuestions.length){
        const main = document.getElementById("content");
        const percent = Math.round((score/totalQuestions)*100);
        main.innerHTML = `
            <div class="card">
                <h2>Quiz Complete!</h2>
                <p>Score: ${score}/${totalQuestions} (${percent}%)</p>
                <p>${percent>=50?"You Passed! 🎉":"You Failed! 😢"}</p>
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
            <button onclick="submitAnswer()">Submit</button>
            ${question.hint ? `<button class="hint-btn" onclick="showHint('${question.hint}')">Hint</button>` : ""}
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

function showHint(hint){
    showFeedback(`Hint: ${hint}`);
}

// ============================
// Init
// ============================
window.onload = function(){
    loadHome();
}
