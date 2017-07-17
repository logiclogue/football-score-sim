function TrapeziumRule(width, precision) {
    this.width = width;
    this.precision = precision;
}

TrapeziumRule.prototype.getArea = function (f, startX, endX) {
    var startY = f(startX);
    var endY = f(endX);
    var x;
    var ySum = 0;
    var result;

    for (x = startX + this.width; x < endX; x += this.width) {
        x = roundValue(x, this.precision);

        ySum += f(x);
    }

    return 0.5 * this.width * (startY + endY + (2 * ySum));
}

function roundValue(value, precision) {
    return Math.round(value * precision) / precision;
}

module.exports = TrapeziumRule;
