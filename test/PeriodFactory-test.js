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
                minutesAfterPrevious: minutesAfterPrevious,
                seed: 'newHalf'
            });
        });

        it('should create a period that has the correct length', function () {
            assert.equal(result.timeLength.getMinutes(), 15);
        });

        it('should create a period that has a previous period', function () {
            assert.equal(result.previousPeriod, period);
        });

        it('should set the start date after the previous period', function () {
            var previousFinishDate = period.finishDate;
            var thisStartDate = result.startDate;

            var diff = Time.minusDates(thisStartDate, previousFinishDate);
            
            assert.equal(diff.getMinutes(), minutesAfterPrevious);
        });

        it('should set teamA', function () {
            assert.equal(result.teamA, common.teamEngland);
        });
        
        it('should set teamB', function () {
            assert.equal(result.teamB, common.teamSlovakia);
        });

        it('should set the seed', function () {
            assert.equal(result.seed.getValue(), 'test,newHalf');
        });
    });

    describe('#createFirstHalf()', function () {
        var result;
        var startDate;

        beforeEach(function () {
            startDate = new Date(42);
            result = periodFactory.createFirstHalf(startDate);
        });

        it('should set the correct start date', function () {
            assert.equal(result.startDate.getTime(), startDate.getTime());
        });
    });
});
