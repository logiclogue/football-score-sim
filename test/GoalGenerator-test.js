var GoalGenerator = require('../src/GoalGenerator');
var Team = require('../src/Team');
var Period = require('../src/Period');
var common = require('./common');


describe('GoalGenerator', function () {
    var goalGenerator = new GoalGenerator({
        seed: 'test' + Math.random(),
        teamScoring: common.teamEngland,
        teamConceding: common.teamSlovakia,
        period: common.fullMatchPeriod
    });

    describe('#generator()', function () {
        console.log(goalGenerator.generate());
    });
});
