const _ = require("lodash");
const goals = require("./goals");
const Ratings = require("./Ratings");
const Goals = require("./Goals");

// Ratings -> Time -> Seed -> Goals
function goalsFromRatings(ratings, timeLength, seed) {
    return _(ratings.relative)
        .map(toDiffAndSeed(ratings, seed))
        .map(toGoalsList(timeLength))
        .toGoals();
}

// Ratings -> Seed -> (Number -> Number -> DiffAndSeed)
function toDiffAndSeed(ratings, seed) {
    return (ratingDiff, i) => new DiffAndSeed(ratings, ratingDiff, seed, i);
}

// Time -> (DiffAndSeed -> [Number])
function toGoalsList(timeLength) {
    return o => goals(o.ratingDiff, timeLength, o.seed);
}

// Ratings -> Number -> Seed -> Number -> DiffAndSeed
function DiffAndSeed(ratings, ratingDiff, seed, i) {
    this.ratingDiff = ratingDiff;
    this.seed = seed.append(ratings.value).append(i);
}

// Ratings ~> Time -> Seed -> Goals
Ratings.prototype.goals = function (timeLength, seed) {
    return goalsFromRatings(this, timeLength, seed);
};

module.exports = goalsFromRatings;
