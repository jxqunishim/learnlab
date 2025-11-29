// Questions per grade and subject
const questionsBank = {
    "JK": {
        Math: [
            {q:"1 + 1 = ?", a:"2"},
            {q:"2 + 3 = ?", a:"5"},
            {q:"5 - 2 = ?", a:"3"}
        ],
        Reading: [
            {q:"Which word is 'cat' or 'dog'?", a:"cat"},
            {q:"Which word is 'sun' or 'moon'?", a:"sun"},
            {q:"Which word is 'apple' or 'banana'?", a:"apple"}
        ],
        Science: [
            {q:"Which is hot: Sun or Moon?", a:"sun"},
            {q:"Which do fish live in: water or land?", a:"water"},
            {q:"Which grows on trees: apple or stone?", a:"apple"}
        ]
    },
    "SK": {
        Math: [
            {q:"3 + 2 = ?", a:"5"},
            {q:"4 - 1 = ?", a:"3"},
            {q:"2 + 5 = ?", a:"7"}
        ],
        Reading: [
            {q:"Which word is 'book' or 'pen'?", a:"book"},
            {q:"Which word is 'dog' or 'cat'?", a:"dog"},
            {q:"Which word is 'tree' or 'flower'?", a:"tree"}
        ],
        Science: [
            {q:"Which is a planet: Earth or Sun?", a:"earth"},
            {q:"Which do plants need to grow: Sun or Rock?", a:"sun"},
            {q:"Which lives in water: Fish or Dog?", a:"fish"}
        ]
    },
    "Grade 1": {
        Math: [
            {q:"5 + 7 = ?", a:"12"},
            {q:"9 - 4 = ?", a:"5"},
            {q:"3 + 8 = ?", a:"11"}
        ],
        Reading: [
            {q:"Which word is a fruit: Apple or Chair?", a:"apple"},
            {q:"Which is an animal: Cat or Book?", a:"cat"},
            {q:"Which word rhymes with 'hat': Cat or Dog?", a:"cat"}
        ],
        Science: [
            {q:"Which can fly: Bird or Elephant?", a:"bird"},
            {q:"Which is liquid: Water or Rock?", a:"water"},
            {q:"Which grows from seeds: Plant or Stone?", a:"plant"}
        ]
    },
    "Grade 2": {
        Math: [
            {q:"12 + 8 = ?", a:"20"},
            {q:"15 - 6 = ?", a:"9"},
            {q:"7 + 5 = ?", a:"12"}
        ],
        Reading: [
            {q:"Which word is a verb: Run or Table?", a:"run"},
            {q:"Which is a noun: Apple or Jump?", a:"apple"},
            {q:"Which word rhymes with 'sun': Fun or Dog?", a:"fun"}
        ],
        Science: [
            {q:"Which planet is closest to Sun?", a:"mercury"},
            {q:"Which gas do we breathe in?", a:"oxygen"},
            {q:"Which is a mammal: Whale or Lizard?", a:"whale"}
        ]
    },
    // Add more grades similarly up to Grade 12
};

let grades=["JK","SK","Grade 1","Grade 2"]; // Expand this up to Grade 12
let currentGrade="JK", currentSubject="Math", currentQuestion=0, score=0, shuffledQuestions=[];

function shuffleArray(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}

function showFeedback(message,correct){
    const feedbackDiv=document.getElementById("feedback");
    feedbackDiv.textContent=message;
    feedbackDiv.style.backgroundColor=correct?"#1cc88a":"#e74a3b";
    feedbackDiv.classList.remove("pop");
    void feedbackDiv.offsetWidth;
    feedbackDiv.classList.add("pop");
    feedbackDiv.style.opacity="1";
    setTimeout(()=>{feedbackDiv.style.opacity="0";},2000);
}

function updateScore(){
    const scoreDiv=document.getElementById("score");
    if(scoreDiv){scoreDiv.textContent=`Score: ${score} / ${shuffledQuestions.length}`;}
}

function loadHome(){
    currentGrade="JK"; currentSubject="Math"; currentQuestion=0; score=0;
    document.getElementById("content").innerHTML=`
        <div style="text-align:center; margin: 20px 0;">
            <label for="gradeSelect" style="font-size:20px; font-weight:bold;">Select Grade Level: </label>
            <select id="gradeSelect" onchange="currentGrade=this.value;">
                ${grades.map(g=>`<option value="${g}">${g}</option>`).join("")}
            </select>
        </div>
        <div class="subject-grid">
            <div class="subject-card" onclick="chooseSubject('Math')">Math</div>
            <div class="subject-card" onclick="chooseSubject('Reading')">Reading</div>
            <div class="subject-card" onclick="chooseSubject('Science')">Science</div>
        </div>`;
    const scoreDiv=document.getElementById("score"); if(scoreDiv) scoreDiv.remove();
}

function chooseSubject(subject){
    currentSubject=subject;
    startTest();
}

function startTest(){
    currentQuestion=0; score=0;
    shuffledQuestions=shuffleArray([...questionsBank[currentGrade][currentSubject]]);
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
        </div>`;
}

function checkAnswer(){
    const q=shuffledQuestions[currentQuestion];
    const ans=document.getElementById("answerInput").value.toLowerCase();
    const correct=Array.isArray(q.a)?q.a.some(a=>ans.includes(a)):ans.includes(q.a.toLowerCase());
    if(correct){score++; showFeedback("Correct! ✅",true);} else {showFeedback("Try again! ❌",false);}
    updateScore();
    currentQuestion++;
    if(currentQuestion<shuffledQuestions.length){setTimeout(showQuestion,1800);} else {setTimeout(showResult,1800);}
}

function showResult(){
    const percentage=Math.round((score/shuffledQuestions.length)*100);
    let msg=percentage>=50?"🎉 You passed!":"❌ You failed!";
    document.getElementById("content").innerHTML=`
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentSubject} Test Completed</h2>
            <p>Your Score: ${score} / ${shuffledQuestions.length} (${percentage}%)</p>
            <h3>${msg}</h3>
            <button onclick="loadHome()">Back to Home</button>
        </div>`;
}

window.onload=loadHome;
