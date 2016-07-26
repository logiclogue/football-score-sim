//var Match = require('./Match/MatchWithGoalTimes');
var MatchLive = require('./Match/MatchLive');
var Match = require('./Match/Match');
var Team = require('./Team');

var england = new Team('England', 1947);
var russia = new Team('Russia', 1736);
var wales = new Team('Wales', 1629);
var slovakia = new Team('Slovakia', 1742);
var derby = new Team('Derby County', 1544);
var united = new Team('Manchester United', 1794);
var match = new MatchLive(england, russia, {
    extraTime: true,
    penalties: true,
    seed: Date.now()
});
match.simulate();


/*
 * 211, 0.0025
 */

getCount();
console.log(match.text);
console.log('Seed:', match.seed);
console.log(match.result);
console.log(match.winner);
console.log(match.goals);
console.log(match.penalties.goalOrder);
console.log(match.goalTimes[0].decimalGoalTimes);
console.log(match.goalTimes[1].decimalGoalTimes);

function getCount() {
    var i;
    var draws = 0;
    var wins = 0;
    var goals = 0;
    var total = 1000;
    var drawPercent;
    var winPercent;
    var losePercent;
    var result;

    for (var i = 0; i < total; i += 1) {
        var match = new Match(england, russia, {
            extraTime: false,
            penalties: false
        });

        var result = match.simulate();
        var score = [
            match.goals[0][match.period.FULL_TIME],
            match.goals[1][match.period.FULL_TIME]
        ];

        goals += score[0] + score[1];

        // If the game is a draw
        if (match.result === 0.5) {
            draws += 1;
        }
        else if (match.result === 0) {
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

