var expect = require("chai").expect;
var PeriodGenerator = require("../src/PeriodGenerator");

describe("PeriodGenerator", function () {
    var generator = new PeriodGenerator({});

    describe("#generate", function () {
        it("returns null", function () {
            expect(generator.generate).to.be.null;
        });
    });
});
