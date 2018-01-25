const Occurrences = require("../src/Occurrences");
const expect = require("chai").expect;
const _ = require("lodash");

describe("Occurrences", () => {
    describe("#home", () => {
        context("given [4, 2]", () => {
            const goals = new Occurrences([4, 2]);

            it("returns 4", () => {
                expect(goals.home).to.equal(4);
            });
        });
    });

    describe("#away", () => {
        context("given [4, 2]", () => {
            const goals = new Occurrences([4, 2]);

            it("returns 2", () => {
                expect(goals.away).to.equal(2);
            });
        });
    });

    describe("#append", () => {
        context("given [4, 2] append [1, 2]", () => {
            const goals = [4, 2].toOccurrences();
            const goalsToAppend = [1, 2].toOccurrences();

            const result = goals.append(goalsToAppend);

            it("returns [5, 4]", () => {
                expect(result.value).to.deep.equal([5, 4]);
            });
        });
    });

    context("given [2, 1] and xs as ['teamA', 'teamB']", () => {
        const goals = [2, 1].toOccurrences();
        const teams = ["teamA", "teamB"];

        describe("#winner()", () => {
            it("returns 'teamA'", () => {
                expect(goals.winner(teams)).to.equal("teamA");
            });
        });

        describe("#loser()", () => {
            it("returns 'teamB'", () => {
                expect(goals.loser(teams)).to.equal("teamB");
            });
        });

        describe("#isDraw", () => {
            it("returns false", () => {
                expect(goals.isDraw).to.be.false;
            });
        });
    });

    context("given [1, 2], and xs as ['teamA', 'teamB']", () => {
        const goals = [1, 2].toOccurrences();
        const teams = ["teamA", "teamB"];

        describe("#winner", () => {
            it("returns 'teamB'", () => {
                expect(goals.winner(teams)).to.equal("teamB");
            });
        });

        describe("#loser", () => {
            it("returns 'teamA'", () => {
                expect(goals.loser(teams)).to.equal("teamA");
            });
        });

        describe("#isDraw", () => {
            it("returns false", () => {
                expect(goals.isDraw).to.be.false;
            });
        });
    });

    context("given [1, 1]", () => {
        const goals = [1, 1].toOccurrences();
        const teams = ["teamA", "teamB"];

        describe("#winner()", () => {
            it("returns null", () => {
                expect(goals.winner(teams)).to.be.null;
            });
        });

        describe("#loser()", () => {
            it("returns null", () => {
                expect(goals.loser(teams)).to.be.null;
            });
        });

        describe("#isDraw", () => {
            it("is true", () => {
                expect(goals.isDraw).to.be.true;
            });
        });
    });
});
