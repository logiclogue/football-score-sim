const expect = require("chai").expect;
const Match = require("../src/Match");
const PeriodTimes = require("../src/PeriodTimes");
const MatchTimes = require("../src/MatchTimes");
const Seed = require("../src/Seed");
const times = require("../src/times");
const stubs = require("./stubs");

describe("MatchTimes", () => {
    const seed = "testing".toSeed();
    const match = new Match(stubs.teams, seed);
    const timesSeed = "goals".toSeed();
    const matchTimes = match.toMatchTimes();

    describe("#firstHalf", () => {
        it("returns first half as period times", () => {
            const periodTimes = match.firstHalf.toPeriodTimes();

            expect(matchTimes.firstHalf).to.deep.equal(periodTimes);
        });
    });

    describe("#secondHalf", () => {
        it("returns second half as period times", () => {
            const periodTimes = match.secondHalf.toPeriodTimes();

            expect(matchTimes.secondHalf).to.deep.equal(periodTimes);
        });
    });
});
