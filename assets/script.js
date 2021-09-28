// use local storage to store data on one page and you can retrieve that data on another page
// AKA store the highscores (setItem on the original page) and retrieve that data using the (getItem) on the highscore page to save the highscore and display it on the separate highscore page 
// use Event Listener "click" and when the submit button is clicked we will add the score to the local storage 

var startBtn = document.querySelector("#startBtn")
var answerBtns = document.querySelector(".answers")
var submitInBtn = document.querySelector("#submitBtn")
var goBackBtn = document.querySelector("#gobackBtn")
var highscoresList = document.querySelector("#highscores")
var resetScoresBtn = document.querySelector("#reset-scores")
var scoreboardLink = document.querySelector("#score-page")
var scoresText = document.querySelector("#scoresText")
var timerDiv = document.querySelector("#timer")
var startDiv = document.querySelector("#start")
var quizDiv = document.querySelector("#quiz-content")
var scoreFormDiv = document.querySelector("#scoreForm")
var scoreboardDiv = document.querySelector("#scoreboard")
var showScore = document.querySelector("#final-score")
var inInput = document.querySelector("#initials")
var divsContainer = [startDiv, quizDiv, scoreFormDiv, scoreboardDiv]
var questionText = document.querySelector("#questions")
var ans1Btn = document.querySelector("#ans1")
var ans2Btn = document.querySelector("#ans2")
var ans3Btn = document.querySelector("#ans3")
var ans4Btn = document.querySelector("#ans4")
var answerComp = false;
var indexQ = 0
var finalScore = 0;
var userInitial;
var secondsLeft = 60;
var timeInterval;
var highscoreList = []


var quizQuestions = [
    {question: "Commonly used data types DO NOT include:",
    answers: {
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
    },
    correctAnswer: "alerts",
    },
    {question: "The condition in an if / else statement is enclosed within _____.",
    answers: {
        a: "quotes",
        b: "curly brackets",
        c: "parentheses",
        d: "square brackets",
    },
    correctAnswer: "parentheses",
    },
    {question: "Arrays in Javascript can be used to store: ____.",
    answers: {
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all of the above",
    },
    correctAnswer: "all of the above",
    },
    {question: "Commonly used data types DO NOT include:",
    answers: {
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
    },
    correctAnswer: "alerts",
    }
]

init();

function setTimer() {
    timeInterval = setInterval(function() {
        if (secondsLeft > 0) {
        secondsLeft --;}
        timerDiv.textContent = secondsLeft + " seconds remaining";

        if (secondsLeft === 0) {
            clearInterval(timeInterval);
            hideElement(quizDiv);
            showElement(scoreFormDiv);
        }
    },1000);
}

function startQuiz(){
    setTimer();
    hideElement(startDiv);
    showElement(quizDiv);
    showQuestion(indexQ);
}


function showQuestion(indexQ){
    questionText.textContent = quizQuestions[indexQ].question;
    ans1Btn.textContent = quizQuestions[indexQ].answers.a;
    ans2Btn.textContent = quizQuestions[indexQ].answers.b;
    ans3Btn.textContent = quizQuestions[indexQ].answers.c;
    ans4Btn.textContent = quizQuestions[indexQ].answers.d;
}

function answerCheck(clickedElement){
    if (clickedElement.textContent === quizQuestions[indexQ].correctAnswer && indexQ<(quizQuestions.length-1)) {
        answerComp = true;
        console.log(indexQ);
        indexQ++;
        showQuestion(indexQ); 
    } else if (clickedElement.textContent === quizQuestions[indexQ].correctAnswer && indexQ===(quizQuestions.length-1)) {
        finalScore = secondsLeft;
        indexQ=0;
        endQuiz();} 
    
    else if (answerComp != true){
         secondsLeft = (secondsLeft-10)
    }
}


function endQuiz() {
    hideAllElements();
    showElement(scoreFormDiv);
    showScore.textContent = finalScore; 
}

function saveInfo() {

    highscoreList.push([inInput.value,finalScore]);
    localStorage.setItem('highscore-list', JSON.stringify(highscoreList));
    inInput.textContent = '';
    init();
}

function init() {
    var lastScore = JSON.parse(localStorage.getItem('highscore-list'));
    if (lastScore !== null) {
        for (let i = 0; i < lastScore.length; i++) {
            var scoresLi = document.createElement("li")
            highscoresList.appendChild(scoresLi)
            scoresLi.textContent = lastScore[i].join("-");
        }
    } else scoresText.textContent = "No highscores yet."
}


function showElement (element) {
    element.setAttribute("style", "display:block");
}

function hideElement (element) {
    element.setAttribute("style","display:none")
}

function hideAllElements(){
    // for (let i=0; i<divsContainer.length; i++) {
        // if (divsContainer[i].getAttribute("style") !== "none"){
        startDiv.setAttribute("style","display:none");
        quizDiv.setAttribute("style","display:none");
        scoreboardDiv.setAttribute("style","display:none");
        scoreFormDiv.setAttribute("style","display:none");
}



    
startBtn.addEventListener("click",startQuiz)

quizDiv.addEventListener("click", function(event){
    var clickedElement = event.path[0];
    answerCheck(clickedElement);
    // if (indexQ >= quizQuestions.length) {
    //     finalScore = secondsLeft;
    //     endQuiz();
    // }
    
})

submitInBtn.addEventListener("click", function(event) {
    event.preventDefault();
    saveInfo();
    hideAllElements();
    showElement(scoreboardDiv);
})

scoreboardLink.addEventListener("click", function(){
    hideAllElements();
    showElement(scoreboardDiv)})

goBackBtn.addEventListener("click",function(){
    hideAllElements();
    showElement(startDiv);
})

resetScoresBtn.addEventListener("click",function(){
    localStorage.removeItem('highscore-list')
    scoresText.textContent = "No highscores yet."
})