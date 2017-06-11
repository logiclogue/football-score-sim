var assert = require('chai').assert;
var Match = require('../src/Match');
var MatchOutputter = require('../src/MatchOutputter');
var common = require('./common');


describe('Match', function () {
    var match = new Match(common.matchParams);

    describe('#simulate()', function () {
        var result = match.simulate();
        var startTime = match.startDate.getTime();

        it('should return the same score as #score property', function () {
            assert.equal(result, match.score);
        });

        context('creating the first half', function () {
            it('should set its #startDate correctly', function () {
                assert.equal(match.firstHalf.startDate.getTime(), startTime);
            });

            it('should have a length of 45 minutes', function () {
                assert.equal(match.firstHalf.length, 45 * 60000);
            });
        });

        context('creating the second half', function () {
            it('should start 1 hour after the match started', function () {
                var expectedStartTime = startTime + (60 * 60000);
                var secondHalfStartTime = match.secondHalf.startDate.getTime();

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
                var thisStart = match.extraTimeFirstHalf.startDate;
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
                var secondHalfETStart = match.extraTimeSecondHalf.startDate;
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
                var actualStartTime = match.penalties.startDate.getTime();

                assert.equal(actualStartTime, expectedStartTime);
            });
        });

        context('sets #finishTime to return of #getFinishTime', function () {
            assert.equal(match.finishTime, match.getFinishTime());
        });
    });

    describe('#getFinishTime()', function () {
        var match = new Match(common.matchParams);

        context('#wentToExtraTime and #wentToPenalties are false', function () {
            match.wentToExtraTime = false;
            match.wentToPenalties = false;

            var finishTime = match.getFinishTime().getTime();

            it('should return second half finish time', function () {
                var expectedFinishTime = match.secondHalf.finishTime.getTime();

                assert.equal(finishTime, expectedFinishTime);
            });
        });

        context('#wentToExtraTime true, #wentToPenalties false', function () {
            match.wentToExtraTime = true;
            match.wentToPenalties = false;

            var finishTime = match.getFinishTime().getTime();

            it('should return second half ET finish time', function () {
                var expectedFinishTime = match.extraTimeSecondHalf
                    .finishTime
                    .getTime();
                
                assert.equal(finishTime, expectedFinishTime);
            });
        });

        context('#wentToExtraTime true, #wentToPenalties true', function () {
            match.wentToExtraTime = true;
            match.wentToPenalties = true;

            var finishTime = match.getFinishTime();

            it('should return penalties finish time', function () {
                var expectedFinishTime = match.penalties.finishTime;
                
                assert.equal(finishTime, expectedFinishTime);
            });
        });

        context('#wentToExtraTime false, #wentToPenalties true', function () {
            match.wentToExtraTime = false;
            match.wentToPenalties = true;

            var finishTime = match.getFinishTime();

            it('should return penalties finish time', function () {
                var expectedFinishTime = match.penalties.finishTime;
                
                assert.equal(finishTime, expectedFinishTime);
            });
        });
    });

    describe('#startDate', function () {
        var startDate = common.matchParams.startDate;

        it('should set the first half start time', function () {
            var firstHalfStartDate = match.firstHalf.startDate;
            
            assert.equal(firstHalfStartDate.getTime(), startDate.getTime());
        });

        it('should always set startDate as instance of Date', function () {
            delete common.matchParams.startDate;

            var match = new Match(common.matchParams);

            assert.instanceOf(match.startDate, Date);
        });
    });
});
