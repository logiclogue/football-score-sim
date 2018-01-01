const _ = require("lodash");
const expect = require("chai").expect;
const goalsFromRatings = require("../src/goalsFromRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");

describe("sandbox", () => {
    context("live goals", () => {
        it("", () => {
            const time = new Time().setMinutes(90);
            const seed = Math.random().toString().toSeed();
            const result = [1200, 1000].goalsFromRatings(time, seed);

            _(result)
                .map(goals =>
                    _(_.range(goals))
                        .map(Math.random)
                        .value()
                )
                .tap(console.log)
                .value();

            expect(false).to.be.true;
        });
    });
});
