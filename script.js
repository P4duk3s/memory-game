const cards = document.querySelectorAll('.card');
const restartButton = document.querySelector('.restart-button');
const minutesCounter = document.querySelector('.minutes');
const secondsCounter = document.querySelector('.seconds');
const moveCounter = document.querySelector('.move-counter');
const gameComplete = document.querySelector('.game-complete');
const screen = document.querySelector('.screen');

let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let movesLeft = 0;
let moves = 0;
let minutes = 0;
let seconds = 0;
let interval;
let timerStarted = false;

function flip() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flipped');

  if(!cardFlipped) {
    cardFlipped = true;
    firstCard = this;
    startTimer();
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.animal === secondCard.dataset.animal) {
    disableCards();
    return;
  }
  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flip);
  secondCard.removeEventListener('click', flip);
  movesLeft--;
  moveCounterFunction();
  resetBoard();
  if (movesLeft === 0) {
    congratulations();
  }
}

function unflipCards() {
  lockBoard = true;
  moveCounterFunction();
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  cardFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  })
};

function moveCounterFunction() {
  moves++;
  moveCounter.innerHTML = moves;
}

function startTimer() {
  if (!timerStarted) {
    seconds = 1;
    timerStarted = true;
    interval = setInterval(function() {
      minutesCounter.innerHTML = minutes;
      secondsCounter.innerHTML = seconds;
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
    }, 1000);
  }
}

function congratulations() {
  restartButton.style.visibility = 'visible';
  gameComplete.style.visibility = 'visible';
  clearInterval(interval);
  document.querySelector('#moves').innerHTML = ` You made ${moves} moves`;
  document.querySelector('#time').innerHTML = `in ${minutes} minutes ${seconds} seconds`
  screen.style.filter = 'brightness(20%)';
}


(function startGame() {
moves = 0;
moveCounter.innerHTML = moves;
minutes = 0;
seconds = 0;
minutesCounter.innerHTML = minutes;
secondsCounter.innerHTML = seconds;
gameComplete.style.visibility = 'hidden';
screen.style.filter = 'brightness(100%)';
movesLeft = cards.length / 2;
timerStarted = false;
restartButton.addEventListener('click', startGame);
cards.forEach(item => item.addEventListener('click', flip));
cards.forEach(item => item.classList.remove('flipped'));
shuffle();
resetBoard();
restartButton.style.visibility = 'hidden';
})();



