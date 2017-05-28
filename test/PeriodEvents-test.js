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

            startTime.setMilliseconds(startTime.getMilliseconds() + 100);

            period.startTime = startTime;

            this.timeout(200);
            this.slow(200);
            events.onStart(done);
        });
    });

    describe('#onFinish()', function () {
        it('should callback when period starts', function (done) {
            var finishTime = new Date();

            finishTime.setMilliseconds(finishTime.getMilliseconds() + 1);

            period.finishTime = finishTime;

            this.timeout(200);
            this.slow(200);
            events.onFinish(done);
        });
    });
});
