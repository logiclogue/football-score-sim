const _ = require("lodash");
const Ratings = require("./Ratings");

// Ratings -> Seed -> Number -> Number -> RatingDiffAndSeed
function RatingDiffAndSeed(ratings, seed, ratingDiff, i) {
    this.ratingDiff = ratingDiff;
    this.seed = seed.append(ratings.value).append(i);
}

// Ratings ~> Seed -> (Number -> Number -> RatingDiffAndSeed)
Ratings.prototype.toRatingDiffAndSeed = function (seed) {
    return (ratingDiff, i) => new RatingDiffAndSeed(this, seed, ratingDiff, i);
};

module.exports = RatingDiffAndSeed;
