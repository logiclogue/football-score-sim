const trapeziumRule = require("../src/trapeziumRule");
const expect = require("chai").expect;
const roundValue = require("../src/roundValue");

describe("trapeziumRule()", () => {
    context("(0.1, 10000, x = y, 0, 1)", () => {
        const result = trapeziumRule(0.1, 10000, x => x, 0, 1);

        it("returns 0.5", () => {
            expect(result).to.equal(0.5);
        });
    });

    context("(0.1, 10000, x = y^3, -1, 1)", () => {
        const f = x => Math.pow(x, 3);
        const result = trapeziumRule(0.1, 10000, f, -1, 1);

        it("returns 0", () => {
            expect(result).to.equal(-1.1102230246251566e-17);
        });
    });

    context("(0.1, 10000, x = y^2, -1, 1)", () => {
        const f = x => Math.pow(x, 2);
        const result = trapeziumRule(0.1, 10000, f, -1, 1);

        it("returns 2/3", () => {
            expect(result).to.equal(0.6699999999999999);
        });
    });
});
