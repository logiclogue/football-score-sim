// Number -> Number -> Number
function roundValue(value, precision) {
    return Math.round(value * precision) / precision;
}

module.exports = roundValue;
