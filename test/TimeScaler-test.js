const _ = require("lodash");
const expect = require("chai").expect;
const TimeScaler = require("../src/TimeScaler");
const Time = require ("../src/Time");

describe("TimeScaler", () => {
    describe("#scale()", () => {
        context("given 10 min date, 5 min time offset, and scale of 2", () => {
            it("scales 10 mins to 40 minutes", () => {
                const dateOffset = new Date(600000);
                const timeOffset = new Time().setMinutes(5);
                const scale = 2;
                const scaler = new TimeScaler(dateOffset, timeOffset, scale);

                const timeToScale = new Time().setMinutes(10);
                const result = scaler.scale(timeToScale).getTime();

                expect(result).to.equal(new Time().setMinutes(40).milliseconds);
            });
        });
    });
});
