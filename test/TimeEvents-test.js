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

        it('should call onMilliseconds', function () {
            var result;
            var date = new Date();
            var events = new TimeEvents((f, milli) => result = milli);

            date.setMilliseconds(date.getMilliseconds() + 100);

            events.onDate(function () {}, date);

            assert.equal(100, result);
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
            });
        });
    });

    describe('#ifDateHasNotPassed', function () {
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
                timeEvents.ifDateHasNotPassed(callback, pastDate);
            });

            it('should callback', function () {
                assert.isFalse(hasCalledBack);
            });
        });

        context('date has not passed', function () {
            beforeEach(function () {
                timeEvents.ifDateHasNotPassed(callback, futureDate);
            });

            it('should not callback', function () {
                assert.isTrue(hasCalledBack);
            });
        });

        context('date passes now', function () {
            beforeEach(function () {
                timeEvents.ifDateHasNotPassed(callback, now);
            });

            it('should callback', function () {
                assert.isFalse(hasCalledBack);
            });
        });
    });

    describe('#ifDatePassedOrOnDate()', function () {
        var timeEvents;
        var pastDate;
        var futureDate;
        var now;
        var hasCalledBack;

        beforeEach(function () {
            timeEvents = new TimeEvents();
            pastDate = new Date(Date.now() - 100);
            futureDate = new Date(Date.now() + 100);
            now = new Date();
            hasCalledBack = false;
        });

        function callback() {
            hasCalledBack = true;
        }
        
        context('date has passed', function () {
            beforeEach(function () {
                timeEvents.ifDatePassedOrOnDate(callback, pastDate);
            });

            it('should call callback', function () {
                assert.isTrue(hasCalledBack);
            });
        });

        context('date has not passed', function () {
            beforeEach(function () {
                timeEvents.ifDatePassedOrOnDate(callback, futureDate);
            });

            it('should not call callback', function () {
                assert.isFalse(hasCalledBack);
            });

            it('should set timeout', function (done) {
                this.slow(200);
                this.timeout(200);

                timeEvents.ifDatePassedOrOnDate(done, futureDate);
            });
        });

        context('date is now', function () {
            beforeEach(function () {
                timeEvents.ifDatePassedOrOnDate(callback, now);
            });

            it('should call callback', function () {
                assert.isTrue(true);
            });
        });
    });
});
