const expect = require("chai").expect;
const Seed = require("../src/Seed");
const Period = require("../src/Period");
const Time = require("../src/Time");
const Ratings = require("../src/Ratings");
const goalsFromRatings = require("../src/goalsFromRatings");

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

    describe("#occurrences", () => {
        it("returns an occurrence collection", () => {
            const goals = ratings.goals(timeLength, seed);

            expect(period.occurrences.goals).to.deep.equal(goals);
        });
    });
});
