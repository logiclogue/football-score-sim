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
        var dateNow = Date.now();

        this.goalManager.forEach(function (goal) {
            var goalTime = goal.time.getTime();
            var timeDiff = goalTime - dateNow;

            setTimeout(callback, timeDiff);
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
