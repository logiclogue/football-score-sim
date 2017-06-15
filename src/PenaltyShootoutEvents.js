var TimeEvents = require('./TimeEvents');
var PeriodEvents = require('./Period');

function PenaltyShootoutEvents(options) {
    this.penaltyShootout = options.penaltyShootout;
    this.periodEvents = options.periodEvents || new PeriodEvents({
        period: penaltyShootout
    });
}

(function (proto_) {

    /*
     * Calls the callback with the goal object when a penalty shootout goal is
     * scored.
     */
    proto_.onGoal = function () {
        
    };

    /*
     * Calls the callback when a penalty is missed, with a goal object.
     * The goal object behaves as a miss to show which team missed.
     */
    proto_.onMiss = function () {
        
    };

    /*
     * Calls the callback when the penalty shootout starts.
     * It uses the internal PeriodEvents object.
     */
    proto_.onStart = function () {
        
    };

    /*
     * Calls the callback went the penalty shootout finished.
     * It uses the internal PeriodEvents object.
     */
    proto_.onFinish = function () {
        
    };
    
}(PenaltyShootoutEvents.prototype));

module.exports = PenaltyShootoutEvents;
