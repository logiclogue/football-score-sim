const times = require("./times");

// Period -> Occurrences -> Seed -> TimeScaler -> [[Time]]
function periodTimes(period, occurrences, seed, timeScaler) {
    const newSeed = period.seed.append(seed);

    return times(occurrences.value, period.timeLength, newSeed);
}

module.exports = periodTimes;
