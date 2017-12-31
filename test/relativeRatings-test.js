const expect = require("chai").expect;
const relativeRatings = require("../src/relativeRatings");

describe("relativeRatings()", () => {
    context("given [1000, 1000]", () => {
        const ratings = [1000, 1000];

        it("returns [0, 0]", () => {
            const result = relativeRatings(ratings);

            expect(result).to.deep.equal([0, 0]);
        });
    });

    context("given [1100, 900]", () => {
        const ratings = [1100, 900];

        it("returns [200, -200]", () => {
            const result = relativeRatings(ratings);

            expect(result).to.deep.equal([200, -200]);
        });
    });

    context("given [1100, 900, 1100]", () => {
        const ratings = [1100, 900, 1100];

        it("returns [100, -200, 100]", () => {
            const result = relativeRatings(ratings);

            expect(result).to.deep.equal([100, -200, 100]);
        });
    });
});
