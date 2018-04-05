const expect = require("chai").expect;
const stubs = require("./stubs");
const Match = require("../src/Match");
const Seed = require("../src/Seed");
const PeriodTimes = require("../src/PeriodTimes");
const times = require("../src/times");

describe("PeriodTimes", () => {
    const seed = "testing".toSeed();
    const match = new Match(stubs.teams, seed);
    const period = match.firstHalf;
    const periodTimes = new PeriodTimes(period);

    describe("#goals", () => {
        it("returns times result", () => {
            const expectedResult = times(
                period.goals.value,
                period.timeLength,
                period.seed.append("times")
            );

            expect(periodTimes.goals).to.deep.equal(expectedResult);
        });
    });
});
