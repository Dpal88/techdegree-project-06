const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const buttonReset = document.getElementsByClassName('btn__reset');
const missed = 0;

const phrases = [
    'Theres no place like home',
    'Im the king of the world',
    'Its alive',
    'Youre gonna need a bigger boat',
    'To infinity and beyond',
    'Life moves pretty fast You dont stop and look around once in a while you could miss it',
    'Your mother was a hamster and your father smelt of elderberries'
];


buttonReset[0].addEventListener('click', (e) => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// Gets a random phrase from the 'phrases' array and creates a new array.
function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor( Math.random() * arr.length )];
    console.log(randomPhrase);
    const newArray = randomPhrase.split('');
    console.log(newArray);
    return newArray;
}
// getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    for (let letter of arr) {
        const li = document.createElement('li');
        li.textContent = letter;
        const ul = phrase.firstElementChild;
        ul.append(li);
        if (letter =! " ") {
            li.className = "letter";
        }
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);