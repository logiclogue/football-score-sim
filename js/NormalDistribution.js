/*
 * Class which creates a normal distribution and
 * allows you to find values and probabilities.
 */
function NormalDistribution(mean, standardDeviation) {
    this.mean = mean;
    this.standardDeviation = standardDeviation;
}

(function (static_, proto_) {

    /*
     * Method which returns the x value at a point on
     * the curve.
     */
    proto_.getXValue = function (xValue) {
        var coefficientOfE = 1 / Math.sqrt(2 * Math.pow(this.standardDeviation, 2) * Math.PI);
        var powerOfE = - Math.pow(xValue - this.mean, 2) / (2 * Math.pow(this.standardDeviation, 2));

        return coefficientOfE * Math.exp(powerOfE);
    };

}(NormalDistribution, NormalDistribution.prototype));

module.exports = NormalDistribution;
