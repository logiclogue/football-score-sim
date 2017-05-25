function MatchEvents(match) {
    // Instances
    this.match = match;

    // Variables
    this.onGoalCallback = function () {};
}

(function (proto_, static_) {

    proto_.onGoal = function (callback) {
        this.onGoalCallback = callback;
    };
    
}(MatchEvents.prototype, MatchEvents));

module.exports = MatchEvents;
