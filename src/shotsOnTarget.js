const occurrences = require("./occurrences");

// Number -> Time -> Seed -> Integer
function shotsOnTarget(eloDifference, timeLength, seed) {
    return occurrences(2.39474, 1.77885)(eloDifference, timeLength, seed);
}

module.exports = shotsOnTarget;
