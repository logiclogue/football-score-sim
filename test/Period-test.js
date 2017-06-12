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

    describe('#getFinishDate()', function () {
        it('should return start time + length', function () {
            var startTime = period.startDate.getTime();
            var length = period.length;
            var expectedFinishTime = startTime + length;
            var actualFinishTime = period.getFinishDate().getTime();

            assert.equal(expectedFinishTime, actualFinishTime);
        });
    });

    describe('#finishDate', function () {
        it('should set #finishDate to return of #getFinishDate', function () {
            var expectedFinishTime = period.getFinishDate().getTime();
            var actualFinishTime = period.finishDate.getTime();

            assert.equal(expectedFinishTime, actualFinishTime);
        })
    });
});
