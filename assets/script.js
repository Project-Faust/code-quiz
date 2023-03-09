var topEl = document.getElementById('top');
var landingEl = document.getElementById('landing');
var landingHeading = document.getElementById('instructions');
var landingSubheading = document.getElementById('instructions-subheading');
var landingInstructions = document.getElementById('instructions');
var startBtn = document.getElementById('start-button');
var highscoreBtn = document.getElementById('highscore-button');
var highscoreTable = JSON.parse(localStorage.getItem('highScore')) ?? [];

// set starting time limit
let timeLimit = 16;

// set var for current question in sequence
var questionSequence = 0;

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
startBtn.addEventListener('click', function () {
    // removes quiz/hs buttons once quiz starts
    landingEl.innerHTML = '';
    highscoreBtn.style.display = 'none';
    startCountdown();
    nextSequence();
});

// puts succeeding sequence on page
function nextSequence() {
    // conditionally renders next question or submit hiscore screen
    if (questionSequence >= quizQuestions.length) {
        showSubmitHiscore();
    } else {
        // resets content so page doesn't overpopulate
        landingEl.innerHTML = '';
        // set var for current question, answers, and correct choice
        var currentQuestionSet = quizQuestions[questionSequence];
        var currentQuestion = currentQuestionSet.question;
        var currentAnswerChoice = currentQuestionSet.answerChoices;
        var currentCorrect = currentQuestionSet.correctAnswer;
        // click handler for answer buttons
        function answerBtnEvent(event) {
            if (event.target.textContent == currentCorrect) {
                // incremement questionSequence each time correct answer is selected
                questionSequence++;
                nextSequence();
                timeLimit += 3;
            } else {
                timeLimit -= 3;
            };
        };
        // append current question and create answers list (container)
        const questionHeading = document.createElement('h2');
        landingEl.appendChild(questionHeading);
        questionHeading.textContent = currentQuestion;
        const questionChoices = document.createElement('ul');
        landingEl.appendChild(questionChoices);
        // append current answers
        for (let i = 0; i < currentAnswerChoice.length; i++) {
            var answerBtn = document.createElement('button');
            answerBtn.classList.add('answer-btn');
            questionChoices.appendChild(answerBtn);
            answerBtn.textContent = currentAnswerChoice[i];
            answerBtn.addEventListener('click', answerBtnEvent);
        }
    };
};

// starts timer countdown
function startCountdown() {
    // causes timer to display once quiz starts by creating and appending element
    var timerEl = document.createElement('h1');
    topEl.appendChild(timerEl);
    timerEl.textContent = 'Ready?'
    const timerInterval = setInterval(function () {
        timeLimit--;
        timerEl.textContent = timeLimit + ' Seconds Remaining';
        // ends timer when countdown reaches 0 and ends the quiz
        if (timeLimit <= 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Time's up! Refresh the page to try again!";
            landingEl.innerHTML = '';
        }
        // clears timer and hides element if quiz is successfully finished
        else if (questionSequence >= quizQuestions.length) {
            clearInterval(timerInterval);
            timerEl.textContent = 'Quiz complete!';
        }
    }, 1000);
};

// render page if quiz is successfully completed
function showSubmitHiscore() {
    // reset content on page
    landingEl.innerHTML = '';
    // create elements
    const yourHighScore = document.createElement('h2');
    const submitHiscoreForm = document.createElement('input');
    const submitHelpText = document.createElement('h3');
    const hiscoreBtn = document.createElement('button');
    landingEl.appendChild(yourHighScore);
    landingEl.append(submitHelpText);
    landingEl.appendChild(submitHiscoreForm);
    landingEl.appendChild(hiscoreBtn);
    yourHighScore.textContent = 'Congratulations! You have answered all questions correctly. Your score is: ' + timeLimit;
    submitHelpText.textContent = 'Enter your initials in the form below and click submit to save your high score!';
    hiscoreBtn.textContent = 'Submit!';
    submitHiscoreForm.setAttribute('type', 'text');
    hiscoreBtn.addEventListener('click', function () {
        highscoreTable.push((submitHiscoreForm.value + ' ' + timeLimit))
        localStorage.setItem('highScore', JSON.stringify(highscoreTable));
        showHiscorePage();
    });
};

function showHiscorePage() {
    landingEl.innerHTML = '';
    timerEl.innerHTML = '';
    const hiscoreHeading = document.createElement('h2');
    const hiscoreContainer = document.createElement('ul');
    landingEl.appendChild(hiscoreHeading);
    landingEl.appendChild(hiscoreContainer);
    highscoreTable.forEach(function () {
        const hiscoreEntry = document.createElement('p');
        hiscoreContainer.appendChild(hiscoreEntry);
    });
}