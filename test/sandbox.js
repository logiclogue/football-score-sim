const _ = require("lodash");
const expect = require("chai").expect;
const Bacon = require("baconjs");
const goalsFromRatings = require("../src/goalsFromRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");
const times = require("../src/times");

describe("sandbox", () => {
    context("live goals", () => {
        it("", (done) => {
            const time = new Time().setMinutes(90);
            const seed = Math.random().toString().toSeed();
            const times = [1200, 1000]
                .toRatings()
                .goals(time, seed)
                .times(time, seed);

            Bacon.fromArray(times.value[0])
                .doLog()
                .flatMap(time =>
                    Bacon.later(time.scale(2 / 5400).milliseconds, time))
                .doLog()
                .onEnd(done);
        });
    });
});
