function MatchEvents(options) {
    // Instances
    this.match = options.match;
    this.goalManager = this.match.goalManager;
}

(function (proto_, static_) {

    /*
     * Call the callback when a goal is scored.
     */
    proto_.onGoal = function (callback) {
        this.goalManager.forEach(function (goal) {
            setTimeout(callback, goal.time.getTime() - Date.now());
        });
    };

    /*
     * Call the callback when the match kicks off.
     */
    proto_.onKickOff = function (callback) {
        
    };

    /*
     * Call the callback when the match ends.
     */
    proto_.onFullTime = function (callback) {
        
    };
    
}(MatchEvents.prototype, MatchEvents));

module.exports = MatchEvents;
