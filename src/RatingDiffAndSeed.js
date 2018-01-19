// Ratings -> Seed -> Number -> Number -> DiffAndSeed
function RatingDiffAndSeed(ratings, seed, ratingDiff, i) {
    this.ratingDiff = ratingDiff;
    this.seed = seed.append(ratings.value).append(i);
}

module.exports = RatingDiffAndSeed;
