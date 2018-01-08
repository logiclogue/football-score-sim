const _ = require("lodash");
const expect = require("chai").expect;
const goalsFromRatings = require("../src/goalsFromRatings");
const goals = require("../src/goals");
const Seed = require("../src/Seed");
const Time = require("../src/Time");

describe("goalsFromRatings()", () => {
    context("given ratings [1200, 900] win", () => {
        it("returns winning score", () => {
            const time = new Time().setMinutes(90);
            const seed = "testing 1".toSeed();
            const ratings = [1200, 900].toRatings();
            const result = goalsFromRatings(ratings, time, seed);

            expect(result).to.deep.equal([1, 0]);
        });
    });

    context("given ratings [1200, 900] draw", () => {
        it("returns drawing score", () => {
            const time = new Time().setMinutes(90);
            const seed = "testing 20".toString().toSeed();
            const ratings = [1200, 900].toRatings();
            const result = goalsFromRatings(ratings, time, seed);

            expect(result).to.deep.equal([1, 1]);
        });
    });

    context("given ratings [1200, 900] loss", () => {
        it("returns losing score", () => {
            const time = new Time().setMinutes(90);
            const seed = "testing".toString().toSeed();
            const ratings = [1200, 900].toRatings();
            const result = goalsFromRatings(ratings, time, seed);

            expect(result).to.deep.equal([0, 2]);
        });
    });
});

describe("Ratings#goals()", () => {
    context("given ratings [1200, 900] win", () => {
        it("returns winning score", () => {
            const time = new Time().setMinutes(90);
            const seed = "testing 1".toSeed();
            const ratings = [1200, 900].toRatings();
            const result = ratings.goals(time, seed);

            expect(result).to.deep.equal([1, 0]);
        });
    });
});
