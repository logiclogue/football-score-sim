const expect = require("chai").expect;
const _ = require("lodash");
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

    describe("#isWin", () => {
        context("given empty", () => {
            it("returns false", () => {
                const shootout = PenaltyShootout.empty(2);

                expect(shootout.isWin).to.be.false;
            });
        });

        context("tie after 5", () => {
            it("returns false", () => {
                const shootout = new PenaltyShootout([
                    [true, false, true, true, true],
                    [false, true, true, true, true]
                ]);

                expect(shootout.isWin).to.be.false;
            });
        });

        context("win after 5", () => {
            it("returns true", () => {
                const shootout = new PenaltyShootout([
                    [true, true, true, true, true],
                    [true, true, true, true, false]
                ]);

                expect(shootout.isWin).to.be.true;
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

    describe("#attemptsRemaining", () => {
        context("empty shootout", () => {
            it("returns 5, 5", () => {
                const shootout = PenaltyShootout.empty(2);

                expect(shootout.attemptsRemaining).to.deep.equal([5, 5]);
            });
        });

        context("[true, true, true], [false, true]", () => {
            it("returns 2, 3", () => {
                const shootout = new PenaltyShootout([
                    [true, true, true],
                    [false, true]
                ]);

                expect(shootout.attemptsRemaining).to.deep.equal([2, 3]);
            });
        });

        context("[5 trues, [true, true, true, true, false]]", () => {
            it("returns 0, 0", () => {
                const shootout = new PenaltyShootout([
                    [true, true, true, true, true],
                    [true, true, true, true, false]
                ]);

                expect(shootout.attemptsRemaining).to.deep.equal([0, 0]);
            });
        });

        context("[5 trues, 5 trues]", () => {
            it("returns 1, 1", () => {
                const shootout = new PenaltyShootout([
                    [true, true, true, true, true],
                    [true, true, true, true, true]
                ]);

                expect(shootout.attemptsRemaining).to.deep.equal([1, 1]);
            });
        });

        context("[7 trues, 6 trues]", () => {
            it("returns 0, 1", () => {
                const shootout = new PenaltyShootout([
                    _(7).range().map(x => true).value(),
                    _(6).range().map(x => true).value()
                ]);

                expect(shootout.attemptsRemaining).to.deep.equal([0, 1]);
            });
        });

        context("[[true, true, false, false], 4 trues]", () => {
            it("returns 0, 0", () => {
                const shootout = new PenaltyShootout([
                    [true, true, false, false],
                    [true, true, true, true]
                ]);

                expect(shootout.attemptsRemaining).to.deep.equal([0, 0]);
            });
        });
    });

    describe("#goals", () => {
        context("[true, true, true], [false, true, true]", () => {
            it("returns 3, 2", () => {
                const shootout = new PenaltyShootout([
                    [true, true, true],
                    [false, true, true]
                ]);

                expect(shootout.goals.value).to.deep.equal([3, 2]);
            });
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
