/*
 GAME RULES:

 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game

 */


 var scores, roundScore, activePlayer, gamePlaying, previousRoll;
 //nuke the scores
 init();

 //click roll button
 document.querySelector('.btn-roll').addEventListener('click', function(){

   if (gamePlaying) {
     //random number
     var dice = Math.floor((Math.random() * 6) + 1);
     //dice image update
     var diceDOM = document.querySelector('.dice');
     diceDOM.style.display = 'block';
     diceDOM.src = 'dice-' + dice + '.png';
     //number added to currentscore
     if (dice === 6 && previousRoll === 6) {
       roundScore = 0;
       scores[activePlayer] = 0;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
       document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
       nextPlayer();
     } else if (dice !== 1) {
       roundScore += dice;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
     } else {
       roundScore = 0;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
       nextPlayer();
     }
     previousRoll = dice;
   }
 });


 //Hold button
 document.querySelector('.btn-hold').addEventListener('click', function() {
   if (gamePlaying) {
     //add score
     scores[activePlayer] += roundScore;
     document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
     //check if player won game
     if (scores[activePlayer] >= 1000) {
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
       //hide dice
       document.querySelector('.dice').style.display = 'none';
       //remove active player
       document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
       gamePlaying = false;
     } else {
       // switch player
       nextPlayer();
     }
   }
 });

 //new game button
 document.querySelector('.btn-new').addEventListener('click', init);

 function init(){
   scores = [0,0];
   roundScore = 0;
   activePlayer = 0;
   document.querySelector('.dice').style.display = 'none';
   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   gamePlaying = true;
 }

 function nextPlayer() {
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   roundScore = 0;
   document.getElementById('current-' + activePlayer).textContent = roundScore;
 }







 //adfad
