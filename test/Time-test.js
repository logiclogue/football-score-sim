const assert = require('chai').assert;
const expect = require('chai').expect;
const Time = require('../src/Time');

describe('Time', () => {
    var time;

    beforeEach(() => {
        time = new Time(3600000);
    });

    describe('.minusDates()', () => {
        it('should return the differences in the time', () => {
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

    describe('#minusDates()', () => {
        it('should be the same method as the static minusDates', () => {
            assert.equal(time.minusDates, Time.minusDates);
        });
    });

    describe('#seconds', () => {
        it('should return 3600', () => {
            var seconds = time.seconds;

            assert.equal(seconds, 3600);
        });
    });

    describe('#minutes', () => {
        it('should return 60', () => {
            var minutes = time.minutes;

            assert.equal(minutes, 60);
        });
    });

    describe('#hours', () => {
        it('should return 1', () => {
            var hours = time.hours;

            assert.equal(hours, 1);
        });
    });

    describe('#addToDate()', () => {
        var date;
        var milli;
        var result;

        beforeEach(() => {
            milli = 1499772238698;
            date = new Date(milli);
            result = time.addToDate(date);
        });

        it('should return a Date', () => {
            assert.instanceOf(result, Date);
        })

        it('should return a new Date', () => {
            assert.notEqual(result, date);
        });

        it('should add date to the current time', () => {
            var expectedResultMilli = milli + time.milliseconds;

            assert.equal(result.getTime(), expectedResultMilli);
        });
    });

    describe('#minusFromDate()', () => {
        var date;
        var milli;
        var result;

        beforeEach(() => {
            milli = 1499772238698;
            date = new Date(milli);
            result = time.minusFromDate(date);
        });

        it('should return a Date', () => {
            assert.instanceOf(result, Date);
        })

        it('should return a new Date', () => {
            assert.notEqual(result, date);
        });

        it('should add date to the current time', () => {
            var expectedResultMilli = milli - time.milliseconds;

            assert.equal(result.getTime(), expectedResultMilli);
        });
    });

    describe('#addTime()', () => {
        var timeB;
        var result;

        beforeEach(() => {
            timeB = new Time(1000);

            result = time.addTime(timeB);
        });

        it('should return Time', () => {
            assert.instanceOf(result, Time);
        });

        it('should return a new Time', () => {
            assert.notEqual(result, time);
            assert.notEqual(result, timeB);
        });

        it('should add this Time and the Time passed in', () => {
            assert.equal(result.milliseconds, 3601000);
        });
    });

    describe('#minusTime()', () => {
        var timeB;
        var result;

        beforeEach(() => {
            timeB = new Time(1000);

            result = time.minusTime(timeB);
        });

        it('should return Time', () => {
            assert.instanceOf(result, Time);
        });

        it('should return a new Time', () => {
            assert.notEqual(result, time);
            assert.notEqual(result, timeB);
        });

        it('should minus this Time and the Time passed in', () => {
            assert.equal(result.milliseconds, 3599000);
        });
    });

    describe('#setMilliseconds()', () => {
        it('should set the right number of milliseconds', () => {
            // arrange
            var milliseconds = 10;

            // act
            var result = new Time().setMilliseconds(milliseconds);

            // assert
            assert.equal(result.milliseconds, milliseconds);
        });
    });

    describe('#setSeconds()', () => {
        it('should set the right number of seconds', () => {
            // arrange
            var seconds = 10;

            // act
            var result = new Time().setSeconds(seconds);

            // assert
            assert.equal(result.seconds, seconds);
        });
    });

    describe('#setMinutes()', () => {
        it('should set the right number of minutes', () => {
            // arrange
            var minutes = 10;

            // act
            var result = new Time().setMinutes(minutes);

            // assert
            assert.equal(result.minutes, minutes);
        });
    });

    describe('#setHours()', () => {
        it('should set the right number of hours', () => {
            // arrange
            var hours = 10;

            // act
            var result = new Time().setHours(hours);

            // assert
            assert.equal(result.hours, hours);
        });
    });

    describe("Date#toTime()", () => {
        context("date with milliseconds 100", () => {
            it("returns a time with 100 milliseconds", () => {
                const date = new Date(100);
                const time = date.toTime();

                expect(time.milliseconds).to.equal(100);
            });
        });
    });
});
