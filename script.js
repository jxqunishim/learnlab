// ---------------------- QUIZ DATA ----------------------
const questionsByGrade = {
    "JK": [
        { question: "What color is the sky?", choices: ["Blue", "Green", "Red"], answer: "Blue" },
        { question: "How many legs does a dog have?", choices: ["2","4","6"], answer: "4" },
        { question: "Which sound does a cat make?", choices: ["Woof","Meow","Moo"], answer: "Meow" },
        { question: "What shape is a ball?", choices: ["Round","Square","Triangle"], answer: "Round" },
        { question: "What do you drink?", choices: ["Water","Milk","Juice"], answer: "Water" },
        { question: "Name a fruit that is red.", choices: ["Apple","Banana","Grape"], answer: "Apple" },
        { question: "Which animal barks?", choices: ["Dog","Cat","Cow"], answer: "Dog" },
        { question: "How many fingers do you have?", choices: ["5","10","8"], answer: "10" },
        { question: "What do you sleep on?", choices: ["Bed","Chair","Table"], answer: "Bed" },
        { question: "Which color comes from mixing red and yellow?", choices:["Orange","Purple","Green"], answer:"Orange"}
    ],
    "Grade 1": [
        { question: "What is 5 + 3?", choices:["7","8","9"], answer:"8" },
        { question: "What is 10 - 4?", choices:["5","6","7"], answer:"6" },
        { question: "Which planet do we live on?", choices:["Mars","Earth","Venus"], answer:"Earth" },
        { question: "What is the opposite of hot?", choices:["Cold","Warm","Cool"], answer:"Cold" },
        { question: "How many wheels does a car have?", choices:["2","4","6"], answer:"4" },
        { question: "What color are bananas?", choices:["Yellow","Red","Blue"], answer:"Yellow" },
        { question: "What do bees make?", choices:["Honey","Milk","Juice"], answer:"Honey" },
        { question: "How many days are in a week?", choices:["5","6","7"], answer:"7" },
        { question: "What is the first letter of the alphabet?", choices:["A","B","C"], answer:"A" },
        { question: "What animal says 'moo'?", choices:["Dog","Cow","Cat"], answer:"Cow" }
    ],
    "Grade 2": [
        { question:"What is 7 + 6?", choices:["12","13","14"], answer:"13" },
        { question:"What is 15 - 7?", choices:["8","7","9"], answer:"8" },
        { question:"What is 3 x 3?", choices:["6","9","12"], answer:"9" },
        { question:"Which animal lays eggs?", choices:["Dog","Chicken","Cat"], answer:"Chicken" },
        { question:"What do plants need to grow?", choices:["Water","Sand","Air"], answer:"Water" },
        { question:"Which day comes after Monday?", choices:["Tuesday","Sunday","Wednesday"], answer:"Tuesday" },
        { question:"What color are strawberries?", choices:["Red","Blue","Yellow"], answer:"Red" },
        { question:"What shape has 4 equal sides?", choices:["Square","Circle","Triangle"], answer:"Square" },
        { question:"What is 10 divided by 2?", choices:["4","5","6"], answer:"5" },
        { question:"What sound does a duck make?", choices:["Quack","Moo","Meow"], answer:"Quack" }
    ],
    "Grade 3": [
        { question:"What is 12 + 15?", choices:["27","26","25"], answer:"27" },
        { question:"What is 20 - 9?", choices:["11","12","10"], answer:"11" },
        { question:"Which planet is known as the Red Planet?", choices:["Mars","Venus","Earth"], answer:"Mars" },
        { question:"What is 5 x 4?", choices:["20","25","15"], answer:"20" },
        { question:"Which is a mammal?", choices:["Shark","Whale","Frog"], answer:"Whale" },
        { question:"How many months are in a year?", choices:["12","10","11"], answer:"12" },
        { question:"Which is a primary color?", choices:["Red","Green","Pink"], answer:"Red" },
        { question:"What is 9 + 6?", choices:["15","14","16"], answer:"15" },
        { question:"Which animal hops?", choices:["Rabbit","Dog","Cat"], answer:"Rabbit" },
        { question:"Which is a liquid?", choices:["Water","Rock","Sand"], answer:"Water" }
    ],
    "Grade 4": [
        { question:"What is 25 + 30?", choices:["55","50","54"], answer:"55" },
        { question:"What is 36 - 18?", choices:["18","20","19"], answer:"18" },
        { question:"Which planet has rings?", choices:["Mars","Saturn","Jupiter"], answer:"Saturn" },
        { question:"What is 6 x 7?", choices:["42","36","40"], answer:"42" },
        { question:"What is 100 divided by 4?", choices:["20","25","30"], answer:"25" },
        { question:"Which gas do we breathe in?", choices:["Oxygen","Carbon","Hydrogen"], answer:"Oxygen" },
        { question:"Which is an amphibian?", choices:["Frog","Dog","Cat"], answer:"Frog" },
        { question:"Which continent is Egypt in?", choices:["Africa","Asia","Europe"], answer:"Africa" },
        { question:"What is the smallest prime number?", choices:["1","2","3"], answer:"2" },
        { question:"Which animal has stripes?", choices:["Zebra","Lion","Elephant"], answer:"Zebra" }
    ],
    // Grades 5 - 12: text input (30 max for higher grades)
    "Grade 5": generateTextQuestions(20,"Grade 5"),
    "Grade 6": generateTextQuestions(20,"Grade 6"),
    "Grade 7": generateTextQuestions(20,"Grade 7"),
    "Grade 8": generateTextQuestions(20,"Grade 8"),
    "Grade 9": generateTextQuestions(30,"Grade 9"),
    "Grade 10": generateTextQuestions(30,"Grade 10"),
    "Grade 11": generateTextQuestions(30,"Grade 11"),
    "Grade 12": generateTextQuestions(30,"Grade 12"),
};

