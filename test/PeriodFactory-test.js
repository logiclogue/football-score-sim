var assert = require('chai').assert;
var PeriodFactory = require('../src/PeriodFactory');
var Seed = require('../src/Seed');
var Period = require('../src/Period');
var Time = require('../src/Time');
var common = require('./common');

describe('PeriodFactory', function () {
    var periodFactory;
    var seed;

    beforeEach(function () {
        seed = new Seed('test', ',');
        periodFactory = new PeriodFactory()
            .setTeamA(common.teamEngland)
            .setTeamB(common.teamSlovakia)
            .setSeed(seed);
    });

    describe('#create()', function () {
        var result;
        var minutesLength;
        var period;
        var minutesAfterPrevious;

        beforeEach(function () {
            minutesLength = 15;
            minutesAfterPrevious = 5;
            period = new Period({});

            result = periodFactory.create({
                minutesLength: minutesLength,
                previousPeriod: period,
                minutesAfterPrevious: minutesAfterPrevious
            });
        });

        it('should create a period that has the correct length', function () {
            assert.equal(result.timeLength.getMinutes(), 15);
        });

        it('should create a period that has a previous period', function () {
            assert.equal(result.previousPeriod, period);
        });

        it('should set the time after the previous period', function () {
            var previousFinishDate = period.finishDate;
            var thisStartDate = result.startDate;

            var diff = Time.minusDates(thisStartDate, previousFinishDate);
            
            assert.equal(diff.getMinutes(), minutesAfterPrevious);
        });
    });

    describe('#createFirstHalf()', function () {
        var result;

        beforeEach(function () {
            result = periodFactory.createFirstHalf(seed);
        });

        it('should create a period that is 45 minutes', function () {
            assert.equal(result.timeLength.getMinutes(), 45);
        });

        it('should set the seed to firstHalf', function () {
            assert.equal(result.seed.getValue(), 'test,firstHalf');
        });
    });
});
