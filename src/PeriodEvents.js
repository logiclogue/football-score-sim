var Period = require('./Period');
var TimeEvents = require('./TimeEvents');

function PeriodEvents(options) {
    // Instances
    this.period = options.period;
    this.timeEvents = options.timeEvents || new TimeEvents();
}

(function (proto_) {

    /*
     * Calls the callback when the period starts.
     */
    proto_.onStart = function (callback) {
        this.timeEvents.onDate(callback, this.period.startDate);
    };

    /*
     * Calls the callback when the period ends.
     */
    proto_.onFinish = function (callback) {
        this.timeEvents.onDate(callback, this.period.finishDate);
    };
    
}(PeriodEvents.prototype));

module.exports = PeriodEvents;
