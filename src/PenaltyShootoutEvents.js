var TimeEvents = require('./TimeEvents');
var PeriodEvents = require('./Period');

function PenaltyShootoutEvents(options) {
    this.penaltyShootout = options.penaltyShootout;
    this.periodEvents = options.periodEvents || new PeriodEvents({
        period: this.penaltyShootout
    });
    this.goalManager = this.penaltyShootout.goalManager;
    this.missedGoalManager = this.penaltyShootout.missedGoalManager;
    this.timeEvents = options.timeEvents || new TimeEvents();
}

(function (proto_) {

    /*
     * Calls the callback with the goal object when a penalty shootout goal is
     * scored.
     */
    proto_.onGoal = function (callback) {
        this.goalManager.forEach(function (goal) {
            var boundCallback = callback.bind(this, goal);

            this.timeEvents.onDate(boundCallback, goal.date);
        }.bind(this));
    };

    /*
     * Calls the callback when a penalty is missed, with a goal object.
     * The goal object behaves as a miss to show which team missed.
     */
    proto_.onMiss = function (callback) {
        this.missedGoalManager.forEach(function (miss) {
            var boundCallback = callback.bind(this, miss);

            this.timeEvents.onDate(boundCallback, miss.date);
        }.bind(this));
    };

    /*
     * Calls the callback when the penalty shootout starts.
     * It uses the internal PeriodEvents object.
     */
    proto_.onStart = function (callback) {
        var startDate = this.penaltyShootout.startDate;

        this.timeEvents.onDate(callback, startDate);
    };

    /*
     * Calls the callback went the penalty shootout finished.
     * It uses the internal PeriodEvents object.
     */
    proto_.onFinish = function (callback) {
        var finishDate = this.penaltyShootout.finishDate;

        this.timeEvents.onDate(callback, finishDate);
    };
    
}(PenaltyShootoutEvents.prototype));

module.exports = PenaltyShootoutEvents;
