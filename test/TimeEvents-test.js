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
});
