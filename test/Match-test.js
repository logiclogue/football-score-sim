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
    console.log(match.simulate());
    console.log(match.wentToExtraTime);
    console.log(match.winner);
    console.log(outputter.basicScore());
    console.log(outputter.scoreEachHalf());
});
