// use local storage to store data on one page and you can retrieve that data on another page
// AKA store the highscores (setItem on the original page) and retrieve that data using the (getItem) on the highscore page to save the highscore and display it on the separate highscore page 
// use Event Listener "click" and when the submit button is clicked we will add the score to the local storage 

var startBtn = document.querySelector("#startBtn")
var answerBtns = document.querySelector(".answers")
var submitInBtn = document.querySelector("#submitBtn")
var goBackBtn = document.querySelector("#gobackBtn")
var resetScoresBtn = document.querySelector("#reset-scores")
var scoreboardLink = document.querySelector("#score-page")
var timerDiv = document.querySelector("#timer")
var startDiv = document.querySelector("#start")
var quizDiv = document.querySelector("#quiz-content")
var scoreFormDiv = document.querySelector("#scoreForm")
var scoreboardDiv = document.querySelector("#scoreboard")
var showScore = document.querySelector("#final-score")
var divsContainer = [startDiv, quizDiv, scoreFormDiv, scoreboardDiv]
var questionText = document.querySelector("#questions")
var ans1Btn = document.querySelector("#ans1")
var ans2Btn = document.querySelector("#ans2")
var ans3Btn = document.querySelector("#ans3")
var ans4Btn = document.querySelector("#ans4")
var answerComp = false;
var index = 0
var finalScore = 0;

var secondsLeft = 60;
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
]

function setTimer() {
    var timeInterval = setInterval(function() {
        secondsLeft --;
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
    showQuestion(index);
}


function showQuestion(index){
    questionText.textContent = quizQuestions[index].question;
    ans1Btn.textContent = quizQuestions[index].answers.a;
    ans2Btn.textContent = quizQuestions[index].answers.b;
    ans3Btn.textContent = quizQuestions[index].answers.c;
    ans4Btn.textContent = quizQuestions[index].answers.d;
}

function answerCheck(clickedElement){
    for (let i=0; i<quizQuestions.length; i++) {
        if (clickedElement.textContent === quizQuestions[i].correctAnswer) {
            answerComp = true;
            console.log(answerComp)
        };
    }
    if (answerComp === true && index === quizQuestions.length) {
        finalScore = secondsLeft;
        secondsLeft = 0;
        console.log(finalScore);
        endQuiz();
    } else if (answerComp != true) {
        secondsLeft = (secondsLeft-10);
    } 
}
    
function nextQ(){
    index = (index+1);
    if (index>quizQuestions.length) {
        index=0;
    }
    return index
}

function endQuiz() {
    hideAllElements();
    showElement(scoreFormDiv);
    showScore.textContent = finalScore;

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
    if (answerComp===true){
        showQuestion(nextQ());
        console.log(index)
    }
})



scoreboardLink.addEventListener("click", function(){
    hideAllElements();
    showElement(scoreboardDiv)})

goBackBtn.addEventListener("click",function(){
    hideAllElements();
    showElement(startDiv);
})