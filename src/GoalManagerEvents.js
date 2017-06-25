var GoalManager = require('./GoalManager');
var TimeEvents = require('./TimeEvents');

function GoalManagerEvents(options) {
    this.goalManager = options.goalManager || new GoalManager();
    this.timeEvents = options.timeEvents || new TimeEvents();
}

(function (proto_) {

    proto_.onGoal = function (callback) {
        //this.goalManager.forEach(function (goal) {
        //    var boundCallback = callback.bind(this, goal);

        //    this.timeEvents.onDate(boundCallback, goal.date);
        //}.bind(this));
    };
    
}(GoalManagerEvents.prototype));

module.exports = GoalManagerEvents;
