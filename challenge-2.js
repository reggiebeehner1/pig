/*
 GAME RULES:

 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game

 */


 var scores, roundScore, activePlayer, gamePlaying, setScore;

 var diceSound = document.getElementById('dicesound');
 var failSound = document.getElementById('failsound');
 var superfailSound = document.getElementById('superfailsound');
 var successSound = document.getElementById('successsound');
 var playballSound = document.getElementById('playballsound');



 //nuke the scores
 init();

 //click roll button
 document.querySelector('.btn-roll').addEventListener('click', function(){

   if (gamePlaying) {
     //random number
     diceSound.play();
     var dice1 = Math.floor((Math.random() * 6) + 1);
     var dice2 = Math.floor((Math.random() * 6) + 1);
     var diceTotal = dice1 + dice2;
     //dice image update
     document.getElementById('dice1').style.display = 'block';
     document.getElementById('dice2').style.display = 'block';
     document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
     document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
     //number added to currentscore
     if (dice1 === 6 && dice2 === 6) {
       superfailSound.play();
       roundScore = 0;
       scores[activePlayer] = 0;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
       document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
       nextPlayer();
     } else if (dice1 !== 1 && dice2 !== 1) {
       roundScore += diceTotal;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
     } else {
       failSound.play();
       roundScore = 0;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
       nextPlayer();
     }
   }
 });


 //Hold button
 document.querySelector('.btn-hold').addEventListener('click', function() {
   if (gamePlaying) {
     //add score
     scores[activePlayer] += roundScore;
     document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
     //get input from input-score
     var inputScore = document.querySelector('.input-score').value;
     //check for input
    // inputScore ? var winningScore = inputScore : winningScore = 100;


     if (inputScore) {
       var winningScore = inputScore;
     } else {
       winningScore = 100;
     }
     //check if player won game
     if (scores[activePlayer] >= winningScore) {
       successSound.play();
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
   playballSound.play();
   scores = [0,0];
   roundScore = 0;
   activePlayer = 0;
   document.getElementById('dice1').style.display = 'none';
   document.getElementById('dice2').style.display = 'none';
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
