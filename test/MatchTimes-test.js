const expect = require("chai").expect;
const Match = require("../src/Match");
const Seed = require("../src/Seed");
const times = require("../src/times");
const stubs = require("./stubs");

describe("MatchTimes", () => {
    const seed = "testing".toSeed();
    const match = new Match(stubs.teams, seed);
    const timesSeed = "goals".toSeed();

    console.log(match.firstHalf.goals.times(match.firstHalf.timeLength, timesSeed).map(times => times.map(time => Math.floor(time.minutes))));
});
