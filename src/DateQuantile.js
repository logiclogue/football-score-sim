var iocConfig = require('./iocConfig');

function DateQuantile(options) {
    this.primitiveQuantile = options.quantile || iocConfig.quantile;
}

(function (p) {

    p.quantile = function (x, meanDate, standardDeviationTime) {
        var meanDateMilli = meanDate.getTime();
        var sdMilli = standardDeviationTime.getMilliseconds();

        var resultDateMilli = this.primitiveQuantile(x, meanDateMilli, sdMilli);

        return new Date(resultDateMilli);
    };

}(DateQuantile.prototype));

module.exports = DateQuantile;
