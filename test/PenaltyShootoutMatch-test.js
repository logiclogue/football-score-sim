const expect = require("chai").expect;
const PenaltyShootoutMatch = require("../src/PenaltyShootoutMatch");
const PenaltyShootout = require("../src/PenaltyShootout");
const ExtraTimeMatch = require("../src/ExtraTimeMatch");
const Match = require("../src/Match");
const stubs = require("./stubs");
const findMatch = require("./findMatch");
const Seed = require("../src/Seed");

describe("PenaltyShootoutMatch", () => {
    const isDrawn = match => match.goals.isDraw;
    const isDecided = match => !match.goals.isDraw;
    const normalDrawnMatch = findMatch(stubs.teams, isDrawn);
    const normalDecidedMatch = findMatch(stubs.teams, isDecided);

    it("is a Match", () => {
        expect(traits.isMatch(match))
    });

    describe("#isPenaltyShootout", () => {
        context("given a drawn match", () => {
            const match = new PenaltyShootoutMatch(normalDrawnMatch);

            it("returns true", () => {
                expect(match.isPenaltyShootout).to.be.true;
            });
        });

        context("given a decided match", () => {
            const match = new PenaltyShootoutMatch(normalDecidedMatch);

            it("returns false", () => {
                expect(match.isPenaltyShootout).to.be.false;
            });
        });
    });

    describe("#penaltyShootout", () => {
        it("returns a simulated penalty shootout", () => {
            const match = new PenaltyShootoutMatch(normalDrawnMatch);
            const seed = match.seed.append("penaltyShootout");
            const penaltyShootout = new PenaltyShootout().simulate(seed);

            expect(match.penaltyShootout).to.deep.equal(penaltyShootout);
        });
    });

    describe("#winner", () => {
        context("given a normal time drawn match", () => {
            it("returns the winner of the penalty shootout", () => {
                const match = new PenaltyShootoutMatch(normalDrawnMatch);
                const winner = match.penaltyShootout.goals.winner(match.teams);

                expect(match.winner).to.deep.equal(winner);
            });
        });
        
        context("given a match decided in normal time", () => {
            it("returns the winner the normal match", () => {
                const match = normalDecidedMatch.toPenaltyShootoutMatch();
                const winner = normalDecidedMatch.winner;

                expect(match.winner).to.deep.equal(winner);
            });
        });
    });

    describe("#isDraw", () => {
        context("given a drawn match in normal time", () => {
            it("returns false", () => {
                const match = normalDrawnMatch.toPenaltyShootoutMatch();

                expect(match.isDraw).to.be.false;
            });
        });

        context("given a decided match in normal time", () => {
            it("returns false", () => {
                const match = normalDecidedMatch.toPenaltyShootoutMatch();

                expect(match.isDraw).to.be.false;
            });
        });
    });
});
