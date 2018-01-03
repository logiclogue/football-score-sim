const _ = require("lodash");
const expect = require("chai").expect;
const goalTimes = require("../src/goalTimes");
const Time = require("../src/Time");
const Seed = require("../src/Seed");

describe("goalTimes()", () => {
    context("given [4, 2]", () => {
        const time = new Time().setMinutes(90);
        const seed = "testing".toSeed();
        const result = goalTimes([4, 2], time, seed);

        it("returns a list of two lists", () => {
            expect(result.length).to.equal(2);
            expect(result[0].length).to.equal(4);
            expect(result[1].length).to.equal(2);
        });

        it("returns each goal as a Time", () => {
            expect(result[0][0]).to.be.an.instanceof(Time);
        });
    });
});
