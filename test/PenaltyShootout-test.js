const expect = require("chai").expect;
const PenaltyShootout = require("../src/PenaltyShootout");

describe("PenaltyShootout", () => {
    describe("#add()", () => {
        context("empty penalty shootout", () => {
            it("simulates that penalty", () => {
                const shootout = new PenaltyShootout();

                const result = shootout.add(0, true).record[0];

                expect(result).to.deep.equal([true]);
            });
        });
    });
});
