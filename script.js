const grades = ["JK","SK","Grade 1","Grade 2"];
let currentGrade = "JK";
let currentSubject = "";
let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

// Sample questions per grade & subject (you can expand later)
const questionsBank = {
    "JK": {
        Math: [{q:"1+1=?", a:"2"},{q:"2+3=?", a:"5"},{q:"5-2=?", a:"3"}],
        Reading: [{q:"Which is cat or dog?", a:"cat"},{q:"Which is sun or moon?", a:"sun"},{q:"Which is apple or banana?", a:"apple"}],
        Science: [{q:"Which is hot: Sun or Moon?", a:"sun"},{q:"Fish live in water or land?", a:"water"},{q:"Apple grows on tree or stone?", a:"apple"}]
    },
    "SK": {
        Math: [{q:"3+2=?", a:"5"},{q:"4-1=?", a:"3"},{q:"2+5=?", a:"7"}],
        Reading: [{q:"Book or pen?", a:"book"},{q:"Dog or cat?", a:"dog"},{q:"Tree or flower?", a:"tree"}],
        Science: [{q:"Planet: Earth or Sun?", a:"earth"},{q:"Plants need Sun or Rock?", a:"sun"},{q:"Fish or Dog?", a:"fish"}]
    },
    "Grade 1": {
        Math: [{q:"5+7=?", a:"12"},{q:"9-4=?", a:"5"},{q:"3+8=?", a:"11"}],
        Reading: [{q:"Fruit: Apple or Chair?", a:"apple"},{q:"Animal: Cat or Book?", a:"cat"},{q:"Rhymes with 'hat': Cat or Dog?", a:"cat"}],
        Science: [{q:"Can fly: Bird or Elephant?", a:"bird"},{q:"Liquid: Water or Rock?", a:"water"},{q:"Grows from seeds: Plant or Stone?", a:"plant"}]
    },
    "Grade 2": {
        Math: [{q:"12+8=?", a:"20"},{q:"15-6=?", a:"9"},{q:"7+5=?", a:"12"}],
        Reading: [{q:"Verb: Run or Table?", a:"run"},{q:"Noun: Apple or Jump?", a:"apple"},{q:"Rhymes with 'sun': Fun or Dog?", a:"fun"}],
        Science: [{q:"Closest planet to Sun?", a:"mercury"},{q:"Gas we breathe in?", a:"oxygen"},{q:"Mammal: Whale or Lizard?", a:"whale"}]
    }
};

function shuffleArray(arr) {
    for (let i = arr.length-1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
}

function showFeedback(message, correct){
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = message;
    feedbackDiv.style.backgroundColor = correct ? "#1cc88a" : "#e74a3b";
    feedbackDiv.classList.remove("pop");
    void feedbackDiv.offsetWidth;
    feedbackDiv.classList.add("pop");
    feedbackDiv.style.opacity="1";
    setTimeout(()=>{feedbackDiv.style.opacity="0";},1800);
}

function updateScore(){
    const scoreDiv = document.getElementById("score");
    if(scoreDiv) scoreDiv.textContent = `Score: ${score} / ${shuffledQuestions.length}`;
}

function loadHome(){
    currentGrade = "JK"; currentSubject=""; currentQuestion=0; score=0;

    document.getElementById("content").innerHTML = `
        <div style="text-align:center; margin: 20px 0;">
            <label for="gradeSelect" style="font-size:20px; font-weight:bold;">Select Grade Level: </label>
            <select id="gradeSelect">
                ${grades.map(g=>`<option value="${g}">${g}</option>`).join("")}
            </select>
        </div>
        <div class="subject-grid">
            <div class="subject-card" onclick="chooseSubject('Math')">Math</div>
            <div class="subject-card" onclick="chooseSubject('Reading')">Reading</div>
            <div class="subject-card" onclick="chooseSubject('Science')">Science</div>
        </div>
    `;

    document.getElementById("gradeSelect").addEventListener("change", function(){
        currentGrade = this.value;
    });

    const scoreDiv = document.getElementById("score");
    if(scoreDiv) scoreDiv.remove();
}

function chooseSubject(subject){
    currentSubject = subject;
    startTest();
}

function startTest(){
    currentQuestion = 0; score=0;
    shuffledQuestions = shuffleArray([...questionsBank[currentGrade][currentSubject]]);
    if(!document.getElementById("score")){
        const scoreDiv = document.createElement("div"); scoreDiv.id="score";
        scoreDiv.textContent = `Score: 0 / ${shuffledQuestions.length}`;
        document.body.appendChild(scoreDiv);
    }
    showQuestion();
}

function showQuestion(){
    const q = shuffledQuestions[currentQuestion];
    document.getElementById("content").innerHTML = `
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentSubject} Question ${currentQuestion+1}</h2>
            <p>${q.q}</p>
            <input id="answerInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="checkAnswer()">Submit</button>
        </div>
    `;
}

function checkAnswer(){
    const q = shuffledQuestions[currentQuestion];
    const ans = document.getElementById("answerInput").value.toLowerCase();
    const correct = ans.includes(q.a.toLowerCase());
    if(correct){score++; showFeedback("Correct! ✅", true);}
    else{showFeedback("Try again! ❌", false);}
    updateScore();
    currentQuestion++;
    if(currentQuestion < shuffledQuestions.length) setTimeout(showQuestion, 1800);
    else setTimeout(showResult, 1800);
}

function showResult(){
    const percentage = Math.round((score/shuffledQuestions.length)*100);
    const msg = percentage>=50 ? "🎉 You passed!" : "❌ You failed!";
    document.getElementById("content").innerHTML = `
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentSubject} Test Completed</h2>
            <p>Your Score: ${score} / ${shuffledQuestions.length} (${percentage}%)</p>
            <h3>${msg}</h3>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
}

window.onload = loadHome;
