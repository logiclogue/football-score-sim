const expect = require("chai").expect;
const periodTimes = require("../src/periodTimes");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const Seed = require("../src/Seed");
const times = require("../src/times");
const Match = require("../src/Match");
const TimeScaler = require("../src/TimeScaler");
const stubs = require("./stubs");
const findMatch = require("./findMatch");

describe("#periodTimes()", () => {
    const seed = "testing".toSeed();
    const time = new Time().setMinutes(45);
    const ratings = [1200, 1100].toRatings();
    const timeScaler = new TimeScaler();

    context("given no goals period", () => {
        const period = findMatch(stubs.teams, isScore(0, 0)).firstHalf;

        it("returns no times", () => {
            const result = periodTimes(period, timeScaler);

            expect(result).to.deep.equal([[], []]);
        });
    });

    context("given a 2-1 period", () => {
        const period = findMatch(stubs.teams, isTwoOne).firstHalf;

        it("returns equivalent of times function", () => {
            const result = periodTimes(period, timeScaler);
            const expectedHome = times([2, 1])

            expect(result).to.deep.equal();
        });
    });
});

function isNilNil(match) {
    const result = match.firstHalf.goals.value;

    return result[0] === 0 && result[1] === 0;
}

function isTwoOne(match) {
    const result = match.firstHalf.goals.value;

    return result[0] === 2 && result[1] === 1;
}

function isScore(home, away) {
    return match => {
        const score = match.firstHalf.goals.value;

        return score[0] === home && score[1] === away;
    };
}
