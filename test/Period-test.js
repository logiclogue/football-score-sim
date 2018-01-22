const expect = require("chai").expect;
const Seed = require("../src/Seed");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const goals = require("../src/goals");
const shotsOnTarget = require("../src/shotsOnTarget");

describe("Period", () => {
    const seed = "testing".toSeed();
    const timeLength = new Time().setMinutes(45);
    const ratings = [1200, 800].toRatings();
    const period = new Period(timeLength, ratings, seed);

    describe("#seed", () => {
        it("is the given seed", () => {
            expect(period.seed.value).to.equal(seed.value);
        });
    });

    describe("#timeLength", () => {
        it("is the given time length", () => {
            expect(period.timeLength.minutes).to.equal(timeLength.minutes);
        });
    });

    describe("#ratings", () => {
        it("is the given ratings", () => {
            expect(period.ratings.value).to.deep.equal(ratings.value);
        });
    });

    describe("#goals", () => {
        it("is equal to the return of the goals function", () => {
            const result = ratings.goals(timeLength, seed);

            expect(period.goals.value).to.deep.equal(result.value);
        });
    });

    describe("#shotsOnTarget", () => {
        it("is equal to the return of the shotsOnTarget function", () => {
            const result = ratings
                .shotsOnTarget(timeLength, seed, period.goals);

            expect(period.shotsOnTarget.value).to.deep.equal(result.value);
        });
    });
});
