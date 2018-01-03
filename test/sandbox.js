const _ = require("lodash");
const expect = require("chai").expect;
const Bacon = require("baconjs");
const goalsFromRatings = require("../src/goalsFromRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");

describe("sandbox", () => {
    context("live goals", () => {
        it("", (done) => {
            const time = new Time().setMinutes(90);
            const seed = Math.random().toString().toSeed();
            const goals = [1200, 1000].goalsFromRatings(time, seed);

            const goalTimes = _(goals)
                .map(goals =>
                    _(_.range(goals))
                        .map(Math.random)
                        .map(x => x * 90)
                        .orderBy(x => x)
                        .map(mins => new Time().setMinutes(mins))
                        .value())
                .tap(console.log)
                .value();

            Bacon.fromArray(goalTimes[0])
                .doLog()
                .flatMap((time) =>
                    Bacon.later(time.scale(2 / 5400).milliseconds, time))
                .doLog()
                .onEnd(done);

            //expect(false).to.be.true;
        });
    });
});
