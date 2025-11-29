// --- VARIABLES ---
const grades = ["JK","SK","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];
let currentGrade = "JK";
let currentSubject = "";
let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

// --- SAMPLE QUESTIONS BANK (expandable, 10-30 per subject/grade) ---
const questionsBank = {
    "Math": {
        "JK": [
            {q:"1 + 1 = ?", a:"2"},{q:"2 + 2 = ?", a:"4"},{q:"3 - 1 = ?", a:"2"},
            {q:"5 - 2 = ?", a:"3"},{q:"2 + 3 = ?", a:"5"},{q:"4 - 3 = ?", a:"1"},
            {q:"1 + 0 = ?", a:"1"},{q:"0 + 2 = ?", a:"2"},{q:"3 + 0 = ?", a:"3"},
            {q:"5 - 0 = ?", a:"5"}
        ],
        "Grade 1": [
            {q:"5 + 7 = ?", a:"12"},{q:"9 - 4 = ?", a:"5"},{q:"3 + 8 = ?", a:"11"},
            {q:"10 - 2 = ?", a:"8"},{q:"6 + 5 = ?", a:"11"},{q:"7 - 3 = ?", a:"4"},
            {q:"4 + 4 = ?", a:"8"},{q:"8 - 5 = ?", a:"3"},{q:"2 + 6 = ?", a:"8"},{q:"9 - 1 = ?", a:"8"}
        ]
    },
    "Reading": {
        "JK": [
            {q:"Which is a cat or a dog?", a:"cat"},{q:"Which is sun or moon?", a:"sun"},{q:"Which is apple or banana?", a:"apple"},
            {q:"Which is red or blue?", a:"red"},{q:"Which is car or tree?", a:"car"},{q:"Which is ball or book?", a:"ball"},
            {q:"Which is dog or cat?", a:"dog"},{q:"Which is moon or sun?", a:"moon"},{q:"Which is banana or apple?", a:"banana"},{q:"Which is tree or rock?", a:"tree"}
        ],
        "Grade 1": [
            {q:"Fruit: Apple or Chair?", a:"apple"},{q:"Animal: Cat or Book?", a:"cat"},{q:"Rhymes with 'hat': Cat or Dog?", a:"cat"},
            {q:"Which flies: Bird or Rock?", a:"bird"},{q:"Which is liquid: Water or Stone?", a:"water"},{q:"Grows from seeds: Plant or Stone?", a:"plant"},
            {q:"Which is sweet: Candy or Rock?", a:"candy"},{q:"Which is large: Elephant or Mouse?", a:"elephant"},{q:"Which is fast: Cheetah or Turtle?", a:"cheetah"},{q:"Which is hot: Sun or Moon?", a:"sun"}
        ]
    },
    "Science": {
        "JK": [
            {q:"Which is hot: Sun or Moon?", a:"sun"},{q:"Fish live in water or land?", a:"water"},{q:"Apple grows on tree or stone?", a:"apple"},
            {q:"Which moves: Car or House?", a:"car"},{q:"Which is round: Ball or Cube?", a:"ball"},{q:"Which flies: Bird or Fish?", a:"bird"},
            {q:"Which is day: Sun or Moon?", a:"sun"},{q:"Which we drink: Water or Sand?", a:"water"},{q:"Which is alive: Dog or Rock?", a:"dog"},{q:"Which grows: Plant or Stone?", a:"plant"}
        ],
        "Grade 1": [
            {q:"Can fly: Bird or Elephant?", a:"bird"},{q:"Liquid: Water or Rock?", a:"water"},{q:"Grows from seeds: Plant or Stone?", a:"plant"},
            {q:"Closest planet to Sun?", a:"mercury"},{q:"Gas we breathe in?", a:"oxygen"},{q:"Mammal: Whale or Lizard?", a:"whale"},
            {q:"What do plants need?", a:"sun"},{q:"What do fish live in?", a:"water"},{q:"Which is hot: Sun or Moon?", a:"sun"},{q:"Which makes milk: Cow or Dog?", a:"cow"}
        ]
    }
};

// --- FUNCTIONS ---
function shuffleArray(arr){
    for(let i=arr.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
}

function showFeedback(message, correct){
    const feedbackDiv=document.getElementById("feedback");
    feedbackDiv.textContent=message;
    feedbackDiv.style.backgroundColor=correct?"#10b981":"#ef4444";
    feedbackDiv.classList.remove("pop");
    void feedbackDiv.offsetWidth;
    feedbackDiv.classList.add("pop");
    feedbackDiv.style.opacity="1";
    setTimeout(()=>{feedbackDiv.style.opacity="0";},1800);
}

function updateScore(){
    const scoreDiv=document.getElementById("score");
    if(scoreDiv) scoreDiv.textContent=`Score: ${score} / ${shuffledQuestions.length}`;
}

function loadHome(){
    currentGrade="JK"; currentSubject=""; currentQuestion=0; score=0;

    document.getElementById("content").innerHTML=`
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
        currentGrade=this.value;
    });

    const scoreDiv=document.getElementById("score");
    if(scoreDiv) scoreDiv.remove();
}

function chooseSubject(subject){
    currentSubject=subject;
    startTest();
}

function startTest(){
    currentQuestion=0; score=0;
    shuffledQuestions=shuffleArray([...questionsBank[currentSubject][currentGrade]]);
    if(!document.getElementById("score")){
        const scoreDiv=document.createElement("div"); scoreDiv.id="score";
        scoreDiv.textContent=`Score: 0 / ${shuffledQuestions.length}`;
        document.body.appendChild(scoreDiv);
    }
    showQuestion();
}

function showQuestion(){
    const q=shuffledQuestions[currentQuestion];
    document.getElementById("content").innerHTML=`
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
    const q=shuffledQuestions[currentQuestion];
    const ans=document.getElementById("answerInput").value.toLowerCase();
    const correct=ans.includes(q.a.toLowerCase());
    if(correct){score++; showFeedback("Correct! ✅", true);}
    else{showFeedback(`Incorrect! ❌ (Answer: ${q.a})`, false);}
    updateScore();
    currentQuestion++;
    if(currentQuestion<shuffledQuestions.length) setTimeout(showQuestion,1800);
    else setTimeout(showResult,1800);
}

function showResult(){
    const percentage=Math.round((score/shuffledQuestions.length)*100);
    const msg=percentage>=50?"🎉 You passed!":"❌ You failed!";
    document.getElementById("content").innerHTML=`
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentSubject} Test Completed</h2>
            <p>Your Score: ${score} / ${shuffledQuestions.length} (${percentage}%)</p>
            <h3>${msg}</h3>
            <button onclick="loadHome()">Back to Home</button>
        </div>
    `;
}

window.onload=loadHome;
