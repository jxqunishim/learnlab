
const questionsByGrade = {
    "JK":[
        {q:"What color is the sun?", a:"yellow"},
        {q:"How many fingers do you have?", a:"10"},
        {q:"Which animal says 'meow'?", a:"cat"}
    ],
    "SK":[
        {q:"What number comes after 3?", a:"4"},
        {q:"What color is grass?", a:"green"},
        {q:"Which animal says 'woof'?", a:"dog"}
    ],
    "1":[
        {q:"5 + 2 = ?", a:"7"},
        {q:"What shape has 3 sides?", a:"triangle"},
        {q:"What color are bananas?", a:"yellow"}
    ],
    "2":[
        {q:"8 - 3 = ?", a:"5"},
        {q:"Which season is cold and snowy?", a:"winter"},
        {q:"Which animal hops and has a pouch?", a:"kangaroo"}
    ],
    "3":[
        {q:"12 ÷ 4 = ?", a:"3"},
        {q:"What is the capital of Canada?", a:"ottawa"},
        {q:"How many continents are there?", a:"7"}
    ],
    "4":[
        {q:"9 x 2 = ?", a:"18"},
        {q:"Water freezes at ___ degrees Celsius?", a:"0"},
        {q:"Which planet is known as the Red Planet?", a:"mars"}
    ],
    "5":[
        {q:"25 ÷ 5 = ?", a:"5"},
        {q:"What gas do we breathe in?", a:"oxygen"},
        {q:"Which organ pumps blood?", a:"heart"}
    ],
    "6":[
        {q:"7 x 6 = ?", a:"42"},
        {q:"Which planet is closest to the sun?", a:"mercury"},
        {q:"What is H2O commonly called?", a:"water"}
    ],
    "7":[
        {q:"21 ÷ 7 = ?", a:"3"},
        {q:"Which organ in humans produces insulin?", a:"pancreas"},
        {q:"What is the largest planet in our solar system?", a:"jupiter"}
    ],
    "8":[
        {q:"15 x 2 = ?", a:"30"},
        {q:"Which process do plants use to make food?", a:"photosynthesis"},
        {q:"What is the boiling point of water in Celsius?", a:"100"}
    ],
    "9":[
        {q:"45 ÷ 9 = ?", a:"5"},
        {q:"What is the chemical symbol for water?", a:"h2o"},
        {q:"Which blood cells help fight infection?", a:"white"}
    ],
    "10":[
        {q:"12 x 12 = ?", a:"144"},
        {q:"Who wrote 'Romeo and Juliet'?", a:"shakespeare"},
        {q:"What is the powerhouse of the cell?", a:"mitochondria"}
    ],
    "11":[
        {q:"Solve: 3x + 5 = 20", a:"5"},
        {q:"What is Newton's 2nd Law?", a:"force"},
        {q:"Which gas is used in photosynthesis?", a:"carbon dioxide"}
    ],
    "12":[
        {q:"Integrate: ∫2x dx", a:"x^2"},
        {q:"What is the chemical formula for table salt?", a:"nacl"},
        {q:"What is the main function of the kidneys?", a:"filter"}
    ]
};

let currentGrade="JK", currentQuestion=0, score=0, shuffledQuestions=[];

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
    currentGrade="JK"; currentQuestion=0; score=0;
    document.getElementById("content").innerHTML=`
        <div style="text-align:center; margin: 20px 0;">
            <label for="gradeSelect" style="font-size:20px; font-weight:bold;">Select Grade Level: </label>
            <select id="gradeSelect" onchange="currentGrade=this.value;">
                <option value="JK">JK</option>
                <option value="SK">SK</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
            </select>
        </div>
        <div class="subject-grid">
            <div class="subject-card" onclick="startTest()">Start Quiz</div>
        </div>`;
    const scoreDiv=document.getElementById("score"); if(scoreDiv) scoreDiv.remove();
}

function startTest(){
    currentQuestion=0; score=0;
    shuffledQuestions=shuffleArray([...questionsByGrade[currentGrade]]);
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
            <h2>${currentGrade} Question ${currentQuestion+1}</h2>
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
    let msg=percentage===100?"🎉 You passed!":(percentage<=50?"❌ You failed!":"👍 Good try!");
    document.getElementById("content").innerHTML=`
        <div id="feedback"></div>
        <div class="lesson-box">
            <h2>${currentGrade} Test Completed</h2>
            <p>Your Score: ${score} / ${shuffledQuestions.length} (${percentage}%)</p>
            <h3>${msg}</h3>
            <button onclick="loadHome()">Back to Home</button>
        </div>`;
}

window.onload=loadHome;
