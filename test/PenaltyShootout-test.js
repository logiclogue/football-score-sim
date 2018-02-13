const expect = require("chai").expect;
const PenaltyShootout = require("../src/PenaltyShootout");

describe("PenaltyShootout", () => {
    describe("#attempt()", () => {
        context("empty penalty shootout", () => {
            it("simulates that penalty", () => {
                const shootout = new PenaltyShootout();

                expect(shootout.attempt(0).record[0]).to.deep.equal([true]);
            });
        });
    });
});
