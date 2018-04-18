const OccurrenceTimes = require("../src/OccurrenceTimes");
const expect = require("chai").expect;

describe("OccurrenceTimes", () => {
    describe("#append", () => {
        it("returns the two values appended together", () => {
            const timesA = new OccurrenceTimes([[24, 44], [29]]);
            const timesB = new OccurrenceTimes([[68], []]);

            const result = timesA.append(timesB);

            expect(result.value).to.deep.equal([[24, 44, 68], [29]]);
        });
    });

    describe(".empty()", () => {
        it("returns OccurrenceTimes that has a value of [[], []]", () => {
            const result = OccurrenceTimes.empty().value;

            expect(result).to.deep.equal([[], []]);
        });
    });
});
