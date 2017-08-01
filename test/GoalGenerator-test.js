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

        it('should return 6 goals', function () {
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

        context('home advantage', function () {
            it('should', function () {
                var goalGenerator = new GoalGenerator({
                    seed: new Seed().setValue(Math.random()),
                    teamScoring: common.teamEngland,
                    teamConceding: common.teamEngland,
                    period: common.fullMatchPeriod,
                    homeAdvantage: true
                });
                var goalGenerator = new GoalGenerator({
                    seed: new Seed().setValue(Math.random()),
                    teamScoring: common.teamEngland,
                    teamConceding: common.teamEngland,
                    period: common.fullMatchPeriod,
                    homeAdvantage: true
                });

                var result = goalGenerator.generate();

                console.log(result);
            });
        });
    });
});
