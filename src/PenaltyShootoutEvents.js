var TimeEvents = require('./TimeEvents');
var PeriodEvents = require('./Period');

class PenaltyShootoutEvents {
    constructor(options) {
        this.penaltyShootout = options.penaltyShootout;
        this.periodEvents = options.periodEvents || new PeriodEvents({
            period: this.penaltyShootout
        });
        this.timeEvents = options.timeEvents || new TimeEvents();
    }

    /*
     * Calls the callback with the goal object when a penalty shootout goal is
     * scored.
     */
    onGoal(callback) {
        var goalManager = this.penaltyShootout.goalManager;

        goalManager.forEach(goal => {
            var boundCallback = callback.bind(this, goal);

            this.timeEvents.onDate(boundCallback, goal.date);
        });
    }

    /*
     * Calls the callback when a penalty is missed, with a goal object.
     * The goal object behaves as a miss to show which team missed.
     */
    onMiss(callback) {
        var missedGoalManager = this.penaltyShootout.missedGoalManager;

        missedGoalManager.forEach(function (miss) {
            var boundCallback = callback.bind(this, miss);

            this.timeEvents.onDate(boundCallback, miss.date);
        }.bind(this));
    }

    /*
     * Calls the callback when the penalty shootout starts.
     * It uses the internal PeriodEvents object.
     */
    onStart(callback) {
        var startDate = this.penaltyShootout.startDate;

        this.timeEvents.onDate(callback, startDate);
    }

    /*
     * Calls the callback went the penalty shootout finished.
     * It uses the internal PeriodEvents object.
     */
    onFinish(callback) {
        var finishDate = this.penaltyShootout.finishDate;

        this.timeEvents.onDate(callback, finishDate);
    }
}

module.exports = PenaltyShootoutEvents;
