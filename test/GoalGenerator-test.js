var assert = require('chai').assert;
var GoalGenerator = require('../src/GoalGenerator');
var Goal = require('../src/Goal');
var Seed = require('../src/Seed');
var common = require('./common');


describe('GoalGenerator', function () {
    var seed;
    var goalGenerator;

    beforeEach(function () {
        seed = new Seed().setValue('test 2');
        goalGenerator = new GoalGenerator({
            seed: seed,
            teamScoring: common.teamEngland,
            teamConceding: common.teamSlovakia,
            period: common.fullMatchPeriod
        });
    });

    describe('#generate()', function () {
        var goals;

        beforeEach(function () {
            goals = goalGenerator.generate();
        });

        it('should return 6 goal', function () {
            assert.equal(goals.length, 6);
        });

        it('should return type array', function () {
            assert.typeOf(goals, 'array');
        });

        it('should return a goal that is instance of Goal', function () {
            assert.instanceOf(goals[0], Goal);
            assert.instanceOf(goals[goals.length - 1], Goal);
        });

        it('should generate each goal differently', function () {
            var checkedGoals = [];

            goals.forEach(function (goal) {
                assert.notInclude(checkedGoals, goal);

                checkedGoals.push(goal);
            });
        });
    });
});
