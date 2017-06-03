var assert = require('chai').assert;
var Match = require('../src/Match');
var MatchOutputter = require('../src/MatchOutputter');
var common = require('./common');


describe('Match', function () {
    var match = new Match(common.matchParams);

    describe('#simulate()', function () {
        var result = match.simulate();
        var startTime = match.startTime.getTime();

        it('should return the same score as #score property', function () {
            assert.equal(result, match.score);
        });

        context('creating the first half', function () {
            it('should set its #startTime correctly', function () {
                assert.equal(match.firstHalf.startTime.getTime(), startTime);
            });

            it('should have a length of 45 minutes', function () {
                assert.equal(match.firstHalf.length, 45 * 60000);
            });
        });

        context('creating the second half', function () {
            it('should start 1 hour after the match started', function () {
                var expectedStartTime = startTime + (60 * 60000);
                var secondHalfStartTime = match.secondHalf.startTime.getTime();

                assert.equal(secondHalfStartTime, expectedStartTime);
            });

            it('should have a length of 45 minutes', function () {
                assert.equal(match.secondHalf.length, 45 * 60000);
            });
        });

        context('creating the first half of extra time', function () {
            it('should start 5 minutes after second half ended', function () {
                var secondHalfFinish = match.secondHalf.finishTime;
                var secondHalfFinishTime = secondHalfFinish.getTime();
                var expectedStartTime = secondHalfFinishTime + (5 * 60000);
                var thisStart = match.extraTimeFirstHalf.startTime;
                var thisStartTime = thisStart.getTime();

                assert.equal(thisStartTime, expectedStartTime);
            });

            it('should have a length of 15 minutes', function () {
                assert.equal(match.extraTimeFirstHalf.length, 15 * 60000);
            });
        });

        context('creating the second half of extra time', function () {
            it('should start 5 minutes after first half of ET', function () {
                var firstHalfETFinish = match.extraTimeFirstHalf.finishTime;
                var firstHalfETFinishTime = firstHalfETFinish.getTime();
                var secondHalfETStart = match.extraTimeSecondHalf.startTime;
                var secondHalfETStartTime = secondHalfETStart.getTime();
                var expectedStartTime = firstHalfETFinishTime + (5 * 60000);

                assert.equal(secondHalfETStartTime, expectedStartTime);
            });

            it('should have a length of 15 minutes', function () {
                var expectedLength = 15 * 60000;

                assert.equal(match.extraTimeSecondHalf.length, expectedLength);
            });
        });

        context('creating penalties', function () {
            it('should start 5 minutes after second half of ET', function () {
                var previous = match.extraTimeSecondHalf;
                var previousFinishTime = previous.finishTime.getTime();
                var expectedStartTime = previousFinishTime + (5 * 60000);
                var actualStartTime = match.penalties.startTime.getTime();

                assert.equal(actualStartTime, expectedStartTime);
            });
        });
    });

    describe('#startTime', function () {
        var startTime = common.matchParams.startTime;

        it('should set the first half start time', function () {
            var firstHalfStartTime = match.firstHalf.startTime;
            
            assert.equal(firstHalfStartTime.getTime(), startTime.getTime());
        });

        it('should always set startTime as instance of Date', function () {
            delete common.matchParams.startTime;

            var match = new Match(common.matchParams);

            assert.instanceOf(match.startTime, Date);
        });
    });
});
