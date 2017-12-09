var GoalManager = require('./GoalManager');
var GoalManagerFactory = require('./GoalManagerFactory');
var TimeEvents = require('./TimeEvents');

class GoalEvents {
    constructor(options) {
        this.goalManager = options.goalManager || new GoalManager();
        this.timeEvents = options.timeEvents || new TimeEvents();
        this.factory = options.goalManagerFactory || new GoalManagerFactory();
    }

    onGoal(callback) {
        var manager = this.goalManager;
        
        this.goalManager.forEach(function (goal) {
            var date = goal.date;
            var goalManager = this.factory.getBeforeDate(manager, date);

            var boundCallback = callback.bind(this, goal, goalManager);

            this.timeEvents.onDate(boundCallback, date);
        }.bind(this));
    }
}

module.exports = GoalEvents;
