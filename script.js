let currentQuestionIndex = 0;
let score = 0;
let questions = [ ... ]; // your questions array

function loadQuestion() {
    // Only load a question if index is valid
    if (currentQuestionIndex < questions.length) {
        // display questions[currentQuestionIndex] in HTML
    }
}

function submitAnswer(userAnswer) {
    if (userAnswer === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('score').innerText = `You scored ${score} / ${questions.length}`;
}
