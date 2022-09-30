let word = document.getElementById('word');
let text = document.getElementById('text');
let scoreEl = document.getElementById('score');
let timeEl = document.getElementById('time');
let endgameEl = document.getElementById('end-game-container');
let settings = document.getElementById('settings');
let settingsForm = document.getElementById('settings-form');
let difficultySelect = document.getElementById('difficulty');

const words = [
  'bad',
    'better',
    'big',
    'black',
    'certain',
    'clear',
    'different',
    'early',
    'easy',
    'federal',
    'free',
    'full',
    'good',
    'great',
    'hard',
    'high',
    'human',
    'important',
    'international',
    'large',
    'long',
    'low'
];
let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';


difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

text.focus();
const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}


function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}


function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}


function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
