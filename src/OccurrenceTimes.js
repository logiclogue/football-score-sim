const _ = require("lodash");

class OccurrenceTimes {
    // [[a]] -> OccurrenceTimes
    constructor(value) {
        this.value = value;
    }

    // OccurrenceTimes ~> OccurrenceTimes -> OccurrenceTimes
    append(times) {
        return _(this.value)
            .zip(times.value)
            .map(_.flatten)
            .toOccurrenceTimes();
    }
}

// _ ~> Occurrences
_.prototype.toOccurrenceTimes = function () {
    return new OccurrenceTimes(this.value());
};

// OccurrenceTimes
OccurrenceTimes.empty = function () {
    return new OccurrenceTimes([[], []]);
};

module.exports = OccurrenceTimes;
