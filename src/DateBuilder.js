var Seed = require('./Seed');
var Time = require('./Time');
var iocConfig = require('./iocConfig');

function DateBuilder(options) {
    this.minMilliDelta = options.minMilliDelta || {
        isInfinite: true,
        value: 0
    };
    this.maxMilliDelta = options.maxMilliDelta || {
        isInfinite: true,
        value: 0
    };
    this.meanDate = options.meanDate || new Date();
    this.seed = new Seed();
    this.seed = options.seed ||
        new Seed()
            .setValue(this.meanDate.toString());
    this.fixedPointDate = new Time(this.meanDate);
    this.standardDeviationMilli = options.standardDeviationMilli || 1;
    this.calculateArea = options.calculateArea || iocConfig.calculateArea;
    this.quantile = options.quantile || iocConfig.quantile;
}

(function (proto_) {

    proto_.getResult = function () {

    };
    
}(DateBuilder.prototype));

module.exports = DateBuilder;
