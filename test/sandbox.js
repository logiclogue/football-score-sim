const _ = require("lodash");
const expect = require("chai").expect;
const Bacon = require("baconjs");
const goalsFromRatings = require("../src/goalsFromRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");
const goalTimes = require("../src/goalTimes");

describe("sandbox", () => {
    context("live goals", () => {
        it("", (done) => {
            const time = new Time().setMinutes(90);
            const seed = Math.random().toString().toSeed();
            const goals = [1200, 1000].toRatings().goals(time, seed);

            const times = _(goals)
                .thru(goals => goalTimes(goals, time, seed))
                .map(goals =>
                    _(goals)
                        .map(mins => new Time().setMinutes(mins))
                        .value())
                .tap(console.log)
                .value();

            Bacon.fromArray(times[0])
                .doLog()
                .flatMap((time) =>
                    Bacon.later(time.scale(2 / 5400).milliseconds, time))
                .doLog()
                .onEnd(done);

            //expect(false).to.be.true;
        });
    });
});
