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

    describe("#map()", () => {
        context("* 2", () => {
            const newCollection = collection
                .map(xs =>
                    new Occurrences(xs.value.map(x => x * 2)));

            it("multiplies goals by 2", () => {
                expect(newCollection.goals.value).to.deep.equal([2, 2]);
            });

            it("multiplies shotsOnTargetNoGoal by 2", () => {
                expect(newCollection.shotsOnTargetNoGoal.value)
                    .to.deep.equal([6, 4]);
            });

            it("multiplies shotsOffTarget by 2", () => {
                expect(newCollection.shotsOffTarget.value)
                    .to.deep.equal([8, 10]);
            });

            it("multiplies shots by 2", () => {
                expect(newCollection.shots.value).to.deep.equal([16, 16]);
            });

            it("multiplies shotsOnTarget by 2", () => {
                expect(newCollection.shotsOnTarget.value).to.deep.equal([8, 6]);
            });
        });
    });
});
