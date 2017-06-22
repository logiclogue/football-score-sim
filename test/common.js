var Team = require('../src/Team');
var Period = require('../src/Period');
var GoalGenerator = require('../src/GoalGenerator');
var GoalManager = require('../src/GoalManager');


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
    startDate: new Date(1473687429923)
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
    penaltyShootout: true,
    seed: 'test',
    startDate: new Date(1473687429923)
};


var penaltyShootoutParams = {
    teamA: teamEngland,
    teamB: teamSlovakia,
    seed: 'test',
    startDate: new Date(0)
};


module.exports = {
    teamEngland: teamEngland,
    teamSlovakia: teamSlovakia,
    fullMatchPeriod: fullMatchPeriod,
    goalGenerator: goalGenerator,
    matchParams: matchParams,
    penaltyShootoutParams: penaltyShootoutParams
};
