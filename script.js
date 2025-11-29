let currentGrade = "";
let currentSubject = "";
let currentQuestions = [];
let score = 0;
let currentIndex = 0;

// Student profile
let studentProfile = {
  name: "Guest",
  avatar: "🐱",
  achievements: []
};

// Questions by grade (examples; you can expand)
const questionBank = {
  math: {
    JK: [/* 10 questions */], 1: [/* 10 */], 2: [/* 10 */], 3: [/* 10 */], 4: [/* 10 */],
    5: [/* 20 */], 6: [/* 20 */], 7: [/* 20 */], 8: [/* 20 */],
    9: [/* 30 */], 10: [/* 30 */], 11: [/* 30 */], 12: [/* 30 */]
  },
  english: { JK: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] },
  science: { JK: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] }
};

// Shuffle questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// NAVIGATION
function loadHome() {
  document.getElementById("content").innerHTML = `
      <div class="card">
          <h2>Welcome, ${studentProfile.name} ${studentProfile.avatar}</h2>
          <p>Select a grade and subject to start the quiz!</p>
          <div class="selectors">
              <select id="gradeSelect">
                  <option value="">Select Grade</option>
                  <option value="JK">JK</option>
                  ${Array.from({length:12},(_,i)=>`<option value="${i+1}">Grade ${i+1}</option>`).join('')}
              </select>
              <select id="subjectSelect">
                  <option value="">Select Subject</option>
                  <option value="math">Math</option>
                  <option value="english">English</option>
                  <option value="science">Science</option>
              </select>
          </div>
          <div id="feedback"></div>
      </div>
  `;
  document.getElementById("gradeSelect").addEventListener("change", loadQuizByGrade);
  document.getElementById("subjectSelect").addEventListener("change", loadQuizByGrade);
}

function loadProfile() {
  document.getElementById("content").innerHTML = `
      <div class="card">
          <h2>Profile</h2>
          <p>Name: ${studentProfile.name}</p>
          <p>Avatar: ${studentProfile.avatar}</p>
          <p>Achievements:</p>
          <ul>${studentProfile.achievements.map(a=>`<li>${a}</li>`).join('')}</ul>
          <div class="avatar-select">
