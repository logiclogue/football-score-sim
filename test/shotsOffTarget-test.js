const _ = require("lodash");
const expect = require("chai").expect;
const shotsOffTarget = require("../src/shotsOffTarget");
const goals = require("../src/goals");
const Time = require("../src/Time");
const Seed = require("../src/Seed");
const Occurrences = require("../src/Occurrences");

describe("shotsOffTarget", () => {
    const timeLength = new Time().setMinutes(90);
    const seed = "testing".toSeed();

    context("given an elo difference of 0", () => {
        it("has an average of 8.3", () => {
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => shotsOffTarget(0, timeLength, seed))
                .mean();

            expect(_.round(mean, 1)).to.equal(8.3);
        });
    });

    context("given an elo difference of 500", () => {
        const eloDifference = 500;

        it("has an average of 11.5", () => {
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => shotsOffTarget(eloDifference, timeLength, seed))
                .mean();

            const meanGoals = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => goals(eloDifference, timeLength, seed))
                .mean();

            expect(mean).to.be.closeTo(11.5, 0.1);
        });
    });
});

describe("Ratings#shotsOffTarget()", () => {
    context("given a rating of [1200, 800]", () => {
        const ratings = [1200, 800].toRatings();
        const timeLength = new Time().setMinutes(90);
        const seed = "testing".toSeed();

        const result = ratings.shotsOffTarget(timeLength, seed);

        it("returns Occurrences", () => {
            expect(result).to.be.an.instanceOf(Occurrences);
        });

        it("returns [10, 9]", () => {
            expect(result.value).to.deep.equal([10, 9]);
        });
    });
});
