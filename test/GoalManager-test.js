var assert = require('chai').assert;
var common = require('./common');
var GoalManager = require('../src/GoalManager');


describe('GoalManager', function () {
    var goalManager;

    describe('#constructor(options)', function () {
        goalManager = new GoalManager({
            teamA: common.teamEngland,
            teamB: common.teamSlovakia,
            period: common.fullMatchPeriod
        });

        it('should set teams correctly', function () {
            assert.equal(goalManager.teams[0], common.teamEngland);
            assert.equal(goalManager.teams[1], common.teamSlovakia);
        });

        it('should set period correctly', function () {
            assert.equal(goalManager.period, common.fullMatchPeriod);
        });
    });

    describe('#addGoals(teamIndex, goals)', function () {

    });

    describe('#append(goalManager)', function () {

    });
});
