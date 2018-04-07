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
                period.seed.append("goals").append("times")
            );

            expect(periodTimes.goals).to.deep.equal(expectedResult);
        });
    });

    describe("#shotsOffTarget", () => {
        it("returns times result", () => {
            const expectedResult = times(
                period.shotsOffTarget.value,
                period.timeLength,
                period.seed.append("shotsOffTarget").append("times")
            );

            expect(periodTimes.shotsOffTarget).to.deep.equal(expectedResult);
        });
    });
});
