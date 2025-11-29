
// Questions per grade and subject
const questionsBank = {
    "JK": {
        Math: [
            {q:"1 + 1 = ?", a:"2"},
            {q:"2 + 3 = ?", a:"5"},
            {q:"5 - 2 = ?", a:"3"},
            {q:"3 + 4 = ?", a:"7"},
            {q:"0 + 2 = ?", a:"2"},
            {q:"4 - 1 = ?", a:"3"},
            {q:"2 + 2 = ?", a:"4"},
            {q:"5 - 1 = ?", a:"4"},
            {q:"1 + 3 = ?", a:"4"},
            {q:"3 - 2 = ?", a:"1"}
        ],
        Reading: [
            {q:"Which word is 'cat' or 'dog'?", a:"cat"},
            {q:"Which word is 'sun' or 'moon'?", a:"sun"},
            {q:"Which word is 'apple' or 'banana'?", a:"apple"},
            {q:"Which word is 'tree' or 'flower'?", a:"tree"},
            {q:"Which word is 'red' or 'blue'?", a:"red"},
            {q:"Which word is 'milk' or 'water'?", a:"milk"},
            {q:"Which word is 'ball' or 'bat'?", a:"ball"},
            {q:"Which word is 'fish' or 'bird'?", a:"fish"},
            {q:"Which word is 'car' or 'bus'?", a:"car"},
            {q:"Which word is 'hat' or 'shoe'?", a:"hat"}
        ],
        Science: [
            {q:"Which is hot: Sun or Moon?", a:"sun"},
            {q:"Which do fish live in: water or land?", a:"water"},
            {q:"Which grows on trees: apple or stone?", a:"apple"},
            {q:"Which flies: bird or dog?", a:"bird"},
            {q:"Which gives milk: cow or cat?", a:"cow"},
            {q:"Which is bigger: elephant or cat?", a:"elephant"},
            {q:"Which swims: fish or cat?", a:"fish"},
            {q:"Which is round: ball or cube?", a:"ball"},
            {q:"Which is yellow: sun or sky?", a:"sun"},
            {q:"Which is green: leaf or rock?", a:"leaf"}
        ]
    }
    // You can add SK to 12 here similarly
};

let currentGrade="JK", currentSubject="Math", currentQuestion=0, score=0, shuffledQuestions=[];

// Shuffle helper
function shuffleArray(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}

// Feedback
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

// Scoreboard
function updateScore(){
    const scoreDiv=document.getElementById("score");
    if(scoreDiv){scoreDiv.textContent=`Score: ${score} / ${shuffledQuestions.length}`;}
}

// Home screen
function loadHome(){
    currentGrade="JK"; currentSubject="Math"; currentQuestion=0; score=0;
    document.getElementById("content").innerHTML=`
        <div style="text-align:center; margin: 20px 0;">
            <label for="gradeSelect" style="font-size:20px; font-weight:bold;">Select Grade Level: </label>
            <select id="gradeSelect" onchange="currentGrade=this.value;">
                <option value="JK">JK</option>
            </select>
        </div>
        <div class="subject-grid">
            <div class="subject-card" onclick="chooseSubject('Math')">Math</div>
            <div class="subject-card" onclick="chooseSubject('Reading')">Reading</div>
            <div class="subject-card" onclick="chooseSubject('Science')">Science</div>
        </div>`;
    const scoreDiv=document.getElementById("score"); if(scoreDiv) scoreDiv.remove();
}

// Choose subject
function chooseSubject(subject){
    currentSubject=subject;
    startTest();
}

// Start quiz
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

// Show question
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

// Check answer
function checkAnswer(){
    const q=shuffledQuestions[currentQuestion];
    const ans=document.getElementById("answerInput").value.toLowerCase();
    const correct=Array.isArray(q.a)?q.a.some(a=>ans.includes(a)):ans.includes(q.a.toLowerCase());
    if(correct){score++; showFeedback("Correct! ✅",true);} else {showFeedback("Try again! ❌",false);}
    updateScore();
    currentQuestion++;
    if(currentQuestion<shuffledQuestions.length){setTimeout(showQuestion,1800);} else {setTimeout(showResult,1800);}
}

// Show result
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
