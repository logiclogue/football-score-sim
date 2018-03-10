const expect = require("chai").expect;
const Match = require("../src/Match");
const ExtraTimeMatch = require("../src/ExtraTimeMatch");
const Seed = require("../src/Seed");
const stubs = require("./stubs");

describe("ExtraTimeMatch", () => {
    const seed = "testing".toSeed();
    const normalMatch = new Match(stubs.teams, seed)
    const match = new ExtraTimeMatch(normalMatch);

    describe("#firstHalfExtraTime", () => {
        it("returns a period with the time length of 15 minutes", () => {
            const period = match.firstHalfExtraTime;

            expect(period.timeLength.minutes).to.equal(15);
        });

        it("returns a period with the seed appended", () => {
            const period = match.firstHalfExtraTime;
            const expectedSeed = seed.append("firstHalfExtraTime");

            expect(period.seed.value).to.equal(expectedSeed.value);
        });

        it("returns a period with the same ratings", () => {
            const period = match.firstHalfExtraTime;

            expect(period.ratings.value).to.deep.equal(match.ratings.value);
        });
    });

    describe("#secondHalfExtraTime", () => {
        it("returns a period of 15 minutes", () => {
            const period = match.secondHalfExtraTime;

            expect(period.timeLength.minutes).to.equal(15);
        });
    });
});