// ---------------------- GENERATE TEXT QUESTIONS ----------------------
function generateTextQuestions(n, grade){
    let arr=[];
    for(let i=1;i<=n;i++){
        arr.push({question:`${grade} Question ${i}`, answer:`Answer${i}`});
    }
    return arr;
}

// ---------------------- STATE ----------------------
let currentQuestions=[];
let currentQuestionIndex=0;
let score=0;
let selectedGrade="";
let selectedSubject="";

// ---------------------- PAGE LOAD ----------------------
window.onload=function(){ loadHome(); };

// ---------------------- HOME ----------------------
function loadHome(){
    document.getElementById("content").innerHTML=`
        <h2 style="text-align:center; margin-top:35px;">Choose a Subject & Grade</h2>
        <div style="text-align:center; margin-bottom:20px;">
            <select id="gradeSelect">
                <option value="">Select Grade</option>
                ${Object.keys(questionsByGrade).map(g=>`<option value="${g}">${g}</option>`).join("")}
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
    removeScoreboard();
}

// ---------------------- START QUIZ ----------------------
function startQuiz(){
    selectedGrade=document.getElementById("gradeSelect").value;
    selectedSubject=document.getElementById("subjectSelect").value;
    if(!selectedGrade||!selectedSubject){ alert("Select both grade & subject."); return; }
    currentQuestions=[...questionsByGrade[selectedGrade]];
    currentQuestions=shuffleArray(currentQuestions);
    currentQuestionIndex=0; score=0;
    addScoreboard();
    loadQuestion();
}

// ---------------------- LOAD QUESTION ----------------------
function loadQuestion(){
    const q=currentQuestions[currentQuestionIndex];
    let html=`
        <div class="quiz-box">
            <h3>Question ${currentQuestionIndex+1} / ${currentQuestions.length}</h3>
            <p>${q.question}</p>
            <div id="answerSection">`;
    // Multiple choice for JK-Grade 8
    if(q.choices){
        q.choices.forEach(c=>{
            html+=`<button class="mc-btn" onclick="submitAnswer('${c}')">${c}</button> `;
        });
    } else { // text input for higher grades
        html+=`<input type="text" id="answerInput" placeholder="Your answer">
               <br><br>
               <button onclick="submitAnswer()">Submit</button>`;
    }
    html+=`</div><div id="feedback" style="margin-top:15px; font-weight:bold;"></div></div>`;
    document.getElementById("content").innerHTML=html;
    updateScoreboard();
}

// ---------------------- SUBMIT ANSWER ----------------------
function submitAnswer(choice=null){
    const q=currentQuestions[currentQuestionIndex];
    let input=choice!==null? choice : document.getElementById("answerInput").value.trim();
    const correctAnswer=q.answer;
    const feedbackDiv=document.getElementById("feedback");
    if(input.toLowerCase()===correctAnswer.toLowerCase()){
        score++; feedbackDiv.textContent="Correct! ✅"; feedbackDiv.style.color="#1cc88a";
    } else {
        feedbackDiv.textContent=`Wrong! ❌ Answer: ${correctAnswer}`; feedbackDiv.style.color="#e74a3b";
    }
    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex<currentQuestions.length){
            loadQuestion();
        } else { showFinalScore(); }
    },1500);
}

// ---------------------- FINAL SCORE ----------------------
function showFinalScore(){
    document.getElementById("content").innerHTML=`
        <div class="quiz-box">
            <h2>Quiz Completed!</h2>
            <p>You scored ${score} / ${currentQuestions.length}</p>
            <button onclick="loadHome()">Back to Home</button>
        </div>`;
    removeScoreboard();
}

// ---------------------- SCOREBOARD ----------------------
function addScoreboard(){
    if(!document.getElementById("scoreboard")){
        const div=document.createElement("div");
        div.id="scoreboard";
        document.body.appendChild(div);
    }
    updateScoreboard();
}
function updateScoreboard(){
    const sb=document.getElementById("scoreboard");
    sb.textContent=`Score: ${score} / ${currentQuestions.length}`;
}
function removeScoreboard(){
    const sb=document.getElementById("scoreboard");
    if(sb) sb.remove();
}

// ---------------------- ABOUT ----------------------
function loadAbout(){
    document.getElementById("content").innerHTML=`
        <div class="quiz-box">
            <h2>About LearnLab</h2>
            <p>Professional educational platform with quizzes by grade and subject.</p>
            <p>Contact: jxqunishim@gmail.com</p>
            <button onclick="loadHome()">Back to Home</button>
        </div>`;
    removeScoreboard();
}

// ---------------------- PROFILE ----------------------
function loadProfile(){
    document.getElementById("content").innerHTML=`
        <div class="quiz-box">
            <h2>Student Profile</h2>
            <img class="profile-avatar" src="https://placekitten.com/100/100" alt="Avatar">
            <p>Name: Guest</p>
            <p>Achievements: None</p>
            <button onclick="loadHome()">Back to Home</button>
        </div>`;
    removeScoreboard();
}

// ---------------------- UTILITY ----------------------
function shuffleArray(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
}
