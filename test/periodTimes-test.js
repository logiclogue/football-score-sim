const periodTimes = require("../src/periodTimes");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const Seed = require("../src/Seed");
const times = require("../src/times");

describe("#periodTimes()", () => {
    const seed = "testing".toSeed();
    const time = new Time().setMinutes(45);
    const ratings = [1200, 1100].toRatings();

    context("given seed testing", () => {
        it("uses seed testing periodTimes", () => {
            const expected = periodTimes()
        });
    });
});
