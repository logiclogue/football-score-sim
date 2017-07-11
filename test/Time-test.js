var assert = require('chai').assert;
var Time = require('../src/Time');

describe('Time', function () {
    var time;

    beforeEach(function () {
        time = new Time(3600000);
    });

    describe('.minusDates()', function () {
        it('should return the differences in the time', function () {
            // arrange
            var time;
            var date1 = new Date(1499772238698);
            var date2 = new Date(1499772239698);

            // act
            time = Time.minusDates(date2, date1);

            // assert
            assert.equal(time.getMilliseconds(), 1000);
        });
    });

    describe('#getSeconds()', function () {
        it('should return 3600', function () {
            var seconds = time.getSeconds();

            assert.equal(seconds, 3600);
        });
    });

    describe('#getMinutes()', function () {
        it('should return 60', function () {
            var minutes = time.getMinutes();

            assert.equal(minutes, 60);
        });
    });

    describe('#getHours()', function () {
        it('should return 1', function () {
            var hours = time.getHours();

            assert.equal(hours, 1);
        });
    });

    describe('#addToDate()', function () {
        var date;
        var milli;
        var result;

        beforeEach(function () {
            milli = 1499772238698;
            date = new Date(milli);
            result = time.addToDate(date);
        });

        it('should return a Date', function () {
            assert.instanceOf(result, Date);
        })

        it('should return a new Date', function () {
            assert.notEqual(result, date);
        });

        it('should add date to the current time', function () {
            var expectedResultMilli = milli + time.getMilliseconds();

            assert.equal(result.getTime(), expectedResultMilli);
        });
    });

    describe('#addTime()', function () {
        var timeB;
        var result;

        beforeEach(function () {
            timeB = new Time(1000);

            result = time.addTime(timeB);
        });

        it('should return Time', function () {
            assert.instanceOf(result, Time);
        });

        it('should return a new Time', function () {
            assert.notEqual(result, time);
            assert.notEqual(result, timeB);
        });

        it('should add this Time and the Time passed in', function () {
            assert.equal(result.getMilliseconds(), 3601000);
        });
    });
});
