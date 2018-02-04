const _ = require("lodash");
const expect = require("chai").expect;
const TimeScaler = require("../src/TimeScaler");
const Time = require ("../src/Time");

describe("TimeScaler", () => {
    describe("#scale()", () => {
        context("given 10 minute date and scale of 2", () => {
            it("scales 10 minutes to 1800000 milliseconds", () => {
                const date = new Date(600000);
                const timeToScale = new Time().setMinutes(10);
                const scale = 2;
                const scaler = new TimeScaler(date, scale);

                const result = scaler.scale(timeToScale).getTime();

                expect(result).to.equal(new Time().setMinutes(30).milliseconds);
            });
        });
    });
});
