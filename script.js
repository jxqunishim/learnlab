function loadHome() {
    currentGrade = "JK";
    currentSubject = "Math";
    currentQuestion = 0;
    score = 0;

    document.getElementById("content").innerHTML = `
        <div style="text-align:center; margin: 20px 0;">
            <label for="gradeSelect" style="font-size:20px; font-weight:bold;">Select Grade Level: </label>
            <select id="gradeSelect">
                ${grades.map(g => `<option value="${g}">${g}</option>`).join("")}
            </select>
        </div>
        <div class="subject-grid">
            <div class="subject-card" onclick="chooseSubject('Math')">Math</div>
            <div class="subject-card" onclick="chooseSubject('Reading')">Reading</div>
            <div class="subject-card" onclick="chooseSubject('Science')">Science</div>
        </div>
    `;

    // Add proper event listener for dropdown
    const gradeDropdown = document.getElementById("gradeSelect");
    gradeDropdown.addEventListener("change", function() {
        currentGrade = this.value;
    });

    // Remove old score display if exists
    const scoreDiv = document.getElementById("score");
    if (scoreDiv) scoreDiv.remove();
}
