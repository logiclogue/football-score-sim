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
            assert.equal(time.milliseconds, 1000);
        });
    });

    describe('#minusDates()', function () {
        it('should be the same method as the static minusDates', function () {
            assert.equal(time.minusDates, Time.minusDates);
        });
    });

    describe('#seconds', function () {
        it('should return 3600', function () {
            var seconds = time.seconds;

            assert.equal(seconds, 3600);
        });
    });

    describe('#minutes', function () {
        it('should return 60', function () {
            var minutes = time.minutes;

            assert.equal(minutes, 60);
        });
    });

    describe('#hours', function () {
        it('should return 1', function () {
            var hours = time.hours;

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
            var expectedResultMilli = milli + time.milliseconds;

            assert.equal(result.getTime(), expectedResultMilli);
        });
    });

    describe('#minusFromDate()', function () {
        var date;
        var milli;
        var result;

        beforeEach(function () {
            milli = 1499772238698;
            date = new Date(milli);
            result = time.minusFromDate(date);
        });

        it('should return a Date', function () {
            assert.instanceOf(result, Date);
        })

        it('should return a new Date', function () {
            assert.notEqual(result, date);
        });

        it('should add date to the current time', function () {
            var expectedResultMilli = milli - time.milliseconds;

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
            assert.equal(result.milliseconds, 3601000);
        });
    });

    describe('#minusTime()', function () {
        var timeB;
        var result;

        beforeEach(function () {
            timeB = new Time(1000);

            result = time.minusTime(timeB);
        });

        it('should return Time', function () {
            assert.instanceOf(result, Time);
        });

        it('should return a new Time', function () {
            assert.notEqual(result, time);
            assert.notEqual(result, timeB);
        });

        it('should minus this Time and the Time passed in', function () {
            assert.equal(result.milliseconds, 3599000);
        });
    });

    describe('#setMilliseconds()', function () {
        it('should set the right number of milliseconds', function () {
            // arrange
            var milliseconds = 10;

            // act
            var result = new Time().setMilliseconds(milliseconds);

            // assert
            assert.equal(result.milliseconds, milliseconds);
        });
    });

    describe('#setSeconds()', function () {
        it('should set the right number of seconds', function () {
            // arrange
            var seconds = 10;

            // act
            var result = new Time().setSeconds(seconds);

            // assert
            assert.equal(result.seconds, seconds);
        });
    });

    describe('#setMinutes()', function () {
        it('should set the right number of minutes', function () {
            // arrange
            var minutes = 10;

            // act
            var result = new Time().setMinutes(minutes);

            // assert
            assert.equal(result.minutes, minutes);
        });
    });

    describe('#setHours()', function () {
        it('should set the right number of hours', function () {
            // arrange
            var hours = 10;

            // act
            var result = new Time().setHours(hours);

            // assert
            assert.equal(result.hours, hours);
        });
    });
});
