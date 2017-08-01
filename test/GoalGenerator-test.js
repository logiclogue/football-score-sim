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
            it('should have a win percentage of 61%', function () {
                var i;
                var goalGenerator1;
                var goalGenerator2;
                var score1;
                var score2;
                var homeWins = 0;
                var awayWins = 0;
                var count = 1000

                for (i = 0; i < count; i += 1) {
                    goalGenerator1 = new GoalGenerator({
                        seed: new Seed().setValue(i).append(1),
                        teamScoring: common.teamEngland,
                        teamConceding: common.teamEngland,
                        period: common.fullMatchPeriod,
                        homeScoring: true
                    });
                    goalGenerator2 = new GoalGenerator({
                        seed: new Seed().setValue(i).append(2),
                        teamScoring: common.teamEngland,
                        teamConceding: common.teamEngland,
                        period: common.fullMatchPeriod,
                        awayScoring: true
                    });

                    score1 = goalGenerator1.generate().length;
                    score2 = goalGenerator2.generate().length;

                    if (score1 > score2) {
                        homeWins += 1;
                    } else if (score2 > score1) {
                        awayWins += 1;
                    } else {
                        homeWins += 0.5;
                        awayWins += 0.5;
                    }
                }

                var percent = homeWins / count;

                assert.isTrue(percent >= 0.6 && percent <= 0.62, percent);
            });
        });
    });
});
