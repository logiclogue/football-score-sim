var assert = require('chai').assert;
var Match = require('../src/Match');
var MatchOutputter = require('../src/MatchOutputter');
var common = require('./common');


describe('Match', function () {
    var match = new Match(common.matchParams);
    var outputter = new MatchOutputter({
        match: match
    });

    describe('#simulate()', function () {
        it('should return the same score as #score property', function () {
            assert.equal(match.simulate(), match.score);
        });
    });
});
