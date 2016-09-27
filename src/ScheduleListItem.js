/*
 * List item to be scheduled.
 * Callback gets executed when startTime is
 * passed.
 */
function ScheduleListItem(startTime, callback) {
    this.executed = false;
    this.startTime = startTime;
    this.callback = callback;
}

module.exports = ScheduleListItem;
