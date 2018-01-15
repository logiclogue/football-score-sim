const _ = require("lodash");
const expect = require("chai").expect;
const times = require("../src/times");
const Time = require("../src/Time");
const Seed = require("../src/Seed");
const Goals = require("../src/Goals");

describe("times()", () => {
    context("given [4, 2]", () => {
        const time = new Time().setMinutes(90);
        const seed = "testing".toSeed();
        const result = [4, 2].toGoals().times(time, seed);

        it("returns a list of two lists", () => {
            expect(result.length).to.equal(2);
            expect(result[0].length).to.equal(4);
            expect(result[1].length).to.equal(2);
        });

        it("returns each goal as a Time", () => {
            expect(result[0][0]).to.be.an.instanceof(Time);
        });

        it("returns goal times that are not all 0", () => {
            expect(result[0][0].minutes).to.not.equal(0);
        });

        it("returns goal times that are all different", () => {
            const firstGoalMinute = result[0][0].minutes;
            const minutes = result[0].map(time => time.minutes);
            const unexpectedResult = _.times(4, () => firstGoalMinute);

            expect(minutes).to.not.deep.equal(unexpectedResult);
        });

        it("returns the goal times in order", () => {
            const expected = _(result)
                .thru(_.first)
                .map(time => time.minutes)
                .map(Math.round)
                .value();
            const sorted = _.sortBy(expected);

            expect(expected).to.deep.equal(sorted);
        });

        it("returns different goal times for home and away", () => {
            const homeTime = result[0][0].minutes;
            const awayTime = result[1][0].minutes;

            expect(homeTime).to.not.equal(awayTime);
        });
    });

    context("run twice", () => {
        const time = new Time().setMinutes(90);
        const seed = "testing".toSeed();
        const goals = [4, 2].toGoals();
        const result = times(goals, time, seed);
        const secondResult = times(goals, time, seed);

        it("returns the same result", () => {
            expect(result).to.deep.equal(secondResult);
        });
    });
});
