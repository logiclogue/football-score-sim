var Time = require('./Time');

/*
 * Class which deals with any sort of generic time event.
 */
function TimeEvents() {
    
}

(function (proto_) {

    /*
     * Calls callback when the current time is #date.
     */
    proto_.onDate = function (callback, date) {
        var time = Time.minusDates(date, new Date());
        var milliseconds = time.getMilliseconds();

        if (milliseconds >= 0) {
            setTimeout(callback, milliseconds);
        }
    };

    /*
     * Calls callback if the date has passed.
     */
    proto_.ifDatePassed = function (callback, date) {
        var time = Time.minusDates(date, new Date());
        var milliseconds = time.getMilliseconds();

        if (milliseconds <= 0) {
            callback();
        }
    };
    
}(TimeEvents.prototype));

module.exports = TimeEvents;
