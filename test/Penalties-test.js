var assert = require('chai').assert;
var Penalties = require('../src/Penalties');
var common = require('./common');


describe('Penalties', function () {
    var penalties = new Penalties({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia
    });

    penalties.simulate();

    describe('#simulate()', function () {
        context('#hasFinished', function () {
            it('should return true', function () {
                assert.equal(penalties.hasFinished(), true);
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
                var firstGoalTime = penalties.startTime.getTime();

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
