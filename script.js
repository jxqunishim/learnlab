let selectedGrade = "JK"; // default

function startTest(subject) {
    // Save selected grade
    const gradeSelect = document.getElementById("gradeSelect");
    if (gradeSelect) selectedGrade = gradeSelect.value;

    currentSubject = subject;
    currentQuestion = 0;
    score = 0;

    shuffledQuestions = shuffleArray([...questions[subject]]); // shuffle each time

    if (!document.getElementById("score")) {
        const scoreDiv = document.createElement("div");
        scoreDiv.id = "score";
        scoreDiv.textContent = `Score: 0 / ${shuffledQuestions.length}`;
        document.body.appendChild(scoreDiv);
    }

    showQuestion();
}
