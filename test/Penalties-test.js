var assert = require('chai').assert;
var Penalties = require('../src/Penalties');
var common = require('./common');


describe('Penalties', function () {
    var penalties = new Penalties({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia,
        seed: 'test'
    });

    describe('#simulate()', function () {
        penalties.simulate();

        it('should have the correct score', function () {
            var score = penalties.goalManager.getScore();

            assert.deepEqual(score, [3, 4]);
        });

        context('#hasFinished', function () {
            it('should return true', function () {
                assert.equal(penalties.hasFinished(), true);
            });
        });

        context('#finishDate', function () {
            it('should set the time to the final goal time', function () {
                var goals = [];
                var finishTime = penalties.finishDate.getTime();

                penalties.goalManager.forEach(function (goal) {
                    goals.push(goal);
                });

                goals.sort(function (a, b) {
                    return b.time.getTime() - a.time.getTime();
                });

                assert.equal(finishTime, goals[0].time.getTime());
            });
        });

        context('goals', function () {
            it('should set the start times of each of the goals', function () {
                penalties.goalManager.forEach(function (goal) {
                    assert.instanceOf(goal.time, Date);
                });
            });

            it('should make each goal one minute apart', function () {
                var goals = [];
                var firstGoalTime = penalties.startDate.getTime();

                penalties.goalManager.forEach(function (goal) {
                    goals.push(goal);
                });

                goals.sort(function (a, b) {
                    return a.time.getTime() - b.time.getTime();
                });

                goals.forEach(function (goal) {
                    assert.isAtLeast(
                        goal.time.getTime(),
                        firstGoalTime + 60000);

                    firstGoalTime = goal.time.getTime();
                });
            });
        });
    });
});
