var assert = require('chai').assert;
var TimeEvents = require('../src/TimeEvents');

describe('TimeEvents', function () {
    describe('#onDate()', function () {
        it('should callback when correct time has elapsed', function (done) {
            var date = new Date();
            var events = new TimeEvents();

            date.setMilliseconds(date.getMilliseconds() + 100);

            this.timeout(200);
            this.slow(200);

            events.onDate(done, date);
        });

        it('should\'t callback if time has passed', function (done) {
            var date = new Date();
            var events = new TimeEvents();
            var calledCallback = false;

            date.setMilliseconds(date.getMilliseconds() - 100);

            this.timeout(200);
            this.slow(200);

            events.onDate(function () {
                calledCallback = true;
            }, date);

            setTimeout(function () {
                if (!calledCallback) {
                    done();
                }
            }, 100);
        });
    });

    describe('#ifDatePassed', function () {
        var timeEvents;
        var pastDate;
        var futureDate;
        var now;
        var hasCalledBack;

        beforeEach(function () {
            timeEvents = new TimeEvents();
            pastDate = new Date(Date.now() - 200);
            futureDate = new Date(Date.now() + 200);
            now = new Date();
            hasCalledBack = false;
        });

        function callback() {
            hasCalledBack = true;
        }
        
        context('date has passed', function () {
            beforeEach(function () {
                timeEvents.ifDatePassed(callback, pastDate);
            });

            it('should callback', function () {
                assert.isTrue(hasCalledBack);
            });
        });

        context('date has not passed', function () {
            beforeEach(function () {
                timeEvents.ifDatePassed(callback, futureDate);
            });

            it('should not callback', function () {
                assert.isFalse(hasCalledBack);
            });
        });

        context('date passes now', function () {
            beforeEach(function () {
                timeEvents.ifDatePassed(callback, now);
            });

            it('should callback', function () {
                assert.isTrue(hasCalledBack);
            })
        })
    });
});
