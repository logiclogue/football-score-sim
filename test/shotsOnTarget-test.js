const shotsOnTarget = require("../src/shotsOnTarget");
const Time = require("../src/Time");
const Seed = require("../src/Seed");
const expect = require("chai").expect;
const _ = require("lodash");

describe("shotsOnTarget", () => {
    context("sandbox", () => {
        it("", () => {
            const timeLength = new Time().setMinutes(90);
            const seed = "testing".toSeed();

            const result = shotsOnTarget(-100, timeLength, seed);

            expect(result).to.equal(5);
            expect(false).to.be.true;
        });
    });
});
