/*
 * Outputs the match scores in human readable format.
 */
function MatchOutputter(options) {
    // Instances
    this.match = options.match;
}

(function (proto_) {

    proto_.basicScore = function () {
        var match = this.match;
        var teamA = match.teamA.name;
        var teamB = match.teamB.name;
        var score = match.score;
        var penalties = match.penaltyShootoutScore;
        var aet = '';
        var penaltyScore = '';
        var output = teamA + ' ' + score[0] + '-' + score[1] + ' ' + teamB;

        if (match.wentToExtraTime) {
            aet = ' (aet)';
        }

        if (match.wentToPenaltyShootout) {
            penaltyScore = ' (' + penalties[0] + '-' + penalties[1] + ')';
        }

        return output + aet + penaltyScore;
    };

    proto_.scoreEachHalf = function () {
        var match = this.match;
        var teamA = match.teamA.name;
        var teamB = match.teamB.name;
        var firstHalf = match.firstHalf.goalManager.getScore();
        var secondHalf = match.secondHalf.goalManager.getScore();
        
        var output = teamA + ' vs ' + teamB + '\n' +
            'First half: ' + firstHalf[0] + '-' + firstHalf[1] + '\n' +
            'Second half: ' + secondHalf[0] + '-' + secondHalf[1] + '\n';

        if (match.wentToExtraTime) {
            output += this._getExtraTimeOutput();
        }

        if (match.wentToPenaltyShootout) {
            output += this._getPenaltyShootoutOutput();
        }

        return output;
    };

    proto_._getExtraTimeOutput = function () {
        var match = this.match;
        var firstHalfET = match.extraTimeFirstHalf.goalManager.getScore();
        var secondHalfET = match.extraTimeSecondHalf.goalManager.getScore();
        var firstHalfOutput = firstHalfET[0] + '-' + firstHalfET[1];
        var secondHalfOutput = secondHalfET[0] + '-' + secondHalfET[1];
        var output = 'ET First Half: ' + firstHalfOutput + '\n' +
            'ET Second Half: ' + secondHalfOutput + '\n';

        return output;
    };

    proto_._getPenaltyShootoutOutput = function () {
        var score = this.match.penaltyShootoutScore;
        var output = 'Penalty Shootout: ' + score[0] + '-' + score[1] + '\n';

        return output;
    };

}(MatchOutputter.prototype));

module.exports = MatchOutputter;
