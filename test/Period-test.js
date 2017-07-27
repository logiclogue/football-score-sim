var assert = require('chai').assert;
var sinon = require('sinon');
var Period = require('../src/Period');
var common = require('./common');
var Time = require('../src/Time');
var MatchTime = require('../src/MatchTime');
var iocConfig = require('../src/iocConfig');

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

    describe('#calculateMatchTime()', function () {
        context('goal is within normal time', function () {
            var period;
            var date;
            var matchTime;

            beforeEach(function () {
                period = new Period({
                    startDate: new Date(100),
                    finishDate: new Date(150),
                    timeLength: new Time(45)
                });
                date = new Date(130);

                matchTime = period.calculateMatchTime(date);
            });

            it('should return goal time as normal time', function () {
                var normalTime = matchTime.getNormalTimeComponent();

                assert.equal(normalTime.getMilliseconds(), 30);
            });

            it('should return nothing as injury time', function () {
                var injuryTime = matchTime.getInjuryTimeComponent();

                assert.equal(injuryTime.getMilliseconds(), 0);
            });
        });

        context('goal is in injury time', function () {
            var period;
            var date;
            var matchTime;

            beforeEach(function () {
                period = new Period({
                    startDate: new Date(100),
                    finishDate: new Date(150),
                    timeLength: new Time(45)
                });
                date = new Date(147);

                matchTime = period.calculateMatchTime(date);
            });

            it('should return period length as normal time', function () {
                var normalTime = matchTime.getNormalTimeComponent();
                var timeLengthMilli = period.timeLength.getMilliseconds();

                assert.equal(normalTime.getMilliseconds(), timeLengthMilli);
            });

            it('should return the difference as injury time', function () {
                var injuryTime = matchTime.getInjuryTimeComponent();

                assert.equal(injuryTime.getMilliseconds(), 2);
            });
        });

        context('goal is in second period injury time', function () {
            var period;
            var previousPeriod;
            var goalDate;
            var matchTime;

            beforeEach(function () {
                previousPeriod = new Period({
                    startDate: new Date(100),
                    finishDate: new Date(150),
                    timeLength: new Time(45)
                });
                period = new Period({
                    startDate: new Date(200),
                    finishDate: new Date(250),
                    timeLength: new Time(45),
                    previousPeriod: previousPeriod
                });

                goalDate = new Date(255);

                matchTime = period.calculateMatchTime(goalDate);
            });

            it('should return normal time as sum of two lengths', function () {
                var normalTime = matchTime.getNormalTimeComponent();

                assert.equal(normalTime.getMilliseconds(), 90);
            });

            it('should return the injury time as the difference', function () {
                var injuryTime = matchTime.getInjuryTimeComponent();

                assert.equal(injuryTime.getMilliseconds(), 10);
            });
        });

        context('goal is in second period normal time', function () {
            var period;
            var previousPeriod;
            var goalDate;
            var matchTime;

            beforeEach(function () {
                previousPeriod = new Period({
                    startDate: new Date(100),
                    finishDate: new Date(150),
                    timeLength: new Time(45)
                });
                period = new Period({
                    startDate: new Date(200),
                    finishDate: new Date(250),
                    timeLength: new Time(45),
                    previousPeriod: previousPeriod
                });

                goalDate = new Date(205);

                matchTime = period.calculateMatchTime(goalDate);
            });

            it('should return normal time as sum of two lengths', function () {
                var normalTime = matchTime.getNormalTimeComponent();

                assert.equal(normalTime.getMilliseconds(), 50);
            });

            it('should return no injury time', function () {
                var injuryTime = matchTime.getInjuryTimeComponent();

                assert.equal(injuryTime.getMilliseconds(), 0);
            });
        });
    });
});
