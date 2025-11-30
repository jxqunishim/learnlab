// ---------------------- QUIZ DATA ----------------------

// Questions are examples; you can expand later
const questionsByGrade = {
  "JK": {
    "Math": [
      { question: "What color is the number 5 in rainbow counting?", answer: "green" },
      { question: "Count 1, 2, 3. What comes next?", answer: "4" },
      { question: "How many legs does a spider have?", answer: "8" },
      { question: "What shape is a ball?", answer: "round" },
      { question: "1 + 1 = ?", answer: "2" },
      { question: "What number comes after 5?", answer: "6" },
      { question: "How many fingers on one hand?", answer: "5" },
      { question: "What is 2 + 2?", answer: "4" },
      { question: "Count: 1, 2, 3, 4, 5. How many numbers?", answer: "5" },
      { question: "How many eyes do you have?", answer: "2" }
    ],
    "Science": [
      { question: "Which animal says 'meow'?", answer: "cat" },
      { question: "What do plants need to grow?", answer: "water" },
      { question: "Which is hot, sun or ice?", answer: "sun" },
      { question: "What falls from the sky when it rains?", answer: "rain" },
      { question: "Which one flies: bird or dog?", answer: "bird" },
      { question: "What do cows give us?", answer: "milk" },
      { question: "What color is the sky?", answer: "blue" },
      { question: "What grows from seeds?", answer: "plants" },
      { question: "Which animal barks?", answer: "dog" },
      { question: "What do we breathe?", answer: "air" }
    ],
    "Reading": [
      { question: "What letter is the first of the alphabet?", answer: "a" },
      { question: "What letter comes after B?", answer: "c" },
      { question: "What letter is in 'cat'?", answer: "c" },
      { question: "Which word rhymes with 'hat'? 'bat' or 'dog'?", answer: "bat" },
      { question: "Which is a vowel? A, B, or C?", answer: "a" },
      { question: "What letter starts 'dog'?", answer: "d" },
      { question: "What is the last letter in 'cat'?", answer: "t" },
      { question: "Which word starts with 's'? Sun, ball, dog?", answer: "sun" },
      { question: "What letter is in 'bed'?", answer: "b" },
      { question: "Which letter is in 'apple'?", answer: "a" }
    ],
    "English": [
      { question: "Say a word for a pet animal.", answer: "dog" },
      { question: "Say a color word.", answer: "red" },
      { question: "Say the opposite of hot.", answer: "cold" },
      { question: "What do you drink?", answer: "water" },
      { question: "Say a word for something you sit on.", answer: "chair" },
      { question: "Say a food that is sweet.", answer: "cake" },
      { question: "Say the opposite of big.", answer: "small" },
      { question: "Say a word for the sky at night.", answer: "moon" },
      { question: "Say a word for something round.", answer: "ball" },
      { question: "Say a word for a vehicle with wheels.", answer: "car" }
    ]
  },
  "Grade 1": {
    "Math": [
      { question: "5 + 3 = ?", answer: "8" },
      { question: "10 - 4 = ?", answer: "6" },
      { question: "2 + 7 = ?", answer: "9" },
      { question: "3 + 6 = ?", answer: "9" },
      { question: "7 - 2 = ?", answer: "5" },
      { question: "4 + 4 = ?", answer: "8" },
      { question: "9 - 3 = ?", answer: "6" },
      { question: "1 + 5 = ?", answer: "6" },
      { question: "8 - 2 = ?", answer: "6" },
      { question: "6 + 3 = ?", answer: "9" }
    ],
    "Science": [
      { question: "What planet do we live on?", answer: "earth" },
      { question: "Which animal says 'moo'?", answer: "cow" },
      { question: "Which grows from seeds?", answer: "plants" },
      { question: "What do bees make?", answer: "honey" },
      { question: "What do humans need to breathe?", answer: "air" },
      { question: "Which is a star: sun or moon?", answer: "sun" },
      { question: "What liquid falls from clouds?", answer: "rain" },
      { question: "Which animal lays eggs?", answer: "chicken" },
      { question: "What do you drink when thirsty?", answer: "water" },
      { question: "Which is hot: fire or ice?", answer: "fire" }
    ],
    "Reading": [
      { question: "Which word rhymes with 'cat': bat or dog?", answer: "bat" },
      { question: "Which word starts with 'b': ball or cat?", answer: "ball" },
      { question: "What is the first letter of 'dog'?", answer: "d" },
      { question: "Which word is a color: sun or red?", answer: "red" },
      { question: "Which word starts with 'c': car or dog?", answer: "car" },
      { question: "What is the last letter in 'hat'?", answer: "t" },
      { question: "Which word is a number: five or cat?", answer: "five" },
      { question: "Which letter is a vowel: a or b?", answer: "a" },
      { question: "Which word rhymes with 'sun': fun or cat?", answer: "fun" },
      { question: "Which word starts with 's': sun or dog?", answer: "sun" }
    ],
    "English": [
      { question: "What is the opposite of 'big'?", answer: "small" },
      { question: "Name a fruit that is red.", answer: "apple" },
      { question: "What do you say when greeting someone?", answer: "hello" },
      { question: "Say a word for a pet animal.", answer: "dog" },
      { question: "Say the opposite of happy.", answer: "sad" },
      { question: "Say a color word.", answer: "blue" },
      { question: "Say a word for something you sit on.", answer: "chair" },
      { question: "Say a food that is sweet.", answer: "cake" },
      { question: "Say a word for something you read.", answer: "book" },
      { question: "Say the opposite of cold.", answer: "hot" }
    ]
  },
  // Grades 2 → 12 continue in the same structure...
};

// ---------------------- STATE ----------------------
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedGrade = "";
let selectedSubject = "";

// ---------------------- PAGE LOAD ----------------------
window.onload = function() {
  loadHome();
};

// ---------------------- HOME ----------------------
function loadHome() {
  document.getElementById("content").innerHTML = `
    <h2 style="text-align:center; margin-top:35px;">Choose a Subject & Grade</h2>
    <div style="text-align:center; margin-bottom:20px;">
      <select id="gradeSelect">
        <option value="">Select Grade</option>
        ${Object.keys(questionsByGrade).map(g => `<option value="${g}">${g}</option>`).join("")}
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
  selectedGrade = document.getElementById("gradeSelect").value;
  selectedSubject = document.getElementById("subjectSelect").value;

  if (!selectedGrade || !selectedSubject) {
    alert("Please select both grade and subject.");
    return;
  }

  currentQuestions = [...questionsByGrade[selectedGrade][selectedSubject]];
  currentQuestions = shuffleArray(currentQuestions);
  currentQuestionIndex = 0;
  score = 0;

  loadQuestion();
}

// ---------------------- LOAD QUESTION ----------------------
function loadQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  document.getElementById("content").innerHTML = `
    <div class="quiz-box">
      <h3>Question ${currentQuestionIndex + 1} / ${currentQuestions.length}</h3>
      <p>${q.question}</p>
      <input type="text" id="answerInput" placeholder="Your answer">
      <br><br>
      <button onclick="submitAnswer()">Submit</button>
      <div id="feedback" style="font-weight:bold; margin-top:10px;"></div>
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
    <div class="quiz-box">
      <h2>Quiz Completed!</h2>
      <p>You scored ${score} / ${currentQuestions.length}</p>
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
