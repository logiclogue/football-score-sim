const trapeziumRule = require("../src/trapeziumRule");
const expect = require("chai").expect;

describe("trapeziumRule()", () => {
    context("(0.1, 10000, x = y, 0, 1)", () => {
        const result = trapeziumRule(0.1, 10000, x => x, 0, 1);

        it("returns 0.5", () => {
            expect(result).to.equal(0.5);
        });
    });
});
