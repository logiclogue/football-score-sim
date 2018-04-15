const expect = require("chai").expect;
const OccurrenceCollection = require("../src/OccurrenceCollection");
const Occurrences = require("../src/Occurrences");

describe("OccurrenceCollection", () => {
    const goals = new Occurrences([1, 1]);
    const shotsOnTargetNoGoal = new Occurrences([3, 2]);
    const shotsOffTarget = new Occurrences([4, 5]);
    const collection = new OccurrenceCollection(
        goals, shotsOnTargetNoGoal, shotsOffTarget
    );

    describe("#shotsOnTarget", () => {
        it("returns goals appended to shotsOnTargetNoGoal", () => {
            expect(collection.shotsOnTarget.value).to.deep.equal([4, 3]);
        });
    });

    describe("#shots", () => {
        it("returns shotsOnTarget appended to shotsOffTarget", () => {
            expect(collection.shots.value).to.deep.equal([8, 8]);
        });
    });
});
