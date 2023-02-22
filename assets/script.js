var topEl = document.getElementById('top');
var landingEl = document.getElementById('landing');
var landingHeading = document.getElementById('instructions');
var landingSubheading = document.getElementById('instructions-subheading');
var landingInstructions = document.getElementById('instructions');
var startBtn = document.getElementById('start-button');
var highscoreBtn = document.getElementById('highscore-button');

// questions, answer choices, and correct answer stored
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include which of the following?",
        answerChoices: ["Strings", "Booleans", "Alerts", "Numbers"],
        correctAnswer: "Alerts"
    },
    {
        question: "The condition of an if/else statement is enclosed whithin what?",
        answerChoices: ["Quotes", "Curly Braces", "Parentheses", "Square Brackets"],
        correctAnswer: "Parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store which of the following?",
        answerChoices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        correctAnswer: "All of the Above"
    },
    {
        question: "String values must be enclosed within what when being assigned to variables.",
        answerChoices: ["Commas", "Curly Braces", "Quotes", "Parentheses"],
        correctAnswer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerChoices: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
        correctAnswer: "console.log"
    },
];


// moves to next item in sequence and starts timer when clicking startBtn
startBtn.addEventListener("click", function () {
    // removes quiz/hs buttons once quiz starts
    landingEl.style.display = "none";
    highscoreBtn.style.display = "none";
    // causes timer to display once quiz starts by creating and appending element
    var timerEl = document.createElement('h1');
    topEl.appendChild(timerEl);
    // starts timer countdown
    startCountdown();
    function startCountdown() {
        // set starting time limit
        let timeLimit = 10;
        const timerInterval = setInterval(function() {
            timeLimit--;
            timerEl.textContent = timeLimit + " Seconds Remaining";
            // ends timer when countdown reaches 0 and ends the quiz
            if (timeLimit == 0) {
                clearInterval(timerInterval);
                timerEl.textContent = "Time's up!"
            }
        }, 1000);
    }
});

// set var for current question in sequence
var questionSequence = 0;

// puts succeeding sequence on page
function nextSequence() {
    // set var for current question
    var currentQuestion = quizQuestions[questionSequence];
    questionEl.textContent = quizQuestions.currentQuestion;

    // incremement questionSequence each time correct answer is selected
    questionSequence++;

    // if questionSequence > #questions THEN end quiz
    if (questionSequence > quizQuestions.length) {
        //end quiz, show score/submit screen
    }
};