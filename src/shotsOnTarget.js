const occurrences = require("./occurrences");

// Number -> Time -> Seed -> Number -> Number
function shotsOnTarget(eloDifference, timeLength, seed, goals = 0) {
    const updatedSeed = updateSeed(seed);
    const f = occurrences(2.39474, 1.77885);

    return f(eloDifference, timeLength, updatedSeed) + goals;
}

function updateSeed(seed) {
    return seed.append("shotsOnTarget");
}

module.exports = shotsOnTarget;
