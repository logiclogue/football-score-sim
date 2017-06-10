var assert = require('chai').assert;
var common = require('./common');
var GoalManager = require('../src/GoalManager');
var Goal = require('../src/Goal');


describe('GoalManager', function () {
    var goalManager;
    var goalManager2;

    describe('#constructor(options)', function () {
        goalManager = new GoalManager({
            teamA: common.teamEngland,
            teamB: common.teamSlovakia
        });
        goalManager2 = new GoalManager({
            teamA: common.teamSlovakia,
            teamB: common.teamEngland
        });

        it('should set teams correctly', function () {
            assert.equal(goalManager.teams[0], common.teamEngland);
            assert.equal(goalManager.teams[1], common.teamSlovakia);
        });
    });

    describe('#addGoals(teamIndex, goals)', function () {
        it('should add the goals to #goals', function () {
            var goals = common.goalGenerator.generate();

            goalManager.addGoals(0, goals);

            assert.deepEqual(goalManager.goals[0], goals);
        });
    });

    describe('#append(goalManager)', function () {
        it('should not throw error', function () {
            var append = goalManager.append.bind(goalManager, goalManager);
            
            assert.doesNotThrow(append, ReferenceError);
        });

        it('should append the goals', function () {
            var goals = goalManager.goals;

            assert.equal(goals[0].length, 2);
            assert.equal(goals[1].length, 0);
        });

        it('should throw error, if teams are reversed', function () {
            var append = goalManager.append.bind(goalManager, goalManager2);

            assert.throws(append, ReferenceError);
        });
    });

    describe('#getScore()', function () {
        it('should return the correct score as array [goals, goals]',
        function () {
            var score = goalManager.getScore();

            assert.isArray(score);
            assert.equal(score[0], 2);
            assert.equal(score[1], 0);
        });
    });

    describe('#forEach()', function () {
        it('should callback on each goal', function () {
            var count = 0;
            var score = goalManager.getScore();
            var totalGoals = score[0] + score[1];

            goalManager.forEach(function () {
                count += 1;
            });

            assert(count === totalGoals);
        });

        it('should callback with type Goal', function () {
            goalManager.forEach(function (goal) {
                assert.instanceOf(goal, Goal);
            });
        });
    });
});
