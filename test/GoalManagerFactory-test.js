var assert = require('chai').assert;
var GoalManager = require('../src/GoalManager');
var GoalManagerFactory = require('../src/GoalManagerFactory');
var Goal = require('../src/Goal');
var common = require('./common');

describe('GoalManagerFactory', function () {
    describe('#getBeforeDate', function () {
        var factory = new GoalManagerFactory();
        var goalManager;
        var goal1;
        var goal2;

        beforeEach(function () {
            goal1 = new Goal({
                date: new Date(1000),
            });

            goal2 = new Goal({
                date: new Date(2000)
            });

            goalManager = new GoalManager({
                teamA: common.teamEngland,
                teamB: common.teamSlovakia
            })
                .addGoals(0, [goal1, goal2])
                .addGoals(1, [goal2, goal1]);
        });

        context('first goal time is passed in', function () {
            it('should return the first goal only', function () {
                // arrange
                var date = goal1.date;

                // act
                var result = factory.getBeforeDate(goalManager, date);

                // assert
                assert.deepEqual(result.goals[0], [goal1]);
                assert.deepEqual(result.goals[1], [goal1]);
            });
        });

        context('second goal time is passed in', function () {
            it('should return no goals', function () {
                // arrange
                var date = goal2.date;

                // act
                var result = factory.getBeforeDate(goalManager, date);

                // assert
                assert.deepEqual(result, goalManager);
            });
        });

        context('before both goal times', function () {
            it('should return no goals', function () {
                // arrange
                var date = new Date(0);

                // act
                var result = factory.getBeforeDate(goalManager, date);

                // assert
                assert.deepEqual(result.goals[0], []);
                assert.deepEqual(result.goals[1], []);
            });
        });
    });

    describe('#getBeforeNow', function () {
        var factory = new GoalManagerFactory();
        var hasCalled = false;
        var dateCalledWith;

        factory.getBeforeDate = function (goalManager, date) {
            hasCalled = true;
            dateCalledWith = date;
        };

        it('should call #getBeforeDate with the current date', function () {
            // arrange
            var date = new Date();

            // act
            var result = factory.getBeforeNow();

            // assert
            var timeDiff = Math.abs(dateCalledWith.getTime() - date.getTime());

            assert.isTrue(hasCalled);
            assert.isBelow(timeDiff, 1000);
        });
    });
});
