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
    });
});
