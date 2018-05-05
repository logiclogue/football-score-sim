const expect = require("chai").expect;
const OccurrenceCollection = require("../src/OccurrenceCollection");
const Occurrences = require("../src/Occurrences");
const traits = require("./traits");

describe("OccurrenceCollection", () => {
    const goals = new Occurrences([1, 1]);
    const shotsOnTargetNoGoal = new Occurrences([3, 2]);
    const shotsOffTarget = new Occurrences([4, 5]);
    const collection = new OccurrenceCollection(
        goals, shotsOnTargetNoGoal, shotsOffTarget
    );

    it("is an OccurreceCollection", () => {
        expect(traits.isOccurrenceCollection(collection)).to.be.true;
    });

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

    describe("#append()", () => {
        context("given itself", () => {
            const newCollection = collection.append(collection);

            it("doubles the goals", () => {
                const expected = collection.goals.append(collection.goals);

                expect(expected).to.deep.equal(newCollection.goals);
            });

            it("doubles the shotsOnTargetNoGoal", () => {
                const shots = newCollection.shotsOnTargetNoGoal;
                const expected = collection.shotsOnTargetNoGoal
                    .append(collection.shotsOnTargetNoGoal);

                expect(expected).to.deep.equal(shots);
            });

            it("doubles the shotsOffTarget", () => {
                const shots = newCollection.shotsOffTarget;
                const expected = collection.shotsOffTarget
                    .append(collection.shotsOffTarget);

                expect(expected).to.deep.equal(shots);
            });
        });
    });
});
