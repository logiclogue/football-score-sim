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
            const seed = Math.random().toString().toSeed();
            const result = _([1200, 800])
                .thru(relativeRatings)
                .map((ratingDiff, i) => {
                    return {
                        ratingDiff: ratingDiff,
                        seed: seed.append(i)
                    };
                })
                .map(o => goals(o.ratingDiff, time, o.seed))
                .value();

            expect(result).to.deep.equal([3, 1]);
        });
    });
});
