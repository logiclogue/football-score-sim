const occurrences = require("./occurrences");

// Number -> Time -> Seed -> Integer
function shotsOnTarget(eloDifference, timeLength, seed) {
    const updatedSeed = updateSeed(seed);
    const f = occurrences(2.39474, 1.77885);

    return f(eloDifference, timeLength, updatedSeed);
}

function updateSeed(seed) {
    return seed.append("shotsOnTarget");
}

module.exports = shotsOnTarget;
