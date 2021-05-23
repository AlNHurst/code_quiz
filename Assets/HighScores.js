var highscore = document.querySelector('.scores');
var score = localStorage.getItem("Score");
var submitButton = document.querySelector("#btn");
highscore.textContent = "Your Score is " + score;
var input;

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    input = document.querySelector("#init").nodeValue;
    JSON.stringify(localStorage.setItem("Initials", input + ""));
    addListItem();
})

function addListItem(){
    var node = document.createElement("li");
    node.appendChild(document.createTextNode("Initials: " + input + "\nScore: " + score))

    document.querySelector('ul').appendChild(node);
    
}