var assert = require('chai').assert;
var Match = require('../src/Match');
var MatchEvents = require('../src/MatchEvents');
var Goal = require('../src/Goal');
var common = require('./common');

describe('MatchEvents', function () {
    var match = new Match(common.matchParams);
    var date = new Date();

    date.setSeconds(date.getSeconds() + 1);

    var goal = new Goal({
        date: date,
        team: match.teamA
    });

    match.simulate();
    match.goalManager.addGoals(0, [goal]);

    var events = new MatchEvents({
        match: match
    });

    describe('#onGoal()', function () {
        it('should call goalEvents.onGoal', function () {
            // arrange
            var hasCalled = false;
            var expectedCallback = function () {};
            var givenCallback;

            events.goalEvents.onGoal = function (callback) {
                hasCalled = true;
                givenCallback = callback;
            };

            // act
            events.onGoal(expectedCallback);

            // assert
            assert.isTrue(hasCalled);
            assert.equal(givenCallback, expectedCallback);
        });
    });

    describe('#onKickoff()', function () {
        it('should call onDate', function (done) {
            events.timeEvents.onDate = function (callback, date) {
                if (date === match.startDate) {
                    done();
                }
            };

            events.onKickOff(function () {});
        });
    });

    describe('#onFullTime()', function () {
        it('should call onDate', function (done) {
            events.timeEvents.onDate = function (callback, date) {
                assert.equal(date, match.finishDate);

                callback();
            };

            events.onFullTime(done);
        });
    });

    describe('#onHalfTime', function () {
        it('should call first half onFinish', function () {
            // arrange
            var expectedCallback = function () {};
            var actualCallback;

            events.firstHalfEvents.onFinish = function (callback) {
                actualCallback = callback;
            };

            // act
            events.onHalfTime(expectedCallback);

            // assert
            assert.equal(actualCallback, expectedCallback);
        });
    });

    describe('#onSecondHalfKickOff', function () {
        it('should call second half onStart', function () {
            // arrange
            var expectedCallback = function () {};
            var actualCallback;

            events.secondHalfEvents.onStart = function (callback) {
                actualCallback = callback;
            };

            // act
            events.onSecondHalfKickOff(expectedCallback);

            // assert
            assert.equal(actualCallback, expectedCallback);
        });
    });

    describe('#onEndOf90Mins', function () {
        context('going to extra time', function () {
            it('should call second half onFinish', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                events.secondHalfEvents.onFinish = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onSecondHalfKickOff(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });

        context('full-time at 90 minutes' , function () {
            it('shouldn\'t call second half onFinish', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                events.firstHalfEvents.onFinish = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onHalfTime(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });

    });
});
