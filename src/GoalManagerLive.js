var GoalManager = require('./GoalManager');
var List = require('./ScheduleList');
var Item = require('./ScheduleListItem');


function GoalManagerLive(options) {
    GoalManager.apply(this, arguments);

    // Instances
    this.list = new List();

    // Variables
    this.liveGoals = [
        [],
        []
    ];
}

GoalManagerLive.prototype = Object.create(GoalManager.prototype);

(function (proto_, super_) {

    proto_.addGoals = function (teamIndex, goals) {
        super_.addGoals.apply(this, arguments);

        goals.forEach(function (goal) {
            this.list.addItem(new Item(goal.time, function () {
                console.log('here');
                this.liveGoals[teamIndex].push(goal);
            }.bind(this)));
        }.bind(this));
    };

    proto_.append = function () {
        super_.append.apply(this, arguments);
    };

}(GoalManagerLive.prototype, GoalManager.prototype));

module.exports = GoalManagerLive;
