const expect = require("chai").expect;
const Match = require("../src/Match");
const Ratings = require("../src/Ratings");
const Seed = require("../src/Seed");
const stubs = require("./stubs");
const findMatch = require("./findMatch");

describe("Match", () => {
    const teams = stubs.teams;
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

    describe("#secondHalf", () => {
        it("returns a period of length 45 minutes", () => {
            expect(match.secondHalf.timeLength.minutes).to.equal(45);
        });

        it("returns a period with the same ratings", () => {
            expect(match.secondHalf.ratings).to.deep.equal(match.ratings);
        });

        it("returns a period with the seed", () => {
            const expectedValue = seed.append("secondHalf").value;

            expect(match.secondHalf.seed.value).to.deep.equal(expectedValue);
        });
    });

    describe("#isExtraTime", () => {
        it("returns false", () => {
            expect(match.isExtraTime).to.be.false;
        });
    });

    describe("#isPenaltyShootout", () => {
        it("returns false", () => {
            expect(match.isPenaltyShootout).to.be.false;
        });
    });

    describe("#winner", () => {
        it("returns goals winner", () => {
            const winner = match.goals.winner(match.teams);

            expect(match.winner).to.deep.equal(winner);
        });
    });

    describe("#isDraw", () => {
        context("given a drawn match", () => {
            const match = findMatch(teams, match => match.goals.isDraw);

            it("returns true", () => {
                expect(match.isDraw).to.be.true;
            });
        });

        context("given a decided match", () => {
            const match = findMatch(teams, match => !match.goals.isDraw);

            it("returns false", () => {
                expect(match.isDraw).to.be.false;
            });
        });
    });

    describe("#periods", () => {
        it("returns a list of all the periods", () => {
            const periods = [match.firstHalf, match.secondHalf];

            expect(match.periods).to.deep.equal(periods);
        });
    });

    describe("#occurrences", () => {
        it("returns occurrences which are appended from periods", () => {
            const firstOccurrences = match.firstHalf.occurrences;
            const secondOccurrences = match.secondHalf.occurrences;
            const occurrences = firstOccurrences.append(secondOccurrences);

            expect(matches.occurrences).to.deep.equal(occurrences);
        });
    });
});
