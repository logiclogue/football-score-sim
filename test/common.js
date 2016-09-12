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
    startTime: 1473687429922
});


var goalGenerator = new GoalGenerator({
    period: fullMatchPeriod,
    teamScoring: teamEngland,
    teamConceding: teamSlovakia,
    seed: 'test'
});

module.exports = {
    teamEngland: teamEngland,
    teamSlovakia: teamSlovakia,
    fullMatchPeriod: fullMatchPeriod,
    goalGenerator: goalGenerator
};
