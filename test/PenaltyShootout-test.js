const expect = require("chai").expect;
const PenaltyShootout = require("../src/PenaltyShootout");
const Seed = require("../src/Seed");

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

    describe("#attempt()", () => {
        context("given seed test", () => {
            it("inputs a false", () => {
                const shootout = PenaltyShootout.empty(2);
                const seed = "test".toSeed();

                const result = shootout.attempt(0, seed).record[0];

                expect(result).to.deep.equal([false]);
            });
        });

        context("inputted five times", () => {
            it("inputs some differently", () => {
                const shootout = PenaltyShootout.empty(2);
                const seed = "test".toSeed();

                const result = shootout
                    .attempt(0, seed)
                    .attempt(0, seed)
                    .attempt(0, seed)
                    .attempt(0, seed)
                    .attempt(0, seed)
                    .record[0];

                expect(result).to.deep.equal([false, true, true, true, false]);
            });
        });
    });

    describe("#simulate()", () => {
        it("returns a fully simulated penalty shootout", () => {
            const shootout = PenaltyShootout.empty(2);
            const seed = "test".toSeed();

            const result = shootout.simulate(seed).record;

            expect(result).to.deep.equal([[], []])
        });
    });

    describe(".empty()", () => {
        context("given 5", () => {
            it("returns a penalty shootout of [[], [], [], [], []]", () => {
                const result = PenaltyShootout.empty(5).record;

                expect(result).to.deep.equal([[], [], [], [], []]);
            });
        });
    });
});
