var assert = require('chai').assert;
var Period = require('../src/Period');
var common = require('./common');


describe('Period', function () {
    var period = new Period({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia
    });

    period.simulate();
});
