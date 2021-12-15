/*
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/



// declare variables and initialize function
var logscores, roundscore;
var activeplayer, game_staus;
init();

// New game button to call init function
document.querySelector('.btn-new').addEventListener('click', init);

// roll dice button to call update_round function
document.querySelector('.btn-roll').addEventListener('click', update_round);

// hold button to sum each players score during the counting process
document.querySelector('.btn-hold').addEventListener('click', update_sum );


// update round function to generate rundom dice number and use it to manipulate which dice shows when button is clicked
function update_round() {
    if (game_status) {

        var dice = Math.floor(Math.random() * 6) + 1;
        var dice_state = document.querySelector('.dice');
        dice_state.style.display = 'block';
        dice_state.src = "dice-" + dice + ".png";

        if (dice !== 1) {
            roundscore += dice; console.log (roundscore );
            document.getElementById(`current-${activeplayer}`).innerHTML = roundscore ;
        } else {
            switchplayer();
        }
    }
}

function update_sum () {
logscores[activeplayer] += roundscore;
document.getElementById(`score-${activeplayer}`).innerHTML = logscores[activeplayer];

if (game_status) {
    if (logscores[activeplayer] >=20) {
        document.getElementById(`name-${activeplayer}`).innerHTML = 'Winner!';
        document.querySelector('.dice').style.display = 'none';

        document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
        game_status = false;
    }else {
        switchplayer();
    }
}
}

// function to toggle to next player
function switchplayer () {
    //reset roundscore value and switch activeplayer  
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0
    roundscore = 0;

    // clear counter for roundscore on the screen and dice image
    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';
    document.querySelector('.dice').style.display = 'none';

    // toggle active class on screen between both players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // doccument.querySelector(`.player-${activeplayer}-panel`).classList.toggle('active');
}

// initialize function to reset the game values and settings
function init() {
    logscores = [0, 0];
    roundscore = 0;
    activeplayer = 0;
    game_status = true;

    document.getElementById('score-0').innerHTML = '0';
    document.getElementById('score-1').innerHTML = '0';
    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';

    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';

    document.querySelector('.dice').style.display = 'none';
}