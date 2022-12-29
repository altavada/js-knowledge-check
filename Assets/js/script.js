    // GLOBAL VARIABLES

// target elements stored as global variables for easy, open reference
var startButton = document.getElementById("startbutton");
var nextButton = document.getElementById("nextquestion");
var quizBox = document.getElementById("quizbox");
var resultBox = document.getElementById("results");
var scoreboard = document.getElementById("scoreboard");
var saveButton = document.getElementById("savebutton");
var qcontainer = document.getElementById("question");
var achoice = document.getElementById("achoice");
var bchoice = document.getElementById("bchoice");
var cchoice = document.getElementById("cchoice");
var dchoice = document.getElementById("dchoice");

// global variables acting as state indicators needed by multiple functions
var thisAnswer = false;
var onQuestion = 0;
var allQuestions = [];
var score = 0;

// array to hold saved score data pulled from local storage and on-page submissions
var scoreRecord = [];


    //OBJECTS

// object containing each question, its set of answer choices, and its answer key, stored as objects
var questions = {
    question0: {
        q: "This is question 1",
        a: "Answer 1",
        b: "Answer 2",
        c: "Answer 3",
        d: "Answer 4",
        r: "b"
    },
    question1: {
        q: "This is question 2",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "c"
    },
    question2: {
        q: "This is question 3",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "a",
    },
    question3: {
        q: "This is question 4",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "d",
    },
    question4: {
        q: "This is question 5",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "d"
    },
    question5: {
        q: "This is question 6",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "a"
    },
    question6: {
        q: "This is question 7",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "b"
    },
    question7: {
        q: "This is question 8",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "c"
    },
    question8: {
        q: "This is question 9",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "b"
    },
    question9: {
        q: "This is question 10",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4",
        r: "c"
    }
}

// renders each question object in the allquestions array such that an object and its properties can be accessed thru its array index. Adapted from this solution: https://stackoverflow.com/questions/37077617/javascript-store-multiple-objects-in-array-and-access-their-properties-via
for (var quizItem in questions) {
    allQuestions.push(questions[quizItem]);
}


    // EVENT LISTENERS

// initiates quiz when start button is pressed
startButton.addEventListener("click", function() {
    quizBox.addEventListener("click", function(event) {
        let selection = event.target;
        if (selection.matches("p")) {
            let answer = selection.getAttribute("data-choice");
            if (answer === allQuestions[onQuestion].r) {
                thisAnswer = true;
            }
        }
    })
    nextButton.setAttribute("style", "display:inline-block");
    quizBox.setAttribute("style", "display:block");
    nextQuestion();
})

// records answer and cues next question when next button is clicked
nextButton.addEventListener("click", function() {
    if (thisAnswer === true) {
        score++;
    }
    onQuestion++;
    thisAnswer = false;
    if (onQuestion === allQuestions.length) {
        showScore();
    } else {
        nextQuestion();
    }
})

// saves initials and score when save button is clicked, and adds it to the scoreboard
saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    let initialsInput = initials.value.trim();
    if (initialsInput === "") {
        return;
    } else {
        let yourScore = {
            initials: initialsInput,
            score: score
        }
        scoreRecord.push(yourScore);
        initials.value = "";
        localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
        renderScoreboard();
    }
})


    // FUNCTIONS

// parses saved score data from local storage and stores it in an array as series of objects
function initScoreboard() {
    let storedScores = JSON.parse(localStorage.getItem("scoreRecord"));
    if (storedScores !== null) {
        scoreRecord = storedScores;
    }
    renderScoreboard();
}
// populates scoreboard section of the page with saved score data
function renderScoreboard() {
    scoreboard.innerHTML = "";
    for (var item in scoreRecord) {
        let savedScore = scoreRecord[item];
        let li = document.createElement("li");
        li.textContent = savedScore.initials + ": " + savedScore.score + "/10";
        scoreboard.appendChild(li);
    }
}

function nextQuestion() {
    let currentQuestion = allQuestions[onQuestion];
    qcontainer.textContent = currentQuestion.q;
    achoice.textContent = currentQuestion.a;
    bchoice.textContent = currentQuestion.b;
    cchoice.textContent = currentQuestion.c;
    dchoice.textContent = currentQuestion.d;
}

function showScore() {
    quizBox.setAttribute("style", "display:none");
    document.getElementById("userScore").textContent = score;
    resultBox.setAttribute("style", "display:block");
}

initScoreboard();