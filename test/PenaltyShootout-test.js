var assert = require('chai').assert;
var PenaltyShootout = require('../src/PenaltyShootout');
var common = require('./common');


describe('PenaltyShootout', function () {
    var penaltyShootout = new PenaltyShootout({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia,
        seed: 'test'
    });

    describe('#simulate()', function () {
        penaltyShootout.simulate();

        it('should have the correct score', function () {
            var score = penaltyShootout.goalManager.getScore();

            assert.deepEqual(score, [3, 4]);
        });

        context('#hasFinished', function () {
            it('should return true', function () {
                assert.equal(penaltyShootout.hasFinished(), true);
            });
        });

        context('#finishDate', function () {
            it('should set the time to the final goal time', function () {
                var goals = [];
                var finishTime = penaltyShootout.finishDate.getTime();

                penaltyShootout.goalManager.forEach(function (goal) {
                    goals.push(goal);
                });

                goals.sort(function (a, b) {
                    return b.date.getTime() - a.date.getTime();
                });

                assert.equal(finishTime, goals[0].date.getTime());
            });
        });

        context('goals', function () {
            it('should set the start times of each of the goals', function () {
                penaltyShootout.goalManager.forEach(function (goal) {
                    assert.instanceOf(goal.date, Date);
                });
            });

            it('should make each goal one minute apart', function () {
                var goals = [];
                var firstGoalTime = penaltyShootout.startDate.getTime();

                penaltyShootout.goalManager.forEach(function (goal) {
                    goals.push(goal);
                });

                goals.sort(function (a, b) {
                    return a.date.getTime() - b.date.getTime();
                });

                goals.forEach(function (goal) {
                    assert.isAtLeast(
                        goal.date.getTime(),
                        firstGoalTime + 60000);

                    firstGoalTime = goal.date.getTime();
                });
            });
        });
    });
});
