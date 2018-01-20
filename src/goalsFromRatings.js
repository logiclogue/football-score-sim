const _ = require("lodash");
const goals = require("./goals");
const Ratings = require("./Ratings");
const Occurrences = require("./Occurrences");
const RatingDiffAndSeed = require("./RatingDiffAndSeed");

// Ratings -> Time -> Seed -> Occurrences
function goalsFromRatings(ratings, timeLength, seed) {
    return _(ratings.relative)
        .map(ratings.toRatingDiffAndSeed(seed))
        .map(toGoalsList(timeLength))
        .toOccurrences();
}

// Time -> (RatingDiffAndSeed -> [Number])
function toGoalsList(timeLength) {
    return o => goals(o.ratingDiff, timeLength, o.seed);
}

// Ratings ~> Time -> Seed -> Occurrences
Ratings.prototype.goals = function (timeLength, seed) {
    return goalsFromRatings(this, timeLength, seed);
};

module.exports = goalsFromRatings;
