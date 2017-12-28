const _ = require("lodash");
const roundValue = require("./roundValue");

// Number -> Number -> (Number -> Number) -> Number -> Number
function trapeziumRule(width, precision, f, startX, endX) {
    const startY = f(startX);
    const endY = f(endX);

    const ySum = _(startX) 
        .range(endX, width)
        .reduce((result, x) => result + roundValue(x, precision), 0);

    return 0.5 * width * (startY + endY + (2 * ySum));
}

module.exports = trapeziumRule;
