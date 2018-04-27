const expect = require("chai").expect;
const Seed = require("../src/Seed");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const goalsFromRatings = require("../src/goalsFromRatings");
const shotsOnTargetNoGoals = require("../src/shotsOnTargetNoGoals");
const occurrencesFromRatings = require("../src/occurrencesFromRatings");

describe("occurrencesFromRatings()", () => {
    const seed = "testing".toSeed();
    const time = new Time().setMinutes(45);
    const ratings = new Ratings([1200, 1000]);
    const occurrences = ratings.occurrences(time, seed);

    it("returns an occurrence collection with goals", () => {
        const goals = ratings.goals(time, seed);

        expect(occurrences.goals).to.deep.equal(goals);
    });

    it("returns an occurrence collection with shotsOnTargetNoGoal", () => {
        const shots = ratings.shotsOnTargetNoGoals(time, seed);

        expect(occurrences.shotsOnTargetNoGoal).to.deep.equal(shots);
    });
});
