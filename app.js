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
    'your mother was a hamster and your father smelt of elderberries'
];


startButton[0].addEventListener('click', (e) => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// Gets a random phrase from the 'phrases' array and creates a new array of letters.
function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor( Math.random() * arr.length )];
    console.log(randomPhrase);
    const newArray = randomPhrase.split('');
    return newArray;
}
getRandomPhraseAsArray(phrases);


function addPhraseToDisplay(arr) {
    for (let letter of arr) {
        const li = document.createElement('li');
        li.textContent = letter;
        const ul = phrase.firstElementChild;
        ul.append(li);
        if (!(letter >= "a" && letter <= "z") &&
            !(letter >= "A" && letter <= "Z")) { // Working but don't understand
            li.className = "space";
        } else {
            li.className = "letter";
        }
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


function checkLetter(guess) {
    const letters = document.getElementsByClassName('letter');
    let match = null;
    let i = 0;
        for (i = 0; i < letters.length; i++) {
                if (guess.textContent === letters[i].textContent) {
                    letters[i].className += ' show';
                    match = guess.textContent;
                }
        }
        if (i === letters.length) {
            return match;
        }
}

keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        console.log(e.target.textContent);
        console.log(e.target);
        button.className = "chosen";
        button.setAttribute("disabled", true); //disables button on click
        const letterFound = checkLetter(button);
        letterFound;
        if (letterFound === null) {
            const img = document.getElementsByTagName('img');
            img[missed].setAttribute('src', 'images/lostHeart.png');
            missed ++;
            console.log(missed);
        }
        checkWin();
        console.log("checked");
    }

})

const resetButton = document.getElementsByClassName('btn_new_game');

function checkWin() {
    const show = document.getElementsByClassName('show');
    const letters = document.getElementsByClassName('letter');
    const overlay = document.getElementById('overlay');
    if (show.length === letters.length) {
        overlay.className = "win";
        overlay.style.display = "flex";
        overlay.firstElementChild.textContent = "You've Won";
        startButton[0].textContent = "Reset";
        startButton[0].className = "btn_new_game";
        console.log("you won");
    }
    if (missed >= 5) {
        overlay.className = "lose";
        overlay.style.display = "flex";
        overlay.firstElementChild.textContent = "You've Lost";
        startButton[0].textContent = "Reset";
        startButton[0].className = "btn_new_game";
        console.log("youve lost")
    }
}
