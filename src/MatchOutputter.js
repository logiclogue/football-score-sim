/*
 * Outputs the match scores in human readable format.
 */
function MatchOutputter(options) {
    // Instances
    this.match = options.match;
}

(function (proto_) {

    proto_.basicScore = function () {
        var teamA = this.match.teamA.name;
        var teamB = this.match.teamB.name;
        var score = this.match.goalManager.getScore();

        return teamA + ' ' + score[0] + '-' + score[1] + ' ' + teamB;
    };

    proto_.scoreEachHalf = function () {
        var match = this.match;
        var teamA = match.teamA.name;
        var teamB = match.teamB.name;
        var firstHalf = match.firstHalf.goalManager.getScore();
        var secondHalf = match.secondHalf.goalManager.getScore();
        var firstHalfET = match.extraTimeFirstHalf.goalManager.getScore();
        var secondHalfET = match.extraTimeSecondHalf.goalManager.getScore();
        
        var output = teamA + ' vs ' + teamB + '\n' +
            'First half: ' + firstHalf[0] + '-' + firstHalf[1] + '\n' +
            'Second half: ' + secondHalf[0] + '-' + secondHalf[1] + '\n';

        if (!match.wentToExtraTime) {
            return output;
        }

        output += 'ET First half: ' + firstHalfET[0] + '-' + firstHalfET[1] + '\n' +
            'ET Second Half: ' + secondHalfET[0] + '-' + secondHalfET[1] + '\n';

        return output;
    };

}(MatchOutputter.prototype));

module.exports = MatchOutputter;
