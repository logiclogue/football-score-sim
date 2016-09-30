var assert = require('chai').assert;
var LiveMatch = require('../src/LiveMatch');
var common = require('./common');


describe('LiveMatch', function () {
    var matchParams = Object.create(common.matchParams);

    var match = new LiveMatch(matchParams);

    describe('#simulate()', function () {
        match.simulate();

        it('should return the number of goals', function () {
        });
    });
});
