const expect = require("chai").expect;
const times = require("../src/times");
const toTimes = require("../src/occurrenceCollectionToTimes");
const stubs = require("./stubs");
const Seed = require("../src/Seed");
const Time = require("../src/Time");

describe("occurrenceCollectionToTimes()", () => {
    context("45 mins, testing seed", () => {
        const seed = "testing".toSeed();
        const timeLength = new Time().setMinutes(45);
        const result = toTimes(stubs.occurrenceCollection, timeLength, seed);

        it("returns the same for the prototype method", () => {
            const other = stubs.occurrenceCollection.toTimes(timeLength, seed);

            expect(result).to.deep.equal(other);
        });

        it("returns expected times for goals", () => {
            const goals = stubs.occurrenceCollection.goals;
            const goalsSeed = seed.append("goals");
            const expected = goals.times(timeLength, goalsSeed);

            expect(result.goals).to.deep.equal(expected);
        });

        it("returns expected times for shotsOnTargetNoGoal", () => {
            const shots = stubs.occurrenceCollection.shotsOnTargetNoGoal;
            const shotsSeed = seed.append("shotsOnTargetNoGoal");
            const expected = shots.times(timeLength, shotsSeed);

            expect(result.shotsOnTargetNoGoal).to.deep.equal(expected);
        });
    });
});
