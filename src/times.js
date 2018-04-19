const _ = require("lodash");
const Time = require("./Time");
const Occurrences = require("./Occurrences");
const OccurrenceTimes = require("./OccurrenceTimes");

// [Number] -> Time -> Seed -> OccurrenceTimes
function times(occurrencesList, timeLength, seed) {
    const updatedSeed = updateSeed(seed, occurrencesList, timeLength);

    return _(occurrencesList)
        .map((occurrences, i) =>
            times_(occurrences, timeLength, updatedSeed.append(i)))
        .toOccurrenceTimes();
}

// Number -> Time -> Seed -> [Time]
function times_(occurrences, timeLength, seed) {
    return _(occurrences)
        .thru(_.range)
        .map(randomDecimal(seed))
        .orderBy()
        .map(decimalToMinutes(timeLength))
        .map(minutesToTime())
        .value();
}

// Seed -> (Number -> Number)
function randomDecimal(seed) {
    return i => seed.append(i).decimal;
}

// Time -> (Number -> Number)
function decimalToMinutes(timeLength) {
    return x => x * timeLength.minutes;
}

// Number -> Time
function minutesToTime() {
    return new Time().setMinutes;
}

// Seed -> [Number] -> Time -> Seed
function updateSeed(seed, occurrences, timeLength) {
    return seed
        .append("times")
        .append(occurrences)
        .append(timeLength);
}

// Occurrences ~> Time -> Seed -> OccurrenceTimes
Occurrences.prototype.times = function (timeLength, seed) {
    const updatedSeed = seed.append("Occurrences");

    return times(this.value, timeLength, updatedSeed);
};

module.exports = times;
