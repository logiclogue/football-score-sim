var Period = require('./Period');

function PeriodEvents(options) {
    // Instances
    this.period = options.period;
}

(function (proto_) {

    /*
     * Calls the callback when the period starts.
     */
    proto_.onStart = function (callback) {
        var startTime = this.period.startTime.getTime();
        var timeDiff = startTime - Date.now();

        setTimeout(callback, timeDiff);
    };

    /*
     * Calls the callback when the period ends.
     */
    proto_.onFinish = function (callback) {
        var finishTime = this.period.finishTime.getTime();
        var timeDiff = finishTime - Date.now();

        setTimeout(callback, timeDiff);
    };
    
}(PeriodEvents.prototype));

module.exports = PeriodEvents;
