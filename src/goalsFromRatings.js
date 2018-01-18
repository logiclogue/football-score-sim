const _ = require("lodash");
const goals = require("./goals");
const Ratings = require("./Ratings");
const Goals = require("./Goals");

// Ratings -> Time -> Seed -> Goals
function goalsFromRatings(ratings, timeLength, seed) {
    return _(ratings.relative)
        .map(_.curry(toDiffAndSeed)(ratings, seed))
        .map(toGoalsList(timeLength))
        .toGoals();
}

// Ratings -> Seed -> (Number -> Number -> DiffAndSeed)
function toDiffAndSeed(ratings, seed, ratingDiff, i) {
    return new DiffAndSeed(ratings, seed, ratingDiff, i);
}

// Time -> (DiffAndSeed -> [Number])
function toGoalsList(timeLength) {
    return o => goals(o.ratingDiff, timeLength, o.seed);
}

// Ratings -> Seed -> Number -> Number -> DiffAndSeed
function DiffAndSeed(ratings, seed, ratingDiff, i) {
    this.ratingDiff = ratingDiff;
    this.seed = seed.append(ratings.value).append(i);
}

// Ratings ~> Time -> Seed -> Goals
Ratings.prototype.goals = function (timeLength, seed) {
    return goalsFromRatings(this, timeLength, seed);
};

module.exports = goalsFromRatings;
