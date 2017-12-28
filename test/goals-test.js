const goals = require("../src/goals");
const Time = require("../src/Time");
const expect = require("chai").expect;

describe("goals()", () => {
    context("(0 elo, 0 mins)", () => {
        const result = goals(0, new Time(0));

        it("returns 0 goals", () => {
            expect(result).to.equal(0);
        });
    });

    context("(0 elo, 45 mins)", () => {
        const time = new Time().setMinutes(45);
        const result = goals(0, time);

        it("returns an acceptable number of goals", () => {
            expect(result).to.be.true;
        });
    });
});
