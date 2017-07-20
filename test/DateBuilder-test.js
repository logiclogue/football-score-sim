var assert = require('chai').assert;
var DateBuilder = require('../src/DateBuilder');

describe('DateBuilder', function () {
    var dateBuilder;

    beforeEach(function () {
        dateBuilder = new DateBuilder({
            meanDate: new Date(1998, 6, 30),
            fixedPointDate: 78000
        });
    });

    describe('#getResult()', function () {
        it('should', function () {
            console.log(new Date(dateBuilder.getResult()));
            console.log(dateBuilder.meanDate);
        });
    });
});
