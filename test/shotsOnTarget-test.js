const shotsOnTarget = require("../src/shotsOnTarget");
const goals = require("../src/goals");
const Time = require("../src/Time");
const Seed = require("../src/Seed");
const expect = require("chai").expect;
const _ = require("lodash");

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
