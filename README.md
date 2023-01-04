# JavaScript Knowledge Check

## Description

This project is an originally-coded model for a simple online quiz. It demonstrates JavaScript's ability to create and manipulate HTML elements using the Document Object Model (DOM) and save/retrieve data from local storage with JavaScript Object Notation (JSON).

In this case, our quiz subject is basic JavaScript and the test consists of 10 questions, however the length and subject matter can be readily altered without rewriting the code itself. When the start button is clicked, a timer begins running near the top of the page, and 30 seconds are subtracted each time an incorrect answer is submitted. For the purposes of our 10-question quiz here, the initial time allotted is 5 minutes, but this can reduce drastically if the quiz taker isn't careful or studied-up on their JS knowledge! However, the user is able to click any answer on a given question freely while working on a question, and the selected answer (or lack thereof) is only locked in when the "next question" button is clicked. 

When the last question is reached, the "next question" button becomes a "finish quiz" button, which submits when pressed submits the final answer and brings the user to a results card with their score, an option to save that score next to their initials via the browser's local storage, and a scoreboard displaying any previously saved scores. If the timer runs out before the final question is answered, the quiz automatically ends and brings the user to the results card, with a window alert notifying that their time is up. The results card also contains a "replay" button that resets the timer and status indicators, and restarts the quiz.

The page utilizes a simple but responsive layout with the wide-set Verdana typeface, aiming for clear readability and mobile accessibility. ![Sample screenshot of deployed site](./assets/images/sample.png)

## Installation

N/A

## Usage

The hope is for this application to be as simple as navigating to the page and clicking "Start." The cues follow from there. As a learning tool, it should look and feel more or less as simple as taking a pencil-and-paper quiz in a classroom. Notably, however, submitted answers cannot be undone! To view the deployed page, [click here](https://altavada.github.io/js-knowledge-check/).

## Credits

[This StackOverflow thread](https://stackoverflow.com/questions/37077617/javascript-store-multiple-objects-in-array-and-access-their-properties-via) gave me the idea for an elegant means of organizing and reading the content and answer key of each quiz question.

## License

Refer to license in the repo.
