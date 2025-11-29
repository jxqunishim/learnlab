let currentGrade = "";
let currentSubject = "";
let currentQuestions = [];
let score = 0;

// Real questions organized by grade and subject
const questionBank = {
  math: {
    JK: [
      { question: "What is 1 + 1?", answer: "2" },
      { question: "How many fingers do you have on one hand?", answer: "5" },
      { question: "Which number comes after 2?", answer: "3" },
      { question: "What shape has 4 sides?", answer: "square" },
      { question: "Count the apples: 🍎🍎🍎", answer: "3" },
      { question: "What is 0 + 1?", answer: "1" },
      { question: "How many eyes do you have?", answer: "2" },
      { question: "What is 2 + 2?", answer: "4" },
      { question: "Which number is bigger: 3 or 5?", answer: "5" },
      { question: "How many legs does a cat have?", answer: "4" }
    ],
    1: [
      { question: "5 + 3 = ?", answer: "8" },
      { question: "10 - 6 = ?", answer: "4" },
      { question: "2 x 2 = ?", answer: "4" },
      { question: "6 ÷ 2 = ?", answer: "3" },
      { question: "Which number comes next: 7,8,?", answer: "9" },
      { question: "1 + 9 = ?", answer: "10" },
      { question: "3 + 4 = ?", answer: "7" },
      { question: "5 - 2 = ?", answer: "3" },
      { question: "10 ÷ 5 = ?", answer: "2" },
      { question: "4 + 5 = ?", answer: "9" }
    ],
    2: [
      { question: "12 + 8 = ?", answer: "20" },
      { question: "15 - 7 = ?", answer: "8" },
      { question: "3 x 5 = ?", answer: "15" },
      { question: "20 ÷ 4 = ?", answer: "5" },
      { question: "7 + 6 = ?", answer: "13" },
      { question: "9 - 3 = ?", answer: "6" },
      { question: "5 x 4 = ?", answer: "20" },
      { question: "16 ÷ 2 = ?", answer: "8" },
      { question: "8 + 7 = ?", answer: "15" },
      { question: "10 - 6 = ?", answer: "4" }
    ],
    3: [
      { question: "25 + 17 = ?", answer: "42" },
      { question: "50 - 23 = ?", answer: "27" },
      { question: "6 x 7 = ?", answer: "42" },
      { question: "81 ÷ 9 = ?", answer: "9" },
      { question: "14 + 13 = ?", answer: "27" },
      { question: "30 - 15 = ?", answer: "15" },
      { question: "8 x 5 = ?", answer: "40" },
      { question: "64 ÷ 8 = ?", answer: "8" },
      { question: "12 + 19 = ?", answer: "31" },
      { question: "40 - 18 = ?", answer: "22" }
    ],
    4: [
      { question: "35 + 28 = ?", answer: "63" },
      { question: "90 - 47 = ?", answer: "43" },
      { question: "7 x 6 = ?", answer: "42" },
      { question: "56 ÷ 7 = ?", answer: "8" },
      { question: "12 x 3 = ?", answer: "36" },
      { question: "84 ÷ 12 = ?", answer: "7" },
      { question: "27 + 36 = ?", answer: "63" },
      { question: "50 - 25 = ?", answer: "25" },
      { question: "9 x 8 = ?", answer: "72" },
      { question: "72 ÷ 9 = ?", answer: "8" },
      { question: "18 + 27 = ?", answer: "45" },
      { question: "40 - 12 = ?", answer: "28" },
      { question: "5 x 9 = ?", answer: "45" },
      { question: "36 ÷ 6 = ?", answer: "6" },
      { question: "14 + 19 = ?", answer: "33" },
      { question: "50 - 18 = ?", answer: "32" },
      { question: "8 x 7 = ?", answer: "56" },
      { question: "63 ÷ 7 = ?", answer: "9" },
      { question: "16 + 27 = ?", answer: "43" },
      { question: "90 - 33 = ?", answer: "57" }
    ]
  },
  english: {
    JK: [
      { question: "What letter comes after A?", answer: "B" },
      { question: "Spell cat.", answer: "cat" },
      { question: "What is the first letter of 'dog'?", answer: "d" }
    ],
    1: [
      { question: "Spell 'sun'.", answer: "sun" },
      { question: "What is a noun?", answer: "person place or thing" },
      { question: "What letter does 'ball' start with?", answer: "b" }
    ]
    // Add more as you wish
  },
  science: {
    JK: [
      { question: "What color is the sky?", answer: "blue" },
      { question: "Do plants need water?", answer: "yes" },
      { question: "What do you breathe?", answer: "air" }
    ],
    1: [
      { question: "What planet do we live on?", answer: "earth" },
      { question: "What gas do plants produce?", answer: "oxygen" },
      { question: "What do animals need to survive?", answer: "food" }
    ]
    // Add more as you wish
  }
};

