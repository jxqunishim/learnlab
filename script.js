// Update this function to handle subjects
function loadSubject() {
    const subject = document.getElementById("subjectSelect").value;
    if (!subject) return;

    switch(subject) {
        case "math":
            loadQuizByGrade(); // Math quiz
            break;
        case "english":
            document.getElementById("content").innerHTML = `
                <div class="card">
                    <h2>English Quiz Placeholder</h2>
                    <p>Questions will be added here soon!</p>
                </div>
            `;
            break;
        case "science":
            document.getElementById("content").innerHTML = `
                <div class="card">
                    <h2>Science Quiz Placeholder</h2>
                    <p>Questions will be added here soon!</p>
                </div>
            `;
            break;
    }
}
