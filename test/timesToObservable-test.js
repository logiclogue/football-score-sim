const _ = require("lodash");
const expect = require("chai").expect;
const goalsFromRatings = require("../src/goalsFromRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");
const times = require("../src/times");
const timesToObservable = require("../src/timesToObservable");

describe("timesToObservable()", () => {
    context("given [4, 2]", () => {
        it("returns 6 times", (done) => {
            const time = new Time().setMinutes(90);
            const seed = Math.random().toString().toSeed();
            const times = [4, 2].toGoals().times(time, seed);

            timesToObservable(times, 0)
                .scan(0, i => i + 1)
                .filter(i => i === 6)
                .onValue(() => done());
        });
    });
});
