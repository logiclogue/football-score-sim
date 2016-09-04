var GoalGenerator = require('../src/GoalGenerator');
var Team = require('../src/Team');
var Period = require('../src/Period');


describe('GoalGenerator', function () {
    var teamScoring = new Team({
        name: 'England',
        rating: 1891
    });
    var teamConceding = new Team({
        name: 'Slovakia',
        rating: 1736
    });
    var period = new Period({
        length: 90 * 60 * 1000
    });

    var goalGenerator = new GoalGenerator({
        seed: 'test' + Math.random(),
        teamScoring: teamScoring,
        teamConceding: teamConceding,
        period: period
    });

    describe('#generator()', function () {
        console.log(goalGenerator.generate());
    });
});
