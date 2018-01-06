const _ = require("lodash");
const expect = require("chai").expect;
const Ratings = require("../src/Ratings");

describe("Ratings", () => {
    describe("#home", () => {
        context("[1200, 1000]", () => {
            it("returns 1200", () => {
                const result = [1200, 1000].toRatings().home;

                expect(result).to.equal(1200);
            });
        });
    });

    describe("#away", () => {
        context("[1200, 1000]", () => {
            it("return 1000", () => {
               const result = [1200, 1000].toRatings().away;

               expect(result).to.equal(1000);
            });
        });
    });

    describe("#relative()", () => {
        context("given [1000, 1000]", () => {
            const ratings = [1000, 1000].toRatings();

            it("returns [0, 0]", () => {
                expect(ratings.relative).to.deep.equal([0, 0]);
            });
        });

        context("given [1100, 900]", () => {
            const ratings = [1100, 900].toRatings();

            it("returns [200, -200]", () => {
                expect(ratings.relative).to.deep.equal([200, -200]);
            });
        });

        context("given [1100, 900, 1100]", () => {
            const ratings = [1100, 900, 1100].toRatings();

            it("returns [100, -200, 100]", () => {
                expect(ratings.relative).to.deep.equal([100, -200, 100]);
            });
        });
    });
});
