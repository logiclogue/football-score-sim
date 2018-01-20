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
});
