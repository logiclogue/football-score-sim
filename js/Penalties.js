/*
 * Simulates the penalty shootout.
 */
function Penalties(seed) {
    this.seed = seed || Math.random();

    this.goals = [0, 0];
    this.goalOrder = [[], []];
    this.turns = [5, 5];

    this.constant = 0.75
}

(function (static_, proto_) {
    
    /*
     * Main method that is called to simulate the
     * penalty shootout.
     */
    proto_.simulate = function () {
        var won = false;
        var i;
        var goal;

        while (!won) {
            for (i = 0; i < 2 && !won; i += 1) {
                goal = this._takePenalty();

                this.goals[i] += goal;
                this.turns[i] -= 1;
                this.goalOrder[i].push(goal === 1);

                won = this._won();
            }

            if (this.turns[0] === 0) {
                this.turns[0] = 1;
                this.turns[1] = 1;
            }
        }
    };


    /*
     * Simulates a single penalty kick.
     */
    proto_._takePenalty = function (rand) {
        rand = rand || Math.random();

        if (rand < this.constant) {
            return 1;
        }

        return 0;
    };

    /*
     * Checks t osee if the penalty shootout has
     * been won.
     */
    proto_._won = function () {
        if (this.goals[0] - this.goals[1] > this.turns[1] || this.goals[1] - this.goals[0] > this.turns[0]) {
            return true;
        }

        return false;
    };

}(Penalties, Penalties.prototype));

module.exports = Penalties;
