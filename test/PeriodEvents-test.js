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
        it('should call timeEvents.onDate', function (done) {
            events.period.startTime = new Date(0);

            events.timeEvents.onDate = function (callback, date) {
                if (date === events.period.startTime) {
                    done();
                }
            };

            events.onStart(function () {});
        });
    });

    describe('#onFinish()', function () {
        it('should call timeEvents.onDate', function (done) {
            events.period.finishTime = new Date(0);

            events.timeEvents.onDate = function (callback, date) {
                if (date === events.period.finishTime) {
                    done();
                }
            };

            events.onFinish(function () {});
        });
    });
});
