const expect = require("chai").expect;
const Seed = require("../src/Seed");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const goalsFromRatings = require("../src/goalsFromRatings");
const occurrencesFromRatings = require("../src/occurrencesFromRatings");

describe("occurrencesFromRatings()", () => {
    const seed = "testing".toSeed();
    const time = new Time().setMinutes(45);
    const ratings = new Ratings([1200, 1000]);

    it("returns an occurrence collection with goals", () => {
        const occurrences = ratings.occurrences(time, seed);
        const goals = ratings.goals(time, seed);

        expect(occurrences.goals).to.deep.equal(goals);
    });

    it("returns an occurrence collection with shotsOnTargetNoGoal", () => {
        expect(false).to.be.true;
    });
});
