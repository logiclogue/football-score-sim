/*
 * Create a list with manages list items.
 */
function ScheduleList() {
    this.items = [];
    this.currentTime = Date.now();
}

(function (static_, proto_) {

    /*
     * Adds an item to the list.
     * Parameter is item.
     */
    proto_.addItem = function (item) {
        this.items.push(item);
        this.items.sort(this._sortFunction.bind(this));
    };

    /*
     * Executes all item callback functions that
     * should've happened now.
     */
    proto_.run = function () {
        this.currentTime = Date.now();

        this.items.forEach(this._forEachItemRun.bind(this));
    };

    /*
     * Resets all item executed booleans.
     */
    proto_.reset = function () {
        this.items.forEach(function (item) {
            item.executed = false;
        });
    };


    /*
     * For each item execute it if the time has
     * passed.
     */
    proto_._forEachItemRun = function (item) {
        if (item.startTime < this.currentTime && !item.executed) {
            item.callback();

            item.executed = true;
        }
    };

    /*
     * Sorts the items in order by their start times.
     */
    proto_._sortFunction = function (itemA, itemB) {
        if (itemA.startTime > itemB.startTime)
            return true;

        return false;
    };

}(ScheduleList, ScheduleList.prototype));

module.exports = ScheduleList;
