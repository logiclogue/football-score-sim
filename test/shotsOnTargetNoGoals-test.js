const _ = require("lodash");
const expect = require("chai").expect;
const shotsOnTargetNoGoals = require("../src/shotsOnTargetNoGoals");
const Time = require("../src/Time");
const Seed = require("../src/Seed");
const Ratings = require("../src/Ratings");
const Occurrences = require("../src/Occurrences");

describe("shotsOnTargetNoGoals", () => {
    const timeLength = new Time().setMinutes(90);
    const seed = "testing".toSeed();

    context("given an elo difference of 0", () => {
        it("has an average of 2.6", () => {
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => shotsOnTargetNoGoals(0, timeLength, seed))
                .mean();

            expect(_.round(mean, 1)).to.equal(2.6);
        });
    });

    context("given an elo difference of 500", () => {
        const eloDifference = 500;

        it("has an average of 4.2", () => {
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed =>
                    shotsOnTargetNoGoals(eloDifference, timeLength, seed))
                .mean();

            expect(mean).to.be.closeTo(4.2, 0.1);
        });
    });
});

describe("Ratings#shotsOnTargetNoGoals", () => {
    const ratings = [1200, 800].toRatings();
    const timeLength = new Time().setMinutes(90);
    const seed = "testing".toSeed();

    context("given [1200, 800]", () => {
        const result = ratings.shotsOnTargetNoGoals(timeLength, seed);

        it("returns type Occurrences", () => {
            expect(result).to.be.an.instanceOf(Occurrences);
        });

        it("returns [4, 2]", () => {
            expect(result.value).to.deep.equal([4, 2]);
        });
    });

    context("given [1200, 800]", () => {
        it("returns [4, 2]", () => {
            const result = ratings
                .shotsOnTargetNoGoals(timeLength, seed);

            expect(result.value).to.deep.equal([4, 2]);
        });
    });
});
