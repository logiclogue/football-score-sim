var TimeEvents = require('./TimeEvents');

function MatchEvents(options) {
    // Instances
    this.match = options.match;
    this.goalManager = this.match.goalManager;
    this.timeEvents = options.timeEvents || new TimeEvents();
}

(function (proto_, static_) {

    /*
     * Call the callback when a goal is scored.
     */
    proto_.onGoal = function (callback) {
        var dateNow = Date.now();

        this.goalManager.forEach(function (goal) {
            var boundCallback = callback.bind(this, goal);

            this.timeEvents.onDate(boundCallback, goal.date);
        }.bind(this));
    };

    /*
     * Call the callback when the match kicks off.
     */
    proto_.onKickOff = function (callback) {
        this.timeEvents.onDate(callback, this.match.startDate);
    };

    /*
     * Call the callback when the match ends.
     */
    proto_.onFullTime = function (callback) {
        this.timeEvents.onDate(callback, this.match.finishDate);
    };
    
}(MatchEvents.prototype, MatchEvents));

module.exports = MatchEvents;
