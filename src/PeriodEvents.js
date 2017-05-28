var Period = require('./Period');

function PeriodEvents(options) {
    // Instances
    this.period = options.period;

    // Variables
    this.onStartCallback = function () {};
    this.onFinishCallback = function () {};
}

(function (proto_) {

    /*
     * Calls the callback when the period starts.
     */
    proto_.onStart = function (callback) {
        
    };

    /*
     * Calls the callback when the period ends.
     */
    proto_.onFinish = function (callback) {
        
    };
    
}(PeriodEvents.prototype));

module.exports = PeriodEvents;
