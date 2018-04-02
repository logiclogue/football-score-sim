const times = require("./times");
const Period = require("./Period");

// Period -> Occurrences -> Seed -> TimeScaler -> [[Time]]
function periodTimes(period, occurrences, seed, timeScaler) {
    const newSeed = period.seed.append(seed);

    return times(occurrences.value, period.timeLength, newSeed);
}

// Period ~> Occurrences -> Seed -> TimeScaler -> [[Time]]
Period.prototype.times = function (occurrences, seed, timeScaler) {
    return periodTimes(this, occurrences, seed, timeScaler);
}

module.exports = periodTimes;
