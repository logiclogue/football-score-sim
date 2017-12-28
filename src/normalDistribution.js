function normalDistribution(mean, standardDeviation, x) {
    const sdSquared = Math.pow(this.standardDeviation, 2);
    const coefficientOfE = 1 / Math.sqrt(2 * sdSquared * Math.PI);
    const powerOfE = -Math.pow(x - this.mean, 2) / (2 * sdSquared);

    return coefficientOfE * Math.exp(powerOfE);
}

module.exports = normalDistribution;
