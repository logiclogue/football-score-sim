var assert = require('chai').assert;
var Period = require('../src/Period');
var PeriodEvents = require('../src/PeriodEvents');
var common = require('./common');

describe('PeriodEvents', function () {
    var period = new Period({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia
    });

    var events = new PeriodEvents({
        period: period
    });

    describe('#onStart()', function () {
        it('should callback when period starts', function (done) {
            var startTime = new Date();

            startTime.setSeconds(startTime.getSeconds() + 1);

            period.startTime = startTime;

            events.onStart(function () {
                done();
            });
        });
    });

    describe('#onFinish()', function () {
        it('should callback when period starts', function (done) {
            var finishTime = new Date();

            finishTime.setSeconds(finishTime.getSeconds() + 1);

            period.finishTime = finishTime;

            events.onFinish(function () {
                done();
            });
        });
    });
});
