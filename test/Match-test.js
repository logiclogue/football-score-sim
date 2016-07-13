var assert = require('chai').assert;
var Match = require('../js/Match/Match');
var Team = require('../js/Team');


var england = new Team('England', 1947);
var russia = new Team('Russia', 1736);
var wales = new Team('Wales', 1629);
var slovakia = new Team('Slovakia', 1742);
var derby = new Team('Derby County', 1544);
var united = new Team('Manchester United', 1794);
var match = new Match(england, russia, {
    extraTime: false,
    penalties: true,
    seed: 'test'
});

describe('Match', function () {
    describe('#simulate()', function () {
        match.simulate();

        it('should have correct match text', function () {
            assert.equal(match.text, 'England 2-1 Russia');
        });
    });
});
