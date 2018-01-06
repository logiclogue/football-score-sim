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
});
