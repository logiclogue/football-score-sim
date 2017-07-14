function TrapeziumRule(width) {
    this.width = width;
}

TrapeziumRule.prototype.getArea = function (f, startX, endX) {
    var startY = f(startX);
    var endY = f(endX);
    var x;
    var ySum = 0;

    for (x = startX + this.width; x < endX; x += width) {
        ySum += f(x);
    }

    return 0.5 * width * (startY + endY + (2 * ySum));
}

module.exports = TrapeziumRule;
