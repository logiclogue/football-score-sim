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
    proto_.getYValue = function (xValue) {
        var coefficientOfE = 1 / Math.sqrt(2 * Math.pow(this.standardDeviation, 2) * Math.PI);
        var powerOfE = -Math.pow(xValue - this.mean, 2) / (2 * Math.pow(this.standardDeviation, 2));

        return coefficientOfE * Math.exp(powerOfE);
    };

    /*
     * Calculates the area under part of the normal
     * curve.
     */
    proto_.trapeziumRule = function (xStart, xEnd, width) {
        var yStart = this.getYValue(xStart);
        var yEnd = this.getYValue(xEnd);
        var yValSum = 0;
        var xVal = xStart + width;

        for (; xVal < xEnd; xVal += width) {
            yValSum += this.getYValue(xVal);
        }
        
        return 0.5 * width * (yStart + yEnd + (2 * yValSum));
    };

}(NormalDistribution, NormalDistribution.prototype));

module.exports = NormalDistribution;
