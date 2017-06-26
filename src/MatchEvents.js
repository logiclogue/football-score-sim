var TimeEvents = require('./TimeEvents');
var GoalEvents = require('./GoalEvents');
var PeriodEvents = require('./PeriodEvents');

function MatchEvents(options) {
    // Instances
    this.match = options.match;
    this.goalManager = this.match.goalManager;
    this.timeEvents = options.timeEvents || new TimeEvents();
    this.goalEvents = options.goalEvents || new GoalEvents({
        goalManager: this.goalManager
    });
    this.firstHalfEvents = new PeriodEvents({
        period: this.match.firstHalf
    });
    this.secondHalfEvents = new PeriodEvents({
        period: this.match.secondHalf
    });
}

(function (proto_, static_) {

    /*
     * Call the callback when a goal is scored.
     */
    proto_.onGoal = function (callback) {
        this.goalEvents.onGoal(callback);
    };

    /*
     * Call the callback when the match kicks off.
     */
    proto_.onKickOff = function (callback) {
        this.timeEvents.onDate(callback, this.match.startDate);
    };

    /*
     * Call the callback when it's half-time.
     */
    proto_.onHalfTime = function (callback) {
        this.firstHalfEvents.onFinish(callback);
    };

    /*
     * Call the callback when the second half starts.
     */
    proto_.onSecondHalfKickOff = function (callback) {
        this.secondHalfEvents.onStart(callback);
    };

    /*
     * Call the callback when the 90 minutes has ended, but there is still
     * extra time to be played.
     */
    proto_.onEndOf90Mins = function (callback) {
        var wentToExtraTime = this.match.wentToExtraTime;
        var wentToPenaltyShootout = this.match.wentToPenaltyShootout;
        var matchEnds = !wentToExtraTime && !wentToPenaltyShootout;

        if (matchEnds) {
            return;
        }

        this.secondHalfEvents.onFinish(callback);
    };

    /*
     * Call the callback when the first half of extra time is kicked off.
     */
    proto_.onExtraTimeKickOff = function (callback) {
        
    };

    /*
     * Call the callback when it's half time extra time.
     */
    proto_.onHalfTimeExtraTime = function (callback) {
        
    };

    /*
     * Call the callback when second half extra time kicks off.
     */
    proto_.onSecondHalfETKickOff = function (callback) {
        
    };

    /*
     * Call the callback when the 120 minutes have been played, but there is
     * still penalties.
     */
    proto_.onEndOf120Mins = function (callback) {
        
    };

    /*
     * Call the callback when the penalty shootout is kicked off.
     */
    proto_.onPenaltyShootoutKickOff = function () {
        
    };

    /*
     * Call the callback when there has been a goal in the penalty shootout.
     */
    proto_.onPenaltyShootoutGoal = function () {
        
    };

    /*
     * Call the callback when the match ends.
     */
    proto_.onFullTime = function (callback) {
        this.timeEvents.onDate(callback, this.match.finishDate);
    };
    
}(MatchEvents.prototype, MatchEvents));

module.exports = MatchEvents;
