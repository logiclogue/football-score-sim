var Match = require('../src/Match');
var MatchOutputter = require('../src/MatchOutputter');
var common = require('./common');


describe('Match', function () {
    var match = new Match({
        teamA: common.teamEngland,
        teamB: common.teamSlovakia,
        extraTime: true,
        penalties: true
    });
    var outputter = new MatchOutputter({
        match: match
    });

    console.log(match.simulate());
    console.log(match.wentToExtraTime);
    console.log(match.winner);
    console.log(outputter.basicScore());
    console.log(outputter.scoreEachHalf());
});
