const _ = require("lodash");
const goals = require("./goals");
const Ratings = require("./Ratings");

// Ratings -> Time -> Seed -> [Integer]
function goalsFromRatings(ratings, timeLength, seed) {
    return _(ratings.relative)
        .map((ratingDiff, i) => {
            return {
                ratingDiff: ratingDiff,
                seed: seed.append(ratings.value).append(i)
            };
        })
        .map(o => goals(o.ratingDiff, timeLength, o.seed))
        .value();
}

// Ratings ~> Time -> Seed -> [Integer]
Ratings.prototype.goals = function (timeLength, seed) {
    return goalsFromRatings(this, timeLength, seed);
};

module.exports = goalsFromRatings;
