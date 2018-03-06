'use strict';

var selectableWords =           
    [
        "LUKYANENKO",
        "YEVTUSHENKO",
        "PETRUSHEVSKAYA",
        "KONSTANTINOVICH",
    ];

const maxTries = 10;            
var guessedLetters = [];       
var currentWordIndex;    // words in array
var guessingWord = [];   //for shell
var remainingGuesses = 0;     
var hasFinished = false;            
var wins = 0;                   

function resetGame() {
    remainingGuesses = maxTries;
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // clear values
    guessedLetters = [];
    guessingWord = [];

    // build layout
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    
};

//update value trackers
function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

// find letter
function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // lose a guess
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        //replace _ with letter
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// check for win
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(remainingGuesses <= 0) {

        hasFinished = true;
    }
}

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // avoid dupes
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};
document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } 
    else {
if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};