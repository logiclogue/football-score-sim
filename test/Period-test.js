const expect = require("chai").expect;
const Seed = require("../src/Seed");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const goals = require("../src/goals");
const shotsOffTarget = require("../src/shotsOffTarget");

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
            expect(period.ratings).to.deep.equal(ratings);
        });
    });

    describe("#goals", () => {
        it("is equal to the return of the goals function", () => {
            const result = ratings.goals(timeLength, seed);

            expect(period.goals).to.deep.equal(result);
        });
    });

    describe("#shotsOffTarget", () => {
        it("is equal to the return of the shotsOffTarget function", () => {
            const result = ratings
                .shotsOffTarget(timeLength, seed, period.goals);

            expect(period.shotsOffTarget).to.deep.equal(result);
        });
    });
});
