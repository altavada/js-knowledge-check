var startButton = document.getElementById("startbutton");
var nextButton = document.getElementById("nextquestion");
var quizBox = document.getElementById("quizbox");
var resultBox = document.getElementById("results");
var onQuestion = 0;
var allQuestions = [];

var questions = {
    question0: {
        q: "This is question 1",
        a: "Answer 1",
        b: "Answer 2",
        c: "Answer 3",
        d: "Answer 4"
    },
    question1: {
        q: "This is question 2",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question2: {
        q: "This is question 3",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question3: {
        q: "This is question 4",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question4: {
        q: "This is question 5",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question5: {
        q: "This is question 6",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question6: {
        q: "This is question 7",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question7: {
        q: "This is question 8",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question8: {
        q: "This is question 9",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    },
    question9: {
        q: "This is question 10",
        a: "Choice 1",
        b: "Choice 2",
        c: "Choice 3",
        d: "Choice 4"
    }
}

// renders each question object in the allquestions array such that an object and its properties can be accessed thru its array index. Adapted from this solution: https://stackoverflow.com/questions/37077617/javascript-store-multiple-objects-in-array-and-access-their-properties-via
for(var quizItem in questions) {
    allQuestions.push(questions[quizItem]);
}

startButton.addEventListener("click", nextQuestion);

nextButton.addEventListener("click", function() {
    if(onQuestion === allQuestions.length) {

    }
})

function nextQuestion() {
    let currentQuestion = allQuestions[onQuestion];
    document.getElementById("question").textContent = currentQuestion.q;
    document.getElementById("achoice").textContent = currentQuestion.a;
    document.getElementById("bchoice").textContent = currentQuestion.b;
    document.getElementById("cchoice").textContent = currentQuestion.c;
    document.getElementById("dchoice").textContent = currentQuestion.d;
    nextButton.setAttribute("style", "display:inline-block");
}