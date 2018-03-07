const expect = require("chai").expect;
const Match = require("../src/Match");
const Ratings = require("../src/Ratings");
const Seed = require("../src/Seed");
const Team = require("../src/Team");

describe("Match", () => {
    const derby = new Team("Derby", 1200);
    const forest = new Team("Forest", 1100);
    const teams = [derby, forest];
    const seed = "testing".toSeed();
    const match = new Match(teams, seed);

    describe("constructor", () => {
        it("sets home", () => {
            expect(match.home).to.equal(teams[0]);
        });

        it("sets away", () => {
            expect(match.away).to.equal(teams[1]);
        });

        it("sets seed", () => {
            expect(match.seed).to.equal(seed);
        });
    });

    describe("#ratings", () => {
        it("maps the ratings of the teams", () => {
            expect(match.ratings).to.deep.equal([1200, 1100].toRatings());
        });
    });

    describe("#firstHalf", () => {
        it("returns a period of length 45 minutes", () => {
            expect(match.firstHalf.timeLength.minutes).to.equal(45);
        });

        it("returns a period with the same ratings", () => {
            expect(match.firstHalf.ratings).to.deep.equal(match.ratings);
        });

        it("returns a period with the seed", () => {
            const expectedValue = seed.append("firstHalf").value;

            expect(match.firstHalf.seed.value).to.equal(expectedValue);
        });
    });
});