// Shuffle questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Navigation functions
function loadHome() {
  document.getElementById("content").innerHTML = `
      <div class="card">
          <h2>Welcome to LearnLab</h2>
          <p>Select a grade and subject to start learning!</p>
      </div>
  `;
}

function loadAbout() {
  document.getElementById("content").innerHTML = `
      <div class="card">
          <h2>About LearnLab</h2>
          <p>Contact: jxqunishim@gmail.com</p>
          <p>LearnLab is a fun and interactive learning platform for students from JK to Grade 12.</p>
      </div>
  `;
}

function loadProfile() {
  document.getElementById("content").innerHTML = `
      <div class="card">
          <h2>Profile</h2>
          <p>Choose your avatar and view achievements here.</p>
      </div>
  `;
}

// Load quiz when both grade and subject are selected
function loadQuizByGrade() {
  currentGrade = document.getElementById("gradeSelect").value;
  currentSubject = document.getElementById("subjectSelect").value;

  if (!currentGrade || !currentSubject) return;

  currentQuestions = questionBank[currentSubject][currentGrade];
  if (!currentQuestions) {
    document.getElementById("content").innerHTML = `<div class="card"><p>No questions available for this grade & subject yet.</p></div>`;
    return;
  }

  currentQuestions = shuffleArray(currentQuestions);
  score = 0;
  showQuestion(0);
}

// Show question
function showQuestion(index) {
  if (index >= currentQuestions.length) {
      const percent = Math.round((score/currentQuestions.length)*100);
      const resultText = percent>=50 ? `You passed! (${percent}%)` : `You failed. (${percent}%)`;
      document.getElementById("content").innerHTML = `
          <div class="card">
              <h2>Quiz Complete</h2>
              <p>${resultText}</p>
              <button onclick="loadHome()">Return Home</button>
          </div>
      `;
      return;
  }

  const q = currentQuestions[index];
  document.getElementById("content").innerHTML = `
      <div class="card">
          <h2>Question ${index+1}/${currentQuestions.length}</h2>
          <p>${q.question}</p>
          <input id="answerInput" type="text" placeholder="Your answer">
          <br>
          <button onclick="checkAnswer(${index})">Submit</button>
      </div>
  `;
}

// Check answer
function checkAnswer(index) {
  const ans = document.getElementById("answerInput").value.trim();
  const correct = ans.toLowerCase() === currentQuestions[index].answer.toLowerCase();

  if(correct) score++;
  showFeedback(correct ? "Correct!" : `Wrong! Correct: ${currentQuestions[index].answer}`);

  setTimeout(() => showQuestion(index+1), 1500);
}

// Feedback popup
function showFeedback(msg) {
  const fb = document.getElementById("feedback");
  fb.textContent = msg;
  fb.style.display = "block";
  setTimeout(()=> fb.style.display="none", 1500);
}

// Add event listeners
window.onload = function() {
  loadHome();
  document.getElementById("homeBtn").addEventListener("click", loadHome);
  document.getElementById("aboutBtn").addEventListener("click", loadAbout);
  document.getElementById("profileBtn").addEventListener("click", loadProfile);
  document.getElementById("gradeSelect").addEventListener("change", loadQuizByGrade);
  document.getElementById("subjectSelect").addEventListener("change", loadQuizByGrade);
};
