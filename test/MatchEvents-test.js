var assert = require('chai').assert;
var Match = require('../src/Match');
var MatchEvents = require('../src/MatchEvents');
var common = require('./common');

describe('MatchEvents', function () {
    var match = new Match(common.matchParams);
    var events = new MatchEvents({
        match: match
    });

    describe('#onGoal', function () {
        events.onGoal(function () {
            console.log("GOAL!");
        });
    });
});
