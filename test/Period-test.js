var assert = require('chai').assert;
var Period = require('../src/Period');
var common = require('./common');


describe('Period', function () {
    var period = new Period({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia
    });

    period.simulate();

    describe('#simulate()', function () {
        it('shouldn\'t return anything', function () {
            assert.isUndefined(period.simulate());
        });
    });

    describe('#getFinishTime()', function () {
        it('should return start time + length', function () {
            var startTime = period.startDate.getTime();
            var length = period.length;
            var expectedFinishTime = startTime + length;
            var actualFinishTime = period.getFinishTime().getTime();

            assert.equal(expectedFinishTime, actualFinishTime);
        });
    });

    describe('#finishTime', function () {
        it('should set #finishTime to return of #getFinishTime', function () {
            var expectedFinishTime = period.getFinishTime().getTime();
            var actualFinishTime = period.finishTime.getTime();

            assert.equal(expectedFinishTime, actualFinishTime);
        })
    });
});
