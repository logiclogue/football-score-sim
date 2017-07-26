var assert = require('chai').assert;
var sinon = require('sinon');
var Period = require('../src/Period');
var common = require('./common');
var Time = require('../src/Time');

describe('Period', function () {
    var period;

    beforeEach(function () {
        period = new Period({
            teamA: common.teamEngland,
            teamB: common.teamSlovakia
        });

        period.simulate();
    });

    describe('#simulate()', function () {
        it('shouldn\'t return anything', function () {
            assert.isUndefined(period.simulate());
        });
    });

    describe('#getFinishDate()', function () {
        it('should return start time + length', function () {
            var startTime = period.startDate.getTime();
            var length = period.timeLength.getMilliseconds();
            var expectedFinishTime = startTime + length;
            var actualFinishTime = period.getFinishDate().getTime();

            assert.equal(expectedFinishTime, actualFinishTime);
        });
    });

    describe('#finishDate', function () {
        it('should set #finishDate to return of #getFinishDate', function () {
            var expectedFinishTime = period.getFinishDate().getTime();
            var actualFinishTime = period.finishDate.getTime();

            assert.equal(expectedFinishTime, actualFinishTime);
        });
    });

    describe('#getInjuryTime()', function () {
        var timeLength;
        var wholeTimeLength;
        var injuryTime;

        beforeEach(function () {
            timeLength = sinon.mock(period.timeLength);
            wholeTimeLength = sinon.mock(new Time(1000));
            injuryTime = sinon.mock(new Time(500));

            timeLength.minusDates = timeLength.expects("minusDates")
                .returns(wholeTimeLength.object);

            wholeTimeLength.minusTime = wholeTimeLength.expects("minusTime")
                .returns(injuryTime.object);
        });

        it('should call time length minusDates', function () {
            // arrange
            timeLength.minusDates
                .withArgs(period.finishDate, period.startDate);

            // act
            period.getInjuryTime();

            // assert
            timeLength.minusDates.verify();
        });

        it('should call whole time length minusTime', function () {
            // arrange
            wholeTimeLength.minusTime.withArgs(period.timeLength);

            // act
            period.getInjuryTime();

            // assert
            wholeTimeLength.minusTime.verify();
        });

        it('should return whole time length minusTime result', function () {
            // act
            var result = period.getInjuryTime();

            // assert
            assert.equal(result, injuryTime.object);
        });
    });

    describe('#getRelativeTimeFromDate()', function () {
        it('should call previousPeriod.getRelativeTimeFromDate()', function () {
            // arrange
            var previousPeriod = sinon.mock(period.previousPeriod);
            var date = new Date(1000);

            previousPeriod.getRelativeTimeFromDate()
                .withArgs(date)
                .once();

            // act
            period.getRelativeTimeFromDate(date);

            // assert
            previousPeriod.verify();
        });
    });
});
