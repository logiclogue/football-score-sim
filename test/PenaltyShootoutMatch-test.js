const expect = require("chai").expect;
const PenaltyShootoutMatch = require("../src/PenaltyShootoutMatch");
const PenaltyShootout = require("../src/PenaltyShootout");
const ExtraTimeMatch = require("../src/ExtraTimeMatch");
const Match = require("../src/Match");
const stubs = require("./stubs");
const findMatch = require("./findMatch");
const Seed = require("../src/Seed");

describe("PenaltyShootoutMatch", () => {
    describe("#isPenaltyShootout", () => {
        context("given a drawn match", () => {
            const isDrawn = match => match.goals.isDraw;
            const normalMatch = findMatch(stubs.teams, isDrawn);
            const match = new PenaltyShootoutMatch(normalMatch);

            it("returns true", () => {
                expect(match.isPenaltyShootout).to.be.true;
            });
        });

        context("given a decided match", () => {
            const isDecided = match => !match.goals.isDraw;
            const normalMatch = findMatch(stubs.teams, isDecided);
            const match = new PenaltyShootoutMatch(normalMatch);

            it("returns false", () => {
                expect(match.isPenaltyShootout).to.be.false;
            });
        });
    });

    describe("#penaltyShootout", () => {
        it("returns a simulated penalty shootout", () => {
            const isDrawn = match => match.goals.isDraw;
            const normalMatch = findMatch(stubs.teams, isDrawn);
            const match = new PenaltyShootoutMatch(normalMatch);
            const seed = match.seed.append("penaltyShootout");
            const penaltyShootout = new PenaltyShootout().simulate(seed);

            expect(match.penaltyShootout).to.deep.equal(penaltyShootout);
        });
    });

    describe("#winner", () => {
        context("given a normal time drawn match", () => {
            it("returns the winner of the penalty shootout", () => {
                const isDrawn = match => match.goals.isDraw;
                const normalMatch = findMatch(stubs.teams, isDrawn);
                const match = new PenaltyShootoutMatch(normalMatch);
                const winner = match.penaltyShootout.goals.winner(match.teams);

                expect(match.winner).to.deep.equal(winner);
            });
        });
        
        context("given a match decided in normal time", () => {
            it("returns the winner the normal match", () => {
                const isDecided = match => !match.goals.isDraw;
                const normalMatch = findMatch(stubs.teams, isDecided);
                const match = normalMatch.toPenaltyShootoutMatch();
                const winner = normalMatch.winner;

                expect(match.winner).to.deep.equal(winner);
            });
        });
    });
});
