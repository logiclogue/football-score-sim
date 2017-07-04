var assert = require('chai').assert;
var DateBuilder = require('../src/DateBuilder');

describe('DateBuilder', function () {
    var dateBuilder;

    beforeEach(function () {
        dateBuilder = new DateBuilder();
    });

    describe('#setMinimumMilliDelta()', function () {
        var minMilliDelta;
        var result;

        beforeEach(function () {
            // arrange
            minMilliDelta = 42;

            // act
            result = dateBuilder.setMinimumMilliDelta(minMilliDelta);
        });

        it('should return itself', function () {
            assert.equal(result, dateBuilder);
        });

        it('should set #minMilliDelta', function () {
            assert.equal(dateBuilder.minMilliDelta, minMilliDelta);
        });
    });

    describe('#setMaximumMilliDelta', function () {
        var maxMilliDelta;
        var result;

        beforeEach(function () {
            // arrange
            maxMilliDelta = 42;

            // act
            result = dateBuilder.setMaximumMilliDelta(maxMilliDelta);
        });

        it('should return itself', function () {
            assert.equal(result, dateBuilder);
        });

        it('should set #maxMilliDelta', function () {
            assert.equal(dateBuilder.maxMilliDelta, maxMilliDelta);
        });
    });

    describe('#setMeanDate', function () {
        var meanDate;
        var result;

        beforeEach(function () {
            // arrange
            meanDate = 42;

            // act
            result = dateBuilder.setMeanDate(meanDate);
        });

        it('should return itself', function () {
            assert.equal(result, dateBuilder);
        });

        it('should set #meanDate', function () {
            assert.equal(dateBuilder.meanDate, meanDate);
        });
    });
});
