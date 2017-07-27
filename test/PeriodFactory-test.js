var assert = require('chai').assert;
var PeriodFactory = require('../src/PeriodFactory');
var Seed = require('../src/Seed');
var common = require('./common');

describe('PeriodFactory', function () {
    var periodFactory;
    var seed;

    beforeEach(function () {
        periodFactory = new PeriodFactory();
        seed = new Seed('test', ',');
    });

    describe('#createFirstHalf', function () {
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

        it('should set the teams correctly', function () {
            $
        });
    });
});
