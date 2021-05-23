var countDown = document.querySelector(".timer");
var questionTitleEl = document.querySelector("#question-title");
var startButton = document.querySelector("#start-button");
var sectionEl = document.querySelector("#section");
var currentTimeEl = document.querySelector(".current-time");

var timeLeft = 90
var stage = 0;
var timer;
var score = 0;
var questions = [
    {
        title: "Question1",
        choices: ["a", "b", "c", "d"],
        correct: 1
    },

    {
        title: "Question2",
        choices: ["a", "b", "c", "d"],
        correct: 1
    },

    {
        title: "Question3",
        choices: ["a", "b", "c", "d"],
        correct: 1
    },

    {
        title: "Question4",
        choices: ["a", "b", "c", "d"],
        correct: 1
    },

    {
        title: "Question5",
        choices: ["a", "b", "c", "d"],
        correct: 1
    }
]

currentTimeEl.textContent = timeLeft + " s";

function start() {
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
}

function renderQuestion() {
    var currentQuestion = questions[stage];
    questionTitleEl.textContent = currentQuestion.title;

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

sectionEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button")) {
        var index = parseInt(element.dataset.index);
        if (stage < questions.length - 1) {
            if (index == questions[stage].correct) {
                element.style.backgroundColor = "green";
                timeLeft += 15;
            } else {
                element.style.backgroundColor = "red";
                timeLeft -= 15;
            }
            stage++;
            renderQuestion();
        } else {
            gameOver();
        }
    }
})

function gameOver() {
    sectionEl.innerHTML = "";
    clearInterval(timer);
    currentTimeEl.textContent = timeLeft + " s";
    var scoreMsg = document.createElement("p");
    scoreMsg.textContent = "Good Job! Your score is " + timeLeft + "!" + " Enter your initials below to save your score.";
    scoreMsg.setAttribute("style", "font-size: 24px; color: lightslategrey");
    sectionEl.appendChild(scoreMsg);

    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("placeholder", "Initials");
    sectionEl.appendChild(initials);
    
    var submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Submit");
    submitBtn.setAttribute("style", "background-color: slategrey; color: white")
    sectionEl.appendChild(submitBtn);
    
}

startButton.onclick = start();