/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* a player looses his entire score if he rolls 2 6s in a row.
add a second dice. player loses current score if 1 of the dice are a 1*/

var scores, roundScore, activePlayer, isPlaying, lastDice1, lastDice2, winningScore;

init();

function init() {
  // initialize variables
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isPlaying = true;
  winningScore = 100;
  // remove dice image
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  // set scores to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // reset names
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  // remove active classes
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  //remove winner classes
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  //set player 0 to active
  document.querySelector('.player-0-panel').classList.add('active');
  //reset input box
  document.querySelector('.winning-score').value = '100';
};

function nextPlayer() {
  // change all roundscore numbers to 0
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = roundScore;
  // change active player to next person
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // update ui for active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // document.querySelector('.dice').style.display = 'none';
  // document.querySelector('.dice2').style.display = 'none';
  lastDice1 = 0;
  lastDice2 = 0;
};

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.winning-score').addEventListener('input', function() {
  winningScore = document.querySelector('.winning-score').value;
});

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (isPlaying) {
    // assign randon number to Dice
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    // show dice
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';
    document.querySelector('.dice').src = 'dice-' + dice1 + '.png';
    document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';
  if (dice1 === 6 && lastDice1 === 6) {
      document.getElementById('score-' + activePlayer).textContent = '0';
      scores[activePlayer] = 0,
      nextPlayer();
    }  else if (dice2 === 6 && lastDice2 === 6) {
      document.getElementById('score-' + activePlayer).textContent = '0';
      scores[activePlayer] = 0,
      nextPlayer();
    } else if (dice1 === 6 && dice2 === 6) {
      document.getElementById('score-' + activePlayer).textContent = '0';
      scores[activePlayer] = 0,
      nextPlayer();
    } else if (dice1 === 1 || dice2 == 1) {
        //if number is 1 then next player fn
        nextPlayer();
      } else {
      // assign random number to round score
      roundScore += dice1 + dice2;
      // show round score in ui
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    };
  }
  lastDice1 = dice1;
  lastDice2 = dice2;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  // add round number to new score
  scores[activePlayer] += roundScore;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  // check if winner
  if (scores[activePlayer] >= winningScore) {
    // change to winner screen
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    isPlaying = false;
  } else {
    // if not winner then next player
    nextPlayer();
  }
});
