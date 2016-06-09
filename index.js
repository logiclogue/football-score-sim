var NormalDistribution = require('./js/NormalDistribution');
var Match = require('./js/Match');

var graph = new NormalDistribution(1.23, 1.04);
var match = new Match('teamA', 'teamB');


//console.log(graph.getYValue(3));
console.log(graph.trapeziumRule(-10, 0, 0.1));

console.log(getCount());
console.log(match.result());

function getCount() {
    var i;
    var draws = 0;
    var wins = 0;
    var goals = 0;
    var total = 1000;
    var drawPercent;
    var winPercent;
    var result;

    for (var i = 0; i < 1000; i += 1) {
        var result = match.result();

        goals += result[0] + result[1];

        // If the game is a draw
        if (result[0] === result[1]) {
            draws += 1;
        }
        else {
            wins += 1;
        }
    }

    console.log(goals / total);

    return draws / total;
}

