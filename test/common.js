var Team = require('../src/Team');
var Period = require('../src/Period');
var GoalGenerator = require('../src/GoalGenerator');
var GoalManager = require('../src/GoalManager');
var Seed = require('../src/Seed');
var Time = require('../src/Time');


var teamEngland = new Team({
    name: 'England',
    rating: 1891
});

var teamSlovakia = new Team({
    name: 'Slovakia',
    rating: 1736
});


var fullMatchPeriod = new Period({
    timeLength: new Time().setMinutes(90),
    startDate: new Date(1473687429923)
});


var goalGenerator = new GoalGenerator({
    period: fullMatchPeriod,
    teamScoring: teamEngland,
    teamConceding: teamSlovakia,
    seed: new Seed().setValue('test')
});


var matchParams = {
    teamA: teamEngland,
    teamB: teamSlovakia,
    extraTime: true,
    penaltyShootout: true,
    seed: new Seed().setValue('test'),
    startDate: new Date(1473687429923)
};


var penaltyShootoutParams = {
    teamA: teamEngland,
    teamB: teamSlovakia,
    seed: new Seed().setValue('test'),
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
