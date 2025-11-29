function showFeedback(message, correct=true) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = message;
    feedbackDiv.style.color = correct ? "#1cc88a" : "#e74a3b"; // green for correct, red for wrong
    feedbackDiv.style.fontWeight = "bold";
    feedbackDiv.style.fontSize = "18px";
    feedbackDiv.style.marginTop = "15px";
    feedbackDiv.style.transition = "opacity 0.3s";
    feedbackDiv.style.opacity = "1";

    // Optional: fade out after 2 seconds
    setTimeout(() => {
        feedbackDiv.style.opacity = "0";
    }, 2000);
}
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
    const positiveResponses = ["Brilliant! 🎉", "Correct! ✅", "Great! 🌟", "Perfect! ✨"];
    
    if (ans == 13) {
        // Pick a random positive message
        const msg = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
        showFeedback(msg, true); // green text
    } else {
        showFeedback("Try again!", false); // red text
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
    const positiveResponses = ["Brilliant! 🎉", "Correct! ✅", "Great! 🌟", "Perfect! ✨"];
    
    if (ans.includes("window")) {
        const msg = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
        showFeedback(msg, true);
    } else {
        showFeedback("Try again!", false);
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
    const positiveResponses = ["Brilliant! 🎉", "Correct! ✅", "Great! 🌟", "Perfect! ✨"];
    
    if (ans.includes("sun") || ans.includes("water") || ans.includes("light")) {
        const msg = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
        showFeedback(msg, true);
    } else {
        showFeedback("Try again!", false);
    }
}
