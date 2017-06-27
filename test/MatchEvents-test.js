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

    describe('#onEndOf90Mins()', function () {
        context('going to extra time', function () {
            it('should call second half onFinish', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                match.wentToExtraTime = true;

                events.secondHalfEvents.onFinish = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onEndOf90Mins(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });

        context('going to penalties', function () {
            it('should call second half onFinish', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                match.wentToExtraTime = false;
                match.wentToPenaltyShootout = true;

                events.secondHalfEvents.onFinish = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onEndOf90Mins(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });

        context('full-time at 90 minutes' , function () {
            it('shouldn\'t call second half onFinish', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                match.wentToExtraTime = false;
                match.wentToPenaltyShootout = false;

                events.secondHalfEvents.onFinish = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onEndOf90Mins(expectedCallback);

                // assert
                assert.isUndefined(actualCallback);
            });
        });
    });

    describe('#onExtraTimeKickOff()', function () {
        context('match does not go to extra time', function () {
            it('should\'t call extraTimeFirstHalfEvents.onStart', function () {
                // arrange
                var hasCalled = false;
                
                match.wentToExtraTime = false;

                events.extraTimeFirstHalfEvents.onStart = function () {
                    hasCalled = true;
                };

                // act
                events.onExtraTimeKickOff(function () {});

                // assert
                assert.isFalse(hasCalled);
            });
        });

        context('match goes to extra time', function () {
            it('should call extraTimeFirstHalfEvents.onStart', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                match.wentToExtraTime = true;

                events.extraTimeFirstHalfEvents.onStart = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onExtraTimeKickOff(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });
    });

    describe('#onHalfTimeExtraTime()', function () {
        context('match does not go to extra time', function () {
            it('shouldn\'t call extraTimeFirstHalfEvents.onFinish', function () {
                // arrange
                var hasCalled = false;

                match.wentToExtraTime = false;

                events.extraTimeFirstHalfEvents.onFinish = function (callback) {
                    hasCalled = true;
                };

                // act
                events.onHalfTimeExtraTime(function () {});

                // assert
                assert.isFalse(hasCalled);
            });
        });

        context('match goes to extra time', function () {
            it('should call extraTimeFirstHalfEvents.onFinish', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                match.wentToExtraTime = true;

                events.extraTimeFirstHalfEvents.onFinish = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onHalfTimeExtraTime(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });
    });

    describe('#onSecondHalfETKickOff()', function () {
        context('match does not go to extra time', function () {
            it('shouldn\'t call extraTimeSecondHalfEvents.onStart', function () {
                // arrange
                var hasCalled = false;

                match.wentToExtraTime = false;

                events.extraTimeSecondHalfEvents.onStart = function (callback) {
                    hasCalled = true;
                };

                // act
                events.onSecondHalfETKickOff(function () {});

                // assert
                assert.isFalse(hasCalled);
            });
        });

        context('match goes to extra time', function () {
            it('should call extraTimeSecondHalfEvents.onStart', function () {
                // arrange
                var expectedCallback = function () {};
                var actualCallback;

                match.wentToExtraTime = true;

                events.extraTimeSecondHalfEvents.onStart = function (callback) {
                    actualCallback = callback;
                };

                // act
                events.onSecondHalfETKickOff(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });
    });

    describe('#onEndof120Mins()', function () {
        var expectedCallback;
        var actualCallback;

        beforeEach(function () {
            expectedCallback = function () {};
            actualCallback = null;

            events.extraTimeSecondHalfEvents.onFinish = function (callback) {
                actualCallback = callback;
            };
        });

        context('match ends on 90 minutes', function () {
            it('shouldn\'t call onFinish', function () {
                // arrange
                match.wentToExtraTime = false;
                match.wentToPenaltyShootout = false;

                // act
                events.onEndOf120Mins(expectedCallback);

                // assert
                assert.isNull(actualCallback);
            });
        });

        context('match ends on 120 minutes', function () {
            it('shouldn\'t call onFinish', function () {
                // arrange
                match.wentToExtraTime = true;
                match.wentToPenaltyShootout = false;

                // act
                events.onEndOf120Mins(expectedCallback);

                // assert
                assert.isNull(actualCallback);
            });
        });

        context('match goes to penalties after 90 minutes', function () {
            it('shouldn\'t call onFinish', function () {
                // arrange
                match.wentToExtraTime = false;
                match.wentToPenaltyShootout = true;

                // act
                events.onEndOf120Mins(expectedCallback);

                // assert
                assert.isNull(actualCallback);
            });
        });

        context('match goes to penalties after 120 minutes', function () {
            it('should call onFinish', function () {
                // arrange
                match.wentToExtraTime = true;
                match.wentToPenaltyShootout = true;

                // act
                events.onEndOf120Mins(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });
    });

    describe('#onPenaltyShootoutKickOff()', function () {
        var expectedCallback;
        var actualCallback;

        beforeEach(function () {
            expectedCallback = function () {};
            actualCallback = null;

            events.penaltyShootoutEvents.onStart = function (callback) {
                actualCallback = callback;
            };
        });

        context('game doesn\'t go to penalties', function () {
            it('shouldn\'t call callback', function () {
                // arrange
                match.wentToPenaltyShootout = false;

                // act
                events.onPenaltyShootoutKickOff(expectedCallback);

                // assert
                assert.isNull(actualCallback);
            });
        });

        context('game goes to penalties', function () {
            it('should call callback', function () {
                // arrange
                match.wentToPenaltyShootout = true;

                // act
                events.onPenaltyShootoutKickOff(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });
    });

    describe('#onPenaltyShootoutGoal()', function () {
        var expectedCallback;
        var actualCallback;

        beforeEach(function () {
            expectedCallback = function () {};
            actualCallback = null;

            events.penaltyShootoutEvents.onGoal = function (callback) {
                actualCallback = callback;
            };
        });

        context('game doesn\'t go to penalties', function () {
            it('shouldn\'t call callback', function () {
                // arrange
                match.wentToPenaltyShootout = false;

                // act
                events.onPenaltyShootoutGoal(expectedCallback);

                // assert
                assert.isNull(actualCallback);
            });
        });

        context('game goes to penalties', function () {
            it('should call callback', function () {
                // arrange
                match.wentToPenaltyShootout = true;

                // act
                events.onPenaltyShootoutGoal(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });
    });

    describe('#onPenaltyShootoutMiss()', function () {
        var expectedCallback;
        var actualCallback;

        beforeEach(function () {
            expectedCallback = function () {};
            actualCallback = null;

            events.penaltyShootoutEvents.onMiss = function (callback) {
                actualCallback = callback;
            };
        });

        context('game doesn\'t go to penalties', function () {
            it('shouldn\'t call callback', function () {
                // arrange
                match.wentToPenaltyShootout = false;

                // act
                events.onPenaltyShootoutMiss(expectedCallback);

                // assert
                assert.isNull(actualCallback);
            });
        });

        context('game goes to penalties', function () {
            it('should call callback', function () {
                // arrange
                match.wentToPenaltyShootout = true;

                // act
                events.onPenaltyShootoutMiss(expectedCallback);

                // assert
                assert.equal(actualCallback, expectedCallback);
            });
        });
    });
});
