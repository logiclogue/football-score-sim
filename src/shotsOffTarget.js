const occurrences = require("./occurrences");

// Number -> Time -> Seed -> Integer
function shotsOffTarget(eloDifference, timeLength, seed) {
    const updatedSeed = updateSeed(seed);
    const f = occurrences(8.31579, 3.34587);

    return f(eloDifference, timeLength, updatedSeed);
}

function updateSeed(seed) {
    return seed.append("shotsOffTarget");
}

module.exports = shotsOffTarget;
