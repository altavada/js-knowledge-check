    // GLOBAL VARIABLES

// target elements stored as global variables for easy, open reference
var startButton = document.getElementById("startbutton");
var nextButton = document.getElementById("nextquestion");
var replay = document.getElementById("replay");
var minuteHand = document.getElementById("minutehand");
var secondHand = document.getElementById("secondhand");
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
var score = 0;
var secondsLeft = 0;
var minutesLeft = 5;

// empty arrays to organize related objects for easy access
var scoreRecord = [];
var allQuestions = [];


    //OBJECTS

// object containing each question, its set of answer choices, and its answer key, stored as objects
var questions = {
    question0: {
        q: "1. Which of the following is NOT a primitive data type in JavaScript?",
        a: "Boolean",
        b: "Object",
        c: "Undefined",
        d: "Number",
        r: "b"
    },
    question1: {
        q: '2. Which of the following most accurately describes an instance of "shadowing?"',
        a: "When the execution of two functions conflicts; the first function called overrides the second.",
        b: "When the execution of two functions conflicts; the second function called overrides the first.",
        c: "When a global variable shares the same name as a local variable in a function; the function will read the local variable and ignore the global one.",
        d: "When a global variable shares the same name as a local variable in a function; the function will read the global variable and ignore the local one.",
        r: "c"
    },
    question2: {
        q: "3. What does the push() method do?",
        a: "Adds one or more items to the end of an array and returns the new array length.",
        b: "Prioritizes the execution of a called function and passes up its return value.",
        c: "Adds a string or node object after the last child of a targeted HTML element.",
        d: "Creates a new array with one or more items.",
        r: "a",
    },
    question3: {
        q: "4. An object can contain each of the following EXCEPT:",
        a: "Arrays",
        b: "Objects",
        c: "Methods",
        d: "None; an object can contain all of the above",
        r: "d",
    },
    question4: {
        q: '5. A JavaScript object contains data sorted and stored as "properties." Another name for these properties is:',
        a: "Elements",
        b: "Attributes",
        c: "Variables",
        d: "Key-value pairs",
        r: "d"
    },
    question5: {
        q: "6. What does an event listener do?",
        a: "Defines a certain function to listen for and an output to display on the webpage when the function is executed.",
        b: "Defines a certain user input on the webpage and a function to execute when that input is detected.",
        c: "Defines a certain user input on the webpage and data to save to local storage when that input is detected.",
        d: "Defines a certain function to listen for and data to save to local storage when that function is executed.",
        r: "b"
    },
    question6: {
        q: "7. Describe the functionality of the following variable: 'var futureBookings = document.body.children[2].children[1];'",
        a: "Targets the first child of the second child of the body element.",
        b: "Targets the second child of the third child of the body element.",
        c: "Targets the first child of the second child of the document element.",
        d: "Targets the second child of the third child of the document element.",
        r: "b"
    },
    question7: {
        q: "8. We can convert a JS object to a string using the JSON.stringify() method. What method can we use to convert this data back into an object format?",
        a: "JSON.trim()",
        b: "JSON.split()",
        c: "JSON.parse()",
        d: "JSON.getItem()",
        r: "c"
    },
    question8: {
        q: '9. When used inside of a defined object, the keyword "this" refers to that object. When used in a browser outside of such an object, to what does it refer?',
        a: "The Window object",
        b: "The Document object",
        c: "The JavaScript file",
        d: "The targeted HTML file",
        r: "a"
    },
    question9: {
        q: "10. Let's say you need to resolve an event-bubbling issue in your JS code. What method would you use to acheive this?",
        a: "setAttribute()",
        b: "preventDefault()",
        c: "stopPropogation()",
        d: "trim()",
        r: "c"
    }
}

// renders each question object in the allquestions array such that an object and its properties can be accessed thru its array index. Adapted from this solution: https://stackoverflow.com/questions/37077617/javascript-store-multiple-objects-in-array-and-access-their-properties-via
for (var quizItem in questions) {
    allQuestions.push(questions[quizItem]);
}


    // EVENT LISTENERS

// runs script to set up and begin quiz when start button is clicked
startButton.addEventListener("click", quizInit);

// sets event listener to evaluate answers when selected
quizBox.addEventListener("click", function(event) {
    let selection = event.target;
    if (selection.matches("p")) {
        let answer = selection.getAttribute("data-choice");
        if (answer === allQuestions[onQuestion].r) {
            thisAnswer = true;
        }
        answerBoxReset();
        selection.setAttribute("style", "background-color:whitesmoke; color:purple");
    }
})

// records answer and cues next question when next button is clicked, or cues the results screen if quiz is completed. -30 second time penalty for wrong answers.
nextButton.addEventListener("click", function() {
    if (thisAnswer === true) {
        score++;
    } else {
        let newTime = secondsLeft - 30;
        if (newTime < 0) {
            minutesLeft--;
            secondsLeft = newTime + 60;
        } else {
            secondsLeft = newTime;
        }
    }
    onQuestion++;
    thisAnswer = false;
    if (onQuestion === allQuestions.length) {
        showScore();
    } else {
        nextQuestion();
    }
})

// replay button 
replay.addEventListener("click", function() {
    thisAnswer = false;
    onQuestion = 0;
    score = 0;
    secondsLeft = 0;
    minutesLeft = 5;
    resultBox.setAttribute("style", "display:none");
    quizInit(); 
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

function quizInit() {
    nextButton.setAttribute("style", "display:inline-block");
    quizBox.setAttribute("style", "display:block");
    startButton.setAttribute("style", "display:none");
    nextQuestion();
    countDown();
}

function answerBoxReset() {
    achoice.setAttribute("style", "background-color:rgb(34,34,34)");
    bchoice.setAttribute("style", "background-color:rgb(34,34,34)");
    cchoice.setAttribute("style", "background-color:rgb(34,34,34)");
    dchoice.setAttribute("style", "background-color:rgb(34,34,34)");
}

// timer function (minutes + seconds), with time-out consequence
function countDown() {
    let timeLeft = setInterval(function() {
        secondsLeft--;
        minuteHand.textContent = minutesLeft;
        if (secondsLeft <= 9) {
            secondHand.textContent = "0" + secondsLeft;
        }
        if (secondsLeft > 9) {
            secondHand.textContent = secondsLeft;
        }
        if (secondsLeft < 0) {
            minutesLeft--;
            minuteHand.textContent = minutesLeft;
            secondsLeft = 59;
            secondHand.textContent = secondsLeft;
        }
        if ((minutesLeft === 0 && secondsLeft === 0) || minutesLeft < 0) {
            clearInterval(timeLeft);
            window.alert("Time's up!");
            minuteHand.textContent = "0";
            secondHand.textContent = "00";
            showScore();
        } else if (onQuestion === allQuestions.length) {
            clearInterval(timeLeft);
        }
    }, 1000) 
}

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

// populates quiz section of the page with a specified quiz question and answer choices
function nextQuestion() {
    let currentQuestion = allQuestions[onQuestion];
    answerBoxReset();
    qcontainer.textContent = currentQuestion.q;
    achoice.textContent = "A) " + currentQuestion.a;
    bchoice.textContent = "B) " + currentQuestion.b;
    cchoice.textContent = "C) " + currentQuestion.c;
    dchoice.textContent = "D) " + currentQuestion.d;
}

// populates and displays results screen
function showScore() {
    document.getElementById("userScore").textContent = score;
    quizBox.setAttribute("style", "display:none");
    resultBox.setAttribute("style", "display:block");
}

// calls this function when page loads so a scoreboard with previously saved results is visible as soon as user completes quiz
initScoreboard();