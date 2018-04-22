const _ = require("lodash");
const generateOccurrences = require("./generateOccurrences");
const RatingDiffAndSeed = require("./RatingDiffAndSeed");
const Ratings = require("./Ratings");

// Number -> Time -> Seed -> Number -> Number
function shotsOnTargetNoGoals(eloDifference, timeLength, seed) {
    const updatedSeed = updateSeed(seed);
    const f = generateOccurrences(2.39474, 1.77885);

    return f(eloDifference, timeLength, updatedSeed);
}

function updateSeed(seed) {
    return seed.append("shotsOnTargetNoGoals");
}

// Ratings -> Time -> Seed -> Occurrences -> Occurrences
function shotsOnTargetFromRatings(ratings, timeLength, seed) {
    return _(ratings.relative)
        .map(ratings.toRatingDiffAndSeed(seed))
        .map(toShotsOnTarget(timeLength))
        .toOccurrences();
}

// Time -> (RatingDiffAndSeed -> Number)
function toShotsOnTarget(timeLength) {
    return o => shotsOnTargetNoGoals(o.ratingDiff, timeLength, o.seed);
}

// Ratings ~> Time -> Seed -> Occurrences -> Occurrences
Ratings.prototype.shotsOnTargetNoGoals = function (timeLength, seed) {
    return shotsOnTargetFromRatings(this, timeLength, seed);
};

module.exports = shotsOnTargetNoGoals;
