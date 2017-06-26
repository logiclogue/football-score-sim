var assert = require('chai').assert;
var GoalManagerEvents = require('../src/GoalManagerEvents');
var GoalManager = require('../src/GoalManager');
var Goal = require('../src/Goal');
var common = require('./common');

describe('GoalManagerEvents', function () {
    var events;
    var goalManager;
    var goals = [
        new Goal({
            date: new Date(1000)
        }),
        new Goal({
            date: new Date(2000)
        })
    ];

    beforeEach(function () {
        goalManager = new GoalManager({
            teamA: common.TeamEngland,
            teamB: common.TeamSlovakia
        });
        events = new GoalManagerEvents({
            goalManager: goalManager
        });

        goalManager.addGoals(0, goals);
    });

    describe('#onGoal()', function () {
        it('should call onDate', function () {
            // arrange
            var hasCalled = false;

            events.timeEvents.onDate = function (callback, date) {
                hasCalled = true;
            };

            // act
            events.onGoal(function () {});

            // assert
            assert.isTrue(hasCalled, "Didn't call onDate");
        });

        it('should callback with the goal', function () {
            // arrange
            var hasCalled = false;

            events.timeEvents.onDate = function (callback, date) {
                callback();
            };

            // act
            events.onGoal(function (goal) {
                hasCalled = true;

                // assert
                assert.instanceOf(goal, Goal);
            });

            assert.isTrue(hasCalled);
        });

        it('should callback with each goal different', function () {
            // arrange
            var goals = [];
            var hasCalled = false;

            events.timeEvents.onDate = function (callback, date) {
                callback();

                hasCalled = true;
            };

            // act
            events.onGoal(function (goal) {
                // assert
                assert.notInclude(goals, goal);

                goals.push(goal);
            });

            assert.isTrue(hasCalled);
        });
    });
});
