var assert = require('chai').assert;
var Match = require('../src/PenaltyShootoutEvents');
var PenaltyShootout = require('../src/PenaltyShootout');
var PenaltyShootoutEvents = require('../src/PenaltyShootoutEvents');
var common = require('./common');

describe('PenaltyShootoutEvents', function () {
    var penaltyShootout = new PenaltyShootout(common.penaltyShootoutParams);
    var events = new PenaltyShootoutEvents({
        penaltyShootout: penaltyShootout
    });

    penaltyShootout.simulate();

    describe('#onGoal()', function () {
        before(function () {
            events.timeEvents.onDate = function (callback, date) {
                callback();
            };
        });

        it('should call #onDate', function () {
            var hasBeenCalled = false;

            events.onGoal(function () {
                hasBeenCalled = true;
            });

            assert.isTrue(hasBeenCalled);
        });

        it('should call #onDate the correct number of times', function () {
            var numberOfCalls = 0;

            events.onGoal(function () {
                numberOfCalls += 1;
            });

            assert.equal(numberOfCalls, 7);
        });

        it('should call #onDate with the correct goal time', function () {
            var expectedDate = penaltyShootout.goalManager.goals[0][0].date;
            var actualDate;
            var hasBeenCalled = false;

            events.timeEvents.onDate = function (callback, date) {
                if (!hasBeenCalled) {
                    actualDate = date;

                    hasBeenCalled = true;
                }
            };

            events.onGoal(function () {});

            assert.equal(actualDate, expectedDate);
        });
    });

    describe('#onMiss', function () {
        before(function () {
            events.timeEvents.onDate = function (callback, date) {
                callback();
            };
        });

        it('should call #onDate', function () {
            var hasBeenCalled = false;

            events.onMiss(function () {
                hasBeenCalled = true;
            });

            assert.isTrue(hasBeenCalled);
        });
    });

    describe('#onStart()', function () {
        before(function () {
            events.timeEvents.onDate = function (callback, date) {
                callback();
            };
        });

        it('should call #onDate', function () {
            var hasBeenCalled = false;

            events.onStart(function () {
                hasBeenCalled = true;
            });

            assert.isTrue(hasBeenCalled);
        });

        it('should call #onDate with the start date', function () {
            var actualStartDate;

            events.timeEvents.onDate = function (callback, date) {
                callback(date);
            };

            events.onStart(function (date) {
                actualStartDate = date;
            });

            assert.equal(actualStartDate, events.penaltyShootout.startDate);
        });
    });

    describe('#onFinish', function () {
        it('should call #onDate with the correct finish date', function () {
            var actualFinishDate;

            events.timeEvents.onDate = function (callback, date) {
                callback(date);
            };

            events.onFinish(function (date) {
                actualFinishDate = date;
            });

            assert.equal(actualFinishDate, penaltyShootout.finishDate);
        });
    });
});
