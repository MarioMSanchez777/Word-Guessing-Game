const wordList = [
    {

        hint: "application programming interface",
        word: "api"

    },

    {

        hint: "list of data",
        word: "array"
    },



    {

        hint: "A snippet of code that makes a function begin.",
        word: "call"
    },

    {

        hint: "used to point to a class in a CSS page",
        word: "class"
    },

    {

        hint: "content of a computer program",
        word: "code"
    },



    {

        hint: "The code that controls the appearance of a website",
        word: "css"
    },

    {

        hint: "A version control system that tracks changes to code",
        word: "git"
    },

    {

        hint: "(HyperText Markup Language)",
        word: "html"
    },

    {

        hint: "A programming language developed by Oracle",
        word: "java"
    },

    {

        hint: "A common data storage format used in many web apps.",
        word: "json"
    },

    {

        hint: "A block of code that runs over and over",
        word: "loop"
    },

    {

        hint: "Empty or without value",
        word: "null"
    },

    {

        hint: "A JavaScript library built by Facebook",
        word: "react"
    },

    {

        hint: "Several programs used to build apps for the web or mobile devices",
        word: "stack"
    },

    {

        hint: "The text you type into your browser to get to a website",
        word: "url"
    },
]


const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    hint = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess-left span"),
    wrongLetter = document.querySelector(".wrong-letter span"),
    typingInput = document.querySelector(".typing-input");


let word, maxGueses, corrects = [], incorrects = [];

function randomWord() {
    //getting random words from words array
    let ranWrd = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranWrd.word; // getting word of random object
    maxGuesses = 8; corrects = []; incorrects = [];



    hint.innerText = ranWrd.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;


    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += '<input type="text" disabled>';
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(key)) {

        if (word.includes(key)) {   // if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                // showing matching letter in the input value
                if (word[i] === key) {
                    corrects.push(key);

                    inputs.querySelectorAll("input")[i].value = key;
                }


            }
        }
        else {
            maxGuesses--; // decrement maxGuesses by 1
            incorrects.push(`${key}`);
        }
        guessLeft.innerText = maxGuesses
        wrongLetter.innerText = incorrects;

    }

    typingInput.value = "";


    setTimeout(() => {
        if (corrects.length === word.length) { // if user found all letters
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            randdomWord(); // calling user randomWord func, so the game reset
        }
        else if (maxGuesses < 1) {// if user couldnt find all letters correctly
            alert("Game Over! You dont have any remaining guesses");
            for (let i = 0; i < word.length; i++) {
                // show all letters in input
                inputs.querySelectorAll("input")[i].value = word[i];
            }

        }

    });

}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());