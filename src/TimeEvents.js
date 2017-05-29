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
        var timeNow = Date.now();
        var time = date.getTime();
        var timeDiff = time - timeNow;

        if (timeDiff >= 0) {
            setTimeout(callback, timeDiff);
        }
    };
    
}(TimeEvents.prototype));

module.exports = TimeEvents;
