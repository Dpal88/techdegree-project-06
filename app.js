const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementsByClassName('btn__reset');
const missed = 0;

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
            console.log("working");
            return match;
        }
}

//Not Finished
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        console.log(e.target.textContent);
        console.log(e.target);
        e.target.className = "chosen";
        e.target.setAttribute("disabled", true); //disables button on click
        const letterFound = checkLetter(e.target);
        letterFound;
        return letterFound;
    }
})
