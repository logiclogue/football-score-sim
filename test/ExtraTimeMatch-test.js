const expect = require("chai").expect;
const Match = require("../src/Match");
const ExtraTimeMatch = require("../src/ExtraTimeMatch");
const Seed = require("../src/Seed");
const stubs = require("./stubs");
const findMatch = require("./findMatch");

describe("ExtraTimeMatch", () => {
    const seed = "testing 43".toSeed();
    const normalMatch = new Match(stubs.teams, seed)
    const match = new ExtraTimeMatch(normalMatch);

    const decidedMatchSeed = "testing 1".toSeed();
    const normalDecidedMatch = new Match(stubs.teams, decidedMatchSeed);
    const decidedMatch = normalDecidedMatch.toExtraTimeMatch();

    const drawnMatchWonInET = findMatch(stubs.teams, match => {
        return match.isDraw && !match.toExtraTimeMatch().isDraw;
    }).toExtraTimeMatch();

    const drawnMatch = findMatch(stubs.teams, match => {
        return match.toExtraTimeMatch().isDraw;
    }).toExtraTimeMatch();

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

        it("returns a period with the seed appended", () => {
            const period = match.secondHalfExtraTime;
            const expectedSeed = seed.append("secondHalfExtraTime");

            expect(period.seed.value).to.equal(expectedSeed.value);
        });

        it("returns a period with the same ratings", () => {
            const period = match.secondHalfExtraTime;

            expect(period.ratings.value).to.deep.equal(match.ratings.value);
        });
    });

    describe("#extraTimeGoals", () => {
        it("appends firstHalfExtraTime goals to secondHalfExtraTime", () => {
            const goals = match.secondHalfExtraTime.goals
                .append(match.firstHalfExtraTime.goals);

            expect(match.extraTimeGoals.value).to.deep.equal(goals.value);
        });
    });

    describe("#goals", () => {
        context("game is a draw", () => {
            it("appends extra time goals to goals", () => {
                const goals = normalMatch.goals.append(match.extraTimeGoals);

                expect(match.goals).to.deep.equal(goals);
            });
        });

        context("game is decided in normal time", () => {
            it("returns normal time goals", () => {
                const goals = normalDecidedMatch.goals;

                expect(decidedMatch.goals).to.deep.equal(goals);
            });
        });
    });

    describe("#isExtraTime", () => {
        context("game is a draw", () => {
            it("returns true", () => {
                expect(match.isExtraTime).to.be.true;
            });
        });

        context("game is decided in normal time", () => {
            it("returns false", () => {
                expect(decidedMatch.isExtraTime).to.be.false;
            });
        });
    });

    describe("#isDraw", () => {
        context("drawn match in normal time, won in extra time", () => {
            it("returns false", () => {
                expect(drawnMatchWonInET.isDraw).to.be.false;
            });
        });

        context("drawn match in extra time", () => {
            it("returns true", () => {
                expect(drawnMatch.isDraw).to.be.true;
            });
        });
    });
});
