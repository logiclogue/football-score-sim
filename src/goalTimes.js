const _ = require("lodash");
const Time = require("./Time");
const Goals = require("./Goals");

// Goals -> Time -> Seed -> [[Time]]
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

// Seed -> Goals -> Time -> Seed
function updateSeed(seed, goals, timeLength) {
    return seed
        .append("goalTimes")
        .append(goals.value)
        .append(timeLength);
}

// Goals ~> Time -> Seed -> [[Time]]
Goals.prototype.times = function (timeLength, seed) {
    return goalTimes(this, timeLength, seed);
};

module.exports = goalTimes;
