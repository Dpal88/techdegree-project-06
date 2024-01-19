const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementsByClassName('btn__reset');
let missed = 0;

const phrases = [
    'theres no place like home',
    'im the king of the world',
    'its alive',
    'youre gonna need a bigger boat',
    'to infinity and beyond',
    'just keep swimming',
    'you talking to me',
    'nobody makes me bleed my own blood',
    'are you not entertained'
];


// Hides overlay button if start game is clicked
// If reset button is clicked, restarts game with reset function and creates new phrase
startButton[0].addEventListener('click', (e) => {
    if (e.target.textContent === "Reset") {
        missed = 0;
        reset();
    }
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    const randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);
});

// Deletes the phrase, reverts keyboard back to original state,
// and changes hearts png back to liveHearts
function reset() {
    const li = document.querySelectorAll('ul li');
        for (let i = 0; i < li.length; i++) {
            li[i].remove();
        }

        const buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].removeAttribute('disabled');
            buttons[i].classList.remove('chosen');
            buttons[i].classList.remove('missed');
        }

        const img = document.getElementsByTagName('img');
        for (let i = 0; i < img.length; i++) {
            img[i].setAttribute('src', 'images/liveHeart.png');
        }
}


// Gets a random phrase from the 'phrases' array and creates a new array of letters.
function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor( Math.random() * arr.length )];
    const newArray = randomPhrase.split('');
    return newArray;
}

// Creates li and gives its textContent a letter from 'newArray'
// If letter variable is a letter from a-z give it a class of letter, else give class of space
function addPhraseToDisplay(arr) {
    for (let letter of arr) {
        const li = document.createElement('li');
        li.textContent = letter;
        const ul = phrase.firstElementChild;
        ul.append(li);
        // /[a-zA-Z]/ regex (regular expression) returns true if letter variable is a letter
        if (/[a-zA-Z]/.test(letter)) {
            li.className = "letter"
        } else {
            li.className = "space";
        }
    }
}


// Checks if the letter that the user clicked on the keyboard matches a letter from phrase
// If letter matches, then gives a class name of show and returns the letter
// else returns null
function checkLetter(guess) {
    const letters = document.getElementsByClassName('letter');
    let match = null;
    let i = 0;
        for (i = 0; i < letters.length; i++) {
                if (guess.textContent === letters[i].textContent) {
                    letters[i].className += ' show';
                    letters[i].classList.add("apply-animation"); // Gives li wiggle & scale animation
                    match = guess.textContent;
                }
        }
        if (i === letters.length) {
            return match;
        }
}

// When user clicks on a letter from keyboard, that letter is passed into checkLetter function
// If the letter matches then it will be displayed on screen
// But if it returns null then one life will be taken away
// checkWin function checks if user has won or lost the game
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        button.className = "chosen";
        button.setAttribute("disabled", true); //disables button on click
        const letterFound = checkLetter(button);
        letterFound;
        if (letterFound === null) {
            const img = document.getElementsByTagName('img');
            img[missed].setAttribute('src', 'images/lostHeart.png');
            missed ++;
            button.className = "missed";
        }
    checkWin();
    }

})

// If user guessues all letters then he has won the game
// If users lives = 5 then he has lost
function checkWin() {
    const show = document.getElementsByClassName('show');
    const letters = document.getElementsByClassName('letter');
    const overlay = document.getElementById('overlay');
    if (show.length === letters.length) {
        overlay.className = "win";
        overlay.style.display = "flex";
        overlay.firstElementChild.textContent = "You've Won";
        for (let i = 0; i < letters.length; i++) {
            letters[i].classList.remove("apply-animation");
        }

        startButton[0].textContent = "Reset";
    }
    if (missed >= 5) {
        overlay.className = "lose";
        overlay.style.display = "flex";
        overlay.firstElementChild.textContent = "You've Lost";
        for (let i = 0; i < letters.length; i++) {
            letters[i].classList.remove("apply-animation");
        }

        startButton[0].textContent = "Reset";
    }
}
