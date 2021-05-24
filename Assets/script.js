// Global varibles 
var countDown = document.querySelector(".timer");
var questionTitleEl = document.querySelector("#question-title");
var startButton = document.querySelector("#start-button");
var sectionEl = document.querySelector("#section");
var currentTimeEl = document.querySelector(".current-time");
var formEl = document.querySelector(".form");
var inputEl = document.querySelector("input[type=text]");
var highScoreEl = document.querySelector("#high-score");
var quizDirections = document.querySelector(".directions");
var labelEl = document.querySelector("#label");


var timeLeft = 10;
var stage = 0;
var timer;
var score = 0;

// localstorage get item if set item is available or empty array
var scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];

if (currentTimeEl) {
    currentTimeEl.textContent = 10 + " s";
}

// Questions as arrays. Using Lodash shuffle to shuffle questions in a random order
var data = [
    {
        short: "Arrays",
        title: "Which method adds one or more elements to the end of an array and returns the new length of the array?",
        choices: ["pop()", "unshift()", "push()", "shift()"],
        correct: 2
    },

    {
        short: "If Else Statements",
        title: "The condition in an if else statement is enclosed within ___.",
        choices: ["parentheses", "square brackets", "curly braces", "quotes"],
        correct: 0
    },

    {
        short: "CSS Properties",
        title: "The ___ property is used to get or set a specific style of an element using different CSS properties",
        choices: ["input", "class", "css", "style"],
        correct: 3
    },

    {
        short: "Array Index Positions",
        title: "What is the index position of \"Yo\" in the following array: var myGreetings = [\"hi\", \"sup\", \"hello\", \"yo\", \"hey\"]?",
        choices: ["4", "2", "3", "1"],
        correct: 2
    },

    {
        short: "Display Styles",
        title: "___ tells the browser to account for any border and padding in the values you specify for an element's width and height.",
        choices: ["padding", "box-sizing: border-box", "display: flex", "flex wrap"],
        correct: 1
    }
]

var questions = _.shuffle(data);
var currentQuestion = questions[stage];
// var choices = _.shuffle(currentQuestion.choices);
renderHighScore();


// Displays start time on timer before countdown begins
// Start function which starts the quiz and displays the time left. If time runs out, the user will be prompted that they are out of time! 
function start() {
    currentTimeEl.textContent = timeLeft + " s";
    renderQuestion();

    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft > 0) {
            currentTimeEl.textContent = timeLeft + " s";
        } else {
            currentTimeEl.textContent = 0 + " s";
            clearInterval(timer);
        }
    }, 1000);
};

// Get current question from the array; create buttons for answer choices. Shuffle question choices. 
function renderQuestion() {
    currentQuestion = questions[stage];
    sectionEl.innerHTML = "";
    questionTitleEl.textContent = currentQuestion.title;
    startButton.style.visibility = "hidden";
    quizDirections.style.display = "none";

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var btn = document.createElement("BUTTON");
        btn.textContent = choice;
        btn.setAttribute("class", "btn");
        btn.setAttribute("data-index", i);
        sectionEl.appendChild(btn);
        btn.setAttribute("style", "display: block; margin: auto; margin-bottom: 10px");
    }
}

// Function for game over messages. 
function gameOver() {
    sectionEl.innerHTML = "";
    labelEl.textContent = "";
    questionTitleEl.textContent = "";

    clearInterval(timer);
    currentTimeEl.textContent = "Game Over!";
    var scoreMsg = document.createElement("p");
    var initialMsg = document.createElement("p");
    sectionEl.appendChild(scoreMsg);
    formEl.appendChild(initialMsg);
    if (timeLeft <= 0) {
        scoreMsg.textContent = "You ran out of time! Refresh the website to try again!";
    } else {
        scoreMsg.textContent = "Good Job! Your score is " + timeLeft + "!"; 
        scoreMsg.setAttribute("style", "font-size: 32px; color: green")
        initialMsg.textContent = " Enter your initials above to record your high score. Then click High Scores to view the standings and see how you measure up!";
        formEl.style.visibility = "visible";
    }
};

// Creating new list element and appended to ordered list in DOM
function renderHighScore() {
    var sortedByScore = scoreboard.sort(function (a, b) {
        return b.score - a.score;
    });
    for (var item of scoreboard) {
        var liEl = document.createElement("li");
        liEl.textContent = item.initials + ": " + item.score;
        liEl.setAttribute("style", "font-size: 20px");
        highScoreEl?.appendChild(liEl);
    }
    console.log(scoreboard);
}

// Event listeners. 
// Answer feedback for users. 
sectionEl?.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button")) {
        var index = parseInt(element.dataset.index);
        if (stage < questions.length - 1) {
            if (index === currentQuestion.correct) {
                var response = document.createElement("p");
                response.textContent = currentQuestion.short + " ✔";
                response.style.color = "green";
                labelEl.appendChild(response);
                timeLeft += 15;
            } else {
                var response = document.createElement("p");
                response.textContent = currentQuestion.short + " ×";
                response.style.color = "red";
                labelEl.appendChild(response);
                timeLeft -= 15;
            }
            stage++;
            renderQuestion();
        } else {
            gameOver();
        }
    }
});

// event listener to set localstorage to variable scoreboard. 
formEl?.addEventListener("submit", function (event) {
    event.preventDefault();
    var initials = inputEl.value;
    var data = { initials: initials, score: timeLeft };
    scoreboard = scoreboard.concat(data);
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
});

// Starts countDown of timer and displays first question after the start button is clicked.
startButton?.addEventListener("click", start);
