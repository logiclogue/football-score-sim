const _ = require("lodash");
const goals = require("./goals");
const relativeRatings = require("./relativeRatings");

// [Number] -> Time -> Seed -> Integer
function goalsFromRatings(ratings, timeLength, seed) {
    return _(ratings)
        .thru(relativeRatings)
        .map((ratingDiff, i) => {
            return {
                ratingDiff: ratingDiff,
                seed: seed.append(ratings).append(i)
            };
        })
        .map(o => goals(o.ratingDiff, timeLength, o.seed))
        .value();
}

// [Number] ~> Time -> Seed -> Integer
Array.prototype.goalsFromRatings(timeLength, seed) {
    return goalsFromRatings(this, timeLength, seed);
}

module.exports = goalsFromRatings;
