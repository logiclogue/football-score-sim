var assert = require('chai').assert;
var Penalties = require('../src/Penalties');
var common = require('./common');


describe('Penalties', function () {
    var penalties = new Penalties({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia
    });

    penalties.simulate();

    describe('#hasFinished', function () {
        it('should return true', function () {
            assert.equal(penalties.hasFinished(), true);
        });
    });
});
