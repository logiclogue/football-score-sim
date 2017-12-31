const _ = require("lodash");
const expect = require("chai").expect;
const relativeRatings = require("../src/relativeRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");

describe("sandbox", () => {
    context("(map goals . relativeRatings) [1200, 800]", () => {
        it("returns goals", () => {
            const time = new Time().setMinutes(90);
            const seed = "testing".toSeed();
            const result = _([1200, 800])
                .thru(relativeRatings)
                .map(rating => goals(rating, time, seed))
                .value();

            expect(result).to.deep.equal([3, 1]);
        });
    });
});
