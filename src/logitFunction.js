// Inverse of the logistic distribution
// Number -> Number -> Number -> Number
function logitFunction(standardDeviation, mean, x) {
    const s = getS(standardDeviation);

    return mean + (s * Math.log(x / (1 - x)));
}

// Number -> Number
function getS(standardDeviation) {
    const left = 3 * Math.pow(standardDeviation, 2);
    const right = Math.pow(Math.PI, 2);

    return Math.sqrt(left / right);
}

module.exports = logitFunction;
