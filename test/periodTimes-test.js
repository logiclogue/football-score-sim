const periodTimes = require("../src/periodTimes");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const Seed = require("../src/Seed");
const times = require("../src/times");
const Match = require("../src/Match");
const stubs = require("./stubs");
const findMatch = require("./findMatch");

describe("#periodTimes()", () => {
    const seed = "testing".toSeed();
    const time = new Time().setMinutes(45);
    const ratings = [1200, 1100].toRatings();
    const period = findMatch(stubs.teams, isNilNil).firstHalf;

    context("given seed testing", () => {
        it("uses seed testing periodTimes", () => {

        });
    });
});

function isNilNil(match) {
    const result = match.firstHalf.goals.value;

    return result[0] === 0 && result[1] === 0;
}
