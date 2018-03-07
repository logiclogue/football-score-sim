const expect = require("chai").expect;
const Match = require("../src/Match");
const Ratings = require("../src/Ratings");
const Seed = require("../src/Seed");
const Team = require("../src/Team");

describe("Match", () => {
    context("creating the object", () => {
        const teams = [new Team("Derby", 1200), new Team("Forest", 1100)];
        const seed = "testing".toSeed();
        const match = new Match(teams, seed);

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
});
