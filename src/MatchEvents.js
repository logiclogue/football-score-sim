function MatchEvents(match) {
    // Instances
    this.match = match;
    this.goalManager = match.goalManager;

    // Variables
    this.onGoalCallback = function () {};
}

(function (proto_, static_) {

    proto_.onGoal = function (callback) {
        this.onGoalCallback = callback;

        this.goalManager.forEach(function (goal) {
            console.log(goal);
        });
    };
    
}(MatchEvents.prototype, MatchEvents));

module.exports = MatchEvents;
