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
        var teamA = this.match.teamA.name;
        var teamB = this.match.teamB.name;
        var firstHalf = this.match.firstHalf.goalManager.getScore();
        var secondHalf = this.match.secondHalf.goalManager.getScore();
        
        return teamA + ' vs ' + teamB + '\n' +
            'First half: ' + firstHalf[0] + '-' + firstHalf[1] + '\n' +
            'Second half: ' + secondHalf[0] + '-' + secondHalf[1];
    };

}(MatchOutputter.prototype));

module.exports = MatchOutputter;
