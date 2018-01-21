const _ = require("lodash");
const expect = require("chai").expect;
const shotsOnTarget = require("../src/shotsOnTarget");
const goals = require("../src/goals");
const Time = require("../src/Time");
const Seed = require("../src/Seed");
const Ratings = require("../src/Ratings");
const Occurrences = require("../src/Occurrences");

describe("shotsOnTarget", () => {
    const timeLength = new Time().setMinutes(90);
    const seed = "testing".toSeed();

    context("given 3 goals", () => {
        it("has an average of 5.4", () => {
            const goalsScored = 3;
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => shotsOnTarget(0, timeLength, seed, goalsScored))
                .mean();

            expect(mean).to.be.closeTo(5.4, 0.1);
        });
    });

    context("given an elo difference of 0", () => {
        it("has an average of 2.4", () => {
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => shotsOnTarget(0, timeLength, seed))
                .mean();

            expect(_.round(mean, 1)).to.equal(2.4);
        });
    });

    context("given an elo difference of 500", () => {
        const eloDifference = 500;

        it("has an average of 3.8", () => {
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => shotsOnTarget(eloDifference, timeLength, seed))
                .mean();

            const meanGoals = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => goals(eloDifference, timeLength, seed))
                .mean();

            // This should maybe be the average
            //const ratio = meanGoals / 1.58;
            //expect(2.39474 * ratio).to.be.closeTo(mean, 0.1);
            expect(mean).to.be.closeTo(4.3, 0.1);
        });
    });
});

describe("Ratings#shotsOnTarget", () => {
    const ratings = [1200, 800].toRatings();
    const timeLength = new Time().setMinutes(90);
    const seed = "testing".toSeed();

    context("given [1200, 800]", () => {
        const result = ratings.shotsOnTarget(timeLength, seed);

        it("returns type Occurrences", () => {
            expect(result).to.be.an.instanceOf(Occurrences);
        });

        it("returns [6, 1]", () => {
            expect(result.value).to.deep.equal([6, 1]);
        });
    });

    context("given [1200, 800] and [1, 1] goals", () => {
        it("returns [7, 2]", () => {
            const goals = [1, 1].toOccurrences();
            const result = ratings.shotsOnTarget(timeLength, seed, goals);

            expect(result.value).to.deep.equal([7, 2]);
        });
    });
});
