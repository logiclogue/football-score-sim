var GoalManager = require('./GoalManager');
var ScheduleList = require('./ScheduleList');
var ScheduleListItem = require('./ScheduleListItem');


function GoalManagerLive(options) {
    GoalManager.apply(this, arguments);

    // Classes
    this.List = ScheduleList || options.ScheduleList;
    this.Item = ScheduleListItem || options.ScheduleListItem;

    // Instances
    this.list = new this.List();

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
            this.list.addItem(new this.Item(goal.time, function () {
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
