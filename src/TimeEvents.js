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
     * Calls callback if the date has passed or when the date does pass.
     * Therefore, it will always call the callback, at some point.
     */
    proto_.ifDatePassedOrOnDate = function (callback, date) {
        var time = Time.minusDates(date, new Date());
        var milliseconds = time.getMilliseconds();

        if (milliseconds <= 0) {
            callback();
        } else {
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

    /*
     * Calls callback if the date has not passed.
     */
    proto_.ifDateHasNotPassed = function (callback, date) {
        var time = Time.minusDates(date, new Date());
        var milliseconds = time.getMilliseconds();

        if (milliseconds > 0) {
            callback();
        }
    };
    
}(TimeEvents.prototype));

module.exports = TimeEvents;
