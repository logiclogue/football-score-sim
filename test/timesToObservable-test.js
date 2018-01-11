const _ = require("lodash");
const expect = require("chai").expect;
const goalsFromRatings = require("../src/goalsFromRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");
const goalTimes = require("../src/goalTimes");
const timesToObservable = require("../src/timesToObservable");

describe("timesToObservable()", () => {
    it("", (done) => {
        const time = new Time().setMinutes(90);
        const seed = Math.random().toString().toSeed();
        const times = [1200, 1000]
            .toRatings()
            .goals(time, seed)
            .times(time, seed);

        timesToObservable(times, 2 / 5400)
            .doLog()
            .onEnd(done);
    });
});
