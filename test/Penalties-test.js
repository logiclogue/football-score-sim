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
                var firstGoal;

                penalties.goalManager.forEach(function (goal) {
                    if (!firstGoal) {
                        firstGoal = goal;
                    } else {
                        assert.isAtLeast(
                            goal.time.getTime(),
                            firstGoal.time.getTime() + 60000);
                    }
                });
            });
        });
    });
});
