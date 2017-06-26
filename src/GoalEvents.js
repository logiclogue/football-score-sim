var GoalManager = require('./GoalManager');
var GoalManagerFactory = require('./GoalManagerFactory');
var TimeEvents = require('./TimeEvents');

function GoalEvents(options) {
    this.goalManager = options.goalManager || new GoalManager();
    this.timeEvents = options.timeEvents || new TimeEvents();
    this.factory = options.goalManagerFactory || new GoalManagerFactory();
}

(function (proto_) {

    proto_.onGoal = function (callback) {
        var manager = this.goalManager;
        
        this.goalManager.forEach(function (goal) {
            var date = goal.date;
            var goalManager = this.factory.getBeforeDate(manager, date);

            var boundCallback = callback.bind(this, goal, goalManager);

            this.timeEvents.onDate(boundCallback, date);
        }.bind(this));
    };
    
}(GoalEvents.prototype));

module.exports = GoalEvents;
