const _ = require("lodash");
const occurrences = require("./occurrences");
const RatingDiffAndSeed = require("./RatingDiffAndSeed");
const Ratings = require("./Ratings");

// Number -> Time -> Seed -> Number -> Number
function shotsOnTarget(eloDifference, timeLength, seed, goals = 0) {
    const updatedSeed = updateSeed(seed);
    const f = occurrences(2.39474, 1.77885);

    return f(eloDifference, timeLength, updatedSeed) + goals;
}

function updateSeed(seed) {
    return seed.append("shotsOnTarget");
}

// Ratings -> Time -> Seed -> Occurrences -> Occurrences
function shotsOnTargetFromRatings(ratings, timeLength, seed, goals) {
    const goalsToAppend = goals || [0, 0].toOccurrences();

    return _(ratings.relative)
        .map(ratings.toRatingDiffAndSeed(seed))
        .map(toShotsOnTarget(timeLength))
        .toOccurrences()
        .append(goalsToAppend);
}

// Time -> (RatingDiffAndSeed -> Number)
function toShotsOnTarget(timeLength) {
    return o => shotsOnTarget(o.ratingDiff, timeLength, o.seed);
}

// Ratings ~> Time -> Seed -> Occurrences -> Occurrences
Ratings.prototype.shotsOnTarget = function (timeLength, seed, goals) {
    return shotsOnTargetFromRatings(this, timeLength, seed, goals);
};

module.exports = shotsOnTarget;
