const generateOccurrences = require("./generateOccurrences");

// Number -> Time -> Seed -> Integer
const goals = generateOccurrences(1.58, 1.23);

module.exports = goals;
