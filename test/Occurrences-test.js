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

    describe("#winner()", () => {
        context("given [2, 1] and xs as ['teamA', 'teamB']", () => {
            const goals = [2, 1].toOccurrences();
            const result = goals.winner(["teamA", "teamB"]);

            it("returns 'teamA'", () => {
                expect(result).to.equal("teamA");
            });
        });

        context("given [1, 2], and xs as ['teamA', 'teamB']", () => {
            const goals = [1, 2].toOccurrences();
            const result = goals.winner(["teamA", "teamB"]);

            it("returns 'teamB'", () => {
                expect(result).to.equal("teamB");
            });
        });
    });
});
