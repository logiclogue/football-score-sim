const expect = require("chai").expect;
const RatingDiffAndSeed = require("../src/RatingDiffAndSeed");
const Seed = require("../src/Seed");
const Ratings = require("../src/Ratings");

describe("RatingDiffAndSeed", () => {
    const seed = "testing".toSeed();
    const ratings = [1000, 1010].toRatings();
    const i = 0;
    const diffAndSeed = new RatingDiffAndSeed(ratings, seed, 10, i);

    describe("#ratingDiff", () => {
        it("sets the value given to the constructor", () => {
            expect(diffAndSeed.ratingDiff).to.equal(10);
        });
    });

    describe("#seed", () => {
        it("combines the given ratings and i", () => {
            const expectedSeed = seed.append(ratings.value).append(i);

            expect(diffAndSeed.seed.toString())
                .to.equal(expectedSeed.toString());
        });
    });

    describe("Ratings#toRatingDiffAndSeed()", () => {
        it("returns a RatingDiffAndSeed", () => {
            const diffAndSeed = ratings.toRatingDiffAndSeed(seed)(10, i);

            console.log(diffAndSeed);

            expect(diffAndSeed).to.be.an.instanceOf(RatingDiffAndSeed);
        });
    });
});
