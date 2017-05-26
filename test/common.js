var Team = require('../src/Team');
var Period = require('../src/Period');
var GoalGenerator = require('../src/GoalGenerator');


var teamEngland = new Team({
    name: 'England',
    rating: 1891
});

var teamSlovakia = new Team({
    name: 'Slovakia',
    rating: 1736
});


var fullMatchPeriod = new Period({
    length: 90 * 60 * 1000,
    startTime: new Date(1473687429923)
});


var goalGenerator = new GoalGenerator({
    period: fullMatchPeriod,
    teamScoring: teamEngland,
    teamConceding: teamSlovakia,
    seed: 'test'
});


var matchParams = {
    teamA: teamEngland,
    teamB: teamSlovakia,
    extraTime: true,
    penalties: true,
    seed: 'test'
};


module.exports = {
    teamEngland: teamEngland,
    teamSlovakia: teamSlovakia,
    fullMatchPeriod: fullMatchPeriod,
    goalGenerator: goalGenerator,
    matchParams: matchParams
};
