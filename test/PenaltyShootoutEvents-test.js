var assert = require('chai').assert;
var expect = require('chai').expect;
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

            expect(hasBeenCalled).to.be.true;
        });

        it('should call #onDate the correct number of times', function () {
            var numberOfCalls = 0;

            events.onGoal(function () {
                numberOfCalls += 1;
            });

            expect(numberOfCalls).to.equal(7);
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

            expect(actualDate).to.equal(expectedDate);
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

            expect(hasBeenCalled).to.be.true;
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

            expect(hasBeenCalled).to.be.true;
        });

        it('should call #onDate with the start date', function () {
            var actualStartDate;

            events.timeEvents.onDate = function (callback, date) {
                callback(date);
            };

            events.onStart(function (date) {
                actualStartDate = date;
            });

            expect(actualStartDate).to.equal(events.penaltyShootout.startDate);
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

            expect(actualFinishDate).to.equal(penaltyShootout.finishDate);
        });
    });
});
