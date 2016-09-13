var Match = require('../src/Match');
var common = require('./common');


describe('Match', function () {
    var match = new Match({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia,
        seed: 'test'
    });

    console.log(match.simulate());
});
