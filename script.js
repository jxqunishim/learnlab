// Load homepage at start
window.onload = function() {
    loadHome();
};

// HOME PAGE
function loadHome() {
    document.getElementById("content").innerHTML = `
        <h2 style="text-align:center; margin-top:35px;">Choose a Subject</h2>

        <div class="subject-grid">
            <div class="subject-card" onclick="loadMath()">
                <h3>Math</h3>
                <p>Practice skills & challenges</p>
            </div>

            <div class="subject-card" onclick="loadReading()">
                <h3>Reading</h3>
                <p>Comprehension & vocabulary</p>
            </div>

            <div class="subject-card" onclick="loadScience()">
                <h3>Science</h3>
                <p>Learn about the world</p>
            </div>
        </div>
    `;
}

// ---------------------- MATH SECTION ----------------------
function loadMath() {
    document.getElementById("content").innerHTML = `<div id="feedback"></div>

        <div class="lesson-box">
            <h2>Math Practice</h2>
            <p>Solve: <b>7 + 6 = ?</b></p>
            <input id="mathInput" type="number" placeholder="Your answer">
            <br>
            <button onclick="checkMath()">Submit</button>
        </div>
    `;
}

function checkMath() {
    let ans = document.getElementById("mathInput").value;
    if (ans == 13) {
        alert("Correct! 🎉");
    } else {
        alert("Try again!");
    }
}

// ---------------------- READING SECTION ----------------------
function loadReading() {
    document.getElementById("content").innerHTML = `<div id="feedback"></div>

        <div class="lesson-box">
            <h2>Reading Practice</h2>
            <p>Read this sentence:</p>
            <p><i>"The cat sat on the warm windowsill."</i></p>
            <p>Where did the cat sit?</p>
            <input id="readingInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="checkReading()">Submit</button>
        </div>
    `;
}

function checkReading() {
    let ans = document.getElementById("readingInput").value.toLowerCase();
    if (ans.includes("window")) {
        alert("Correct! 🎉");
    } else {
        alert("Try again!");
    }
}

// ---------------------- SCIENCE SECTION ----------------------
function loadScience() {
    document.getElementById("content").innerHTML = `<div id="feedback"></div>

        <div class="lesson-box">
            <h2>Science Practice</h2>
            <p>What do plants need to grow?</p>
            <input id="scienceInput" type="text" placeholder="Your answer">
            <br>
            <button onclick="checkScience()">Submit</button>
        </div>
    `;
}

function checkScience() {
    let ans = document.getElementById("scienceInput").value.toLowerCase();
    if (ans.includes("sun") || ans.includes("water") || ans.includes("light")) {
        alert("Correct! 🎉");
    } else {
        alert("Try again!");
    }
}
