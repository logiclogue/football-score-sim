const _ = require("lodash");
const goals = require("./goals");
const Ratings = require("./Ratings");
const Goals = require("./Goals");
const RatingDiffAndSeed = require("./RatingDiffAndSeed");

// Ratings -> Time -> Seed -> Goals
function goalsFromRatings(ratings, timeLength, seed) {
    return _(ratings.relative)
        .map(ratings.toRatingDiffAndSeed(seed))
        .map(toGoalsList(timeLength))
        .toGoals();
}

// Time -> (RatingDiffAndSeed -> [Number])
function toGoalsList(timeLength) {
    return o => goals(o.ratingDiff, timeLength, o.seed);
}

// Ratings ~> Time -> Seed -> Goals
Ratings.prototype.goals = function (timeLength, seed) {
    return goalsFromRatings(this, timeLength, seed);
};

module.exports = goalsFromRatings;
