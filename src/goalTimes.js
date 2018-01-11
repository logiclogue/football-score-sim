const _ = require("lodash");
const Time = require("./Time");

// [Number] -> Time -> Seed -> [[Time]]
function goalTimes(goals, timeLength, seed) {
    const updatedSeed = updateSeed(seed, goals, timeLength);

    return _(goals.value)
        .map((goals, i) =>
            goalTimesPrime(goals, timeLength, updatedSeed.append(i)))
        .value();
}

// Number -> Time -> Seed -> [Time]
function goalTimesPrime(goals, timeLength, seed) {
    return _(_.range(goals))
        .map(i => seed.append(i).decimal)
        .orderBy(x => x)
        .map(x => x * timeLength.minutes)
        .map(new Time().setMinutes)
        .value();
}

// Seed -> Goals -> Time -> Seed
function updateSeed(seed, goals, timeLength) {
    return seed
        .append("goalTimes")
        .append(goals.value)
        .append(timeLength);
}

module.exports = goalTimes;
