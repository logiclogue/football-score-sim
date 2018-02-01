const _ = require("lodash");
const generateOccurrences = require("./generateOccurrences");
const Occurrences = require("./Occurrences");
const RatingDiffAndSeed = require("./RatingDiffAndSeed");
const Ratings = require("./Ratings");

// Number -> Time -> Seed -> Integer
function shotsOffTarget(eloDifference, timeLength, seed) {
    const updatedSeed = updateSeed(seed);
    const f = generateOccurrences(8.31579, 3.34587);

    return f(eloDifference, timeLength, updatedSeed);
}

function updateSeed(seed) {
    return seed.append("shotsOffTarget");
}

// Ratings -> Time -> Seed -> Occurrences
function shotsOffTargetFromRatings(ratings, timeLength, seed) {
    return _(ratings.relative)
        .map(ratings.toRatingDiffAndSeed(seed))
        .map(toShotsOffTarget(timeLength))
        .toOccurrences();
}

// Time -> (RatingDiffAndSeed -> Number)
function toShotsOffTarget(timeLength) {
    return o => shotsOffTarget(o.ratingDiff, timeLength, o.seed);
}

// Ratings ~> Time -> Seed -> Occurrences
Ratings.prototype.shotsOffTarget = function (timeLength, seed) {
    return shotsOffTargetFromRatings(this, timeLength, seed);
};

module.exports = shotsOffTarget;
