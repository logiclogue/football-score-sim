const shotsOffTarget = require("../src/shotsOffTarget");
const goals = require("../src/goals");
const Time = require("../src/Time");
const Seed = require("../src/Seed");
const expect = require("chai").expect;
const _ = require("lodash");

describe("shotsOffTarget", () => {
    const timeLength = new Time().setMinutes(90);
    const seed = "testing".toSeed();

    context("given an elo difference of 0", () => {
        it("has an average of 2.4", () => {
            const mean = _(_.range(100))
                .map(x => seed.append(x))
                .map(seed => shotsOffTarget(0, timeLength, seed))
                .mean();

            expect(_.round(mean, 1)).to.equal(8.3);
        });
    });

    context("given an elo difference of 500", () => {
        const eloDifference = 500;

        it("has an average of 3.8", () => {
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
