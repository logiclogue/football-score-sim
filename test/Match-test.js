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
                var secondHalfFinish = match.secondHalf.finishDate;
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
                var firstHalfETFinish = match.extraTimeFirstHalf.finishDate;
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

        context('creating penalty shootout', function () {
            it('should start 5 minutes after second half of ET', function () {
                var previous = match.extraTimeSecondHalf;
                var previousFinishTime = previous.finishDate.getTime();
                var expectedStartTime = previousFinishTime + (5 * 60000);
                var actualStartTime = match.penaltyShootout.startDate.getTime();

                assert.equal(actualStartTime, expectedStartTime);
            });
        });

        context('sets #finishDate to return of #getFinishDate', function () {
            assert.equal(match.finishDate, match.getFinishDate());
        });
    });

    describe('#getFinishDate()', function () {
        var match = new Match(common.matchParams);

        context('#wentToExtraTime and #wentToPenaltyShootout are false', function () {
            match.wentToExtraTime = false;
            match.wentToPenaltyShootout = false;

            var finishTime = match.getFinishDate().getTime();

            it('should return second half finish time', function () {
                var expectedFinishTime = match.secondHalf.finishDate.getTime();

                assert.equal(finishTime, expectedFinishTime);
            });
        });

        context('#wentToExtraTime true, #wentToPenaltyShootout false', function () {
            match.wentToExtraTime = true;
            match.wentToPenaltyShootout = false;

            var finishTime = match.getFinishDate().getTime();

            it('should return second half ET finish time', function () {
                var expectedFinishTime = match.extraTimeSecondHalf
                    .finishDate
                    .getTime();
                
                assert.equal(finishTime, expectedFinishTime);
            });
        });

        context('#wentToExtraTime true, #wentToPenaltyShootout true', function () {
            match.wentToExtraTime = true;
            match.wentToPenaltyShootout = true;

            var finishDate = match.getFinishDate();

            it('should return penalty shootout finish time', function () {
                var expectedFinishDate = match.penaltyShootout.finishDate;
                
                assert.equal(finishDate, expectedFinishDate);
            });
        });

        context('#wentToExtraTime false, #wentToPenaltyShootout true', function () {
            match.wentToExtraTime = false;
            match.wentToPenaltyShootout = true;

            var finishDate = match.getFinishDate();

            it('should return penalty shootout finish time', function () {
                var expectedFinishDate = match.penaltyShootout.finishDate;
                
                assert.equal(finishDate, expectedFinishDate);
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
