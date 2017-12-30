const goals = require("../src/goals");
const Time = require("../src/Time");
const expect = require("chai").expect;
const roundValue = require("../src/roundValue");
const _ = require("lodash");

describe("goals()", () => {
    context("(0 elo, 0 mins)", () => {
        const result = goals(0, new Time(0), "".toSeed());

        it("returns 0 goals", () => {
            expect(result).to.equal(0);
        });
    });

    context("(0 elo, 45 mins)", () => {
        const time = new Time().setMinutes(45);
        const result = goals(0, time, "testing".toSeed());

        it("returns an acceptable number of goals", () => {
            expect(result).to.equal(1);
        });
    });

    context("(0 elo, 90 minutes) run 100 times", () => {
        const time = new Time().setMinutes(90);
        const seed = "testing".toSeed();
        const count = 1000;
        const totalGoals = _(count)
            .range()
            .map(number => seed.append(number))
            .map(seed => goals(0, time, seed))
            .sum();
        const averageGoals = totalGoals / count;

        it("returns an average of approx 1.6", () => {
            expect(roundValue(averageGoals, 10)).to.equal(1.6);
        });
    });
});
