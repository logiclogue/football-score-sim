var Match = require('./Match');
var Team = require('./Team');

var england = new Team('England', 1947);
var russia = new Team('Russia', 1736);
var wales = new Team('Wales', 1629);
var slovakia = new Team('Slovakia', 1742);
var derby = new Team('Derby County', 1544);
var united = new Team('Manchester United', 1794);
var match = new Match(england, wales, {
    extraTime: true,
    penalties: true
});
var result = match.simulate();


/*
 * 211, 0.0025
 */

getCount();
console.log(result.text);
console.log(result.result);

function getCount() {
    var i;
    var draws = 0;
    var wins = 0;
    var goals = 0;
    var total = 10000;
    var drawPercent;
    var winPercent;
    var losePercent;
    var result;

    for (var i = 0; i < total; i += 1) {
        var result = match.simulate();
        var score = result.score;

        goals += score[0] + score[1];

        // If the game is a draw
        if (result.result === 0.5) {
            draws += 1;
        }
        else if (result.result === 0) {
            wins += 1;
        }
    }

    drawPercent = draws / total;
    winPercent = wins / total;
    losePercent = 1 - drawPercent - winPercent;

    console.log('Rating difference', match.ratingDifference);
    console.log('Goals per game:', goals / total);
    console.log('Draw odds:', drawPercent);
    console.log('Team A win odds:', winPercent);
    console.log('Team B win odds:', losePercent);
    console.log('Team A win proportion:', winPercent / (winPercent + losePercent));
}

